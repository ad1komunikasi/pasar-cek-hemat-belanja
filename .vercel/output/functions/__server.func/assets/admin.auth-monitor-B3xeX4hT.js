import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { f as fmtDateTime } from "./format-C1KpzYiq.js";
import { a as StatCard } from "./app-shell-JvQTbMhg.js";
import { Users, LogIn, ShieldAlert } from "lucide-react";
import "@supabase/supabase-js";
import "@tanstack/react-router";
import "react";
import "./router-KEMZH_Q0.js";
import "sonner";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-6 text-3xl font-black", children: "Auth Monitor" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Total Registrasi", value: data?.totalUsers ?? 0, icon: Users, accent: "blue" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Login Hari Ini", value: (data?.logs ?? []).filter((l) => l.event === "login" && l.created_at.slice(0, 10) === (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)).length, icon: LogIn, accent: "green" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Failed Login", value: (data?.logs ?? []).filter((l) => !l.success).length, icon: ShieldAlert, accent: "danger" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Waktu" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Event" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "IP" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "User Agent" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        (data?.logs ?? []).map((l) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: fmtDateTime(l.created_at) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-semibold", children: l.event }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono text-xs", children: l.ip ?? "—" }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 truncate text-xs text-[var(--color-gray-500)]", style: {
            maxWidth: 360
          }, children: l.user_agent ?? "—" })
        ] }, l.id)),
        (data?.logs ?? []).length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "px-4 py-8 text-center text-[var(--color-gray-500)]", children: "Belum ada log autentikasi." }) })
      ] })
    ] }) })
  ] });
}
export {
  AuthMonitor as component
};
