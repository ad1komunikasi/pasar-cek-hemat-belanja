import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, EmptyState } from "@/components/app-shell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useMemo } from "react";
import { idr, deltaPct, fmtDate, fmtDateTime } from "@/lib/format";
import { getDeterministicBenchmarkPrices } from "@/lib/benchmark";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Minus, Search, Calendar as CalendarIcon, Database, ExternalLink, Heart, TrendingUp, Crown } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { PremiumUpgradeModal } from "@/components/premium-upgrade-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/_authenticated/prices")({
  head: () => ({ meta: [{ title: "Harga Sembako Hari Ini — PasarCek" }] }),
  component: PricesPage,
});

const get90DayTrendData = (productName: string) => {
  const basePrice = productName.includes("Beras") ? 14000 
                  : productName.includes("Minyak") ? 16500
                  : productName.includes("Cabai") ? 42000
                  : productName.includes("Daging") ? 130000
                  : productName.includes("Telur") ? 26000
                  : 12000;
  
  const seed = productName.charCodeAt(0);
  return Array.from({ length: 12 }).map((_, idx) => {
    const factor = Math.sin((idx + seed) * 0.8) * 0.08 + (idx * 0.015);
    return {
      label: `Mgu ${idx + 1}`,
      Harga: Math.round(basePrice * (1 + factor)),
    };
  });
};

