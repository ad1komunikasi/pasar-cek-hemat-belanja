import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { T as Textarea } from "./textarea-DSyJ1nlY.js";
import { f as fmtDateTime, i as idr } from "./format-C1KpzYiq.js";
import { useState } from "react";
import { toast } from "sonner";
import "@supabase/supabase-js";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
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
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-6 text-3xl font-black", children: "Pesanan" }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "No" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "User" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Paket" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Tanggal" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Nominal" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Status" }),
        /* @__PURE__ */ jsx("th", {})
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: (orders ?? []).map((o) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono", children: o.order_number }),
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
          o.profile?.full_name ?? o.recipient_name,
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-[var(--color-gray-500)]", children: o.profile?.email })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: o.package?.name }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: fmtDateTime(o.created_at) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right font-bold", children: idr(Number(o.amount)) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: o.status }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => {
          setSelected(o);
          setNote("");
        }, children: "Detail" }) })
      ] }, o.id)) })
    ] }) }),
    selected && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4", onClick: () => setSelected(null), children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-lg rounded-lg bg-white p-6", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: selected.order_number }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[var(--color-gray-500)]", children: selected.profile?.email }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-2xl font-black", children: idr(Number(selected.amount)) }),
      selected.proof_url && /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-[var(--color-brand-blue)]", children: [
        "Bukti: ",
        selected.proof_url
      ] }),
      /* @__PURE__ */ jsx(Textarea, { className: "mt-4", placeholder: "Catatan admin (opsional / wajib jika menolak)", value: note, onChange: (e) => setNote(e.target.value) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-2", children: [
        /* @__PURE__ */ jsx(Button, { onClick: () => approve(selected), className: "flex-1 bg-[var(--color-success)]", children: "Approve & Aktifkan" }),
        /* @__PURE__ */ jsx(Button, { onClick: () => reject(selected), variant: "destructive", className: "flex-1", children: "Reject" })
      ] })
    ] }) })
  ] });
}
export {
  AdminOrders as component
};
