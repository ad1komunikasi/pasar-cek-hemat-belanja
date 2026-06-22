import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { S as Shield, i as Users, R as Package, V as ShoppingCart, Y as CreditCard, j as Store, Z as Boxes, g as ChartColumn, _ as LogIn, I as Settings } from "../_libs/lucide-react.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const adminNav = [{
  to: "/admin",
  label: "Dashboard",
  icon: Shield,
  exact: true
}, {
  to: "/admin/users",
  label: "Pengguna",
  icon: Users
}, {
  to: "/admin/packages",
  label: "Paket",
  icon: Package
}, {
  to: "/admin/orders",
  label: "Pesanan",
  icon: ShoppingCart
}, {
  to: "/admin/payments",
  label: "Pembayaran",
  icon: CreditCard
}, {
  to: "/admin/markets",
  label: "Pasar",
  icon: Store
}, {
  to: "/admin/products",
  label: "Produk",
  icon: Boxes
}, {
  to: "/admin/reports",
  label: "Laporan",
  icon: ChartColumn
}, {
  to: "/admin/auth-monitor",
  label: "Auth Monitor",
  icon: LogIn
}, {
  to: "/admin/settings",
  label: "Pengaturan",
  icon: Settings
}];
function AdminLayout() {
  const path = useRouterState({
    select: (s) => s.location.pathname
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-shell min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 border-b border-[var(--color-gray-100)] bg-[var(--color-ink)] text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "flex items-center gap-2 font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5" }),
        " PasarCek Admin"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "text-xs text-white/70 hover:text-white", children: "← Kembali ke aplikasi" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1400px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "sticky top-[57px] h-[calc(100vh-57px)] w-56 shrink-0 border-r border-[var(--color-gray-100)] bg-white p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-1", children: adminNav.map((n) => {
        const active = n.exact ? path === n.to : path.startsWith(n.to);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: n.to, className: cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium", active ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-4 w-4" }),
          n.label
        ] }, n.to);
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-6 lg:p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  AdminLayout as component
};
