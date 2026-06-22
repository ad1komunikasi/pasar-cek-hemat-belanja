import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-koMOzLtV.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 text-3xl font-black", children: "Metode Pembayaran" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: (data ?? []).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: m.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase text-[var(--color-gray-500)]", children: m.type }),
        m.account_number && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-sm", children: m.account_number }),
        m.account_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[var(--color-gray-500)]", children: [
          "a.n. ",
          m.account_name
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: m.is_active ? "default" : "outline", onClick: () => toggle(m.id, m.is_active), children: m.is_active ? "Aktif" : "Nonaktif" })
    ] }) }, m.id)) })
  ] });
}
export {
  AdminPayments as component
};
