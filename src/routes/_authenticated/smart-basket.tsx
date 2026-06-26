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
import { Plus, Trash2, Trophy, Share2, TrendingDown, Store, Split, AlertCircle, Wheat, Flame, Beef, Egg, Droplets, ShoppingBasket, Crown } from "lucide-react";
import { toast } from "sonner";
import cookingOilImg from "@/assets/cooking-oil.png";
import shallotsImg from "@/assets/shallots.png";
import { PremiumUpgradeModal } from "@/components/premium-upgrade-modal";

// Helper to match category/product name with mockup image
function getProductImage(categoryName: string, productName: string) {
  const cat = (categoryName || "").toLowerCase();
  const name = (productName || "").toLowerCase();
  if (cat.includes("minyak") || name.includes("minyak")) {
    return cookingOilImg;
  }
  if (cat.includes("bawang") || name.includes("bawang") || cat.includes("bumbu") || name.includes("bumbu")) {
    return shallotsImg;
  }
  return null;
}

// Fallback icon component for missing product images
function ProductIconFallback({ categoryName, productName }: { categoryName: string, productName: string }) {
  const cat = (categoryName || "").toLowerCase();
  const name = (productName || "").toLowerCase();
  let IconComponent = ShoppingBasket;
  let colorClass = "text-slate-400 bg-slate-100";
  
  if (cat.includes("beras") || name.includes("beras") || cat.includes("padi") || name.includes("padi")) {
    IconComponent = Wheat;
    colorClass = "text-amber-600 bg-amber-50";
  } else if (cat.includes("cabai") || name.includes("cabai") || name.includes("pedas") || cat.includes("sayur") || name.includes("sayur")) {
    IconComponent = Flame;
    colorClass = "text-red-600 bg-red-50";
  } else if (cat.includes("daging") || name.includes("daging") || cat.includes("sapi") || name.includes("sapi") || cat.includes("ayam") || name.includes("ayam")) {
    IconComponent = Beef;
    colorClass = "text-rose-700 bg-rose-50";
  } else if (cat.includes("telur") || name.includes("telur")) {
    IconComponent = Egg;
    colorClass = "text-amber-500 bg-amber-50/50";
  } else if (cat.includes("minyak") || name.includes("minyak") || cat.includes("cair") || name.includes("cair")) {
    IconComponent = Droplets;
    colorClass = "text-blue-600 bg-blue-50";
  }
  
  return (
    <div className={`w-full h-full flex items-center justify-center rounded-xl border border-border/60 ${colorClass}`}>
      <IconComponent className="h-6 w-6 stroke-[1.5]" />
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/smart-basket")({
  head: () => ({ meta: [{ title: "Smart Basket — PasarCek" }] }),
  component: SmartBasketPage,
});

