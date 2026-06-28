import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, StatCard, Section } from "@/components/app-shell";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  TrendingUp,
  MapPin,
  ShoppingBasket,
  Bell,
  Scale,
  Search,
  Crown,
  Sparkles,
  Plus,
  Trash2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  ListChecks,
} from "lucide-react";
import celenganAyam from "@/assets/celengan-ayam.png";
import { Button } from "@/components/ui/button";
import { idr } from "@/lib/format";
import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { PremiumUpgradeModal } from "@/components/premium-upgrade-modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — PasarCek" }] }),
  component: DashboardPage,
});

type PriceAlert = {
  id: string;
  productId: string;
  productName: string;
  marketId: string;
  marketName: string;
  condition: "<=" | ">=";
  targetPrice: number;
  status: "active" | "triggered";
  createdAt: string;
};

const mockSavingsData = [
  { week: "Mgu 1", savings: 32000 },
  { week: "Mgu 2", savings: 45000 },
  { week: "Mgu 3", savings: 38000 },
  { week: "Mgu 4", savings: 52000 },
  { week: "Mgu 5", savings: 48000 },
  { week: "Mgu 6", savings: 61000 },
  { week: "Mgu 7", savings: 55000 },
  { week: "Mgu 8", savings: 72000 },
  { week: "Mgu 9", savings: 68000 },
  { week: "Mgu 10", savings: 85000 },
  { week: "Mgu 11", savings: 79000 },
  { week: "Mgu 12", savings: 94000 },
];

const aiForecastData: Record<
  string,
  { trend: string; isUp: boolean; current: number; forecast: number[]; recommendation: string }
> = {
  beras: {
    trend: "Naik 📈 (Diprediksi Naik)",
    isUp: true,
    current: 14500,
    forecast: [14500, 14600, 14750, 14800, 14950, 15100, 15200],
    recommendation:
      "Tren harga beras sedang merangkak naik karena musim kemarau basah yang menghambat panen raya. Disarankan untuk menyetok persediaan rumah tangga Anda sekarang sebelum harga melonjak lebih tinggi minggu depan.",
  },
  minyak: {
    trend: "Turun 📉 (Diprediksi Turun)",
    isUp: false,
    current: 17200,
    forecast: [17200, 17100, 16900, 16800, 16650, 16500, 16400],
    recommendation:
      "Minyak goreng curah dan kemasan diprediksi akan mengalami penurunan harga menyusul peningkatan pasokan kelapa sawit dalam negeri. Tunda pembelian dalam jumlah besar sampai akhir pekan untuk menghemat anggaran.",
  },
  cabai: {
    trend: "Stabil ➖ (Diprediksi Stabil)",
    isUp: false,
    current: 45000,
    forecast: [45000, 45200, 44900, 44800, 45100, 45000, 45000],
    recommendation:
      "Harga cabai rawit merah terpantau stabil di kisaran Rp 45.000/kg karena pasokan dari daerah produsen masih mengimbangi permintaan pasar. Cukup beli sesuai kebutuhan harian Anda.",
  },
  daging: {
    trend: "Naik Tajam 📈 (Diprediksi Naik)",
    isUp: true,
    current: 135000,
    forecast: [135000, 136000, 138000, 141000, 143500, 146000, 148000],
    recommendation:
      "Harga daging sapi segar diprediksi mengalami lonjakan harga yang cukup signifikan dalam waktu dekat menjelang perayaan hari raya keagamaan. Disarankan membeli daging beku impor atau beli sekarang jika ingin menyimpannya.",
  },
  telur: {
    trend: "Turun 📉 (Diprediksi Turun)",
    isUp: false,
    current: 28500,
    forecast: [28500, 28300, 28100, 27850, 27600, 27400, 27200],
    recommendation:
      "Harga pakan ternak ayam ras mulai melandai sehingga harga telur ayam ras diperkirakan turun dalam beberapa hari ke depan. Disarankan menunda pembelian stok mingguan hingga 3 hari ke depan untuk harga terbaik.",
  },
};

