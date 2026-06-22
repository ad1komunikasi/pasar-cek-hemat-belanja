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
import { Plus, Trash2, Trophy, Share2 } from "lucide-react";
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
      const today = new Date().toISOString().slice(0, 10);
      const productIds = items!.map((i: any) => i.product_id);
      const { data } = await supabase.from("product_prices")
        .select("price,product_id,market:markets(id,name,city)")
        .eq("recorded_at", today)
        .in("product_id", productIds);
      return data ?? [];
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
            <table className="w-full text-sm">
              <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
                <tr><th className="px-4 py-2">Produk</th><th className="px-4 py-2 text-center">Jumlah</th><th className="px-4 py-2 text-right">Satuan</th><th /></tr>
              </thead>
              <tbody>
                {items.map((it: any) => (
                  <tr key={it.id} className="border-t border-[var(--color-gray-100)]">
                    <td className="px-4 py-3 font-semibold">{it.product.name}</td>
                    <td className="px-4 py-3 text-center">
                      <Input type="number" min="0.1" step="0.1" defaultValue={it.quantity} onBlur={(e) => updateQty(it.id, Number(e.target.value))} className="mx-auto w-20 text-center" />
                    </td>
                    <td className="px-4 py-3 text-right text-[var(--color-gray-500)]">{it.unit}</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="icon" variant="ghost" onClick={() => removeItem(it.id)}><Trash2 className="h-4 w-4 text-[var(--color-destructive)]" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-green)] p-6 text-white">
            <p className="text-xs font-semibold uppercase text-white/70">Estimasi Penghematan</p>
            <p className="mt-2 text-3xl font-black">{idr(saving)}</p>
            <p className="mt-1 text-xs text-white/80">Selisih antara pasar termurah & termahal di keranjang Anda</p>
          </div>

          <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-4">
            <h3 className="mb-3 text-sm font-bold uppercase text-[var(--color-gray-500)]">Rekomendasi Pasar</h3>
            {recommendations.length === 0 ? (
              <p className="text-sm text-[var(--color-gray-500)]">Tambahkan produk untuk melihat rekomendasi.</p>
            ) : (
              <ul className="space-y-2">
                {recommendations.map((m, i) => (
                  <li key={m.id} className={`flex items-center justify-between rounded-md border p-3 ${i === 0 ? "border-[var(--color-success)] bg-[var(--color-success)]/5" : "border-[var(--color-gray-100)]"}`}>
                    <div>
                      <p className="flex items-center gap-2 font-semibold">{i === 0 && <Trophy className="h-4 w-4 text-[var(--color-success)]" />}{m.name}</p>
                      <p className="text-xs text-[var(--color-gray-500)]">{m.city}</p>
                    </div>
                    <p className={`text-lg font-black ${i === 0 ? "text-[var(--color-success)]" : ""}`}>{idr(m.total)}</p>
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
