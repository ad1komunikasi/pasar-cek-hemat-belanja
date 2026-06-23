import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, StatCard, Section, EmptyState } from "@/components/app-shell";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, MapPin, ShoppingBasket, Bell, Scale, Search, Crown, PiggyBank } from "lucide-react";
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
      const today = new Date().toISOString().slice(0, 10);
      
      const { data: latestDateRow } = await supabase
        .from("product_prices")
        .select("recorded_at")
        .order("recorded_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      
      const dateToUse = latestDateRow?.recorded_at || today;

      const [prices, markets, unread, baskets] = await Promise.all([
        supabase.from("product_prices").select("id", { count: "exact", head: true }).eq("recorded_at", dateToUse),
        supabase.from("markets").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("notifications").select("id", { count: "exact", head: true }).is("read_at", null).eq("user_id", user!.id),
        supabase.from("smart_baskets").select("id", { count: "exact", head: true }).eq("user_id", user!.id),
      ]);
      return {
        priceUpdates: prices.count ?? 0,
        markets: markets.count ?? 0,
        unread: unread.count ?? 0,
        baskets: baskets.count ?? 0,
      };
    },
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
        <div className="rounded-lg border border-[var(--color-gray-100)] bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-green)] p-6 text-white lg:col-span-2">
          <PiggyBank className="mb-3 h-8 w-8" />
          <h3 className="text-2xl font-black">Belanja Lebih Cerdas Bersama PasarCek</h3>
          <p className="mt-2 text-white/85">Mulai simulasi belanja dengan Smart Basket dan temukan pasar termurah berdasarkan keranjang Anda.</p>
          <Button asChild className="mt-4 bg-white text-[var(--color-brand-blue)] hover:bg-white/90">
            <Link to="/smart-basket">Mulai Simulasi Belanja</Link>
          </Button>
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