function DashboardPage() {
  const { profile, user, isPremium } = useAuth();
  const qc = useQueryClient();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [lockedFeatureName, setLockedFeatureName] = useState("");

  // AI Prediction State
  const [selectedAiProduct, setSelectedAiProduct] = useState("beras");

  // Alert State
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [alertProduct, setAlertProduct] = useState("");
  const [alertMarket, setAlertMarket] = useState("");
  const [alertCondition, setAlertCondition] = useState<"<=" | ">=">("<=");
  const [alertPrice, setAlertPrice] = useState("");

  // Load alerts
  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`pasarchar_price_alerts_${user.id}`);
      if (stored) {
        setAlerts(JSON.parse(stored));
      }
    }
  }, [user]);

  // Save alerts helper
  const saveAlerts = (newAlerts: PriceAlert[]) => {
    setAlerts(newAlerts);
    if (user?.id) {
      localStorage.setItem(`pasarchar_price_alerts_${user.id}`, JSON.stringify(newAlerts));
    }
  };

  // Queries for form options
  const { data: dbProducts } = useQuery({
    queryKey: ["products-list-alert"],
    queryFn: async () =>
      (await supabase.from("products").select("id,name,unit,category").order("name")).data ?? [],
  });

  const { data: dbMarkets } = useQuery({
    queryKey: ["markets-list-alert"],
    queryFn: async () =>
      (await supabase.from("markets").select("id,name,city").order("name")).data ?? [],
  });

  // Fetch real savings history for this user
  const { data: userSavings } = useQuery({
    queryKey: ["user-savings-history", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("search_savings_history")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const chartData = useMemo(() => {
    // Generate last 12 weeks ending at today
    const weeks = Array.from({ length: 12 }, (_, i) => {
      const weekNum = 11 - i;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - (weekNum + 1) * 7);
      const endDate = new Date();
      endDate.setDate(endDate.getDate() - weekNum * 7);

      const labelNum = i + 1;
      return {
        week: `Mgu ${labelNum}`,
        savings: 0,
        startDate,
        endDate,
      };
    });

    if (userSavings && userSavings.length > 0) {
      userSavings.forEach((record: any) => {
        const recordDate = new Date(record.created_at);
        for (const w of weeks) {
          if (recordDate >= w.startDate && recordDate < w.endDate) {
            w.savings += Number(record.savings_amount);
            break;
          }
        }
      });
    }

    return weeks.map((w) => ({ week: w.week, savings: w.savings }));
  }, [userSavings]);

  const totalSavingsSum = useMemo(() => {
    if (!userSavings) return 0;
    return userSavings.reduce((acc, curr) => acc + Number(curr.savings_amount), 0);
  }, [userSavings]);

  const savingsTrendText = useMemo(() => {
    if (chartData.length < 12) return "Mulai melacak untuk melihat tren";
    const thisWeek = chartData[11].savings;
    const lastWeek = chartData[10].savings;
    const diff = thisWeek - lastWeek;
    if (diff > 0) return `+ ${idr(diff)} dari minggu lalu`;
    if (diff < 0) return `- ${idr(Math.abs(diff))} dari minggu lalu`;
    return "Stabil dari minggu lalu";
  }, [chartData]);

  const { data } = useQuery({
    queryKey: ["dashboard-stats", user?.id],
    queryFn: async () => {
      if (!user?.id) return { priceUpdates: 0, markets: 0, unread: 0, baskets: 0 };
      const today = new Date().toLocaleDateString("en-CA");

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

      const [pricesRes, marketsRes, productsRes, unread, baskets, wishlistBasketRes] =
        await Promise.all([
          supabase
            .from("product_prices")
            .select("id", { count: "exact", head: true })
            .eq("recorded_at", dateToUse),
          supabase
            .from("markets")
            .select("id", { count: "exact", head: true })
            .eq("is_active", true),
          supabase.from("products").select("id", { count: "exact", head: true }),
          supabase
            .from("notifications")
            .select("id", { count: "exact", head: true })
            .is("read_at", null)
            .eq("user_id", user.id),
          supabase
            .from("smart_baskets")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user.id)
            .eq("name", "Keranjang Saya"),
          supabase
            .from("smart_baskets")
            .select("id")
            .eq("user_id", user.id)
            .eq("name", "Daftar Belanja Pintar")
            .maybeSingle(),
        ]);

      let wishlistCount = 0;
      if (wishlistBasketRes.data) {
        const itemsRes = await supabase
          .from("basket_items")
          .select("id", { count: "exact", head: true })
          .eq("basket_id", wishlistBasketRes.data.id);
        wishlistCount = itemsRes.count ?? 0;
      }

      const marketsCount = marketsRes.count ?? 0;
      const productsCount = productsRes.count ?? 0;
      const priceUpdates = productsCount * marketsCount;

      return {
        priceUpdates,
        markets: marketsCount,
        unread: unread.count ?? 0,
        baskets: baskets.count ?? 0,
        wishlist: wishlistCount,
      };
    },
    enabled: !!user?.id,
  });

  const handleOpenLock = (feature: string) => {
    setLockedFeatureName(feature);
    setUpgradeModalOpen(true);
  };

  const handleAddAlert = () => {
    if (!alertProduct || !alertMarket || !alertPrice) {
      toast.error("Harap isi semua kolom alert!");
      return;
    }

    // Limit check for free users
    if (!isPremium && alerts.length >= 1) {
      handleOpenLock("Alert Harga Tanpa Batas");
      return;
    }

    const prod = dbProducts?.find((p) => p.id === alertProduct);
    const mkt = dbMarkets?.find((m) => m.id === alertMarket);

    if (!prod || !mkt) return;

    const newAlert: PriceAlert = {
      id: Math.random().toString(36).substr(2, 9),
      productId: alertProduct,
      productName: prod.name,
      marketId: alertMarket,
      marketName: mkt.name,
      condition: alertCondition,
      targetPrice: Number(alertPrice),
      status: "active",
      createdAt: new Date().toISOString(),
    };

    saveAlerts([newAlert, ...alerts]);
    setAlertProduct("");
    setAlertMarket("");
    setAlertPrice("");
    toast.success("Alert harga berhasil dibuat!");
  };

  const handleDeleteAlert = (id: string) => {
    saveAlerts(alerts.filter((a) => a.id !== id));
    toast.success("Alert harga dihapus");
  };

  const handleSimulateTrigger = async (alert: PriceAlert) => {
    if (!user) return;

    // Update status to triggered
    const updated = alerts.map((a) =>
      a.id === alert.id ? { ...a, status: "triggered" as const } : a,
    );
    saveAlerts(updated);

    // Insert alert notification into database so user actually sees it!
    const { error } = await supabase.from("notifications").insert({
      user_id: user.id,
      type: "price_alert",
      title: `🚨 Alert Harga: ${alert.productName} Turun!`,
      body: `Harga ${alert.productName} di ${alert.marketName} terpantau turun mencapai ${idr(alert.targetPrice)} (sesuai target alert Anda ${alert.condition === "<=" ? "di bawah" : "di atas"} ${idr(alert.targetPrice)}).`,
    });

    if (error) {
      console.error(error);
      toast.error("Gagal mengirim simulasi alert.");
    } else {
      toast.success("Simulasi Berhasil! Notifikasi alert baru dikirim ke inbox Anda.");
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
    }
  };

  // Recharts prediction chart format helper
  const getForecastChartData = (slug: string) => {
    const data = aiForecastData[slug];
    if (!data) return [];
    return data.forecast.map((val, idx) => ({
      day: `Hari ${idx + 1}`,
      Harga: val,
    }));
  };

  const currentForecast = aiForecastData[selectedAiProduct] || aiForecastData.beras;

  return (
    <AppShell>
      <div className="mb-10 border-b border-black pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-extrabold tracking-tighter text-[var(--color-ink)] uppercase leading-none">
              HALO, {profile?.full_name ?? "PENGGUNA"}
            </h1>
            {isPremium && (
              <span className="inline-flex items-center gap-1 rounded-none bg-[var(--color-swiss-red)] px-2 py-0.5 text-[9px] font-black text-white tracking-widest uppercase">
                <Crown className="h-3 w-3 fill-current" />
                PREMIUM
              </span>
            )}
          </div>
          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[var(--color-gray-500)]">
            Enterprise Price Analytics — pantau fluktuasi, bandingkan pasar, dan modelkan
            penghematan keranjang belanja.
          </p>
        </div>
      </div>

      {/* Upgrade Callout Banner for Free Users */}
      {!isPremium && (
        <div className="mb-10 border-l-4 border-[var(--color-swiss-red)] bg-white border border-y border-r border-[var(--color-gray-200)] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 rounded-none">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[var(--color-swiss-red)] font-black text-[10px] uppercase tracking-widest mb-1.5">
              <Crown className="h-3.5 w-3.5 fill-current" />
              Penawaran Spesial Premium
            </div>
            <h3 className="text-lg font-extrabold tracking-tighter text-black uppercase leading-none">
              Upgrade Premium — Hanya Rp9.900/bulan
            </h3>
            <p className="text-xs text-[var(--color-gray-500)] mt-2 max-w-2xl leading-relaxed font-medium">
              Buka fitur analitik tingkat lanjut: Prediksi Pergerakan Harga Pangan berbasis AI,
              Alert Notifikasi Tanpa Batas, grafik pelacakan penghematan 90 hari, dan integrasi
              Smart Basket tanpa batas produk.
            </p>
          </div>
          <Button
            asChild
            className="shrink-0 bg-black text-white hover:bg-zinc-800 rounded-none px-6 py-5 text-xs font-black uppercase tracking-wider"
          >
            <Link to="/pricing">Upgrade Sekarang</Link>
          </Button>
        </div>
      )}

      <Section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard
            label="Harga Terpantau"
            value={data?.priceUpdates ?? 0}
            hint="Update log sembako"
            icon={TrendingUp}
            accent="blue"
          />
          <StatCard
            label="Jejaring Pasar"
            value={data?.markets ?? 0}
            hint="Pasar aktif terintegrasi"
            icon={MapPin}
            accent="green"
          />
          <StatCard
            label="Keranjang Belanja"
            value={data?.baskets ?? 0}
            hint="Simulasi tersimpan"
            icon={ShoppingBasket}
            accent="warning"
          />
          <StatCard
            label="Daftar Belanja"
            value={data?.wishlist ?? 0}
            hint="Produk dipantau"
            icon={ListChecks}
            accent="green"
          />
          <StatCard
            label="Alert Tertunda"
            value={data?.unread ?? 0}
            hint="Notifikasi belum dibaca"
            icon={Bell}
            accent="danger"
          />
        </div>
      </Section>

      <Section title="Indeks Harga Bahan Pokok Terkini">
        <div className="overflow-x-auto border border-[var(--color-gray-200)] bg-white rounded-none">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-black bg-[var(--color-gray-50)]">
                <th className="p-3 font-black uppercase tracking-wider text-[var(--color-gray-500)] text-[10px]">
                  Komoditas
                </th>
                <th className="p-3 font-black uppercase tracking-wider text-[var(--color-gray-500)] text-[10px] text-right">
                  Harga Rata-Rata
                </th>
                <th className="p-3 font-black uppercase tracking-wider text-[var(--color-gray-500)] text-[10px]">
                  Prediksi Pergerakan (7 Hari)
                </th>
                <th className="p-3 font-black uppercase tracking-wider text-[var(--color-gray-500)] text-[10px]">
                  Rekomendasi Analitis
                </th>
                <th className="p-3 font-black uppercase tracking-wider text-[var(--color-gray-500)] text-[10px] text-right">
                  Tindakan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-gray-100)]">
              {Object.entries(aiForecastData).map(([key, data]) => {
                const nameMap: Record<string, string> = {
                  beras: "Beras Premium / kg",
                  minyak: "Minyak Goreng Curah / L",
                  cabai: "Cabai Rawit Merah / kg",
                  daging: "Daging Sapi Segar / kg",
                  telur: "Telur Ayam Ras / kg",
                };
                return (
                  <tr key={key} className="hover:bg-[var(--color-gray-50)]/50 transition-colors">
                    <td className="p-3 font-bold text-[var(--color-ink)] uppercase tracking-tight">
                      {nameMap[key] || key}
                    </td>
                    <td className="p-3 font-black text-right text-[var(--color-ink)] text-sm">
                      {idr(data.current)}
                    </td>
                    <td className="p-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 font-bold text-[9px] uppercase rounded-none",
                          data.isUp
                            ? "bg-red-50 text-[var(--color-swiss-red)]"
                            : data.trend.includes("Stabil")
                              ? "bg-zinc-100 text-zinc-600"
                              : "bg-emerald-50 text-[var(--color-brand-green)]",
                        )}
                      >
                        {data.trend}
                      </span>
                    </td>
                    <td className="p-3 text-[var(--color-gray-700)] text-2xs max-w-md truncate">
                      {data.recommendation}
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        variant="link"
                        onClick={() => setSelectedAiProduct(key)}
                        className="text-[10px] font-black uppercase tracking-wider text-black p-0 h-auto hover:text-[var(--color-swiss-red)] hover:no-underline"
                      >
                        Lihat Proyeksi →
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="Aksi Cepat Sistem">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <QuickAction to="/prices" icon={TrendingUp} label="Monitor Harga" />
          <QuickAction to="/compare" icon={Scale} label="Bandingkan" />
          <QuickAction to="/markets" icon={Search} label="Database Pasar" />
          <QuickAction to="/smart-basket" icon={ShoppingBasket} label="Smart Basket" />
          <QuickAction to="/wishlist" icon={ListChecks} label="Daftar Pantau" />
          {isPremium ? (
            <QuickAction to="/profile" icon={Crown} label="Profil Premium" highlight />
          ) : (
            <QuickAction to="/pricing" icon={Crown} label="Upgrade Akun" highlight />
          )}
        </div>
      </Section>

      {/* Main Premium Features Split View */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-none border border-[var(--color-gray-200)] bg-white overflow-hidden">
            <Tabs defaultValue="savings" className="w-full">
              <div className="border-b border-[var(--color-gray-200)] px-6 py-4 bg-[var(--color-gray-50)]">
                <TabsList className="bg-transparent border-0 gap-2 p-0 h-auto flex flex-wrap">
                  <TabsTrigger
                    value="savings"
                    className="text-xs py-2 px-4 font-black uppercase tracking-wider rounded-none border border-[var(--color-gray-200)] bg-white text-zinc-500 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black transition-colors cursor-pointer"
                  >
                    Riwayat Penghematan
                  </TabsTrigger>
                  <TabsTrigger
                    value="prediction"
                    className="text-xs py-2 px-4 font-black uppercase tracking-wider rounded-none border border-[var(--color-gray-200)] bg-white text-zinc-500 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black transition-colors cursor-pointer"
                  >
                    Prediksi Harga AI
                  </TabsTrigger>
                  <TabsTrigger
                    value="alerts"
                    className="text-xs py-2 px-4 font-black uppercase tracking-wider rounded-none border border-[var(--color-gray-200)] bg-white text-zinc-500 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black transition-colors cursor-pointer"
                  >
                    Alert Harga
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="savings" className="p-6 focus:outline-none">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-tight text-[var(--color-ink)]">
                      Pelacakan Riwayat Penghematan (90 Hari)
                    </h3>
                    <p className="text-xs text-[var(--color-gray-500)] mt-1">
                      Estimasi total uang yang Anda hemat dari belanja dengan panduan PasarCek.
                    </p>
                  </div>
                  {isPremium && (
                    <div className="sm:text-right border-l-2 sm:border-l-0 sm:border-r-2 border-black pl-3 sm:pr-3">
                      <p className="text-[9px] uppercase font-black tracking-wider text-[var(--color-gray-500)]">
                        Total Penghematan
                      </p>
                      <p className="text-xl font-black tracking-tight text-[var(--color-brand-green)]">
                        {idr(totalSavingsSum)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="relative h-64 w-full rounded-none border border-[var(--color-gray-200)] p-4 bg-[var(--color-gray-50)]/30">
                  {/* Blur lock layer for free users */}
                  {!isPremium && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 rounded-none p-6 text-center">
                      <div className="mb-3 bg-red-50 p-3 text-[var(--color-swiss-red)] border border-red-100">
                        <Crown className="h-6 w-6 fill-current" />
                      </div>
                      <h4 className="font-black uppercase text-xs tracking-wider text-[var(--color-ink)]">
                        Fitur Terkunci (Premium Only)
                      </h4>
                      <p className="text-xs text-[var(--color-gray-500)] max-w-sm mt-2 mb-4 leading-relaxed font-medium">
                        Upgrade ke Premium untuk membuka grafik analitik tren penghematan belanja
                        bulanan Anda selama 90 hari terakhir.{" "}
                        {totalSavingsSum > 0 &&
                          `Saat ini Anda telah memiliki catatan penghematan riil sebesar ${idr(totalSavingsSum)}.`}
                      </p>
                      <Button
                        size="sm"
                        className="rounded-none bg-black text-white hover:bg-zinc-800 text-xs font-black uppercase tracking-wider"
                        onClick={() => handleOpenLock("Riwayat Penghematan 90 Hari")}
                      >
                        Buka Fitur Sekarang
                      </Button>
                    </div>
                  )}

                  <div
                    className={`w-full h-full ${!isPremium ? "blur-sm opacity-30 select-none pointer-events-none" : ""}`}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="0" stroke="var(--color-gray-200)" />
                        <XAxis
                          dataKey="week"
                          tickLine={false}
                          axisLine={true}
                          tick={{ fontSize: 9, fill: "var(--color-gray-500)", fontWeight: "bold" }}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={true}
                          tick={{ fontSize: 9, fill: "var(--color-gray-500)", fontWeight: "bold" }}
                        />
                        <Tooltip
                          formatter={(value) => [idr(Number(value)), "Penghematan"]}
                          labelStyle={{ fontWeight: "bold", fontSize: 11 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="savings"
                          stroke="var(--color-brand-green)"
                          strokeWidth={2.5}
                          fill="#0f766e"
                          fillOpacity={0.08}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 2: AI Price Predictions */}
              <TabsContent value="prediction" className="p-6 focus:outline-none">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-tight text-[var(--color-ink)] flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-[var(--color-swiss-red)]" />
                      Prediksi Fluktuasi Harga AI
                    </h3>
                    <p className="text-xs text-[var(--color-gray-500)] mt-1">
                      Proyeksi pergerakan harga 7 hari ke depan dengan pemodelan prediktif.
                    </p>
                  </div>
                  <div className="min-w-[160px]">
                    <Select value={selectedAiProduct} onValueChange={setSelectedAiProduct}>
                      <SelectTrigger className="h-9 text-xs rounded-none border-[var(--color-gray-200)] font-bold uppercase">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="beras">Beras Premium</SelectItem>
                        <SelectItem value="minyak">Minyak Goreng</SelectItem>
                        <SelectItem value="cabai">Cabai Rawit Merah</SelectItem>
                        <SelectItem value="daging">Daging Sapi</SelectItem>
                        <SelectItem value="telur">Telur Ayam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="relative rounded-none border border-[var(--color-gray-200)] p-4 bg-[var(--color-gray-50)]/30 min-h-[300px]">
                  {/* Blur lock layer for free users */}
                  {!isPremium && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 rounded-none p-6 text-center">
                      <div className="mb-3 bg-red-50 p-3 text-[var(--color-swiss-red)] border border-red-100">
                        <Crown className="h-6 w-6 fill-current" />
                      </div>
                      <h4 className="font-black uppercase text-xs tracking-wider text-[var(--color-ink)]">
                        Prediksi AI Terkunci
                      </h4>
                      <p className="text-xs text-[var(--color-gray-500)] max-w-sm mt-2 mb-4 leading-relaxed font-medium">
                        Dapatkan proyeksi fluktuasi harga sembako 7 hari ke depan beserta analisis
                        rekomendasi kapan waktu belanja terbaik dengan AI.
                      </p>
                      <Button
                        size="sm"
                        className="rounded-none bg-black text-white hover:bg-zinc-800 text-xs font-black uppercase tracking-wider"
                        onClick={() => handleOpenLock("Prediksi Harga AI")}
                      >
                        Buka Prediksi AI
                      </Button>
                    </div>
                  )}

                  <div
                    className={`grid gap-6 md:grid-cols-3 ${!isPremium ? "blur-sm opacity-30 select-none pointer-events-none" : ""}`}
                  >
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-center justify-between border-b border-[var(--color-gray-200)] pb-3">
                        <div>
                          <span className="text-[9px] font-black text-[var(--color-gray-500)] uppercase tracking-wider">
                            Harga Indeks Sekarang:
                          </span>
                          <p className="text-2xl font-black tracking-tight text-[var(--color-ink)]">
                            {idr(currentForecast.current)}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-black text-[var(--color-gray-500)] uppercase tracking-wider">
                            Tren Proyeksi AI:
                          </span>
                          <p
                            className={cn(
                              "text-xs font-black uppercase tracking-wide mt-1",
                              currentForecast.isUp
                                ? "text-[var(--color-swiss-red)]"
                                : currentForecast.trend.includes("Stabil")
                                  ? "text-zinc-700"
                                  : "text-[var(--color-brand-green)]",
                            )}
                          >
                            {currentForecast.trend}
                          </p>
                        </div>
                      </div>

                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={getForecastChartData(selectedAiProduct)}
                            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="0" stroke="var(--color-gray-200)" />
                            <XAxis
                              dataKey="day"
                              tickLine={false}
                              axisLine={true}
                              tick={{
                                fontSize: 9,
                                fill: "var(--color-gray-500)",
                                fontWeight: "bold",
                              }}
                            />
                            <YAxis
                              tickLine={false}
                              axisLine={true}
                              tick={{
                                fontSize: 9,
                                fill: "var(--color-gray-500)",
                                fontWeight: "bold",
                              }}
                            />
                            <Tooltip
                              formatter={(value) => [idr(Number(value)), "Prediksi Harga"]}
                              labelStyle={{ fontWeight: "bold", fontSize: 11 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="Harga"
                              stroke="var(--color-swiss-red)"
                              strokeWidth={2.5}
                              dot={{ r: 3, strokeWidth: 2, fill: "white" }}
                              activeDot={{ r: 5 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white rounded-none border border-[var(--color-gray-200)] p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-black font-black text-[10px] uppercase tracking-wider border-b border-black pb-2 mb-3">
                          <Sparkles className="h-3.5 w-3.5 text-[var(--color-swiss-red)]" />
                          Rekomendasi Analitis
                        </div>
                        <p className="text-xs text-[var(--color-gray-700)] leading-relaxed font-medium">
                          {currentForecast.recommendation}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[var(--color-gray-100)] text-[9px] text-[var(--color-gray-400)] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0 text-[var(--color-swiss-red)]" />
                        Validitas data: historis 90 hari.
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 3: Price Alerts */}
              <TabsContent value="alerts" className="p-6 focus:outline-none">
                <div className="mb-4">
                  <h3 className="text-sm font-black uppercase tracking-tight text-[var(--color-ink)]">
                    Konfigurasi Alert Harga
                  </h3>
                  <p className="text-xs text-[var(--color-gray-500)] mt-1">
                    Dapatkan alert instan saat harga bahan pokok turun mencapai target belanja hemat
                    Anda.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Alert Creation Form */}
                  <div className="rounded-none border border-[var(--color-gray-200)] bg-[var(--color-gray-50)]/50 p-4">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-[var(--color-gray-500)] mb-3">
                      Buat Parameter Alert
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 items-end">
                      <div>
                        <Label className="text-[9px] font-black uppercase tracking-wider text-[var(--color-gray-500)]">
                          Produk Komoditas
                        </Label>
                        <Select value={alertProduct} onValueChange={setAlertProduct}>
                          <SelectTrigger className="h-9 text-xs mt-1 rounded-none border-[var(--color-gray-200)] font-bold">
                            <SelectValue placeholder="Pilih..." />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            {(dbProducts ?? []).map((p: any) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.name} ({p.unit})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-[9px] font-black uppercase tracking-wider text-[var(--color-gray-500)]">
                          Lokasi Pasar
                        </Label>
                        <Select value={alertMarket} onValueChange={setAlertMarket}>
                          <SelectTrigger className="h-9 text-xs mt-1 rounded-none border-[var(--color-gray-200)] font-bold">
                            <SelectValue placeholder="Pilih..." />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            {(dbMarkets ?? []).map((m: any) => (
                              <SelectItem key={m.id} value={m.id}>
                                {m.name} ({m.city})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-[9px] font-black uppercase tracking-wider text-[var(--color-gray-500)]">
                          Kondisi & Target (Rp)
                        </Label>
                        <div className="flex items-center gap-1 mt-1">
                          <Select
                            value={alertCondition}
                            onValueChange={(val: any) => setAlertCondition(val)}
                          >
                            <SelectTrigger className="w-16 h-9 text-xs rounded-none border-[var(--color-gray-200)] font-black">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-none">
                              <SelectItem value="<=">&lt;=</SelectItem>
                              <SelectItem value=">=">&gt;=</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            type="number"
                            className="h-9 text-xs rounded-none border-[var(--color-gray-200)] font-bold"
                            placeholder="Contoh: 14000"
                            value={alertPrice}
                            onChange={(e) => setAlertPrice(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Button
                          onClick={handleAddAlert}
                          className="w-full h-9 text-xs bg-black text-white hover:bg-zinc-800 rounded-none font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Tambah Parameter
                        </Button>
                      </div>
                    </div>

                    {!isPremium && (
                      <p className="text-[9px] text-[var(--color-swiss-red)] font-bold mt-3 flex items-center gap-1.5 bg-red-50 p-2 border border-red-100 rounded-none uppercase tracking-wide">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        Batas gratis: Akun Free dibatasi maksimal 1 alert aktif. Upgrade Premium
                        untuk alert tanpa batas.
                      </p>
                    )}
                  </div>

                  {/* Alerts List */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-[var(--color-gray-500)]">
                      Daftar Alert Aktif ({alerts.length})
                    </h4>
                    {alerts.length === 0 ? (
                      <div className="text-center py-8 border border-dashed rounded-none text-xs text-[var(--color-gray-500)]">
                        Belum ada alert harga yang dikonfigurasi.
                      </div>
                    ) : (
                      <div className="border border-[var(--color-gray-200)] bg-white overflow-hidden rounded-none divide-y divide-[var(--color-gray-100)]">
                        {alerts.map((a) => (
                          <div
                            key={a.id}
                            className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:bg-[var(--color-gray-50)]/30 transition-colors"
                          >
                            <div className="min-w-0">
                              <p className="font-black text-xs text-[var(--color-ink)] uppercase tracking-tight">
                                {a.productName}
                              </p>
                              <p className="text-[10px] text-[var(--color-gray-500)] flex items-center gap-1 mt-1 font-semibold uppercase">
                                <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                                {a.marketName}
                              </p>
                              <div className="mt-2 flex items-center gap-2 flex-wrap">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-zinc-200 text-[9px] font-black uppercase tracking-wider text-black bg-zinc-50 rounded-none">
                                  Target: {a.condition === "<=" ? "di bawah" : "di atas"}{" "}
                                  {idr(a.targetPrice)}
                                </span>
                                {a.status === "triggered" ? (
                                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-red-50 text-[9px] font-black uppercase tracking-wider text-[var(--color-swiss-red)] animate-pulse rounded-none border border-red-100">
                                    <Bell className="h-2.5 w-2.5 fill-current" /> MEMICU
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-emerald-50 text-[9px] font-black uppercase tracking-wider text-[var(--color-brand-green)] rounded-none border border-emerald-100">
                                    AKTIF
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              {a.status === "active" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSimulateTrigger(a)}
                                  className="h-8 text-[9px] font-black uppercase tracking-wider text-black border border-black hover:bg-black hover:text-white rounded-none transition-colors"
                                >
                                  Simulasi Trigger
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteAlert(a.id)}
                                className="h-8 w-8 p-0 text-[var(--color-swiss-red)] hover:bg-red-50 rounded-none border border-transparent hover:border-red-100 transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          <div className="relative rounded-none border border-[var(--color-gray-200)] bg-black p-6 text-white flex flex-col justify-between gap-6">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="grid h-6 w-6 place-items-center bg-[var(--color-swiss-red)] text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  Instruksi Penghematan
                </span>
              </div>
              <h3 className="text-lg font-extrabold uppercase tracking-tight leading-none text-white">
                Alokasi & Simulasi Belanja
              </h3>
              <p className="mt-3 text-xs text-zinc-400 leading-relaxed font-medium">
                Gunakan algoritma perbandingan harga multi-pasar kami dengan memodelkan keranjang
                mingguan Anda di Smart Basket. Temukan titik harga termurah secara real-time.
              </p>
            </div>
            <Button
              asChild
              className="w-full bg-white text-black hover:bg-zinc-100 rounded-none font-bold py-5 text-xs uppercase tracking-wider cursor-pointer"
            >
              <Link to="/smart-basket">Mulai Simulasi Belanja</Link>
            </Button>
          </div>

          <div className="relative rounded-none border border-[var(--color-gray-200)] bg-white p-6 flex flex-col justify-between min-h-[220px]">
            {/* Swiss Accent Bar */}
            <div className="absolute left-0 top-0 h-1 w-full bg-[var(--color-brand-green)]" />
            <div>
              <h3 className="text-[10px] font-black text-[var(--color-gray-500)] uppercase tracking-wider">
                Penghematan Bulan Ini
              </h3>
              <p className="mt-3 text-4xl font-black tracking-tight text-[var(--color-brand-green)] leading-none">
                {isPremium ? idr(173000) : idr(0)}
              </p>
              <p className="mt-3 text-xs text-[var(--color-gray-500)] leading-relaxed font-medium">
                {isPremium
                  ? "Penghematan setara 14% dari baseline anggaran pangan rumah tangga bulanan Anda."
                  : "Mulai simulasi keranjang belanja untuk memverifikasi rasio penghematan."}
              </p>
            </div>

            {!isPremium ? (
              <div className="mt-4 border-t border-[var(--color-gray-100)] pt-4">
                <p className="text-[9px] text-[var(--color-gray-500)] font-bold uppercase tracking-wide mb-2 italic">
                  Data Historis Dikunci (Premium)
                </p>
                <div className="rounded-none bg-[var(--color-gray-50)] border border-[var(--color-gray-200)] p-3 flex flex-col items-center gap-1.5 text-center">
                  <Crown className="h-4 w-4 text-[var(--color-swiss-red)]" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-[var(--color-gray-700)]">
                    Riwayat Penghematan Terkunci
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-4 border-t border-[var(--color-gray-100)] pt-4 flex items-center gap-2 text-xs text-[var(--color-brand-green)] font-black uppercase tracking-wider">
                <ArrowUpRight className="h-4 w-4" />
                <span>{savingsTrendText}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reusable Premium Lock/Upgrade modal */}
      <PremiumUpgradeModal
        isOpen={upgradeModalOpen}
        onOpenChange={setUpgradeModalOpen}
        featureName={lockedFeatureName}
      />
    </AppShell>
  );
}

function QuickAction({
  to,
  icon: Icon,
  label,
  highlight,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  highlight?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-start gap-4 rounded-none border border-[var(--color-gray-200)] p-4 transition-all hover:border-black",
        highlight
          ? "bg-[var(--color-swiss-red)] text-white hover:bg-red-700"
          : "bg-white hover:bg-[var(--color-gray-50)]",
      )}
    >
      <Icon className={cn("h-4 w-4", highlight ? "text-white animate-pulse" : "text-black")} />
      <span
        className={cn(
          "text-xs font-black uppercase tracking-wider",
          highlight ? "text-white" : "text-[var(--color-ink)]",
        )}
      >
        {label}
      </span>
    </Link>
  );
}
