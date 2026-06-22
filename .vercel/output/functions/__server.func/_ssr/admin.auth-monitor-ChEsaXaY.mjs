import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-B2Ztv5jM.mjs";
import { f as fmtDateTime } from "./format-C1KpzYiq.mjs";
import { a as StatCard } from "./app-shell-Brvsmje8.mjs";
import "../_libs/sonner.mjs";
import { i as Users, _ as LogIn, a2 as ShieldAlert } from "../_libs/lucide-react.mjs";
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
import "./router-Bx_E7duL.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function AuthMonitor() {
  const {
    data
  } = useQuery({
    queryKey: ["auth-monitor"],
    queryFn: async () => {
      const [profiles, logs] = await Promise.all([supabase.from("profiles").select("id", {
        count: "exact",
        head: true
      }), supabase.from("auth_logs").select("*").order("created_at", {
        ascending: false
      }).limit(50)]);
      return {
        totalUsers: profiles.count ?? 0,
        logs: logs.data ?? []
      };
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 text-3xl font-black", children: "Auth Monitor" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Registrasi", value: data?.totalUsers ?? 0, icon: Users, accent: "blue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Login Hari Ini", value: (data?.logs ?? []).filter((l) => l.event === "login" && l.created_at.slice(0, 10) === (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)).length, icon: LogIn, accent: "green" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Failed Login", value: (data?.logs ?? []).filter((l) => !l.success).length, icon: ShieldAlert, accent: "danger" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Waktu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "IP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "User Agent" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        (data?.logs ?? []).map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: fmtDateTime(l.created_at) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold", children: l.event }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: l.ip ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 truncate text-xs text-[var(--color-gray-500)]", style: {
            maxWidth: 360
          }, children: l.user_agent ?? "—" })
        ] }, l.id)),
        (data?.logs ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-4 py-8 text-center text-[var(--color-gray-500)]", children: "Belum ada log autentikasi." }) })
      ] })
    ] }) })
  ] });
}
export {
  AuthMonitor as component
};
