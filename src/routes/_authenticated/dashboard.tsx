import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, StatCard, Section, EmptyState } from "@/components/app-shell";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, MapPin, ShoppingBasket, Bell, Scale, Search, Crown } from "lucide-react";
import celenganAyam from "@/assets/celengan-ayam.png";
import { Button } from "@/components/ui/button";
import { idr } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — PasarCek" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const { profile, user } = useAuth();

  const { data } = useQuery({
    queryKey: ["dashboard-stats", user?.id],
    queryFn: async () => {
      if (!user?.id) return { priceUpdates: 0, markets: 0, unread: 0, baskets: 0 };
      const today = new Date().toLocaleDateString('en-CA');
      
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

      const [pricesRes, marketsRes, productsRes, unread, baskets] = await Promise.all([
        supabase.from("product_prices").select("id", { count: "exact", head: true }).eq("recorded_at", dateToUse),
        supabase.from("markets").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("notifications").select("id", { count: "exact", head: true }).is("read_at", null).eq("user_id", user.id),
        supabase.from("smart_baskets").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      ]);

      const marketsCount = marketsRes.count ?? 0;
      const productsCount = productsRes.count ?? 0;
      
      // Because we merge DB prices with benchmark prices, all product-market combinations are covered.
      const priceUpdates = productsCount * marketsCount;

      return {
        priceUpdates,
        markets: marketsCount,
        unread: unread.count ?? 0,
        baskets: baskets.count ?? 0,
      };
    },
    enabled: !!user?.id,
  });

  return (
    <AppShell>
      <PageHeader
        title={`Halo, ${profile?.full_name ?? "Sahabat PasarCek"} 👋`}
        description="Hemat Belanja Hari Ini — pantau harga, bandingkan pasar, dan temukan keranjang termurah."
      />

      <Section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Harga Hari Ini" value={data?.priceUpdates ?? 0} hint="Update harga sembako" icon={TrendingUp} accent="blue" />
          <StatCard label="Pasar Terdekat" value={data?.markets ?? 0} hint="Pasar aktif" icon={MapPin} accent="green" />
          <StatCard label="Smart Basket" value={data?.baskets ?? 0} hint="Simulasi tersimpan" icon={ShoppingBasket} accent="warning" />
          <StatCard label="Notifikasi Baru" value={data?.unread ?? 0} hint="Belum dibaca" icon={Bell} accent="danger" />
        </div>
      </Section>

      <Section title="Aksi Cepat">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <QuickAction to="/prices" icon={TrendingUp} label="Harga Hari Ini" />
          <QuickAction to="/compare" icon={Scale} label="Bandingkan" />
          <QuickAction to="/markets" icon={Search} label="Cari Pasar" />
          <QuickAction to="/smart-basket" icon={ShoppingBasket} label="Smart Basket" />
          <QuickAction to="/pricing" icon={Crown} label="Upgrade" highlight />
        </div>
      </Section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="group relative overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-green)] p-6 text-white lg:col-span-2 flex flex-col justify-between md:flex-row md:items-center gap-6">
          <div className="flex-1 z-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-[#1e3a8a] shadow-inner transition-transform duration-300 group-hover:scale-110">
                <img src={celenganAyam} alt="Celengan Ayam" className="h-full w-full object-cover" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/70">Tips Hemat</span>
            </div>
            <h3 className="text-2xl font-black leading-tight">Belanja Lebih Cerdas Bersama PasarCek</h3>
            <p className="mt-2 text-sm text-white/85 max-w-xl">Mulai simulasi belanja dengan Smart Basket dan temukan pasar termurah berdasarkan keranjang Anda.</p>
            <Button asChild className="mt-4 bg-white text-[var(--color-brand-blue)] hover:bg-white/90 shadow-md">
              <Link to="/smart-basket">Mulai Simulasi Belanja</Link>
            </Button>
          </div>
          <div className="hidden sm:block flex-shrink-0 self-center md:self-auto z-10">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-[#1e3a8a] transition-all duration-300 group-hover:scale-105 group-hover:rotate-2">
              <img src={celenganAyam} alt="Celengan Ayam" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
          <h3 className="text-lg font-bold">Penghematan Bulan Ini</h3>
          <p className="mt-2 text-3xl font-black text-[var(--color-brand-green)]">{idr(0)}</p>
          <p className="mt-1 text-xs text-[var(--color-gray-500)]">Mulai simulasi untuk menghitung penghematan Anda.</p>
          <EmptyState title="Belum ada data" description="Tambahkan produk ke Smart Basket untuk mulai menghitung penghematan." />
        </div>
      </div>
    </AppShell>
  );
}

function QuickAction({ to, icon: Icon, label, highlight }: { to: string; icon: React.ComponentType<{ className?: string }>; label: string; highlight?: boolean }) {
  return (
    <Link to={to} className={`flex flex-col items-start gap-3 rounded-lg border p-4 transition-colors ${highlight ? "border-[var(--color-brand-green)] bg-[var(--color-accent-soft)] hover:bg-[var(--color-accent-soft)]/80" : "border-[var(--color-gray-100)] bg-white hover:bg-[var(--color-gray-50)]"}`}>
      <Icon className={`h-5 w-5 ${highlight ? "text-[var(--color-brand-green)]" : "text-[var(--color-brand-blue)]"}`} />
      <span className="text-sm font-semibold text-[var(--color-ink)]">{label}</span>
    </Link>
  );
}
