import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, EmptyState } from "@/components/app-shell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { idr } from "@/lib/format";
import { getDeterministicBenchmarkPrices } from "@/lib/benchmark";
import { Plus, Trash2, Trophy, Share2, Store, ShoppingBasket, ListChecks, MapPin, Compass, Navigation, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import cookingOilImg from "@/assets/cooking-oil.png";
import shallotsImg from "@/assets/shallots.png";
import { Wheat, Flame, Beef, Egg, Droplets } from "lucide-react";

// Haversine distance calculator
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

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

export const Route = createFileRoute("/_authenticated/wishlist")({
  head: () => ({ meta: [{ title: "Daftar Belanja Pintar — PasarCek" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  
  const [newProduct, setNewProduct] = useState<string>("");
  const [qty, setQty] = useState<string>("1");
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);

  // Request user geolocation
  const requestLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation tidak didukung oleh browser Anda.");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationLoading(false);
        setLocationDenied(false);
        toast.success("Lokasi berhasil didapatkan!");
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        setLocationLoading(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationDenied(true);
          toast.error("Izin akses lokasi ditolak. Silakan berikan izin di browser Anda.");
        } else {
          toast.error("Gagal mendapatkan lokasi: " + error.message);
        }
      }
    );
  };

  // Automatically request location if support exists and was previously accepted
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          requestLocation();
        }
      });
    }
  }, []);

  const { data: wishlistBasket } = useQuery({
    queryKey: ["wishlist-basket", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data: existing } = await supabase
        .from("smart_baskets")
        .select("*")
        .eq("user_id", user!.id)
        .eq("name", "Daftar Belanja Pintar")
        .maybeSingle();
      if (existing) return existing;
      const { data: created } = await supabase
        .from("smart_baskets")
        .insert({ user_id: user!.id, name: "Daftar Belanja Pintar" })
        .select()
        .single();
      return created!;
    },
  });

  const { data: items } = useQuery({
    queryKey: ["wishlist-items", wishlistBasket?.id],
    enabled: !!wishlistBasket?.id,
    queryFn: async () => (await supabase
      .from("basket_items")
      .select("*, product:products(id,name,unit,category)")
      .eq("basket_id", wishlistBasket!.id)
      .order("created_at", { ascending: true })).data ?? [],
  });

  const { data: products } = useQuery({
    queryKey: ["products-list-wishlist"],
    queryFn: async () => (await supabase.from("products").select("id,name,unit").order("name")).data ?? [],
  });

  const { data: pricesByMarket } = useQuery({
    queryKey: ["wishlist-prices", items?.map((i: any) => i.product_id).sort().join(",")],
    enabled: !!items && items.length > 0,
    queryFn: async () => {
      const today = new Date().toLocaleDateString('en-CA');
      const productIds = items!.map((i: any) => i.product_id);
      
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

      const { data: productsList } = await supabase.from("products").select("id,name,category,unit").order("name");
      const { data: marketsList } = await supabase.from("markets").select("id,name,city,lat,lng,address,hours").order("name");

      if (!productsList || !marketsList) return [];

      const { data } = await supabase.from("product_prices")
        .select("price,product_id,market_id,market:markets(id,name,city,lat,lng,address,hours)")
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

      const activeProducts = productsList.filter((p) => productIds.includes(p.id));
      const benchmarkPrices = getDeterministicBenchmarkPrices(activeProducts as any[], marketsList as any[], dateToUse);

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

  const recommendations = useMemo(() => {
    if (!items || !pricesByMarket) return [];
    
    const marketsMap = new Map<string, { id: string; name: string; city: string; address: string; lat: number; lng: number; total: number; covered: number }>();
    
    for (const row of pricesByMarket as any[]) {
      const item = items.find((i: any) => i.product_id === row.product_id);
      if (!item) continue;
      
      const marketId = row.market.id;
      const m = marketsMap.get(marketId) ?? { 
        id: row.market.id, 
        name: row.market.name, 
        city: row.market.city, 
        address: row.market.address || "",
        lat: Number(row.market.lat) || 0,
        lng: Number(row.market.lng) || 0,
        total: 0, 
        covered: 0 
      };
      
      m.total += Number(row.price) * Number(item.quantity);
      m.covered += 1;
      marketsMap.set(marketId, m);
    }
    
    let list = Array.from(marketsMap.values()).filter((m) => m.covered === items.length);
    
    if (userCoords) {
      list = list.map(m => {
        if (m.lat && m.lng) {
          const dist = getDistance(userCoords.lat, userCoords.lng, m.lat, m.lng);
          return { ...m, distance: dist };
        }
        return { ...m, distance: Infinity };
      });
    }
    
    return list.sort((a, b) => a.total - b.total);
  }, [items, pricesByMarket, userCoords]);

  const cheapestMarket = recommendations[0];
  const priciestMarket = recommendations[recommendations.length - 1];
  const maxSavings = cheapestMarket && priciestMarket ? priciestMarket.total - cheapestMarket.total : 0;

  const nearestMarket = useMemo(() => {
    if (!userCoords || recommendations.length === 0) return null;
    let minDistance = Infinity;
    let nearest = null;
    for (const m of recommendations) {
      if (m.distance !== undefined && m.distance < minDistance) {
        minDistance = m.distance;
        nearest = m;
      }
    }
    return nearest;
  }, [recommendations, userCoords]);

  async function addItem() {
    if (!newProduct || !wishlistBasket) return;
    
    const p = (products as any[]).find((x) => x.id === newProduct);
    const existing = (items ?? []).find((x: any) => x.product_id === newProduct);
    
    if (existing) {
      await updateQty(existing.id, existing.quantity + (Number(qty) || 1));
      toast.success(`Jumlah ${p?.name} diperbarui.`);
      setNewProduct(""); setQty("1");
      return;
    }

    const { error } = await supabase.from("basket_items").insert({
      basket_id: wishlistBasket.id,
      product_id: newProduct,
      unit: p?.unit ?? "kg",
      quantity: Number(qty) || 1
    });

    if (error) return toast.error(error.message);
    setNewProduct(""); setQty("1");
    qc.invalidateQueries({ queryKey: ["wishlist-items"] });
    qc.invalidateQueries({ queryKey: ["wishlist-prices"] });
    toast.success("Produk ditambahkan ke Daftar Belanja.");
  }

  async function removeItem(id: string) {
    await supabase.from("basket_items").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["wishlist-items"] });
    qc.invalidateQueries({ queryKey: ["wishlist-prices"] });
    toast.success("Produk dihapus.");
  }

  async function updateQty(id: string, q: number) {
    await supabase.from("basket_items").update({ quantity: q }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["wishlist-items"] });
    qc.invalidateQueries({ queryKey: ["wishlist-prices"] });
  }

  return (
    <AppShell>
      <PageHeader
        title={
          <div className="flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-[var(--color-brand-blue)]" />
            <span>Daftar Belanja Pintar</span>
          </div>
        }
        description="Rencanakan kebutuhan sembako Anda, bandingkan harga di seluruh pasar, dan gunakan lokasi untuk menemukan opsi terbaik."
        action={
          <Button variant="outline" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link disalin"); }}>
            <Share2 className="h-4 w-4" /> Bagikan
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Left Side: Wishlist Items */}
        <div className="rounded-lg border border-[var(--color-gray-100)] bg-white">
          <div className="border-b border-[var(--color-gray-100)] p-4">
            <div className="grid gap-2 sm:grid-cols-[1fr_120px_auto]">
              <Select value={newProduct} onValueChange={setNewProduct}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Pilih produk untuk ditambahkan..." />
                </SelectTrigger>
                <SelectContent className="bg-white border">
                  {(products ?? []).map((p: any) => (
                    <SelectItem key={p.id} value={p.id}>{p.name} ({p.unit})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input type="number" min="0.1" step="0.1" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="Jumlah" className="h-10" />
              <Button onClick={addItem} disabled={!newProduct} className="h-10">
                <Plus className="h-4 w-4 mr-1" /> Tambah
              </Button>
            </div>
          </div>

          {(!items || items.length === 0) ? (
            <EmptyState
              title="Daftar Belanja Masih Kosong"
              description="Tambahkan produk di atas or dari halaman Harga Hari Ini untuk memantau estimasi belanja Anda."
              action={
                <Button asChild>
                  <Link to="/prices">Cari Produk di Katalog</Link>
                </Button>
              }
            />
          ) : (
            <div className="p-4 space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
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
                          <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-50 border border-border/60 flex items-center justify-center overflow-hidden">
                            {productImg ? (
                              <img src={productImg} alt={it.product.name} className="w-full h-full object-contain p-0.5" />
                            ) : (
                              <ProductIconFallback categoryName={it.product.category} productName={it.product.name} />
                            )}
                          </div>
                          <div>
                            <span className="inline-block px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[8px] font-extrabold uppercase tracking-wider mb-0.5">
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

                      {/* Quantity Modifier */}
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

                      {/* Top 2 Markets Prices for this product */}
                      <div className="border-t border-border/60 pt-3 space-y-1.5">
                        <div className="text-[9px] font-bold text-[var(--color-gray-500)] uppercase tracking-wider">Perbandingan Pasar:</div>
                        {productPrices.slice(0, 2).map((row: any, idx: number) => (
                          <div key={row.market.id} className="flex justify-between items-center text-xs py-1">
                            <div className="flex flex-col">
                              <span className="font-medium text-foreground/80">{row.market.name}</span>
                              <span className="text-[8px] text-[var(--color-gray-500)]">{row.market.city}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="text-right">
                                <span className="font-bold">{idr(Number(row.price))}</span>
                                <span className="text-[9px] text-[var(--color-gray-500)] block">Total: {idr(Number(row.price) * it.quantity)}</span>
                              </div>
                              {idx === 0 && (
                                <span className="text-[8px] font-extrabold bg-[var(--color-success)]/10 text-[var(--color-success)] px-1.5 py-0.5 rounded border border-[var(--color-success)]/20 uppercase tracking-wider">
                                  Termurah
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Belanja Terendah Box */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-[var(--color-gray-50)] p-4 border-2 border-dashed border-[var(--color-gray-200)]">
                <div>
                  <h4 className="font-bold text-sm text-[var(--color-gray-700)]">Total Belanja Terendah (Kombinasi Pasar)</h4>
                  <p className="text-[10px] text-[var(--color-gray-500)]">Total biaya jika Anda membeli setiap barang di pasar termurahnya masing-masing.</p>
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

        {/* Right Side: Geolocation & Market Recommendations */}
        <div className="space-y-4">
          {/* Geolocation Card */}
          <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-4 shadow-soft">
            <h3 className="mb-2 text-sm font-bold uppercase text-[var(--color-gray-500)] flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-[var(--color-brand-blue)]" />
              Integrasi Lokasi Terdekat
            </h3>
            {userCoords ? (
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2 text-xs text-[var(--color-brand-green)] bg-[var(--color-success)]/5 border border-[var(--color-success)]/20 rounded-lg p-2.5">
                  <Navigation className="h-4 w-4 shrink-0 fill-current animate-pulse" />
                  <div>
                    <p className="font-bold">Akses Lokasi Aktif</p>
                    <p className="text-[10px] text-[var(--color-gray-500)] font-normal">Koordinat: {userCoords.lat.toFixed(4)}, {userCoords.lng.toFixed(4)}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={requestLocation} disabled={locationLoading} className="w-full text-xs">
                  Perbarui Lokasi
                </Button>
              </div>
            ) : (
              <div className="space-y-3 mt-2">
                <p className="text-xs text-[var(--color-gray-500)] leading-relaxed">
                  Aktifkan GPS Anda untuk secara otomatis menghitung jarak ke setiap pasar tradisional di Jakarta.
                </p>
                <Button onClick={requestLocation} disabled={locationLoading} className="w-full text-xs h-9">
                  {locationLoading ? "Mendapatkan Koordinat..." : "Gunakan Lokasi Saya"}
                </Button>
                {locationDenied && (
                  <p className="text-[10px] text-red-500 text-center">
                    Izin lokasi ditolak. Silakan aktifkan izin lokasi browser untuk fitur ini.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Savings Estimator */}
          {items && items.length > 0 && (
            <div className="rounded-lg bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-green)] p-6 text-white shadow-soft">
              <p className="text-xs font-semibold uppercase text-white/70">Potensi Hemat Belanja Pintar</p>
              <p className="mt-2 text-3xl font-black">{idr(maxSavings)}</p>
              <p className="mt-1 text-xs text-white/80">Selisih antara pasar termahal & termurah untuk seluruh barang Anda.</p>
            </div>
          )}

          {/* Recommendations list */}
          <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-4 shadow-soft">
            <h3 className="mb-3.5 text-sm font-bold uppercase text-[var(--color-gray-500)] flex items-center gap-1.5 border-b border-[var(--color-gray-100)] pb-2">
              <Store className="h-4 w-4 text-[var(--color-brand-blue)]" />
              Rekomendasi Pasar
            </h3>

            {recommendations.length === 0 ? (
              <p className="text-xs text-[var(--color-gray-500)] italic">
                {items && items.length > 0
                  ? "Tidak ada satu pun pasar yang memiliki data harga lengkap untuk seluruh produk di daftar Anda hari ini."
                  : "Masukkan produk untuk melihat rekomendasi pasar terhemat."}
              </p>
            ) : (
              <div className="space-y-3">
                {recommendations.map((m, idx) => {
                  const isCheapest = idx === 0;
                  const isNearest = nearestMarket && nearestMarket.id === m.id;
                  
                  return (
                    <div
                      key={m.id}
                      className={`rounded-xl border p-3.5 transition-all flex flex-col gap-2.5 ${
                        isCheapest
                          ? "border-[var(--color-success)] bg-[var(--color-success)]/5"
                          : "border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]/50"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-xs sm:text-sm text-[var(--color-ink)] flex items-center gap-1">
                              {isCheapest && <Trophy className="h-4 w-4 text-[var(--color-success)] shrink-0" />}
                              {m.name}
                            </span>
                            {isCheapest && (
                              <span className="text-[8px] font-black uppercase tracking-wider bg-[var(--color-success)] text-white px-1.5 py-0.5 rounded shadow-xs">
                                Termurah
                              </span>
                            )}
                            {isNearest && (
                              <span className="text-[8px] font-black uppercase tracking-wider bg-blue-500 text-white px-1.5 py-0.5 rounded shadow-xs">
                                Terdekat
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-[var(--color-gray-500)] font-medium mt-0.5 flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-[var(--color-gray-400)] shrink-0" />
                            {m.address}, {m.city}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className={`text-sm sm:text-base font-black ${isCheapest ? "text-[var(--color-success)]" : "text-[var(--color-ink)]"}`}>
                            {idr(m.total)}
                          </span>
                          {m.distance !== undefined && m.distance !== Infinity && (
                            <span className="block text-[10px] text-[var(--color-brand-blue)] font-bold mt-0.5">
                              {m.distance.toFixed(1)} km
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-border/40 pt-2 text-[10px]">
                        <span className="text-[var(--color-gray-500)] font-medium">
                          {m.covered} dari {items.length} produk tersedia
                        </span>
                        <Link
                          to={`/markets/${m.id}`}
                          className="font-extrabold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-green)] flex items-center gap-0.5 transition-colors"
                        >
                          Rute & Detail Peta <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
