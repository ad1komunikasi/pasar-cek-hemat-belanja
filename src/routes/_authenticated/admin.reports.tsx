import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatCard } from "@/components/app-shell";
import { idr } from "@/lib/format";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/admin/reports")({ component: AdminReports });

function AdminReports() {
  const { data } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => {
      // 1. Fetch all packages sorted by sort_order
      const { data: packages } = await supabase
        .from("packages")
        .select("id, name, price, slug, is_active")
        .order("sort_order");

      // 2. Fetch all orders (with amount, status, package_id, created_at)
      const { data: orders } = await supabase
        .from("orders")
        .select("amount, created_at, status, package_id");

      // 3. Fetch active subscriptions to count active premium users
      const { data: activeSubs } = await supabase
        .from("subscriptions")
        .select("package_id, user_id")
        .eq("status", "active")
        .gt("expires_at", new Date().toISOString());

      // 4. Fetch total profiles count to deduce "free" users
      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true });

      // Daily revenue chart calculation (same as before)
      const byDay = new Map<string, number>();
      (orders ?? [])
        .filter((o: any) => o.status === "active" || o.status === "paid")
        .forEach((o: any) => {
          const k = o.created_at.slice(0, 10);
          byDay.set(k, (byDay.get(k) ?? 0) + Number(o.amount));
        });
      const series = Array.from(byDay.entries())
        .sort()
        .map(([d, v]) => ({ date: d.slice(5), revenue: v }));
      const total = series.reduce((s, r) => s + r.revenue, 0);

      // --- Aggregation logic for packages ---
      // Map active subscriptions count per package
      const activeSubsCountByPackage = new Map<string, number>();
      const activeSubscribedUsers = new Set<string>();
      (activeSubs ?? []).forEach((sub: any) => {
        activeSubsCountByPackage.set(sub.package_id, (activeSubsCountByPackage.get(sub.package_id) ?? 0) + 1);
        activeSubscribedUsers.add(sub.user_id);
      });

      const totalUsersCount = totalUsers ?? 0;
      const activePremiumCount = activeSubscribedUsers.size;
      const activeFreeCount = Math.max(0, totalUsersCount - activePremiumCount);

      // Aggregate order statistics by package_id
      const statsByPackage = new Map<string, { totalOrders: number; successOrders: number; revenue: number }>();
      (orders ?? []).forEach((order: any) => {
        const pkgId = order.package_id;
        if (!pkgId) return;
        const current = statsByPackage.get(pkgId) ?? { totalOrders: 0, successOrders: 0, revenue: 0 };
        current.totalOrders += 1;
        if (order.status === "active" || order.status === "paid") {
          current.successOrders += 1;
          current.revenue += Number(order.amount);
        }
        statsByPackage.set(pkgId, current);
      });

      // Map to package rows (include free package, premium bulanan, premium tahunan)
      const packageRows = (packages ?? []).map((pkg: any) => {
        const isFree = pkg.price === 0 || pkg.slug === "free";
        const pkgStats = statsByPackage.get(pkg.id) ?? { totalOrders: 0, successOrders: 0, revenue: 0 };

        let activeUsers = 0;
        if (isFree) {
          activeUsers = activeFreeCount;
        } else {
          activeUsers = activeSubsCountByPackage.get(pkg.id) ?? 0;
        }

        return {
          id: pkg.id,
          name: pkg.name,
          slug: pkg.slug,
          price: pkg.price,
          totalOrders: isFree ? "-" : pkgStats.totalOrders,
          successOrders: isFree ? "-" : pkgStats.successOrders,
          revenue: isFree ? 0 : pkgStats.revenue,
          activeUsers,
        };
      });

      return {
        series,
        total,
        count: orders?.length ?? 0,
        packageRows,
      };
    },
  });

  return (
    <>
      <h1 className="mb-6 text-3xl font-black">Laporan</h1>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Pendapatan" value={idr(data?.total ?? 0)} accent="green" />
        <StatCard label="Total Pesanan" value={data?.count ?? 0} accent="blue" />
        <StatCard label="Pesanan Hari Ini" value={(data?.series ?? []).slice(-1)[0]?.revenue ? idr((data?.series ?? []).slice(-1)[0].revenue) : idr(0)} accent="warning" />
      </div>
      
      <div className="space-y-6">
        <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
          <h3 className="mb-4 text-lg font-bold">Pendapatan Harian</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.series ?? []}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(v: number) => idr(v)} />
                <Line type="monotone" dataKey="revenue" stroke="#1e3a8a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
          <h3 className="mb-4 text-lg font-bold">Informasi Penggunaan & Penjualan Paket</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
                <tr>
                  <th className="px-4 py-3">Nama Paket</th>
                  <th className="px-4 py-3 text-right">Harga Satuan</th>
                  <th className="px-4 py-3 text-center">Pengguna Aktif</th>
                  <th className="px-4 py-3 text-center">Total Pesanan</th>
                  <th className="px-4 py-3 text-center">Pesanan Sukses</th>
                  <th className="px-4 py-3 text-right">Total Pendapatan</th>
                  <th className="px-4 py-3 text-right font-semibold">Kontribusi Pendapatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-gray-100)]">
                {(data?.packageRows ?? []).map((row: any) => {
                  const totalRevenue = data?.total ?? 1;
                  const pct = row.revenue > 0 ? ((row.revenue / totalRevenue) * 100).toFixed(1) : "0.0";
                  return (
                    <tr key={row.id} className="hover:bg-[var(--color-gray-50)] transition-colors">
                      <td className="px-4 py-3 font-semibold text-[var(--color-gray-900)]">
                        <div className="flex items-center gap-2">
                          <span>{row.name}</span>
                          {row.slug === "free" && (
                            <Badge className="bg-[var(--color-gray-100)] text-[var(--color-gray-600)] border-0 text-[10px] px-1.5 py-0">
                              Bawaan
                            </Badge>
                          )}
                          {row.slug === "premium" && (
                            <Badge className="bg-blue-100 text-blue-800 border-0 text-[10px] px-1.5 py-0 font-semibold">
                              Populer
                            </Badge>
                          )}
                          {row.slug === "tahunan" && (
                            <Badge className="bg-green-100 text-green-800 border-0 text-[10px] px-1.5 py-0 font-semibold">
                              Hemat 17%
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-[var(--color-gray-700)]">
                        {row.price === 0 ? "Gratis" : idr(row.price)}
                      </td>
                      <td className="px-4 py-3 text-center font-medium text-[var(--color-gray-800)]">
                        {row.activeUsers} user
                      </td>
                      <td className="px-4 py-3 text-center text-[var(--color-gray-600)]">
                        {row.totalOrders}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.successOrders === "-" ? (
                          <span className="text-[var(--color-gray-600)]">-</span>
                        ) : (
                          <span className="font-semibold text-[var(--color-success)]">{row.successOrders}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-[var(--color-gray-900)]">
                        {row.price === 0 ? "Rp0" : idr(row.revenue)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-[var(--color-gray-900)]">
                        {row.price === 0 ? "0.0%" : `${pct}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
