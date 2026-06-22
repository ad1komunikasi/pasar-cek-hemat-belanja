import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppShell, P as PageHeader, E as EmptyState } from "./app-shell-Brvsmje8.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-B2Ztv5jM.mjs";
import { u as useAuth } from "./router-Bx_E7duL.mjs";
import { f as fmtDateTime, i as idr } from "./format-C1KpzYiq.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import "../_libs/sonner.mjs";
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
import "../_libs/lucide-react.mjs";
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
const statusLabel = {
  pending_payment: {
    label: "Menunggu Pembayaran",
    cls: "bg-[var(--color-warning)] text-white"
  },
  proof_uploaded: {
    label: "Bukti Diupload",
    cls: "bg-[var(--color-info)] text-white"
  },
  verifying: {
    label: "Menunggu Verifikasi",
    cls: "bg-[var(--color-info)] text-white"
  },
  rejected: {
    label: "Pembayaran Ditolak",
    cls: "bg-[var(--color-destructive)] text-white"
  },
  paid: {
    label: "Pembayaran Berhasil",
    cls: "bg-[var(--color-success)] text-white"
  },
  active: {
    label: "Paket Aktif",
    cls: "bg-[var(--color-success)] text-white"
  },
  expired: {
    label: "Kadaluarsa",
    cls: "bg-[var(--color-gray-500)] text-white"
  }
};
function OrdersPage() {
  const {
    user
  } = useAuth();
  const {
    data: orders
  } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => (await supabase.from("orders").select("*, package:packages(name)").eq("user_id", user.id).order("created_at", {
      ascending: false
    })).data ?? []
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Riwayat Pesanan", description: "Semua transaksi langganan Anda." }),
    !orders || orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: "Belum ada transaksi.", description: "Mulai berlangganan untuk mendapatkan fitur premium." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "No. Pesanan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Tanggal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Paket" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Nominal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders/$id", params: {
          id: o.id
        }, className: "text-[var(--color-brand-blue)] hover:underline", children: o.order_number }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: fmtDateTime(o.created_at) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: o.package?.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-bold", children: idr(Number(o.amount)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: statusLabel[o.status]?.cls, children: statusLabel[o.status]?.label }) })
      ] }, o.id)) })
    ] }) })
  ] });
}
export {
  OrdersPage as component
};
