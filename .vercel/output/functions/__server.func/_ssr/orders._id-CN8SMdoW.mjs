import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell, P as PageHeader } from "./app-shell-Brvsmje8.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-B2Ztv5jM.mjs";
import { c as Route$9, u as useAuth } from "./router-Bx_E7duL.mjs";
import { f as fmtDateTime, i as idr } from "./format-C1KpzYiq.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a0 as Upload, a1 as Copy } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
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
function OrderDetailPage() {
  const {
    id
  } = Route$9.useParams();
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const [uploading, setUploading] = reactExports.useState(false);
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
  if (!order) return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Detail Pesanan" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Memuat..." })
  ] });
  const m = order.payment_method;
  const steps = ["pending_payment", "proof_uploaded", "verifying", "active"];
  const stepIdx = steps.indexOf(order.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: `Pesanan ${order.order_number}`, description: fmtDateTime(order.created_at) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-lg font-bold", children: "Timeline Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3", children: ["Menunggu Pembayaran", "Bukti Diupload", "Menunggu Verifikasi", "Paket Aktif"].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i <= stepIdx ? "bg-[var(--color-success)] text-white" : "bg-[var(--color-gray-100)] text-[var(--color-gray-500)]"}`, children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: i <= stepIdx ? "font-semibold" : "text-[var(--color-gray-500)]", children: s })
          ] }, i)) }),
          order.status === "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mt-3 bg-[var(--color-destructive)] text-white", children: [
            "Pembayaran Ditolak: ",
            order.admin_note
          ] })
        ] }),
        m && order.status === "pending_payment" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-lg font-bold", children: "Instruksi Pembayaran" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-md bg-[var(--color-gray-50)] p-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Metode", value: m.name }),
            m.account_number && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "No. Rekening", value: m.account_number, copy: true }),
            m.account_name && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Nama Penerima", value: m.account_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Jumlah Transfer", value: idr(Number(order.amount)), copy: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-[var(--color-gray-500)]", children: m.instructions })
        ] }),
        (order.status === "pending_payment" || order.status === "rejected") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-lg font-bold", children: "Upload Bukti Transfer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-[var(--color-gray-300)] bg-[var(--color-gray-50)] p-8 hover:bg-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6 text-[var(--color-gray-500)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: uploading ? "Mengunggah..." : "Klik untuk pilih file" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[var(--color-gray-500)]", children: "JPG, PNG, atau PDF — maks 5MB" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*,application/pdf", className: "hidden", onChange: handleUpload, disabled: uploading })
          ] })
        ] }),
        order.proof_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-lg font-bold", children: "Bukti Transfer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[var(--color-gray-500)]", children: [
            "File: ",
            order.proof_url.split("/").pop()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold uppercase text-[var(--color-gray-500)]", children: "Ringkasan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black", children: idr(Number(order.amount)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
          "Paket: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: order.package?.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
          "Penerima: ",
          order.recipient_name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-[var(--color-gray-500)]", children: order.recipient_email })
      ] })
    ] })
  ] });
}
function Row({
  label,
  value,
  copy
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-gray-500)]", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 font-mono font-semibold", children: [
      value,
      copy && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        navigator.clipboard.writeText(value);
        toast.success("Disalin");
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" }) })
    ] })
  ] });
}
export {
  OrderDetailPage as component
};
