import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-koMOzLtV.mjs";
import { f as fmtDateTime } from "./format-C1KpzYiq.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 text-3xl font-black", children: "Pengguna" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Nama" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Kota" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Daftar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Role" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (users ?? []).map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold", children: u.full_name ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: u.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: u.city ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: fmtDateTime(u.created_at) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 space-x-1", children: u.roles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: r }, r)) })
      ] }, u.id)) })
    ] }) })
  ] });
}
export {
  AdminUsers as component
};
