import {
  StatCard
} from "./chunk-XZNSYGQD.mjs";
import {
  idr
} from "./chunk-HQLZASKI.mjs";
import {
  require_lucide_react
} from "./chunk-KJB73ZNG.mjs";
import "./chunk-UC4BMYGH.mjs";
import "./chunk-KIHGSOXA.mjs";
import {
  useQuery
} from "./chunk-76F7W2CF.mjs";
import {
  supabase
} from "./chunk-7GEO44MB.mjs";
import "./chunk-G46AXIAP.mjs";
import "./chunk-TV3ZUI3R.mjs";
import "./chunk-RE5W7UZM.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-MLKSHREV.mjs";
import {
  __toESM
} from "./chunk-KVSJYO5R.mjs";

// dist/server/assets/admin.index-C3oBerR-.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
var import_react = __toESM(require_react(), 1);
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "mb-8 text-3xl font-black", children: "Admin Dashboard" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, { label: "Total User", value: data?.users ?? 0, icon: import_lucide_react.Users, accent: "blue" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, { label: "Total Pesanan", value: data?.orders ?? 0, icon: import_lucide_react.ShoppingCart, accent: "green" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, { label: "Menunggu Verifikasi", value: data?.pending ?? 0, icon: import_lucide_react.Clock, accent: "warning" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, { label: "Pendapatan", value: idr(data?.revenue ?? 0), icon: import_lucide_react.DollarSign, accent: "green" })
    ] })
  ] });
}
export {
  AdminDashboard as component
};
