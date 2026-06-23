import {
  Badge
} from "./chunk-HHRAMEAM.mjs";
import {
  AppShell,
  EmptyState,
  PageHeader
} from "./chunk-XZNSYGQD.mjs";
import {
  fmtDateTime,
  idr
} from "./chunk-HQLZASKI.mjs";
import "./chunk-KJB73ZNG.mjs";
import {
  useAuth
} from "./chunk-UC4BMYGH.mjs";
import "./chunk-KIHGSOXA.mjs";
import {
  useQuery
} from "./chunk-76F7W2CF.mjs";
import "./chunk-QH35MXVZ.mjs";
import {
  supabase
} from "./chunk-7GEO44MB.mjs";
import "./chunk-G46AXIAP.mjs";
import {
  Link
} from "./chunk-TV3ZUI3R.mjs";
import "./chunk-RE5W7UZM.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-MLKSHREV.mjs";
import {
  __toESM
} from "./chunk-KVSJYO5R.mjs";

// dist/server/assets/orders-BE_GmJtd.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var statusLabel = {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Riwayat Pesanan", description: "Semua transaksi langganan Anda." }),
    !orders || orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Belum ada transaksi.", description: "Mulai berlangganan untuk mendapatkan fitur premium." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "No. Pesanan" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Tanggal" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Paket" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 text-right", children: "Nominal" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Status" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-t border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 font-mono font-semibold", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/orders/$id", params: {
          id: o.id
        }, className: "text-[var(--color-brand-blue)] hover:underline", children: o.order_number }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3", children: fmtDateTime(o.created_at) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3", children: o.package?.name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right font-bold", children: idr(Number(o.amount)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { className: statusLabel[o.status]?.cls, children: statusLabel[o.status]?.label }) })
      ] }, o.id)) })
    ] }) })
  ] });
}
export {
  OrdersPage as component
};
