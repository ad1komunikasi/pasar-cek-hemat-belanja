import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as StatCard } from "./app-shell-JvQTbMhg.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-koMOzLtV.mjs";
import { i as idr } from "./format-C1KpzYiq.mjs";
import "../_libs/sonner.mjs";
import { i as Users, V as ShoppingCart, c as Clock, $ as DollarSign } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./router-KEMZH_Q0.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-8 text-3xl font-black", children: "Admin Dashboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total User", value: data?.users ?? 0, icon: Users, accent: "blue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Pesanan", value: data?.orders ?? 0, icon: ShoppingCart, accent: "green" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Menunggu Verifikasi", value: data?.pending ?? 0, icon: Clock, accent: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Pendapatan", value: idr(data?.revenue ?? 0), icon: DollarSign, accent: "green" })
    ] })
  ] });
}
export {
  AdminDashboard as component
};
