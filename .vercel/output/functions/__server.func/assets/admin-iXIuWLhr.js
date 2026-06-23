import { jsxs, jsx } from "react/jsx-runtime";
import { useRouterState, Link, Outlet } from "@tanstack/react-router";
import { Shield, Users, Package, ShoppingCart, CreditCard, Store, Boxes, BarChart3, LogIn, Settings } from "lucide-react";
import { c as cn } from "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
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
  icon: BarChart3
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
  return /* @__PURE__ */ jsxs("div", { className: "app-shell min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-30 border-b border-[var(--color-gray-100)] bg-[var(--color-ink)] text-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/admin", className: "flex items-center gap-2 font-bold", children: [
        /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5" }),
        " PasarCek Admin"
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "text-xs text-white/70 hover:text-white", children: "← Kembali ke aplikasi" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-[1400px]", children: [
      /* @__PURE__ */ jsx("aside", { className: "sticky top-[57px] h-[calc(100vh-57px)] w-56 shrink-0 border-r border-[var(--color-gray-100)] bg-white p-3", children: /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-1", children: adminNav.map((n) => {
        const active = n.exact ? path === n.to : path.startsWith(n.to);
        return /* @__PURE__ */ jsxs(Link, { to: n.to, className: cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium", active ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]"), children: [
          /* @__PURE__ */ jsx(n.icon, { className: "h-4 w-4" }),
          n.label
        ] }, n.to);
      }) }) }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 p-6 lg:p-10", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  AdminLayout as component
};
