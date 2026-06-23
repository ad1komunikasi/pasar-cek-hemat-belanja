import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter, useRouterState, Link } from "@tanstack/react-router";
import { X, Menu, LayoutDashboard, TrendingUp, Scale, MapPin, ShoppingBasket, Heart, Bell, Crown, Shield, User, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { s as supabase } from "./client-koMOzLtV.js";
import { u as useAuth } from "./router-KEMZH_Q0.js";
import { useQueryClient } from "@tanstack/react-query";
import { c as cn } from "./utils-H80jjgLf.js";
const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/prices", label: "Harga Hari Ini", icon: TrendingUp },
  { to: "/compare", label: "Bandingkan", icon: Scale },
  { to: "/markets", label: "Pasar", icon: MapPin },
  { to: "/smart-basket", label: "Smart Basket", icon: ShoppingBasket },
  { to: "/favorites", label: "Favorit", icon: Heart },
  { to: "/notifications", label: "Notifikasi", icon: Bell }
];
function AppShell({ children }) {
  const { profile, isAdmin } = useAuth();
  const router = useRouter();
  const qc = useQueryClient();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    router.navigate({ to: "/auth", replace: true });
  }
  return /* @__PURE__ */ jsxs("div", { className: "app-shell min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--color-gray-100)] bg-white px-4 lg:hidden", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "flex items-center gap-2 font-bold tracking-tight", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => setOpen((v) => !v), "aria-label": "Menu", className: "rounded p-2 hover:bg-[var(--color-gray-50)]", children: open ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsxs(
        "aside",
        {
          className: cn(
            "fixed inset-y-0 left-0 z-30 w-64 border-r border-[var(--color-gray-100)] bg-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full"
          ),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "hidden h-14 items-center gap-2 border-b border-[var(--color-gray-100)] px-5 font-bold tracking-tight lg:flex", children: [
              /* @__PURE__ */ jsx("span", { className: "inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white", children: "PC" }),
              "PasarCek"
            ] }),
            /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-1 p-3", children: [
              nav.map((n) => {
                const active = path === n.to || path.startsWith(n.to + "/");
                return /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: n.to,
                    onClick: () => setOpen(false),
                    className: cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active ? "bg-[var(--color-brand-blue)] text-white" : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]"
                    ),
                    children: [
                      /* @__PURE__ */ jsx(n.icon, { className: "h-4 w-4" }),
                      n.label
                    ]
                  },
                  n.to
                );
              }),
              /* @__PURE__ */ jsx("div", { className: "mt-3 border-t border-[var(--color-gray-100)] pt-3", children: /* @__PURE__ */ jsxs(Link, { to: "/pricing", onClick: () => setOpen(false), className: "flex items-center gap-3 rounded-md bg-[var(--color-accent-soft)] px-3 py-2 text-sm font-semibold text-[var(--color-brand-green)] hover:opacity-90", children: [
                /* @__PURE__ */ jsx(Crown, { className: "h-4 w-4" }),
                " Upgrade Premium"
              ] }) }),
              isAdmin && /* @__PURE__ */ jsx("div", { className: "mt-3 border-t border-[var(--color-gray-100)] pt-3", children: /* @__PURE__ */ jsxs(Link, { to: "/admin", onClick: () => setOpen(false), className: cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                path.startsWith("/admin") ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]"
              ), children: [
                /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4" }),
                " Admin"
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 border-t border-[var(--color-gray-100)] pt-3", children: [
                /* @__PURE__ */ jsxs(Link, { to: "/profile", onClick: () => setOpen(false), className: "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]", children: [
                  /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
                  " ",
                  profile?.full_name ?? "Profil"
                ] }),
                /* @__PURE__ */ jsxs(Link, { to: "/settings", onClick: () => setOpen(false), className: "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]", children: [
                  /* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" }),
                  " Pengaturan"
                ] }),
                /* @__PURE__ */ jsxs("button", { onClick: signOut, className: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]", children: [
                  /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
                  " Keluar"
                ] })
              ] })
            ] })
          ]
        }
      ),
      open && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-20 bg-black/30 lg:hidden", onClick: () => setOpen(false) }),
      /* @__PURE__ */ jsx("main", { className: "min-h-screen flex-1 lg:ml-0", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10", children }) })
    ] })
  ] });
}
function PageHeader({ title, description, action }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("h1", { className: "truncate text-3xl font-black tracking-tight text-[var(--color-ink)] sm:text-4xl", children: title }),
      description && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[var(--color-gray-500)] sm:text-base", children: description })
    ] }),
    action && /* @__PURE__ */ jsx("div", { className: "shrink-0", children: action })
  ] });
}
function StatCard({ label, value, hint, icon: Icon, accent }) {
  const color = accent === "green" ? "var(--color-brand-green)" : accent === "warning" ? "var(--color-warning)" : accent === "danger" ? "var(--color-destructive)" : "var(--color-brand-blue)";
  return /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("p", { className: "truncate text-xs font-medium uppercase tracking-wider text-[var(--color-gray-500)]", children: label }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-2xl font-black text-[var(--color-ink)] sm:text-3xl", children: value }),
      hint && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-[var(--color-gray-500)]", children: hint })
    ] }),
    Icon && /* @__PURE__ */ jsx("div", { className: "shrink-0 rounded-md p-2", style: { backgroundColor: color, color: "white" }, children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) })
  ] }) });
}
function EmptyState({ title, description, action }) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-dashed border-[var(--color-gray-100)] bg-white px-6 py-12 text-center", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[var(--color-ink)]", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[var(--color-gray-500)]", children: description }),
    action && /* @__PURE__ */ jsx("div", { className: "mt-4", children: action })
  ] });
}
function Section({ title, action, children }) {
  return /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
    (title || action) && /* @__PURE__ */ jsxs("div", { className: "mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3", children: [
      title && /* @__PURE__ */ jsx("h2", { className: "truncate text-lg font-bold text-[var(--color-ink)]", children: title }),
      action && /* @__PURE__ */ jsx("div", { className: "shrink-0", children: action })
    ] }),
    children
  ] });
}
export {
  AppShell as A,
  EmptyState as E,
  PageHeader as P,
  Section as S,
  StatCard as a
};
