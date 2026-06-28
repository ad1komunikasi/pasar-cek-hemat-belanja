import { createFileRoute, Link } from "@tanstack/react-router";
import { StatCard } from "@/components/app-shell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Clock,
  ArrowUpRight,
  Activity,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
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
        supabase
          .from("orders")
          .select("id", { count: "exact", head: true })
          .in("status", ["proof_uploaded", "verifying"]),
        supabase.from("orders").select("amount").in("status", ["paid", "active"]),
      ]);
      const revenue = (paidRes.data ?? []).reduce((s: number, o: any) => s + Number(o.amount), 0);
      return {
        users: usersRes.count ?? 0,
        orders: ordersRes.count ?? 0,
        pending: pendingRes.count ?? 0,
        revenue,
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
        const label = new Date(o.created_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
        });
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
        (
          await supabase
            .from("orders")
            .select(
              "id, amount, status, created_at, package:packages(name), profile:profiles(full_name, email)",
            )
            .in("status", ["proof_uploaded", "verifying"])
            .order("created_at", { ascending: false })
            .limit(4)
        ).data ?? []
      );
    },
  });

  // 4. Recent Transactions (All status)
  const { data: recentTransactions } = useQuery({
    queryKey: ["admin-recent-transactions"],
    queryFn: async () => {
      return (
        (
          await supabase
            .from("orders")
            .select(
              "id, amount, status, created_at, package:packages(name), profile:profiles(full_name)",
            )
            .order("created_at", { ascending: false })
            .limit(5)
        ).data ?? []
      );
    },
  });

  // 5. Recent User Signups
  const { data: recentUsers } = useQuery({
    queryKey: ["admin-recent-users"],
    queryFn: async () => {
      return (
        (
          await supabase
            .from("profiles")
            .select("id, full_name, email, created_at")
            .order("created_at", { ascending: false })
            .limit(5)
        ).data ?? []
      );
    },
  });

  const num = (n: number) => new Intl.NumberFormat("id-ID").format(n);

  return (
    <>
      {/* Header */}
      <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <h1 className="flex items-center gap-2.5 flex-wrap text-3xl font-black tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-[var(--color-gray-500)] sm:text-base">
            Enterprise Console — pantau performa finansial, verifikasi status premium, dan logs aktivitas platform.
          </p>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Pengguna" value={stats?.users ?? 0} icon={Users} accent="blue" />
        <StatCard
          label="Volume Pesanan"
          value={stats?.orders ?? 0}
          icon={ShoppingCart}
          accent="green"
        />
        <StatCard
          label="Menunggu Verifikasi"
          value={stats?.pending ?? 0}
          hint="Aksi manual diperlukan"
          icon={Clock}
          accent="warning"
        />
        <StatCard
          label="Total Pendapatan"
          value={idr(stats?.revenue ?? 0)}
          icon={DollarSign}
          accent="green"
        />
      </div>

      {/* Data split grid */}
      <div className="grid gap-6 lg:grid-cols-3 mt-8">
        {/* Left Double Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Chart */}
          <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6 shadow-sm">
            <div className="mb-4 flex justify-between items-baseline border-b border-[var(--color-gray-100)] pb-3">
              <h3 className="text-sm font-bold text-[var(--color-ink)]">
                Indeks Pendapatan Harian (Lunas)
              </h3>
              <span className="text-xs text-[var(--color-gray-500)] font-medium">
                7 Hari Terakhir
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-gray-100)" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "var(--color-gray-500)" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "var(--color-gray-500)" }}
                    tickFormatter={(v: number) => `Rp ${num(v / 1000)}k`}
                  />
                  <Tooltip
                    formatter={(value) => [idr(Number(value)), "Pendapatan"]}
                    labelStyle={{ fontWeight: "bold", fontSize: 12 }}
                  />
                  <Bar dataKey="revenue" fill="var(--color-brand-blue)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions Table */}
          <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6 shadow-sm">
            <div className="mb-4 flex justify-between items-baseline border-b border-[var(--color-gray-100)] pb-3">
              <h3 className="text-sm font-bold text-[var(--color-ink)]">
                Daftar Transaksi Terbaru
              </h3>
              <Link
                to="/admin/orders"
                className="text-xs font-semibold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-green)] transition-colors"
              >
                Semua Transaksi →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[var(--color-gray-100)] bg-[var(--color-gray-50)]/50">
                    <th className="p-3 font-semibold text-[var(--color-gray-500)]">
                      Tanggal
                    </th>
                    <th className="p-3 font-semibold text-[var(--color-gray-500)]">
                      User
                    </th>
                    <th className="p-3 font-semibold text-[var(--color-gray-500)]">
                      Paket
                    </th>
                    <th className="p-3 font-semibold text-[var(--color-gray-500)] text-right">
                      Nominal
                    </th>
                    <th className="p-3 font-semibold text-[var(--color-gray-500)] text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-gray-100)]">
                  {(recentTransactions ?? []).map((o: any) => (
                    <tr key={o.id} className="hover:bg-[var(--color-gray-50)]/50 transition-colors">
                      <td className="p-3 text-[var(--color-gray-700)]">{fmtDate(o.created_at)}</td>
                      <td className="p-3 font-semibold text-[var(--color-ink)]">
                        {o.profile?.full_name ?? "Sistem User"}
                      </td>
                      <td className="p-3 text-[var(--color-gray-700)]">
                        {o.package?.name ?? "Premium Pack"}
                      </td>
                      <td className="p-3 font-bold text-right text-[var(--color-ink)]">
                        {idr(o.amount)}
                      </td>
                      <td className="p-3 text-right">
                        <span
                          className={cn(
                            "inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded border",
                            o.status === "active" || o.status === "paid"
                              ? "bg-green-50 text-[var(--color-brand-green)] border-green-100"
                              : o.status === "proof_uploaded" || o.status === "verifying"
                                ? "bg-amber-50 text-[var(--color-warning)] border-amber-100"
                                : "bg-red-50 text-[var(--color-destructive)] border-red-100",
                          )}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(recentTransactions ?? []).length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-8 text-center text-[var(--color-gray-500)] font-medium"
                      >
                        Belum ada transaksi di platform.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Single Column */}
        <div className="space-y-6">
          {/* Verification Requests Box */}
          <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6 shadow-sm">
            <div className="mb-4 flex justify-between items-baseline border-b border-[var(--color-gray-100)] pb-3">
              <h3 className="text-sm font-bold text-[var(--color-ink)]">
                Antrean Verifikasi
              </h3>
              {stats?.pending && stats.pending > 0 ? (
                <span className="inline-flex h-5 items-center justify-center rounded-full bg-red-100 px-2 text-[10px] font-semibold text-red-600 animate-pulse">
                  {stats.pending} Baru
                </span>
              ) : null}
            </div>

            {/* List */}
            <div className="space-y-3">
              {(pendingVerifications ?? []).map((o: any) => (
                <div
                  key={o.id}
                  className="border-l-2 border-[var(--color-brand-blue)] bg-[var(--color-gray-50)]/50 p-3 rounded-r-md hover:bg-[var(--color-gray-50)] transition-all"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[var(--color-ink)] truncate">
                        {o.profile?.full_name ?? "Tanpa Nama"}
                      </p>
                      <p className="text-[10px] text-[var(--color-gray-500)] truncate mt-0.5">
                        {o.profile?.email}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-800 shrink-0">
                      {idr(o.amount)}
                    </span>
                  </div>
                  <div className="mt-2.5 flex justify-between items-center gap-2 border-t border-[var(--color-gray-100)]/60 pt-2">
                    <span className="text-[10px] text-[var(--color-gray-500)]">{o.package?.name}</span>
                    <Link
                      to="/admin/orders"
                      className="text-[10px] font-semibold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-green)] transition-colors"
                    >
                      Verifikasi →
                    </Link>
                  </div>
                </div>
              ))}

              {(pendingVerifications ?? []).length === 0 && (
                <div className="text-center py-8 text-[var(--color-gray-500)] text-xs font-medium flex flex-col items-center gap-2 border border-dashed border-[var(--color-gray-100)] rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Semua transaksi terverifikasi.
                </div>
              )}
            </div>
          </div>

          {/* New User Registrations Box */}
          <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6 shadow-sm">
            <div className="mb-4 border-b border-[var(--color-gray-100)] pb-3">
              <h3 className="text-sm font-bold text-[var(--color-ink)]">
                User Registrasi Terkini
              </h3>
            </div>
            <div className="divide-y divide-[var(--color-gray-100)]">
              {(recentUsers ?? []).map((u: any) => (
                <div key={u.id} className="py-2.5 flex justify-between items-center gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[var(--color-ink)] truncate">{u.full_name ?? "User Baru"}</p>
                    <p className="text-[10px] text-[var(--color-gray-500)] truncate mt-0.5">{u.email}</p>
                  </div>
                  <span className="text-[10px] text-[var(--color-gray-500)] shrink-0">{fmtDate(u.created_at)}</span>
                </div>
              ))}
              {(recentUsers ?? []).length === 0 && (
                <div className="text-center py-6 text-[var(--color-gray-500)] text-xs font-medium">
                  Belum ada pengguna terdaftar.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
