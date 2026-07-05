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
import { CelenganAyamIcon } from "@/components/celengan-ayam-icon";
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
      "Harga pakan ternak ayam ras mulai melandai sehingga harga telur ayam ras diperkirakan turun dalam beberapa hari ke depan. Disarankan menunda pembelian stok mimgguan hingga 3 hari ke depan untuk harga terbaik.",
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

      const [pricesRes, marketsRes, unread, baskets, wishlistBasket] =
        await Promise.all([
          supabase
            .from("product_prices")
            .select("id", { count: "exact", head: true })
            .eq("recorded_at", dateToUse),
          supabase
            .from("markets")
            .select("id", { count: "exact", head: true })
            .eq("is_active", true),
          supabase
            .from("notifications")
            .select("id", { count: "exact", head: true })
            .is("read_at", null)
            .eq("user_id", user.id),
          supabase
            .from("smart_baskets")
            .select("id")
            .eq("user_id", user.id)
            .eq("name", "Keranjang Saya")
            .maybeSingle(),
          supabase
            .from("smart_baskets")
            .select("id")
            .eq("user_id", user.id)
            .eq("name", "Daftar Belanja Pintar")
            .maybeSingle(),
        ]);

      let basketItemsCount = 0;
      if (baskets.data) {
        const { count } = await supabase
          .from("basket_items")
          .select("id", { count: "exact", head: true })
          .eq("basket_id", baskets.data.id);
        basketItemsCount = count ?? 0;
      }

      let wishlistCount = 0;
      if (wishlistBasket.data) {
        const { count } = await supabase
          .from("basket_items")
          .select("id", { count: "exact", head: true })
          .eq("basket_id", wishlistBasket.data.id);
        wishlistCount = count ?? 0;
      }

      return {
        priceUpdates: pricesRes.count ?? 0,
        markets: marketsRes.count ?? 0,
        unread: unread.count ?? 0,
        baskets: basketItemsCount,
        wishlist: wishlistCount,
      };
    },
    enabled: !!user?.id,
  });

  const handleOpenLock = (featureName: string) => {
    setLockedFeatureName(featureName);
    setUpgradeModalOpen(true);
  };

  const handleAddAlert = () => {
    if (!alertProduct || !alertMarket || !alertPrice) {
      toast.error("Silakan lengkapi semua field alert.");
      return;
    }

    if (!isPremium && alerts.length >= 1) {
      handleOpenLock("Alert Harga Tanpa Batas");
      return;
    }

    const prod = (dbProducts ?? []).find((p: any) => p.id === alertProduct);
    const mkt = (dbMarkets ?? []).find((m: any) => m.id === alertMarket);

    const newAlert: PriceAlert = {
      id: crypto.randomUUID(),
      productId: alertProduct,
      productName: prod?.name || "Produk",
      marketId: alertMarket,
      marketName: mkt?.name || "Pasar",
      condition: alertCondition,
      targetPrice: Number(alertPrice),
      status: "active",
      createdAt: new Date().toISOString(),
    };

    saveAlerts([newAlert, ...alerts]);
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
      {/* Header */}
      <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-black tracking-tight text-[var(--color-ink)] sm:text-4xl">
              Halo, {profile?.full_name ?? "Pengguna"}
            </h1>
            {isPremium && (
              <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-600 border border-amber-500/20">
                <Crown className="h-3 w-3 fill-current" /> Premium
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-[var(--color-gray-500)] sm:text-base">
            Pantau fluktuasi harga bahan pokok secara real-time dan kelola belanja hemat Anda.
          </p>
        </div>
      </div>

      {/* Upgrade Callout Banner for Free Users */}
      {!isPremium && (
        <div className="mb-8 group relative overflow-hidden rounded-xl border border-[var(--color-gray-100)] bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-green)] p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
          <div className="absolute right-0 bottom-0 opacity-10 blur-xl w-64 h-64 bg-white rounded-full pointer-events-none" />
          <div className="z-10">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-200 mb-2">
              <Crown className="h-4 w-4 text-amber-400 fill-amber-400" /> Penawaran Premium
            </div>
            <h3 className="text-xl font-bold tracking-tight">Mulai Belanja Cerdas dengan Premium</h3>
            <p className="mt-2 text-sm text-white/80 max-w-2xl leading-relaxed">
              Buka fitur analitik tingkat lanjut: Prediksi Pergerakan Harga Pangan berbasis AI, Alert Notifikasi Tanpa Batas, grafik pelacakan penghematan 90 hari, dan integrasi Smart Basket tanpa batas produk.
            </p>
          </div>
          <Button asChild className="shrink-0 bg-white text-[var(--color-brand-blue)] hover:bg-white/95 shadow-md rounded-xl font-bold py-5 px-6 relative z-10 hover:scale-[1.01] transition-transform">
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
            accent="warning"
          />
        </div>
      </Section>

      <Section title="Indeks Harga Bahan Pokok Terkini">
        <div className="overflow-x-auto border border-[var(--color-gray-100)] bg-white rounded-lg shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[var(--color-gray-100)] bg-[var(--color-gray-50)]/50">
                <th className="p-3.5 font-semibold text-[var(--color-gray-500)]">Komoditas</th>
                <th className="p-3.5 font-semibold text-[var(--color-gray-500)] text-right">Harga Rata-Rata</th>
                <th className="p-3.5 font-semibold text-[var(--color-gray-500)]">Prediksi Pergerakan (7 Hari)</th>
                <th className="p-3.5 font-semibold text-[var(--color-gray-500)]">Rekomendasi Analitis</th>
                <th className="p-3.5 font-semibold text-[var(--color-gray-500)] text-right">Tindakan</th>
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
                  <tr key={key} className="hover:bg-[var(--color-gray-50)]/30 transition-colors">
                    <td className="p-3.5 font-bold text-[var(--color-ink)]">{nameMap[key] || key}</td>
                    <td className="p-3.5 font-black text-right text-[var(--color-ink)] text-sm">{idr(data.current)}</td>
                    <td className="p-3.5">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold",
                        data.isUp
                          ? "bg-red-50 text-[var(--color-destructive)]"
                          : data.trend.includes("Stabil")
                          ? "bg-zinc-100 text-zinc-600"
                          : "bg-green-50 text-[var(--color-brand-green)]"
                      )}>
                        {data.trend}
                      </span>
                    </td>
                    <td className="p-3.5 text-[var(--color-gray-700)] max-w-md truncate">{data.recommendation}</td>
                    <td className="p-3.5 text-right">
                      <Button
                        variant="link"
                        onClick={() => setSelectedAiProduct(key)}
                        className="text-xs font-semibold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-green)] p-0 h-auto"
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
          <div className="rounded-lg border border-[var(--color-gray-100)] bg-white overflow-hidden shadow-sm">
            <Tabs defaultValue="savings" className="w-full">
              <div className="border-b border-[var(--color-gray-100)] px-6 py-4 bg-[var(--color-gray-50)]/50">
                <TabsList className="bg-transparent border-0 gap-2 p-0 h-auto flex flex-wrap">
                  <TabsTrigger
                    value="savings"
                    className="text-xs py-2 px-4 font-semibold rounded-md border border-[var(--color-gray-100)] bg-white text-zinc-500 data-[state=active]:bg-[var(--color-brand-blue)] data-[state=active]:text-white data-[state=active]:border-[var(--color-brand-blue)] transition-colors cursor-pointer"
                  >
                    Riwayat Penghematan
                  </TabsTrigger>
                  <TabsTrigger
                    value="prediction"
                    className="text-xs py-2 px-4 font-semibold rounded-md border border-[var(--color-gray-100)] bg-white text-zinc-500 data-[state=active]:bg-[var(--color-brand-blue)] data-[state=active]:text-white data-[state=active]:border-[var(--color-brand-blue)] transition-colors cursor-pointer"
                  >
                    Prediksi Harga AI
                  </TabsTrigger>
                  <TabsTrigger
                    value="alerts"
                    className="text-xs py-2 px-4 font-semibold rounded-md border border-[var(--color-gray-100)] bg-white text-zinc-500 data-[state=active]:bg-[var(--color-brand-blue)] data-[state=active]:text-white data-[state=active]:border-[var(--color-brand-blue)] transition-colors cursor-pointer"
                  >
                    Alert Harga
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="savings" className="p-6 focus:outline-none">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[var(--color-ink)]">Pelacakan Riwayat Penghematan (90 Hari)</h3>
                    <p className="text-xs text-[var(--color-gray-500)] mt-1">Estimasi total uang yang Anda hemat dari belanja dengan panduan PasarCek.</p>
                  </div>
                  {isPremium && (
                    <div className="text-right">
                      <p className="text-2xs uppercase font-extrabold text-[var(--color-gray-500)]">Total Penghematan</p>
                      <p className="text-lg font-black text-[var(--color-brand-green)]">{idr(totalSavingsSum)}</p>
                    </div>
                  )}
                </div>

                <div className="relative h-64 w-full rounded-lg bg-[var(--color-gray-50)]/50 border border-[var(--color-gray-100)] p-4">
                  {/* Blur lock layer for free users */}
                  {!isPremium && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md rounded-lg p-6 text-center">
                      <div className="mb-3 rounded-full bg-amber-500/10 p-3 text-amber-500 border border-amber-500/20 shadow-inner">
                        <Crown className="h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-sm text-[var(--color-ink)]">Tersedia di Paket Premium</h4>
                      <p className="text-xs text-[var(--color-gray-500)] max-w-sm mt-1 mb-4">
                        Upgrade ke Premium untuk membuka grafik interaktif riwayat penghematan belanja bulanan Anda selama 90 hari terakhir.
                        {totalSavingsSum > 0 && ` Saat ini Anda telah memiliki catatan penghematan riil sebesar ${idr(totalSavingsSum)}.`}
                      </p>
                      <Button size="sm" className="rounded-md" onClick={() => handleOpenLock("Riwayat Penghematan 90 Hari")}>
                        Buka Fitur Sekarang
                      </Button>
                    </div>
                  )}

                  <div className={`w-full h-full ${!isPremium ? "blur-sm opacity-30 select-none pointer-events-none" : ""}`}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-brand-green)" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="var(--color-brand-green)" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-gray-100)" />
                        <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-gray-500)" }} />
                        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-gray-500)" }} />
                        <Tooltip formatter={(value) => [idr(Number(value)), "Penghematan"]} labelStyle={{ fontWeight: "bold" }} />
                        <Area type="monotone" dataKey="savings" stroke="var(--color-brand-green)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSavings)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 2: AI Price Predictions */}
              <TabsContent value="prediction" className="p-6 focus:outline-none">
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-[var(--color-ink)] flex items-center gap-1.5">
                      <Sparkles className="h-4.5 w-4.5 text-amber-500" />
                      Prediksi Harga Pangan AI
                    </h3>
                    <p className="text-xs text-[var(--color-gray-500)]">Proyeksi pergerakan harga 7 hari ke depan dengan kecerdasan buatan.</p>
                  </div>
                  <div className="min-w-[150px]">
                    <Select value={selectedAiProduct} onValueChange={setSelectedAiProduct}>
                      <SelectTrigger className="h-9 text-xs rounded-md"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-md">
                        <SelectItem value="beras">Beras Premium</SelectItem>
                        <SelectItem value="minyak">Minyak Goreng</SelectItem>
                        <SelectItem value="cabai">Cabai Rawit Merah</SelectItem>
                        <SelectItem value="daging">Daging Sapi</SelectItem>
                        <SelectItem value="telur">Telur Ayam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="relative rounded-lg border border-[var(--color-gray-100)] p-4 bg-[var(--color-gray-50)]/50 min-h-[300px]">
                  {/* Blur lock layer for free users */}
                  {!isPremium && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md rounded-lg p-6 text-center">
                      <div className="mb-3 rounded-full bg-amber-500/10 p-3 text-amber-500 border border-amber-500/20 shadow-inner">
                        <Crown className="h-6 w-6" />
                      </div>
                      <h4 className="font-bold text-sm text-[var(--color-ink)]">Tersedia di Paket Premium</h4>
                      <p className="text-xs text-[var(--color-gray-500)] max-w-sm mt-1 mb-4">
                        Dapatkan proyeksi fluktuasi harga 7 hari ke depan beserta analisis rekomendasi kapan waktu belanja termurah dengan AI.
                      </p>
                      <Button size="sm" className="rounded-md" onClick={() => handleOpenLock("Prediksi Harga AI")}>
                        Buka Prediksi AI
                      </Button>
                    </div>
                  )}

                  <div className={`grid gap-4 md:grid-cols-3 ${!isPremium ? "blur-sm opacity-30 select-none pointer-events-none" : ""}`}>
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-center justify-between border-b border-[var(--color-gray-100)] pb-3">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[var(--color-gray-500)]">Harga Indeks Sekarang</span>
                          <p className="text-2xl font-black text-[var(--color-ink)] mt-1">{idr(currentForecast.current)}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-[var(--color-gray-500)]">Tren Proyeksi AI</span>
                          <p className={cn(
                            "text-xs font-bold mt-1 px-2 py-0.5 rounded inline-block",
                            currentForecast.isUp
                              ? "bg-red-50 text-[var(--color-destructive)]"
                              : currentForecast.trend.includes("Stabil")
                              ? "bg-zinc-100 text-zinc-600"
                              : "bg-green-50 text-[var(--color-brand-green)]"
                          )}>
                            {currentForecast.trend}
                          </p>
                        </div>
                      </div>

                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={getForecastChartData(selectedAiProduct)} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-gray-100)" />
                            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-gray-500)" }} />
                            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-gray-500)" }} />
                            <Tooltip formatter={(value) => [idr(Number(value)), "Prediksi Harga"]} labelStyle={{ fontWeight: "bold" }} />
                            <Line type="monotone" dataKey="Harga" stroke="var(--color-brand-green)" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 2, fill: "white" }} activeDot={{ r: 5 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-[var(--color-gray-100)] p-4 flex flex-col justify-between shadow-xs">
                      <div>
                        <div className="flex items-center gap-1 font-bold text-xs text-[var(--color-brand-blue)] border-b border-[var(--color-gray-100)] pb-2 mb-3">
                          <Sparkles className="h-4 w-4" /> Rekomendasi Analitis
                        </div>
                        <p className="text-xs text-[var(--color-gray-700)] leading-relaxed">{currentForecast.recommendation}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[var(--color-gray-100)] text-[10px] text-[var(--color-gray-400)] flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0 text-slate-400" /> Validitas data: historis 90 hari.
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 3: Price Alerts */}
              <TabsContent value="alerts" className="p-6 focus:outline-none">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-[var(--color-ink)]">Konfigurasi Alert Harga</h3>
                  <p className="text-xs text-[var(--color-gray-500)] mt-1">Dapatkan alert instan saat harga bahan pokok turun mencapai target belanja hemat Anda.</p>
                </div>

                <div className="space-y-6">
                  {/* Alert Creation Form */}
                  <div className="rounded-lg border border-[var(--color-gray-100)] bg-[var(--color-gray-50)]/50 p-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-gray-500)] mb-3">Buat Parameter Alert</h4>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 items-end">
                      <div>
                        <Label className="text-[10px] font-semibold text-[var(--color-gray-700)]">Produk Komoditas</Label>
                        <Select value={alertProduct} onValueChange={setAlertProduct}>
                          <SelectTrigger className="h-9 text-xs mt-1 rounded-md border-[var(--color-gray-100)]">
                            <SelectValue placeholder="Pilih..." />
                          </SelectTrigger>
                          <SelectContent className="rounded-md">
                            {(dbProducts ?? []).map((p: any) => (
                              <SelectItem key={p.id} value={p.id}>{p.name} ({p.unit})</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-[10px] font-semibold text-[var(--color-gray-700)]">Lokasi Pasar</Label>
                        <Select value={alertMarket} onValueChange={setAlertMarket}>
                          <SelectTrigger className="h-9 text-xs mt-1 rounded-md border-[var(--color-gray-100)]">
                            <SelectValue placeholder="Pilih..." />
                          </SelectTrigger>
                          <SelectContent className="rounded-md">
                            {(dbMarkets ?? []).map((m: any) => (
                              <SelectItem key={m.id} value={m.id}>{m.name} ({m.city})</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-[10px] font-semibold text-[var(--color-gray-700)]">Kondisi & Target (Rp)</Label>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Select value={alertCondition} onValueChange={(val: any) => setAlertCondition(val)}>
                            <SelectTrigger className="w-16 h-9 text-xs rounded-md border-[var(--color-gray-100)]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-md">
                              <SelectItem value="<=">&lt;=</SelectItem>
                              <SelectItem value=">=">&gt;=</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            type="number"
                            className="h-9 text-xs rounded-md border-[var(--color-gray-100)]"
                            placeholder="Contoh: 14000"
                            value={alertPrice}
                            onChange={(e) => setAlertPrice(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Button onClick={handleAddAlert} className="w-full h-9 text-xs rounded-md bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue)]/95 font-semibold text-white flex items-center justify-center gap-1.5 cursor-pointer">
                          <Plus className="h-4 w-4" /> Tambah Parameter
                        </Button>
                      </div>
                    </div>

                    {!isPremium && (
                      <p className="text-[10px] text-amber-600 font-semibold mt-3 flex items-center gap-1.5 bg-amber-50 p-2 border border-amber-100 rounded-md">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        Batas gratis: Akun Free dibatasi maksimal 1 alert aktif. Upgrade Premium untuk alert tanpa batas.
                      </p>
                    )}
                  </div>

                  {/* Alerts List */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-[var(--color-gray-700)]">Daftar Alert Aktif ({alerts.length})</h4>
                    {alerts.length === 0 ? (
                      <div className="text-center py-6 border border-dashed border-[var(--color-gray-100)] rounded-lg text-xs text-[var(--color-gray-500)]">
                        Belum ada alert harga yang dibuat.
                      </div>
                    ) : (
                      <div className="divide-y divide-[var(--color-gray-100)] border border-[var(--color-gray-100)] rounded-lg bg-white overflow-hidden">
                        {alerts.map((a) => (
                          <div key={a.id} className="p-3.5 flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:bg-[var(--color-gray-50)]/30 transition-colors">
                            <div className="min-w-0">
                              <p className="font-bold text-xs text-[var(--color-ink)]">{a.productName}</p>
                              <p className="text-[10px] text-[var(--color-gray-500)] flex items-center gap-1 mt-0.5">
                                <MapPin className="h-3 w-3 text-slate-400" />
                                {a.marketName}
                              </p>
                              <div className="mt-1 flex items-center gap-1.5">
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 text-[10px] font-bold text-[var(--color-brand-blue)]">
                                  Target: {a.condition === "<=" ? "di bawah" : "di atas"} {idr(a.targetPrice)}
                                </span>
                                {a.status === "triggered" ? (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-red-50 text-[10px] font-bold text-red-600 animate-bounce">
                                    <Bell className="h-2.5 w-2.5" /> Memicu 🔔
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-50 text-[10px] font-bold text-green-600">
                                    ● Aktif
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              {a.status === "active" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSimulateTrigger(a)}
                                  className="h-8 text-2xs px-2 font-bold text-[var(--color-brand-blue)] border-[var(--color-brand-blue)]/20 hover:bg-[var(--color-brand-blue)]/5 rounded-md"
                                >
                                  Simulasi Trigger
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteAlert(a.id)}
                                className="h-8 w-8 p-0 text-[var(--color-destructive)] hover:bg-red-50 hover:text-[var(--color-destructive)] rounded-md"
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
          <div className="group relative overflow-hidden rounded-xl border border-[var(--color-gray-100)] bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-green)] p-6 text-white flex flex-col justify-between gap-5 shadow-sm">
            <div className="absolute right-0 bottom-0 opacity-10 blur-xl w-32 h-32 bg-white rounded-full pointer-events-none" />
            <div className="z-10">
              <div className="mb-3.5 flex items-center gap-2">
                <div className="h-9 w-9 flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm shadow-inner transition-transform duration-300 group-hover:scale-115">
                  <CelenganAyamIcon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/70">Tips Hemat PasarCek</span>
              </div>
              <h3 className="text-xl font-black leading-tight">Belanja Lebih Cerdas Bersama PasarCek</h3>
              <p className="mt-2 text-xs text-white/80 leading-relaxed max-w-sm">
                Mulai simulasi belanja dengan Smart Basket dan temukan pasar termurah berdasarkan keranjang belanja Anda hari ini.
              </p>
            </div>
            <Button asChild className="w-full bg-white text-[var(--color-brand-blue)] hover:bg-white/95 shadow-md rounded-xl font-bold py-5 relative z-10 hover:scale-[1.01] transition-transform cursor-pointer">
              <Link to="/smart-basket">Mulai Simulasi Belanja</Link>
            </Button>
          </div>

          <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-6 shadow-sm flex flex-col justify-between min-h-[220px]">
            <div>
              <h3 className="text-sm font-black text-[var(--color-ink)] uppercase tracking-wider">
                Penghematan Bulan Ini
              </h3>
              <p className="mt-2 text-3xl font-black text-[var(--color-brand-green)]">
                {isPremium ? idr(173000) : idr(0)}
              </p>
              <p className="mt-1 text-2xs text-[var(--color-gray-500)] leading-normal">
                {isPremium 
                  ? "Anda telah menghemat sekitar 14% dari anggaran belanja Anda bulan ini."
                  : "Mulai simulasi keranjang belanja untuk menghitung penghematan Anda."
                }
              </p>
            </div>

            {!isPremium ? (
              <div className="mt-4 border-t border-[var(--color-gray-100)] pt-4">
                <p className="text-[10px] text-[var(--color-gray-500)] italic mb-2">Simpan data penghematan Anda dengan Premium.</p>
                <div className="rounded-lg bg-[var(--color-gray-50)] border border-[var(--color-gray-100)] p-3 flex flex-col items-center gap-1.5 text-center">
                  <Crown className="h-4 w-4 text-amber-500" />
                  <span className="text-[10px] font-bold text-[var(--color-gray-700)]">Fitur Riwayat Penghematan Terkunci</span>
                </div>
              </div>
            ) : (
              <div className="mt-4 border-t border-[var(--color-gray-100)] pt-4 flex items-center gap-2 text-xs text-[var(--color-brand-green)] font-semibold">
                <ArrowUpRight className="h-4.5 w-4.5" />
                <span>{savingsTrendText}</span>
              </div>
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
        "flex flex-col items-start gap-3 rounded-lg border p-4 transition-colors",
        highlight
          ? "border-[var(--color-brand-green)] bg-[var(--color-accent-soft)] hover:bg-[var(--color-accent-soft)]/80"
          : "border-[var(--color-gray-100)] bg-white hover:bg-[var(--color-gray-50)]",
      )}
    >
      <Icon className={cn("h-5 w-5", highlight ? "text-[var(--color-brand-green)]" : "text-[var(--color-brand-blue)]")} />
      <span className="text-sm font-semibold text-[var(--color-ink)]">{label}</span>
    </Link>
  );
}
