import { createFileRoute } from "@tanstack/react-router";
import { StatCard } from "@/components/app-shell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, ShoppingCart, DollarSign, Clock } from "lucide-react";
import { idr } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [users, orders, pending, paid] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }).in("status", ["proof_uploaded", "verifying"]),
        supabase.from("orders").select("amount").in("status", ["paid", "active"]),
      ]);
      const revenue = (paid.data ?? []).reduce((s: number, o: any) => s + Number(o.amount), 0);
      return { users: users.count ?? 0, orders: orders.count ?? 0, pending: pending.count ?? 0, revenue };
    },
  });
  return (
    <>
      <h1 className="mb-8 text-3xl font-black">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total User" value={data?.users ?? 0} icon={Users} accent="blue" />
        <StatCard label="Total Pesanan" value={data?.orders ?? 0} icon={ShoppingCart} accent="green" />
        <StatCard label="Menunggu Verifikasi" value={data?.pending ?? 0} icon={Clock} accent="warning" />
        <StatCard label="Pendapatan" value={idr(data?.revenue ?? 0)} icon={DollarSign} accent="green" />
      </div>
    </>
  );
}
