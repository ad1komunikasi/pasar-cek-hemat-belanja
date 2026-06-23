import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  useAuth
} from "./chunk-QVMPDGJI.mjs";
import {
  useQueryClient
} from "./chunk-DH7FIRD7.mjs";
import {
  supabase
} from "./chunk-PQEYI6K5.mjs";
import {
  cn
} from "./chunk-Y5N26HX3.mjs";
import {
  require_lucide_react
} from "./chunk-NDUCSHRX.mjs";
import {
  Link,
  useRouter,
  useRouterState
} from "./chunk-FO6XWC3V.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/app-shell-BpHZ-k8W.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
var import_react = __toESM(require_react(), 1);
var nav = [
  { to: "/dashboard", label: "Dashboard", icon: import_lucide_react.LayoutDashboard },
  { to: "/prices", label: "Harga Hari Ini", icon: import_lucide_react.TrendingUp },
  { to: "/compare", label: "Bandingkan", icon: import_lucide_react.Scale },
  { to: "/markets", label: "Pasar", icon: import_lucide_react.MapPin },
  { to: "/smart-basket", label: "Smart Basket", icon: import_lucide_react.ShoppingBasket },
  { to: "/favorites", label: "Favorit", icon: import_lucide_react.Heart },
  { to: "/notifications", label: "Notifikasi", icon: import_lucide_react.Bell }
];
function AppShell({ children }) {
  const { profile, isAdmin } = useAuth();
  const router = useRouter();
  const qc = useQueryClient();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = (0, import_react.useState)(false);
  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    router.navigate({ to: "/auth", replace: true });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "app-shell min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: "sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--color-gray-100)] bg-white px-4 lg:hidden", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/dashboard", className: "flex items-center gap-2 font-bold tracking-tight", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setOpen((v) => !v), "aria-label": "Menu", className: "rounded p-2 hover:bg-[var(--color-gray-50)]", children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Menu, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "aside",
        {
          className: cn(
            "fixed inset-y-0 left-0 z-30 w-64 border-r border-[var(--color-gray-100)] bg-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full"
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "hidden h-14 items-center gap-2 border-b border-[var(--color-gray-100)] px-5 font-bold tracking-tight lg:flex", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white", children: "PC" }),
              "PasarCek"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { className: "flex flex-col gap-1 p-3", children: [
              nav.map((n) => {
                const active = path === n.to || path.startsWith(n.to + "/");
                return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  Link,
                  {
                    to: n.to,
                    onClick: () => setOpen(false),
                    className: cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active ? "bg-[var(--color-brand-blue)] text-white" : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]"
                    ),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "h-4 w-4" }),
                      n.label
                    ]
                  },
                  n.to
                );
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 border-t border-[var(--color-gray-100)] pt-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/pricing", onClick: () => setOpen(false), className: "flex items-center gap-3 rounded-md bg-[var(--color-accent-soft)] px-3 py-2 text-sm font-semibold text-[var(--color-brand-green)] hover:opacity-90", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Crown, { className: "h-4 w-4" }),
                " Upgrade Premium"
              ] }) }),
              isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 border-t border-[var(--color-gray-100)] pt-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/admin", onClick: () => setOpen(false), className: cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                path.startsWith("/admin") ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]"
              ), children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Shield, { className: "h-4 w-4" }),
                " Admin"
              ] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mt-3 border-t border-[var(--color-gray-100)] pt-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/profile", onClick: () => setOpen(false), className: "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.User, { className: "h-4 w-4" }),
                  " ",
                  profile?.full_name ?? "Profil"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/settings", onClick: () => setOpen(false), className: "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Settings, { className: "h-4 w-4" }),
                  " Pengaturan"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: signOut, className: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.LogOut, { className: "h-4 w-4" }),
                  " Keluar"
                ] })
              ] })
            ] })
          ]
        }
      ),
      open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 z-20 bg-black/30 lg:hidden", onClick: () => setOpen(false) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "min-h-screen flex-1 lg:ml-0", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10", children }) })
    ] })
  ] });
}
function PageHeader({ title, description, action }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-w-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "truncate text-3xl font-black tracking-tight text-[var(--color-ink)] sm:text-4xl", children: title }),
      description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-2 text-sm text-[var(--color-gray-500)] sm:text-base", children: description })
    ] }),
    action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shrink-0", children: action })
  ] });
}
function StatCard({ label, value, hint, icon: Icon, accent }) {
  const color = accent === "green" ? "var(--color-brand-green)" : accent === "warning" ? "var(--color-warning)" : accent === "danger" ? "var(--color-destructive)" : "var(--color-brand-blue)";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-5", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-w-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "truncate text-xs font-medium uppercase tracking-wider text-[var(--color-gray-500)]", children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 text-2xl font-black text-[var(--color-ink)] sm:text-3xl", children: value }),
      hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-1 text-xs text-[var(--color-gray-500)]", children: hint })
    ] }),
    Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shrink-0 rounded-md p-2", style: { backgroundColor: color, color: "white" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" }) })
  ] }) });
}
function EmptyState({ title, description, action }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-dashed border-[var(--color-gray-100)] bg-white px-6 py-12 text-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-bold text-[var(--color-ink)]", children: title }),
    description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-2 text-sm text-[var(--color-gray-500)]", children: description }),
    action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4", children: action })
  ] });
}
function Section({ title, action, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "mb-8", children: [
    (title || action) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3", children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "truncate text-lg font-bold text-[var(--color-ink)]", children: title }),
      action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shrink-0", children: action })
    ] }),
    children
  ] });
}

export {
  AppShell,
  PageHeader,
  StatCard,
  EmptyState,
  Section
};
