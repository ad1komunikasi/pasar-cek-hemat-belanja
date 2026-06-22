import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatCard } from "@/components/app-shell";
import { idr } from "@/lib/format";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/_authenticated/admin/reports")({ component: AdminReports });

function AdminReports() {
  const { data } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => {
      const { data: orders } = await supabase.from("orders").select("amount,created_at,status");
      const byDay = new Map<string, number>();
      (orders ?? []).filter((o: any) => o.status === "active" || o.status === "paid").forEach((o: any) => {
        const k = o.created_at.slice(0, 10);
        byDay.set(k, (byDay.get(k) ?? 0) + Number(o.amount));
      });
      const series = Array.from(byDay.entries()).sort().map(([d, v]) => ({ date: d.slice(5), revenue: v }));
      const total = series.reduce((s, r) => s + r.revenue, 0);
      return { series, total, count: orders?.length ?? 0 };
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
    </>
  );
}
