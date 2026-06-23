import {
  StatCard
} from "./chunk-XZNSYGQD.mjs";
import {
  fmtDateTime
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

// dist/server/assets/admin.auth-monitor-B3xeX4hT.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
var import_react = __toESM(require_react(), 1);
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "mb-6 text-3xl font-black", children: "Auth Monitor" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-6 grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, { label: "Total Registrasi", value: data?.totalUsers ?? 0, icon: import_lucide_react.Users, accent: "blue" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, { label: "Login Hari Ini", value: (data?.logs ?? []).filter((l) => l.event === "login" && l.created_at.slice(0, 10) === (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)).length, icon: import_lucide_react.LogIn, accent: "green" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, { label: "Failed Login", value: (data?.logs ?? []).filter((l) => !l.success).length, icon: import_lucide_react.ShieldAlert, accent: "danger" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Waktu" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Event" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "IP" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "User Agent" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
        (data?.logs ?? []).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3", children: fmtDateTime(l.created_at) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 font-semibold", children: l.event }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 font-mono text-xs", children: l.ip ?? "\u2014" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 truncate text-xs text-[var(--color-gray-500)]", style: {
            maxWidth: 360
          }, children: l.user_agent ?? "\u2014" })
        ] }, l.id)),
        (data?.logs ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { colSpan: 4, className: "px-4 py-8 text-center text-[var(--color-gray-500)]", children: "Belum ada log autentikasi." }) })
      ] })
    ] }) })
  ] });
}
export {
  AuthMonitor as component
};
