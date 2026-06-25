import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, EmptyState } from "@/components/app-shell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { idr } from "@/lib/format";
import { getDeterministicBenchmarkPrices } from "@/lib/benchmark";
import { Plus, Trash2, Trophy, Share2, TrendingDown, Store, Split, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/smart-basket")({
  head: () => ({ meta: [{ title: "Smart Basket — PasarCek" }] }),
  component: SmartBasketPage,
});

function SmartBasketPage() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: basket } = useQuery({
    queryKey: ["basket", user?.id],
    queryFn: async () => {
      const { data: existing } = await supabase.from("smart_baskets").select("*").eq("user_id", user!.id).order("created_at", { ascending: false }).limit(1).maybeSingle();
      if (existing) return existing;
      const { data: created } = await supabase.from("smart_baskets").insert({ user_id: user!.id, name: "Keranjang Saya" }).select().single();
      return created!;
    },
  });

  const { data: items } = useQuery({
    queryKey: ["basket-items", basket?.id],
    enabled: !!basket?.id,
    queryFn: async () => (await supabase.from("basket_items").select("*, product:products(id,name,unit,category)").eq("basket_id", basket!.id)).data ?? [],
  });

  const { data: products } = useQuery({
    queryKey: ["products-list-basket"],
    queryFn: async () => (await supabase.from("products").select("id,name,unit").order("name")).data ?? [],
  });

  const { data: pricesByMarket } = useQuery({
    queryKey: ["basket-prices", items?.map((i: any) => i.product_id).sort().join(",")],
    enabled: !!items && items.length > 0,
    queryFn: async () => {
      const today = new Date().toLocaleDateString('en-CA');
      const productIds = items!.map((i: any) => i.product_id);
      
      // Get the latest date with prices in the database to fallback on
      const { data: latestDateRow } = await supabase
        .from("product_prices")
        .select("recorded_at")
        .lte("recorded_at", today)
        .order("recorded_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      
      let dateToUse = latestDateRow?.recorded_at || today;
      if (dateToUse > today) {
        dateToUse = today;
      }

      const { data } = await supabase.from("product_prices")
        .select("price,product_id,market:markets(id,name,city)")
        .eq("recorded_at", dateToUse)
        .in("product_id", productIds);
      
      let dbPrices = data ?? [];

      if (dbPrices.length === 0) {
        const { data: products } = await supabase.from("products").select("id,name,category,unit").order("name");
        const { data: markets } = await supabase.from("markets").select("id,name,city").order("name");
        if (products && markets) {
          const benchmarkPrices = getDeterministicBenchmarkPrices(products as any[], markets as any[], dateToUse);
          dbPrices = benchmarkPrices.filter((p: any) => productIds.includes(p.product_id)).map((p: any) => ({
            price: p.price,
            product_id: p.product_id,
            market: p.market
          }));
        }
      }

      return dbPrices;
    },
  });

  const recommendations = useMemo(() => {
    if (!items || !pricesByMarket) return [];
    const markets = new Map<string, { id: string; name: string; city: string; total: number; covered: number }>();
    for (const row of pricesByMarket as any[]) {
      const item = items.find((i: any) => i.product_id === row.product_id);
      if (!item) continue;
      const key = row.market.id;
      const m = markets.get(key) ?? { id: row.market.id, name: row.market.name, city: row.market.city, total: 0, covered: 0 };
      m.total += Number(row.price) * Number(item.quantity);
      m.covered += 1;
      markets.set(key, m);
    }
    return Array.from(markets.values()).filter((m) => m.covered === items.length).sort((a, b) => a.total - b.total);
  }, [items, pricesByMarket]);

  const cheapest = recommendations[0];
  const priciest = recommendations[recommendations.length - 1];
  const saving = cheapest && priciest ? priciest.total - cheapest.total : 0;

  const productCheapestPrices = useMemo(() => {
    if (!items || !pricesByMarket) return {};
    const prices: Record<string, { price: number; marketName: string; marketId: string }> = {};
    for (const row of pricesByMarket as any[]) {
      const pId = row.product_id;
      const priceNum = Number(row.price);
      const current = prices[pId];
      if (!current || priceNum < current.price) {
        prices[pId] = {
          price: priceNum,
          marketName: row.market.name,
          marketId: row.market.id,
        };
      }
    }
    return prices;
  }, [items, pricesByMarket]);

  const crossMarketTotal = useMemo(() => {
    if (!items) return 0;
    return items.reduce((sum, item) => {
      const cheapestPrice = productCheapestPrices[item.product_id]?.price;
      return sum + (cheapestPrice ? cheapestPrice * item.quantity : 0);
    }, 0);
  }, [items, productCheapestPrices]);

  const [newProduct, setNewProduct] = useState<string>("");
  const [qty, setQty] = useState<string>("1");

  async function addItem() {
    if (!newProduct || !basket) return;
    const p = (products as any[]).find((x) => x.id === newProduct);
    const { error } = await supabase.from("basket_items").insert({ basket_id: basket.id, product_id: newProduct, unit: p?.unit ?? "kg", quantity: Number(qty) || 1 });
    if (error) return toast.error(error.message);
    setNewProduct(""); setQty("1");
    qc.invalidateQueries({ queryKey: ["basket-items"] });
    qc.invalidateQueries({ queryKey: ["basket-prices"] });
  }
  async function removeItem(id: string) {
    await supabase.from("basket_items").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["basket-items"] });
    qc.invalidateQueries({ queryKey: ["basket-prices"] });
  }
  async function updateQty(id: string, q: number) {
    await supabase.from("basket_items").update({ quantity: q }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["basket-items"] });
    qc.invalidateQueries({ queryKey: ["basket-prices"] });
  }

  return (
    <AppShell>
      <PageHeader
        title="Smart Basket"
        description='Simulasikan belanja Anda dan temukan pasar termurah hari ini.'
        action={<Button variant="outline" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link disalin"); }}><Share2 className="h-4 w-4" /> Bagikan</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-[var(--color-gray-100)] bg-white">
          <div className="border-b border-[var(--color-gray-100)] p-4">
            <div className="grid gap-2 sm:grid-cols-[1fr_120px_auto]">
              <Select value={newProduct} onValueChange={setNewProduct}>
                <SelectTrigger><SelectValue placeholder="Pilih produk..." /></SelectTrigger>
                <SelectContent>
                  {(products ?? []).map((p: any) => <SelectItem key={p.id} value={p.id}>{p.name} ({p.unit})</SelectItem>)}
                </SelectContent>
              </Select>
              <Input type="number" min="0.1" step="0.1" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="Jumlah" />
              <Button onClick={addItem} disabled={!newProduct}><Plus className="h-4 w-4" /> Tambah</Button>
            </div>
          </div>
          {(!items || items.length === 0) ? (
            <EmptyState title="Belum ada produk di keranjang" description="Tambahkan produk untuk mulai menghitung penghematan." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
                  <tr>
                    <th className="px-4 py-2.5">Produk</th>
                    <th className="px-4 py-2.5 text-right">Harga Satuan (Terendah)</th>
                    <th className="px-4 py-2.5 text-center">Jumlah</th>
                    <th className="px-4 py-2.5 text-right">Subtotal</th>
                    <th className="px-4 py-2.5 text-center" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((it: any) => {
                    const cheapestInfo = productCheapestPrices[it.product_id];
                    const price = cheapestInfo?.price;
                    const marketName = cheapestInfo?.marketName;
                    const subtotal = price ? price * it.quantity : 0;

                    return (
                      <tr key={it.id} className="border-t border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]/50 transition-colors">
                        <td className="px-4 py-3 font-semibold">
                          <div>{it.product.name}</div>
                          <div className="text-[10px] text-[var(--color-gray-500)] font-normal">{it.product.category || "Umum"}</div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {price ? (
                            <>
                              <div className="font-semibold text-[var(--color-brand-blue)]">{idr(price)}</div>
                              <div className="text-[10px] text-[var(--color-brand-green)] font-medium truncate max-w-[150px] ml-auto">
                                di {marketName}
                              </div>
                            </>
                          ) : (
                            <span className="text-xs text-[var(--color-gray-500)]">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <Input
                              type="number"
                              min="0.1"
                              step="0.1"
                              defaultValue={it.quantity}
                              onBlur={(e) => updateQty(it.id, Number(e.target.value))}
                              className="w-16 h-8 text-center text-xs font-semibold rounded-md border border-[var(--color-gray-300)]"
                            />
                            <span className="text-xs text-[var(--color-gray-500)]">{it.unit}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-[var(--color-ink)]">
                          {price ? idr(subtotal) : "—"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors" onClick={() => removeItem(it.id)}>
                            <Trash2 className="h-4 w-4 text-[var(--color-destructive)]" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-[var(--color-gray-300)] bg-[var(--color-gray-50)]/50 font-bold">
                    <td colSpan={3} className="px-4 py-3 text-left font-semibold text-[var(--color-gray-700)]">
                      Total Belanja Terendah (Campuran Pasar)
                    </td>
                    <td className="px-4 py-3 text-right text-base font-black text-[var(--color-brand-blue)]">
                      {idr(crossMarketTotal)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-green)] p-6 text-white shadow-soft">
            <p className="text-xs font-semibold uppercase text-white/70">Estimasi Penghematan</p>
            <p className="mt-2 text-3xl font-black">{idr(saving)}</p>
            <p className="mt-1 text-xs text-white/80">Selisih antara pasar termurah & termahal di keranjang Anda</p>
          </div>

          {items && items.length > 0 && (
            <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-4 shadow-soft">
              <h3 className="mb-3.5 text-sm font-bold uppercase text-[var(--color-gray-500)] flex items-center gap-1.5 border-b border-[var(--color-gray-100)] pb-2">
                <TrendingDown className="h-4 w-4 text-[var(--color-brand-blue)]" />
                Perbandingan Strategi Belanja
              </h3>
              
              <div className="space-y-3">
                {/* Taktik 1: Belanja di Satu Pasar */}
                <div className="rounded-md bg-[var(--color-gray-50)] p-3 border border-[var(--color-gray-100)] hover:border-[var(--color-brand-blue)]/30 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-brand-blue)] bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded">Taktik A: Satu Lokasi</span>
                      <h4 className="font-bold text-xs mt-1.5 text-[var(--color-ink)] flex items-center gap-1">
                        <Store className="h-3.5 w-3.5 text-[var(--color-brand-blue)]" />
                        {cheapest ? cheapest.name : "Tidak Tersedia"}
                      </h4>
                    </div>
                    <span className="text-sm font-black text-[var(--color-brand-blue)] shrink-0">
                      {cheapest ? idr(cheapest.total) : "—"}
                    </span>
                  </div>
                  <p className="text-[10px] text-[var(--color-gray-500)] mt-1.5 leading-relaxed">
                    {cheapest 
                      ? `Praktis & cepat. Beli seluruh keranjang belanja Anda di ${cheapest.name} (${cheapest.city}).`
                      : "Tidak ada satu pun pasar yang memiliki semua produk ini secara bersamaan hari ini."
                    }
                  </p>
                </div>

                {/* Taktik 2: Belanja Multi-Pasar */}
                <div className="rounded-md bg-[var(--color-brand-green)]/[0.03] p-3 border border-[var(--color-brand-green)]/15 hover:border-[var(--color-brand-green)]/35 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-brand-green)] bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">Taktik B: Multi-Pasar</span>
                      <h4 className="font-bold text-xs mt-1.5 text-[var(--color-brand-green)] flex items-center gap-1">
                        <Split className="h-3.5 w-3.5" />
                        Lintas Pasar Termurah
                      </h4>
                    </div>
                    <span className="text-sm font-black text-[var(--color-brand-green)] shrink-0">
                      {idr(crossMarketTotal)}
                    </span>
                  </div>
                  <p className="text-[10px] text-[var(--color-brand-green)] mt-1.5 leading-relaxed">
                    Beli tiap produk di pasar termurahnya masing-masing untuk mendapatkan total harga paling murah.
                  </p>
                </div>

                {/* Analisis Hemat Selisih */}
                {cheapest && crossMarketTotal > 0 && cheapest.total > crossMarketTotal ? (
                  <div className="flex items-start gap-2 rounded-md bg-[var(--color-success)]/5 p-3 border border-[var(--color-success)]/15 text-[var(--color-success)] text-[11px] leading-relaxed">
                    <Trophy className="h-4 w-4 shrink-0 text-[var(--color-success)] mt-0.5" />
                    <span>
                      Hemat tambahan sebesar <strong className="font-bold text-xs">{idr(cheapest.total - crossMarketTotal)}</strong> jika membeli secara terpisah di beberapa pasar berbeda.
                    </span>
                  </div>
                ) : cheapest ? (
                  <div className="flex items-start gap-2 rounded-md bg-blue-50/50 p-2.5 border border-blue-100 text-[var(--color-brand-blue)] text-[10px]">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>
                      Harga satu pasar termurah sudah optimal! Belanja di {cheapest.name} memberikan harga terbaik tanpa perlu mengunjungi beberapa pasar.
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-4 shadow-soft">
            <h3 className="mb-3 text-sm font-bold uppercase text-[var(--color-gray-500)]">Rekomendasi Pasar</h3>
            {recommendations.length === 0 ? (
              <p className="text-sm text-[var(--color-gray-500)]">Tambahkan produk untuk melihat rekomendasi.</p>
            ) : (
              <ul className="space-y-2">
                {recommendations.map((m, i) => (
                  <li key={m.id} className={`flex items-center justify-between rounded-md border p-3 transition-colors ${i === 0 ? "border-[var(--color-success)] bg-[var(--color-success)]/5" : "border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]/50"}`}>
                    <div>
                      <p className="flex items-center gap-2 font-semibold text-xs sm:text-sm">{i === 0 && <Trophy className="h-4 w-4 text-[var(--color-success)]" />}{m.name}</p>
                      <p className="text-[10px] text-[var(--color-gray-500)]">{m.city}</p>
                    </div>
                    <p className={`text-sm sm:text-base font-black ${i === 0 ? "text-[var(--color-success)]" : ""}`}>{idr(m.total)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
