import {
  toast
} from "./chunk-KIHGSOXA.mjs";
import {
  useQuery,
  useQueryClient
} from "./chunk-76F7W2CF.mjs";
import {
  Button
} from "./chunk-4AYWSIRD.mjs";
import "./chunk-QH35MXVZ.mjs";
import "./chunk-HSWPCUUH.mjs";
import {
  supabase
} from "./chunk-7GEO44MB.mjs";
import "./chunk-G46AXIAP.mjs";
import "./chunk-RE5W7UZM.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-MLKSHREV.mjs";
import {
  __toESM
} from "./chunk-KVSJYO5R.mjs";

// dist/server/assets/admin.payments-Dx9tJBhQ.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "mb-6 text-3xl font-black", children: "Metode Pembayaran" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid gap-3 sm:grid-cols-2", children: (data ?? []).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-bold", children: m.name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs uppercase text-[var(--color-gray-500)]", children: m.type }),
        m.account_number && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-2 font-mono text-sm", children: m.account_number }),
        m.account_name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-xs text-[var(--color-gray-500)]", children: [
          "a.n. ",
          m.account_name
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { size: "sm", variant: m.is_active ? "default" : "outline", onClick: () => toggle(m.id, m.is_active), children: m.is_active ? "Aktif" : "Nonaktif" })
    ] }) }, m.id)) })
  ] });
}
export {
  AdminPayments as component
};
