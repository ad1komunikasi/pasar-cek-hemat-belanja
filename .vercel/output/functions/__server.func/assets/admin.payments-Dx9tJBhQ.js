import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { toast } from "sonner";
import "@supabase/supabase-js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
function AdminPayments() {
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["admin-pm"],
    queryFn: async () => (await supabase.from("payment_methods").select("*").order("sort_order")).data ?? []
  });
  async function toggle(id, v) {
    await supabase.from("payment_methods").update({
      is_active: !v
    }).eq("id", id);
    qc.invalidateQueries({
      queryKey: ["admin-pm"]
    });
    toast.success("Diperbarui");
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-6 text-3xl font-black", children: "Metode Pembayaran" }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: (data ?? []).map((m) => /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold", children: m.name }),
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase text-[var(--color-gray-500)]", children: m.type }),
        m.account_number && /* @__PURE__ */ jsx("p", { className: "mt-2 font-mono text-sm", children: m.account_number }),
        m.account_name && /* @__PURE__ */ jsxs("p", { className: "text-xs text-[var(--color-gray-500)]", children: [
          "a.n. ",
          m.account_name
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: m.is_active ? "default" : "outline", onClick: () => toggle(m.id, m.is_active), children: m.is_active ? "Aktif" : "Nonaktif" })
    ] }) }, m.id)) })
  ] });
}
export {
  AdminPayments as component
};
