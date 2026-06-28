import { createFileRoute, Link } from "@tanstack/react-router";
import { StatCard } from "@/components/app-shell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, ShoppingCart, DollarSign, Clock, ArrowUpRight, Activity, ShieldAlert, CheckCircle2 } from "lucide-react";
import { idr, fmtDate, fmtDateTime } from "@/lib/format";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
  head: () => ({ meta: [{ title: "Admin Console — PasarCek" }] }),
});

function AdminDashboard() {
  // 1. Core Summary Stats
  const { data: stats } = useQuery({
    queryKey: ["admin-stats-summary"],
    queryFn: async () => {
      const [usersRes, ordersRes, pendingRes, paidRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }).in("status", ["proof_uploaded", "verifying"]),
        supabase.from("orders").select("amount").in("status", ["paid", "active"]),
      ]);
      const revenue = (paidRes.data ?? []).reduce((s: number, o: any) => s + Number(o.amount), 0);
      return { 
        users: usersRes.count ?? 0, 
        orders: ordersRes.count ?? 0, 
        pending: pendingRes.count ?? 0, 
        revenue 
      };
    },
  });

  // 2. Chart Revenue Data
  const { data: chartData } = useQuery({
    queryKey: ["admin-chart-data"],
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select("created_at, amount")
        .in("status", ["paid", "active"]);

      const groups: Record<string, number> = {};
      // Seed last 7 days
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const label = d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
        groups[label] = 0;
      }

      (data ?? []).forEach((o) => {
        if (!o.created_at) return;
        const label = new Date(o.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
        if (groups[label] !== undefined) {
          groups[label] += Number(o.amount);
        }
      });

      return Object.entries(groups).map(([date, revenue]) => ({
        date,
        revenue,
      }));
    },
  });

  // 3. Pending Verification Requests
  const { data: pendingVerifications } = useQuery({
    queryKey: ["admin-pending-verifications"],
    queryFn: async () => {
      return (
        await supabase
          .from("orders")
          .select("id, amount, status, created_at, package:packages(name), profile:profiles(full_name, email)")
          .in("status", ["proof_uploaded", "verifying"])
          .order("created_at", { ascending: false })
          .limit(4)
      ).data ?? [];
    },
  });

  // 4. Recent Transactions (All status)
  const { data: recentTransactions } = useQuery({
    queryKey: ["admin-recent-transactions"],
    queryFn: async () => {
      return (
        await supabase
          .from("orders")
          .select("id, amount, status, created_at, package:packages(name), profile:profiles(full_name)")
          .order("created_at", { ascending: false })
          .limit(5)
      ).data ?? [];
    },
  });

  // 5. Recent User Signups
  const { data: recentUsers } = useQuery({
    queryKey: ["admin-recent-users"],
    queryFn: async () => {
      return (
        await supabase
          .from("profiles")
          .select("id, full_name, email, created_at")
          .order("created_at", { ascending: false })
          .limit(5)
      ).data ?? [];
    },
  });

  const num = (n: number) => new Intl.NumberFormat("id-ID").format(n);

  return (
    <>
      {/* Swiss grid header */}
      <div className="mb-10 border-b border-black pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-4xl font-extrabold tracking-tighter text-[var(--color-ink)] sm:text-5xl uppercase leading-none">
            Admin Operations Dashboard
          </h1>
          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[var(--color-gray-500)]">
            Enterprise Console — pantau performa finansial, verifikasi status premium, dan logs aktivitas platform.
          </p>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Pengguna" value={stats?.users ?? 0} icon={Users} accent="blue" />
        <StatCard label="Volume Pesanan" value={stats?.orders ?? 0} icon={ShoppingCart} accent="green" />
        <StatCard label="Menunggu Verifikasi" value={stats?.pending ?? 0} hint="Aksi manual diperlukan" icon={Clock} accent="danger" />
        <StatCard label="Total Pendapatan" value={idr(stats?.revenue ?? 0)} icon={DollarSign} accent="green" />
      </div>

      {/* Data-First Analytics Split Grid */}
      <div className="grid gap-6 lg:grid-cols-3 mt-8">
        {/* Left Double Column (Charts & Lists) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Chart */}
          <div className="rounded-none border border-[var(--color-gray-200)] bg-white p-6">
            <div className="mb-4 flex justify-between items-baseline border-b border-zinc-200 pb-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-[var(--color-ink)]">Indeks Pendapatan Harian (Lunas)</h3>
              <span className="text-[10px] text-[var(--color-gray-500)] font-bold uppercase">7 Hari Terakhir</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="0" stroke="var(--color-gray-200)" />
                  <XAxis dataKey="date" tickLine={false} axisLine={true} tick={{ fontSize: 9, fill: "var(--color-gray-500)", fontWeight: "bold" }} />
                  <YAxis tickLine={false} axisLine={true} tick={{ fontSize: 9, fill: "var(--color-gray-500)", fontWeight: "bold" }} tickFormatter={(v: number) => `Rp ${num(v / 1000)}k`} />
                  <Tooltip formatter={(value) => [idr(Number(value)), "Pendapatan"]} labelStyle={{ fontWeight: "bold", fontSize: 11 }} />
                  <Bar dataKey="revenue" fill="#111111" radius={0} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions Table */}
          <div className="rounded-none border border-[var(--color-gray-200)] bg-white p-6">
            <div className="mb-4 flex justify-between items-baseline border-b border-zinc-200 pb-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-[var(--color-ink)]">Daftar Transaksi Terbaru</h3>
              <Link to="/admin/orders" className="text-[10px] font-black uppercase tracking-wider text-[var(--color-swiss-red)] hover:underline">Semua Transaksi →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-black bg-[var(--color-gray-50)]">
                    <th className="p-3 font-black uppercase tracking-wider text-[var(--color-gray-500)] text-[10px]">Tanggal</th>
                    <th className="p-3 font-black uppercase tracking-wider text-[var(--color-gray-500)] text-[10px]">User</th>
                    <th className="p-3 font-black uppercase tracking-wider text(--color-gray-500) text-[10px]">Paket</th>
                    <th className="p-3 font-black uppercase tracking-wider text-[var(--color-gray-500)] text-[10px] text-right">Nominal</th>
                    <th className="p-3 font-black uppercase tracking-wider text-[var(--color-gray-500)] text-[10px] text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-gray-100)]">
                  {(recentTransactions ?? []).map((o: any) => (
                    <tr key={o.id} className="hover:bg-[var(--color-gray-50)]/50 transition-colors">
                      <td className="p-3 text-[var(--color-gray-700)]">{fmtDate(o.created_at)}</td>
                      <td className="p-3 font-bold text-[var(--color-ink)] uppercase tracking-tight">{o.profile?.full_name ?? "Sistem User"}</td>
                      <td className="p-3 font-medium text-[var(--color-gray-700)]">{o.package?.name ?? "Premium Pack"}</td>
                      <td className="p-3 font-black text-right text-[var(--color-ink)]">{idr(o.amount)}</td>
                      <td className="p-3 text-right">
                        <span className={cn(
                          "inline-flex items-center px-1.5 py-0.5 text-[9px] font-black uppercase rounded-none border",
                          o.status === "active" || o.status === "paid"
                            ? "bg-emerald-50 text-[var(--color-brand-green)] border-emerald-100"
                            : o.status === "proof_uploaded" || o.status === "verifying"
                            ? "bg-amber-50 text-[var(--color-warning)] border-amber-100"
                            : "bg-red-50 text-[var(--color-swiss-red)] border-red-100"
                        )}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(recentTransactions ?? []).length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-[var(--color-gray-500)] font-medium">Belum ada transaksi di platform.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Single Column (Verifications & Feed) */}
        <div className="space-y-6">
          {/* Verification Requests Box */}
          <div className="rounded-none border border-[var(--color-gray-200)] bg-white p-6">
            <div className="mb-4 flex justify-between items-baseline border-b border-zinc-200 pb-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-[var(--color-ink)]">Antrean Verifikasi</h3>
              {stats?.pending && stats.pending > 0 ? (
                <span className="inline-flex h-4.5 items-center justify-center bg-[var(--color-swiss-red)] px-2 text-[9px] font-black text-white uppercase tracking-wider animate-pulse">
                  {stats.pending} Baru
                </span>
              ) : null}
            </div>

            {/* List */}
            <div className="space-y-4">
              {(pendingVerifications ?? []).map((o: any) => (
                <div key={o.id} className="border-l-2 border-[var(--color-swiss-red)] bg-[var(--color-gray-50)]/50 p-3 hover:bg-[var(--color-gray-50)] transition-all">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] font-black text-[var(--color-ink)] uppercase tracking-tight truncate">
                        {o.profile?.full_name ?? "Tanpa Nama"}
                      </p>
                      <p className="text-[9px] text-[var(--color-gray-500)] truncate mt-0.5">{o.profile?.email}</p>
                    </div>
                    <span className="text-[10px] font-black text-black shrink-0">{idr(o.amount)}</span>
                  </div>
                  <div className="mt-2.5 flex justify-between items-center gap-2 border-t border-[var(--color-gray-100)] pt-2">
                    <span className="text-[9px] font-bold text-[var(--color-gray-500)]">{o.package?.name}</span>
                    <Link to="/admin/orders" className="text-[9px] font-black uppercase tracking-wider text-[var(--color-swiss-red)] hover:no-underline">
                      Verifikasi →
                    </Link>
                  </div>
                </div>
              ))}

              {(pendingVerifications ?? []).length === 0 && (
                <div className="text-center py-8 text-[var(--color-gray-500)] text-xs font-medium flex flex-col items-center gap-2 border border-dashed rounded-none">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Semua transaksi lunas terverifikasi.
                </div>
              )}
            </div>
          </div>

          {/* New User Registrations Box */}
          <div className="rounded-none border border-[var(--color-gray-200)] bg-white p-6">
            <div className="mb-4 border-b border-zinc-200 pb-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-[var(--color-ink)]">User Registrasi Terkini</h3>
            </div>
            <div className="divide-y divide-[var(--color-gray-100)]">
              {(recentUsers ?? []).map((u: any) => (
                <div key={u.id} className="py-2.5 flex justify-between items-center gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-tight truncate">{u.full_name ?? "User Baru"}</p>
                    <p className="text-[9px] text-[var(--color-gray-500)] truncate mt-0.5">{u.email}</p>
                  </div>
                  <span className="text-[9px] font-medium text-[var(--color-gray-500)] shrink-0">{fmtDate(u.created_at)}</span>
                </div>
              ))}
              {(recentUsers ?? []).length === 0 && (
                <div className="text-center py-6 text-[var(--color-gray-500)] text-xs font-medium">Belum ada pengguna terdaftar.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