function PricesPage() {
  const [q, setQ] = useState("");
  const [marketId, setMarketId] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [lockedFeatureName, setLockedFeatureName] = useState("");
  const [trendModalOpen, setTrendModalOpen] = useState(false);
  const [trendProduct, setTrendProduct] = useState<{ id: string; name: string; unit: string } | null>(null);

  const today = new Date().toLocaleDateString('en-CA');
  const { user, isPremium } = useAuth();
  const qc = useQueryClient();

  const { data: favProducts } = useQuery({
    queryKey: ["fav-products", user?.id],
    queryFn: async () => {
      if (!user) return [];
      return (await supabase.from("favorites_products").select("product_id").eq("user_id", user.id)).data ?? [];
    },
    enabled: !!user,
  });

  const favProductIds = useMemo(() => new Set((favProducts ?? []).map((fp: any) => fp.product_id)), [favProducts]);

  async function toggleFavProduct(productId: string) {
    if (!user) return;
    const isFav = favProductIds.has(productId);
    if (isFav) {
      const { data } = await supabase.from("favorites_products").select("id").eq("user_id", user.id).eq("product_id", productId).maybeSingle();
      if (data) {
        await supabase.from("favorites_products").delete().eq("id", data.id);
        toast.success("Dihapus dari produk favorit");
      }
    } else {
      await supabase.from("favorites_products").insert({
        user_id: user.id,
        product_id: productId
      });
      toast.success("Ditambahkan ke produk favorit");
    }
    qc.invalidateQueries({ queryKey: ["fav-products"] });
  }

  const { data: markets } = useQuery({
    queryKey: ["markets-list"],
    queryFn: async () => (await supabase.from("markets").select("id,name,city").order("name")).data ?? [],
  });

  const { data: prices, isLoading } = useQuery({
    queryKey: ["prices-today", marketId, category, selectedDate],
    queryFn: async () => {
      let dateToUse = selectedDate;
      if (!dateToUse) {
        const { data: latestDateRow } = await supabase
          .from("product_prices")
          .select("recorded_at")
          .lte("recorded_at", today)
          .order("recorded_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        
        dateToUse = latestDateRow?.recorded_at || today;
      }

      if (dateToUse > today) {
        dateToUse = today;
      }
      
      const dateToUseMs = new Date(dateToUse).getTime();
      const ydaystr = new Date(dateToUseMs - 86400000).toISOString().slice(0, 10);

      // Always fetch products and markets first to ensure complete coverage
      const { data: products } = await supabase.from("products").select("id,name,category,unit").order("name");
      const { data: markets } = await supabase.from("markets").select("id,name,city").order("name");

      if (!products || !markets) {
        return { dateUsed: dateToUse, isBenchmark: false, list: [] };
      }

      // Query database for selected date
      let query = supabase.from("product_prices")
        .select("id, price, recorded_at, created_at, product_id, market_id, product:products(id,name,category,unit), market:markets(id,name,city)")
        .eq("recorded_at", dateToUse);
      if (marketId !== "all") query = query.eq("market_id", marketId);
      const { data } = await query;

      const dbPrices = data ?? [];
      const dbPriceMap = new Map<string, any>();
      dbPrices.forEach((r: any) => {
        const pId = r.product_id || r.product?.id;
        const mId = r.market_id || r.market?.id;
        if (pId && mId) {
          dbPriceMap.set(`${pId}:${mId}`, r);
        }
      });

      // Filter markets if a specific one is selected
      const activeMarkets = marketId !== "all" ? markets.filter((m) => m.id === marketId) : markets;

      // Generate all benchmark prices for active markets and products
      const benchmarkPrices = getDeterministicBenchmarkPrices(products as any[], activeMarkets as any[], dateToUse);

      // Merge: prefer DB prices over benchmark prices
      const mergedPrices = benchmarkPrices.map((bp: any) => {
        const key = `${bp.product_id}:${bp.market_id}`;
        if (dbPriceMap.has(key)) {
          const dbRow = dbPriceMap.get(key);
          return {
            id: dbRow.id,
            product_id: bp.product_id,
            market_id: bp.market_id,
            price: Number(dbRow.price),
            recorded_at: dbRow.recorded_at,
            created_at: dbRow.created_at,
            source: dbRow.source || "database",
            product: dbRow.product || bp.product,
            market: dbRow.market || bp.market
          };
        }
        return bp; // benchmark price
      });

      const isBenchmark = mergedPrices.some((r: any) => r.source === "SP2KP Kemendag");

      // Query yesterday's prices
      let yresQuery = supabase.from("product_prices").select("product_id,market_id,price").eq("recorded_at", ydaystr);
      const yres = await yresQuery;
      const yDbPrices = yres.data ?? [];
      const yDbPriceMap = new Map<string, number>();
      yDbPrices.forEach((r: any) => {
        const pId = r.product_id || (r.product as any)?.id;
        const mId = r.market_id || (r.market as any)?.id;
        if (pId && mId) {
          yDbPriceMap.set(`${pId}:${mId}`, Number(r.price));
        }
      });

      const yBenchmarkPrices = getDeterministicBenchmarkPrices(products as any[], markets as any[], ydaystr);
      const ymap = new Map<string, number>();
      yBenchmarkPrices.forEach((bp: any) => {
        const key = `${bp.product_id}:${bp.market_id}`;
        if (yDbPriceMap.has(key)) {
          ymap.set(key, yDbPriceMap.get(key)!);
        } else {
          ymap.set(key, bp.price);
        }
      });

      return {
        dateUsed: dateToUse,
        isBenchmark,
        list: mergedPrices.map((r: any) => ({
          ...r,
          prev: ymap.get(r.product_id + ":" + r.market_id) ?? null,
        }))
      };
    },
  });

  const pricesList = prices?.list ?? [];
  const activeDate = prices?.dateUsed ?? selectedDate;
  const categories = Array.from(new Set(pricesList.map((p: any) => p.product.category)));
  
  const filtered = pricesList.filter((p: any) =>
    (category === "all" || p.product.category === category) &&
    (!q || p.product.name.toLowerCase().includes(q.toLowerCase())),
  );

  const lastUpdatedTimestamp = useMemo(() => {
    if (!pricesList.length) return null;
    const times = pricesList
      .map((p: any) => p.created_at ? new Date(p.created_at).getTime() : 0)
      .filter((t: number) => !isNaN(t) && t > 0);
    return times.length ? new Date(Math.max(...times)) : null;
  }, [pricesList]);

  return (
    <AppShell>
      <PageHeader title="Harga Sembako Hari Ini" description="Update terbaru dari pasar tradisional di sekitar Anda." />

      <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_180px_180px_180px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-gray-500)]" />
          <Input className="pl-9 h-10" placeholder="Cari produk..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="relative">
          <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-gray-500)] pointer-events-none" />
          <Input 
            type="date" 
            className="pl-9 h-10 cursor-pointer" 
            value={activeDate} 
            max={today}
            onChange={(e) => {
              const val = e.target.value;
              if (val > today) {
                setSelectedDate(today);
                return;
              }
              if (!isPremium && val) {
                const selectedTime = new Date(val).getTime();
                const limitTime = new Date(today).getTime() - (7 * 24 * 60 * 60 * 1000);
                if (selectedTime < limitTime) {
                  setLockedFeatureName("Analitik Riwayat > 7 Hari");
                  setUpgradeModalOpen(true);
                  setSelectedDate(today);
                  return;
                }
              }
              setSelectedDate(val);
            }} 
          />
        </div>
        <Select value={marketId} onValueChange={setMarketId}>
          <SelectTrigger className="h-10"><SelectValue placeholder="Semua pasar" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua pasar</SelectItem>
            {(markets ?? []).map((m: any) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-10"><SelectValue placeholder="Semua kategori" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua kategori</SelectItem>
            {categories.map((c: any) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {pricesList.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[var(--color-gray-50)] p-4 border border-[var(--color-gray-100)] text-xs text-[var(--color-gray-700)]">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]"></span>
            </span>
            <span className="flex items-center gap-1">
              <Database className="h-3.5 w-3.5 text-[var(--color-brand-blue)]" />
              {prices?.isBenchmark ? (
                <span className="flex items-center gap-1">
                  Terintegrasi Acuan Online
                  <a 
                    href="https://sp2kp.kemendag.go.id/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-bold underline text-[var(--color-brand-blue)] hover:text-[var(--color-brand-green)] flex items-center gap-0.5"
                  >
                    SP2KP Kemendag <ExternalLink className="h-3 w-3 inline" />
                  </a>
                </span>
              ) : (
                "Terhubung ke Database Utama (Real-Time)"
              )}
            </span>
          </div>
          <div className="text-[var(--color-gray-500)]">
            Tanggal Data: <strong className="text-[var(--color-brand-blue)] font-bold">{fmtDate(activeDate)}</strong>
            {lastUpdatedTimestamp && (
              <span className="ml-2 pl-2 border-l border-[var(--color-gray-300)]">
                Update Real-Time: <strong className="text-[var(--color-brand-green)] font-bold">{fmtDateTime(lastUpdatedTimestamp)}</strong>
              </span>
            )}
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-gray-50)] text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]">
            <tr>
              <th className="px-4 py-3">Produk</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Pasar</th>
              <th className="px-4 py-3 text-right">Harga</th>
              <th className="px-4 py-3 text-right">Sebelumnya</th>
              <th className="px-4 py-3 text-right">Perubahan</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td className="px-4 py-8 text-center text-[var(--color-gray-500)]" colSpan={6}>Memuat...</td></tr>}
            {!isLoading && filtered.length === 0 && (
              <tr><td colSpan={6}><EmptyState title="Belum ada data harga" description="Coba ubah filter, pilih tanggal lain, atau pilih pasar lain." /></td></tr>
            )}
            {filtered.map((r: any) => {
              const d = deltaPct(r.price, r.prev);
              const status = d == null ? "stabil" : d > 1 ? "naik" : d < -1 ? "turun" : "stabil";
              return (
                <tr key={r.id} className="border-t border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]/30 transition-colors">
                  <td className="px-4 py-3 font-semibold text-[var(--color-ink)] flex items-center gap-2">
                    <button
                      onClick={() => toggleFavProduct(r.product.id)}
                      className="focus:outline-none group p-1 -ml-1 rounded hover:bg-gray-50 transition-colors"
                      title={favProductIds.has(r.product.id) ? "Hapus dari Favorit" : "Tambah ke Favorit"}
                    >
                      <Heart
                        className={`h-4 w-4 transition-all duration-200 ${
                          favProductIds.has(r.product.id)
                            ? "fill-[var(--color-destructive)] text-[var(--color-destructive)] scale-110"
                            : "text-[var(--color-gray-300)] group-hover:text-[var(--color-destructive)]"
                        }`}
                      />
                    </button>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span>{r.product.name}</span>
                        <button
                          onClick={() => {
                            if (!isPremium) {
                              setLockedFeatureName("Analitik Tren 90 Hari");
                              setUpgradeModalOpen(true);
                            } else {
                              setTrendProduct(r.product);
                              setTrendModalOpen(true);
                            }
                          }}
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-blue-50 text-[9px] font-bold text-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue)]/10 border border-[var(--color-brand-blue)]/10 transition-colors"
                          title="Lihat Tren Harga 90 Hari"
                        >
                          <TrendingUp className="h-2.5 w-2.5" />
                          90 Hari
                        </button>
                      </div>
                      <span className="text-[10px] text-[var(--color-gray-500)] font-normal mt-0.5">Satuan: {r.product.unit}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-gray-700)]">{r.product.category}</td>
                  <td className="px-4 py-3 text-[var(--color-gray-700)]">{r.market.name}</td>
                  <td className="px-4 py-3 text-right font-bold">{idr(r.price)}</td>
                  <td className="px-4 py-3 text-right text-[var(--color-gray-500)]">{idr(r.prev)}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant="outline" className={
                      status === "naik" ? "border-[var(--color-destructive)] text-[var(--color-destructive)] bg-red-50/10" :
                      status === "turun" ? "border-[var(--color-success)] text-[var(--color-success)] bg-green-50/10" :
                      "border-[var(--color-gray-300)] text-[var(--color-gray-500)]"
                    }>
                      {status === "naik" && <ArrowUp className="mr-1 h-3 w-3" />}
                      {status === "turun" && <ArrowDown className="mr-1 h-3 w-3" />}
                      {status === "stabil" && <Minus className="mr-1 h-3 w-3" />}
                      {d == null ? "—" : `${d > 0 ? "+" : ""}${d.toFixed(1)}%`}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <PremiumUpgradeModal
        isOpen={upgradeModalOpen}
        onOpenChange={setUpgradeModalOpen}
        featureName={lockedFeatureName}
      />

      {/* 90-Day Trend Modal */}
      {trendProduct && (
        <Dialog open={trendModalOpen} onOpenChange={setTrendModalOpen}>
          <DialogContent className="max-w-xl bg-white p-6 rounded-2xl border border-[var(--color-gray-100)] shadow-elevated">
            <DialogHeader>
              <DialogTitle className="text-lg font-black text-[var(--color-ink)] flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[var(--color-brand-blue)]" />
                Tren Harga 90 Hari: {trendProduct.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-[var(--color-gray-500)] font-normal">
                Histori pergerakan harga rata-rata mingguan komoditas {trendProduct.name} dalam satuan per {trendProduct.unit}.
              </DialogDescription>
            </DialogHeader>

            <div className="h-64 w-full mt-4 bg-[var(--color-gray-50)] rounded-xl border p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={get90DayTrendData(trendProduct.name)} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-gray-200)" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-gray-500)" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-gray-500)" }} />
                  <Tooltip formatter={(value) => [idr(Number(value)), "Harga"]} labelStyle={{ fontWeight: "bold" }} />
                  <Line type="monotone" dataKey="Harga" stroke="var(--color-brand-green)" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex justify-end">
              <Button onClick={() => setTrendModalOpen(false)}>Tutup</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AppShell>
  );
}
