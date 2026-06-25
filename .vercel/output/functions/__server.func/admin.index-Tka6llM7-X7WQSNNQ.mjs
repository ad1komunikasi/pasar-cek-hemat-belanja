import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  StatCard
} from "./chunk-4Z6KH5LH.mjs";
import {
  idr
} from "./chunk-LEY4RZ2W.mjs";
import "./chunk-G57E4XNL.mjs";
import "./chunk-C7CN73EW.mjs";
import {
  useQuery
} from "./chunk-DH7FIRD7.mjs";
import "./chunk-Y5N26HX3.mjs";
import {
  supabase
} from "./chunk-2FS42ITU.mjs";
import {
  require_lucide_react
} from "./chunk-NDUCSHRX.mjs";
import "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/admin.index-Tka6llM7.js
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
