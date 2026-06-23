import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppShell, P as PageHeader, E as EmptyState } from "./app-shell-JvQTbMhg.js";
import { useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { u as useAuth } from "./router-KEMZH_Q0.js";
import { f as fmtDateTime, i as idr } from "./format-C1KpzYiq.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import "lucide-react";
import "react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "sonner";
import "class-variance-authority";
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
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Riwayat Pesanan", description: "Semua transaksi langganan Anda." }),
    !orders || orders.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada transaksi.", description: "Mulai berlangganan untuk mendapatkan fitur premium." }) : /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "No. Pesanan" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Tanggal" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Paket" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Nominal" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: orders.map((o) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono font-semibold", children: /* @__PURE__ */ jsx(Link, { to: "/orders/$id", params: {
          id: o.id
        }, className: "text-[var(--color-brand-blue)] hover:underline", children: o.order_number }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: fmtDateTime(o.created_at) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: o.package?.name }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right font-bold", children: idr(Number(o.amount)) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(Badge, { className: statusLabel[o.status]?.cls, children: statusLabel[o.status]?.label }) })
      ] }, o.id)) })
    ] }) })
  ] });
}
export {
  OrdersPage as component
};
