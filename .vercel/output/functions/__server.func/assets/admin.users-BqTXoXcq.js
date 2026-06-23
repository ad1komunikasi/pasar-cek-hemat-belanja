import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { f as fmtDateTime } from "./format-C1KpzYiq.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import "@supabase/supabase-js";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-6 text-3xl font-black", children: "Pengguna" }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Nama" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kota" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Daftar" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Role" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: (users ?? []).map((u) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-semibold", children: u.full_name ?? "—" }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: u.email }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: u.city ?? "—" }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: fmtDateTime(u.created_at) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 space-x-1", children: u.roles.map((r) => /* @__PURE__ */ jsx(Badge, { variant: "outline", children: r }, r)) })
      ] }, u.id)) })
    ] }) })
  ] });
}
export {
  AdminUsers as component
};
