import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, P as PageHeader, E as EmptyState } from "./app-shell-JvQTbMhg.js";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { u as useAuth } from "./router-KEMZH_Q0.js";
import { f as fmtDateTime } from "./format-C1KpzYiq.js";
import { B as Button } from "./button-BC9oXVxV.js";
import "@tanstack/react-router";
import "lucide-react";
import "react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "sonner";
import "@radix-ui/react-slot";
import "class-variance-authority";
function NotifPage() {
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const {
    data: items
  } = useQuery({
    queryKey: ["notif", user?.id],
    queryFn: async () => (await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", {
      ascending: false
    })).data ?? []
  });
  async function markAll() {
    await supabase.from("notifications").update({
      read_at: (/* @__PURE__ */ new Date()).toISOString()
    }).is("read_at", null).eq("user_id", user.id);
    qc.invalidateQueries({
      queryKey: ["notif"]
    });
  }
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Notifikasi", description: "Pemberitahuan tentang harga, pesanan, dan langganan Anda.", action: /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: markAll, children: "Tandai semua dibaca" }) }),
    !items || items.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada notifikasi", description: "Kami akan memberitahu Anda saat ada perubahan harga." }) : /* @__PURE__ */ jsx("div", { className: "space-y-2", children: items.map((n) => /* @__PURE__ */ jsx("div", { className: `rounded-lg border p-4 ${n.read_at ? "border-[var(--color-gray-100)] bg-white" : "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/5"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold", children: n.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-[var(--color-gray-700)]", children: n.body })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "shrink-0 text-xs text-[var(--color-gray-500)]", children: fmtDateTime(n.created_at) })
    ] }) }, n.id)) })
  ] });
}
export {
  NotifPage as component
};