function SmartBasketPage() {
  const { user, isPremium } = useAuth();
  const qc = useQueryClient();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [lockedFeatureName, setLockedFeatureName] = useState("");

  const handleOpenLock = (feature: string) => {
    setLockedFeatureName(feature);
    setUpgradeModalOpen(true);
  };

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

      // Always fetch products and markets first to ensure complete coverage
      const { data: products } = await supabase.from("products").select("id,name,category,unit").order("name");
      const { data: markets } = await supabase.from("markets").select("id,name,city").order("name");

      if (!products || !markets) return [];

      const { data } = await supabase.from("product_prices")
        .select("price,product_id,market_id,market:markets(id,name,city)")
        .eq("recorded_at", dateToUse)
        .in("product_id", productIds);
      
      const dbPrices = data ?? [];
      const dbPriceMap = new Map<string, any>();
      dbPrices.forEach((r: any) => {
        const pId = r.product_id;
        const mId = r.market_id || r.market?.id;
        if (pId && mId) {
          dbPriceMap.set(`${pId}:${mId}`, r);
        }
      });

      const activeProducts = products.filter((p) => productIds.includes(p.id));
      const benchmarkPrices = getDeterministicBenchmarkPrices(activeProducts as any[], markets as any[], dateToUse);

      const mergedPrices = benchmarkPrices.map((bp: any) => {
        const key = `${bp.product_id}:${bp.market_id}`;
        if (dbPriceMap.has(key)) {
          const dbRow = dbPriceMap.get(key);
          return {
            price: Number(dbRow.price),
            product_id: bp.product_id,
            market: dbRow.market || bp.market
          };
        }
        return {
          price: bp.price,
          product_id: bp.product_id,
          market: bp.market
        };
      });

      return mergedPrices;
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

    // Check item limit for free users (max 3 items)
    if (!isPremium && items && items.length >= 3) {
      handleOpenLock("Smart Basket Lengkap (Kapasitas > 3 Produk)");
      return;
    }

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
        title={
          <div className="flex items-center gap-2">
            <span>Smart Basket</span>
            {isPremium ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-2.5 py-0.5 text-[10px] font-black text-slate-900 shadow-md">
                <Crown className="h-3 w-3 fill-current" />
                Premium
              </span>
            ) : (
              <button
                onClick={() => handleOpenLock("Smart Basket Lengkap")}
                className="inline-flex items-center gap-1 rounded-full bg-slate-200 border border-slate-300 hover:bg-amber-500/15 hover:border-amber-500/35 hover:text-amber-600 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 transition-colors cursor-pointer"
              >
                <Crown className="h-3 w-3 text-slate-400" />
                Gratis
              </button>
            )}
          </div>
        }
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
            <div className="p-4 space-y-4">
              <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                {items.map((it: any) => {
                  const cheapestInfo = productCheapestPrices[it.product_id];
                  const price = cheapestInfo?.price;
                  const productImg = getProductImage(it.product.category, it.product.name);
                  
                  const productPrices = (pricesByMarket ?? [])
                    .filter((row: any) => row.product_id === it.product_id)
                    .sort((a: any, b: any) => Number(a.price) - Number(b.price));

                  return (
                    <div key={it.id} className="bg-white rounded-2xl border border-[var(--color-gray-100)] p-4 shadow-soft flex flex-col gap-3.5 hover:shadow-card transition-shadow">
                      {/* Product Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 shrink-0 rounded-xl bg-slate-50 border border-border/60 flex items-center justify-center overflow-hidden">
                            {productImg ? (
                              <img src={productImg} alt={it.product.name} className="w-full h-full object-contain p-0.5" />
                            ) : (
                              <ProductIconFallback categoryName={it.product.category} productName={it.product.name} />
                            )}
                          </div>
                          <div>
                            <span className="inline-block px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[8px] font-extrabold uppercase tracking-wider mb-1">
                              {it.product.category || "Umum"}
                            </span>
                            <h4 className="font-display font-bold text-xs sm:text-sm text-foreground leading-tight">{it.product.name}</h4>
                          </div>
                        </div>
                        
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors rounded-full"
                          onClick={() => removeItem(it.id)}
                        >
                          <Trash2 className="h-4 w-4 text-[var(--color-destructive)]" />
                        </Button>
                      </div>

                      {/* Quantity & Subtotal Row */}
                      <div className="flex items-center justify-between gap-2 bg-[var(--color-gray-50)] p-2.5 rounded-xl border border-[var(--color-gray-100)]">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-[var(--color-gray-500)] uppercase tracking-wider">Jumlah:</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              className="w-7 h-7 flex items-center justify-center rounded-md border border-[var(--color-gray-300)] bg-white hover:bg-[var(--color-gray-50)] text-xs font-bold transition-colors disabled:opacity-50"
                              disabled={it.quantity <= 0.1}
                              onClick={() => updateQty(it.id, Math.max(0.1, Number((it.quantity - 0.1).toFixed(1))))}
                            >
                              -
                            </button>
                            <input
                              key={it.quantity}
                              type="number"
                              min="0.1"
                              step="0.1"
                              defaultValue={it.quantity}
                              onBlur={(e) => updateQty(it.id, Number(e.target.value))}
                              className="w-12 h-7 text-center text-xs font-semibold rounded-md border border-[var(--color-gray-300)] bg-white"
                            />
                            <button
                              type="button"
                              className="w-7 h-7 flex items-center justify-center rounded-md border border-[var(--color-gray-300)] bg-white hover:bg-[var(--color-gray-50)] text-xs font-bold transition-colors"
                              onClick={() => updateQty(it.id, Number((it.quantity + 0.1).toFixed(1)))}
                            >
                              +
                            </button>
                            <span className="text-xs text-[var(--color-gray-500)] font-medium">{it.unit}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[8px] font-bold text-[var(--color-gray-500)] uppercase tracking-wider">Subtotal:</div>
                          <div className="font-extrabold text-sm text-[var(--color-ink)]">
                            {price ? idr(price * it.quantity) : "—"}
                          </div>
                        </div>
                      </div>

                      {/* Price Comparison */}
                      <div className="border-t border-border/60 pt-3 space-y-2">
                        <div className="text-[9px] font-bold text-[var(--color-gray-500)] uppercase tracking-wider">Bandingkan Pasar:</div>
                        
                        {productPrices.length === 0 ? (
                          <div className="text-[10px] text-[var(--color-gray-500)] italic py-1">Tidak ada data harga hari ini</div>
                        ) : (
                          productPrices.map((row: any, idx: number) => {
                            const isCheapest = idx === 0;
                            const totalMarketPrice = Number(row.price) * it.quantity;
                            
                            if (isCheapest) {
                              return (
                                <div key={row.market.id} className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-accent/5 border border-accent/10 text-foreground">
                                  <div className="flex flex-col">
                                    <span className="font-medium text-foreground/80">{row.market.name}</span>
                                    <span className="text-[8px] text-[var(--color-gray-500)]">{row.market.city}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <div className="flex flex-col items-end">
                                      <span className="font-bold text-primary">{idr(Number(row.price))}</span>
                                      <span className="text-[9px] text-[var(--color-gray-500)] font-medium">Total: {idr(totalMarketPrice)}</span>
                                    </div>
                                    <span className="text-[8px] font-extrabold bg-accent text-white px-1.5 py-0.5 rounded uppercase tracking-wider">
                                      Termurah
                                    </span>
                                  </div>
                                </div>
                              );
                            }
                            
                            // Blur comparison for non-premium
                            if (!isPremium) {
                              return (
                                <div key={row.market.id} className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-slate-50/50 border border-slate-100/30 text-foreground/45 relative overflow-hidden select-none">
                                  <div className="flex flex-col blur-[1.5px]">
                                    <span>{row.market.name}</span>
                                    <span className="text-[8px]">{row.market.city}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <div className="flex flex-col items-end blur-[1.5px]">
                                      <span className="font-bold">{idr(Number(row.price))}</span>
                                      <span className="text-[9px] font-medium">Total: {idr(totalMarketPrice)}</span>
                                    </div>
                                    <span className="text-[8px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 px-1.5 py-0.5 rounded flex items-center gap-0.5 pointer-events-auto cursor-pointer" onClick={() => handleOpenLock("Smart Basket Lengkap (Detail Pasar)")}>
                                      <Crown className="h-2.5 w-2.5 fill-current" /> Lock
                                    </span>
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <div key={row.market.id} className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-transparent text-foreground/80">
                                <div className="flex flex-col">
                                  <span>{row.market.name}</span>
                                  <span className="text-[8px] text-[var(--color-gray-400)]">{row.market.city}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="font-bold text-foreground">{idr(Number(row.price))}</span>
                                  <span className="text-[9px] text-[var(--color-gray-400)] font-medium">Total: {idr(totalMarketPrice)}</span>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Belanja Terendah Box */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-[var(--color-gray-50)] p-4 border-2 border-dashed border-[var(--color-gray-200)]">
                <div>
                  <h4 className="font-bold text-sm text-[var(--color-gray-700)]">Total Belanja Terendah (Campuran Pasar)</h4>
                  <p className="text-[10px] text-[var(--color-gray-500)]">Kombinasi harga termurah untuk setiap produk dari berbagai pasar.</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-[var(--color-brand-blue)]">
                    {idr(crossMarketTotal)}
                  </span>
                </div>
              </div>
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
                <div className="relative rounded-md bg-[var(--color-brand-green)]/[0.03] p-3 border border-[var(--color-brand-green)]/15 overflow-hidden">
                  {!isPremium && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-xs p-3 text-center">
                      <span className="text-[8px] font-extrabold bg-amber-500 text-slate-900 px-1.5 py-0.5 rounded uppercase tracking-wider mb-1 flex items-center gap-0.5">
                        <Crown className="h-2.5 w-2.5 fill-current" /> PREMIUM
                      </span>
                      <p className="text-[9px] text-[var(--color-gray-700)] font-bold">Taktik B: Lintas Pasar Terkunci</p>
                      <button onClick={() => handleOpenLock("Smart Basket Lengkap (Taktik Multi-Pasar)")} className="mt-1 text-[9px] text-[var(--color-brand-blue)] font-extrabold underline hover:text-[var(--color-brand-green)]">
                        Buka Sekarang
                      </button>
                    </div>
                  )}
                  <div className={!isPremium ? "blur-[1.5px] opacity-35 select-none pointer-events-none" : ""}>
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
      <PremiumUpgradeModal
        isOpen={upgradeModalOpen}
        onOpenChange={setUpgradeModalOpen}
        featureName={lockedFeatureName}
      />
    </AppShell>
  );
}
