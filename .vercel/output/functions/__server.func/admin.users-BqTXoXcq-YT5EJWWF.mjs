import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  Badge
} from "./chunk-OB7EMZ3A.mjs";
import {
  fmtDateTime
} from "./chunk-GQMM4EHK.mjs";
import {
  useQuery
} from "./chunk-DH7FIRD7.mjs";
import "./chunk-NXBQQK3G.mjs";
import "./chunk-Y5N26HX3.mjs";
import {
  supabase
} from "./chunk-PQEYI6K5.mjs";
import {
  require_jsx_runtime
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/admin.users-BqTXoXcq.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function AdminUsers() {
  const {
    data: users
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const [profiles, roles] = await Promise.all([supabase.from("profiles").select("*").order("created_at", {
        ascending: false
      }), supabase.from("user_roles").select("user_id,role")]);
      const roleMap = /* @__PURE__ */ new Map();
      (roles.data ?? []).forEach((r) => roleMap.set(r.user_id, [...roleMap.get(r.user_id) ?? [], r.role]));
      return (profiles.data ?? []).map((p) => ({
        ...p,
        roles: roleMap.get(p.id) ?? []
      }));
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "mb-6 text-3xl font-black", children: "Pengguna" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Nama" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Email" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Kota" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Daftar" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Role" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (users ?? []).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 font-semibold", children: u.full_name ?? "\u2014" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3", children: u.email }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3", children: u.city ?? "\u2014" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3", children: fmtDateTime(u.created_at) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 space-x-1", children: u.roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { variant: "outline", children: r }, r)) })
      ] }, u.id)) })
    ] }) })
  ] });
}
export {
  AdminUsers as component
};
