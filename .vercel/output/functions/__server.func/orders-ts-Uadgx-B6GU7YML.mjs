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
  EmptyState,
  PageHeader
} from "./chunk-TQBGYPF4.mjs";
import {
  fmtDateTime,
  idr
} from "./chunk-LEY4RZ2W.mjs";
import {
  useAuth
} from "./chunk-YRLTXJTO.mjs";
import "./chunk-C7CN73EW.mjs";
import {
  useQuery
} from "./chunk-DH7FIRD7.mjs";
import "./chunk-NXBQQK3G.mjs";
import "./chunk-Y5N26HX3.mjs";
import {
  supabase
} from "./chunk-KXW3467E.mjs";
import "./chunk-NDUCSHRX.mjs";
import {
  Link
} from "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/orders-ts-Uadgx.js
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
