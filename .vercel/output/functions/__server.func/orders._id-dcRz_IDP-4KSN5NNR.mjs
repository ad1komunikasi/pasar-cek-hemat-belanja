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
  AppShell,
  PageHeader
} from "./chunk-3NVJ47CE.mjs";
import {
  fmtDateTime,
  idr
} from "./chunk-GQMM4EHK.mjs";
import {
  require_lucide_react
} from "./chunk-NDUCSHRX.mjs";
import {
  Route$9,
  useAuth
} from "./chunk-PVA6CGQ6.mjs";
import {
  toast
} from "./chunk-C7CN73EW.mjs";
import {
  useQuery,
  useQueryClient
} from "./chunk-DH7FIRD7.mjs";
import "./chunk-NXBQQK3G.mjs";
import {
  supabase
} from "./chunk-PQEYI6K5.mjs";
import "./chunk-Y5N26HX3.mjs";
import "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/orders._id-dcRz_IDP.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
function OrderDetailPage() {
  const {
    id
  } = Route$9.useParams();
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const [uploading, setUploading] = (0, import_react.useState)(false);
  const {
    data: order
  } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => (await supabase.from("orders").select("*, package:packages(*), payment_method:payment_methods(*)").eq("id", id).maybeSingle()).data
  });
  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file || !order) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("Maks 5MB");
    setUploading(true);
    const path = `${user.id}/${order.id}-${Date.now()}-${file.name}`;
    const {
      error: upErr
    } = await supabase.storage.from("payment-proofs").upload(path, file, {
      upsert: true
    });
    if (upErr) {
      setUploading(false);
      return toast.error(upErr.message);
    }
    const {
      error
    } = await supabase.from("orders").update({
      proof_url: path,
      status: "proof_uploaded"
    }).eq("id", order.id);
    setUploading(false);
    if (error) return toast.error(error.message);
    toast.success("Bukti pembayaran berhasil diunggah");
    qc.invalidateQueries({
      queryKey: ["order", id]
    });
  }
  if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Detail Pesanan" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Memuat..." })
  ] });
  const m = order.payment_method;
  const steps = ["pending_payment", "proof_uploaded", "verifying", "active"];
  const stepIdx = steps.indexOf(order.status);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: `Pesanan ${order.order_number}`, description: fmtDateTime(order.created_at) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid gap-6 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "mb-4 text-lg font-bold", children: "Timeline Status" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { className: "space-y-3", children: ["Menunggu Pembayaran", "Bukti Diupload", "Menunggu Verifikasi", "Paket Aktif"].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i <= stepIdx ? "bg-[var(--color-success)] text-white" : "bg-[var(--color-gray-100)] text-[var(--color-gray-500)]"}`, children: i + 1 }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: i <= stepIdx ? "font-semibold" : "text-[var(--color-gray-500)]", children: s })
          ] }, i)) }),
          order.status === "rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { className: "mt-3 bg-[var(--color-destructive)] text-white", children: [
            "Pembayaran Ditolak: ",
            order.admin_note
          ] })
        ] }),
        m && order.status === "pending_payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "mb-3 text-lg font-bold", children: "Instruksi Pembayaran" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2 rounded-md bg-[var(--color-gray-50)] p-4 text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Metode", value: m.name }),
            m.account_number && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "No. Rekening", value: m.account_number, copy: true }),
            m.account_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Nama Penerima", value: m.account_name }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Jumlah Transfer", value: idr(Number(order.amount)), copy: true })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-3 text-xs text-[var(--color-gray-500)]", children: m.instructions })
        ] }),
        (order.status === "pending_payment" || order.status === "rejected") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "mb-3 text-lg font-bold", children: "Upload Bukti Transfer" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-[var(--color-gray-300)] bg-[var(--color-gray-50)] p-8 hover:bg-white", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Upload, { className: "h-6 w-6 text-[var(--color-gray-500)]" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm font-semibold", children: uploading ? "Mengunggah..." : "Klik untuk pilih file" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs text-[var(--color-gray-500)]", children: "JPG, PNG, atau PDF \u2014 maks 5MB" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "file", accept: "image/*,application/pdf", className: "hidden", onChange: handleUpload, disabled: uploading })
          ] })
        ] }),
        order.proof_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "mb-3 text-lg font-bold", children: "Bukti Transfer" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-sm text-[var(--color-gray-500)]", children: [
            "File: ",
            order.proof_url.split("/").pop()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2 rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-sm font-semibold uppercase text-[var(--color-gray-500)]", children: "Ringkasan" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-2xl font-black", children: idr(Number(order.amount)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-sm", children: [
          "Paket: ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: order.package?.name })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-sm", children: [
          "Penerima: ",
          order.recipient_name
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-sm text-[var(--color-gray-500)]", children: order.recipient_email })
      ] })
    ] })
  ] });
}
function Row({
  label,
  value,
  copy
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[var(--color-gray-500)]", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-2 font-mono font-semibold", children: [
      value,
      copy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => {
        navigator.clipboard.writeText(value);
        toast.success("Disalin");
      }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Copy, { className: "h-3 w-3" }) })
    ] })
  ] });
}
export {
  OrderDetailPage as component
};
