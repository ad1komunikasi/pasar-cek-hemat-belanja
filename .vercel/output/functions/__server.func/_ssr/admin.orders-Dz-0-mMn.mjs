import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-B2Ztv5jM.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { f as fmtDateTime, i as idr } from "./format-C1KpzYiq.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function AdminOrders() {
  const qc = useQueryClient();
  const {
    data: orders
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => (await supabase.from("orders").select("*, package:packages(name,duration_days), profile:profiles(full_name,email)").order("created_at", {
      ascending: false
    })).data ?? []
  });
  const [selected, setSelected] = reactExports.useState(null);
  const [note, setNote] = reactExports.useState("");
  async function approve(o) {
    const expires = /* @__PURE__ */ new Date();
    expires.setDate(expires.getDate() + (o.package?.duration_days ?? 30));
    const {
      error
    } = await supabase.from("orders").update({
      status: "active",
      paid_at: (/* @__PURE__ */ new Date()).toISOString(),
      expires_at: expires.toISOString(),
      admin_note: note || null
    }).eq("id", o.id);
    if (error) return toast.error(error.message);
    await supabase.from("subscriptions").insert({
      user_id: o.user_id,
      package_id: o.package_id,
      order_id: o.id,
      started_at: (/* @__PURE__ */ new Date()).toISOString(),
      expires_at: expires.toISOString(),
      status: "active"
    });
    await supabase.from("notifications").insert({
      user_id: o.user_id,
      type: "subscription",
      title: "Paket aktif",
      body: `Paket ${o.package?.name} berhasil diaktifkan.`
    });
    toast.success("Paket diaktifkan");
    qc.invalidateQueries({
      queryKey: ["admin-orders"]
    });
    setSelected(null);
  }
  async function reject(o) {
    if (!note.trim()) return toast.error("Tulis alasan penolakan");
    await supabase.from("orders").update({
      status: "rejected",
      admin_note: note
    }).eq("id", o.id);
    await supabase.from("notifications").insert({
      user_id: o.user_id,
      type: "payment",
      title: "Pembayaran ditolak",
      body: note
    });
    toast.success("Pesanan ditolak");
    qc.invalidateQueries({
      queryKey: ["admin-orders"]
    });
    setSelected(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 text-3xl font-black", children: "Pesanan" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "No" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Paket" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Tanggal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Nominal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (orders ?? []).map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono", children: o.order_number }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
          o.profile?.full_name ?? o.recipient_name,
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[var(--color-gray-500)]", children: o.profile?.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: o.package?.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: fmtDateTime(o.created_at) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-bold", children: idr(Number(o.amount)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: o.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => {
          setSelected(o);
          setNote("");
        }, children: "Detail" }) })
      ] }, o.id)) })
    ] }) }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4", onClick: () => setSelected(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg rounded-lg bg-white p-6", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: selected.order_number }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--color-gray-500)]", children: selected.profile?.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-2xl font-black", children: idr(Number(selected.amount)) }),
      selected.proof_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-[var(--color-brand-blue)]", children: [
        "Bukti: ",
        selected.proof_url
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { className: "mt-4", placeholder: "Catatan admin (opsional / wajib jika menolak)", value: note, onChange: (e) => setNote(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => approve(selected), className: "flex-1 bg-[var(--color-success)]", children: "Approve & Aktifkan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => reject(selected), variant: "destructive", className: "flex-1", children: "Reject" })
      ] })
    ] }) })
  ] });
}
export {
  AdminOrders as component
};
