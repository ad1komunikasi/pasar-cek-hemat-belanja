import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  require_lucide_react
} from "./chunk-NDUCSHRX.mjs";
import {
  cn
} from "./chunk-Y5N26HX3.mjs";
import {
  Link,
  Outlet,
  useRouterState
} from "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/admin-iXIuWLhr.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
var adminNav = [{
  to: "/admin",
  label: "Dashboard",
  icon: import_lucide_react.Shield,
  exact: true
}, {
  to: "/admin/users",
  label: "Pengguna",
  icon: import_lucide_react.Users
}, {
  to: "/admin/packages",
  label: "Paket",
  icon: import_lucide_react.Package
}, {
  to: "/admin/orders",
  label: "Pesanan",
  icon: import_lucide_react.ShoppingCart
}, {
  to: "/admin/payments",
  label: "Pembayaran",
  icon: import_lucide_react.CreditCard
}, {
  to: "/admin/markets",
  label: "Pasar",
  icon: import_lucide_react.Store
}, {
  to: "/admin/products",
  label: "Produk",
  icon: import_lucide_react.Boxes
}, {
  to: "/admin/reports",
  label: "Laporan",
  icon: import_lucide_react.BarChart3
}, {
  to: "/admin/auth-monitor",
  label: "Auth Monitor",
  icon: import_lucide_react.LogIn
}, {
  to: "/admin/settings",
  label: "Pengaturan",
  icon: import_lucide_react.Settings
}];
function AdminLayout() {
  const path = useRouterState({
    select: (s) => s.location.pathname
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "app-shell min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "sticky top-0 z-30 border-b border-[var(--color-gray-100)] bg-[var(--color-ink)] text-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/admin", className: "flex items-center gap-2 font-bold", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Shield, { className: "h-5 w-5" }),
        " PasarCek Admin"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard", className: "text-xs text-white/70 hover:text-white", children: "\u2190 Kembali ke aplikasi" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto flex max-w-[1400px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", { className: "sticky top-[57px] h-[calc(100vh-57px)] w-56 shrink-0 border-r border-[var(--color-gray-100)] bg-white p-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", { className: "flex flex-col gap-1", children: adminNav.map((n) => {
        const active = n.exact ? path === n.to : path.startsWith(n.to);
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: n.to, className: cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium", active ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "h-4 w-4" }),
          n.label
        ] }, n.to);
      }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "flex-1 p-6 lg:p-10", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
    ] })
  ] });
}
export {
  AdminLayout as component
};
