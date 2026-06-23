import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { a as StatCard } from "./app-shell-JvQTbMhg.js";
import { useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { Users, ShoppingCart, Clock, DollarSign } from "lucide-react";
import { i as idr } from "./format-C1KpzYiq.js";
import "@tanstack/react-router";
import "react";
import "./router-KEMZH_Q0.js";
import "sonner";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
function AdminDashboard() {
  const {
    data
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [users, orders, pending, paid] = await Promise.all([supabase.from("profiles").select("id", {
        count: "exact",
        head: true
      }), supabase.from("orders").select("id", {
        count: "exact",
        head: true
      }), supabase.from("orders").select("id", {
        count: "exact",
        head: true
      }).in("status", ["proof_uploaded", "verifying"]), supabase.from("orders").select("amount").in("status", ["paid", "active"])]);
      const revenue = (paid.data ?? []).reduce((s, o) => s + Number(o.amount), 0);
      return {
        users: users.count ?? 0,
        orders: orders.count ?? 0,
        pending: pending.count ?? 0,
        revenue
      };
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-8 text-3xl font-black", children: "Admin Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Total User", value: data?.users ?? 0, icon: Users, accent: "blue" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Total Pesanan", value: data?.orders ?? 0, icon: ShoppingCart, accent: "green" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Menunggu Verifikasi", value: data?.pending ?? 0, icon: Clock, accent: "warning" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Pendapatan", value: idr(data?.revenue ?? 0), icon: DollarSign, accent: "green" })
    ] })
  ] });
}
export {
  AdminDashboard as component
};
