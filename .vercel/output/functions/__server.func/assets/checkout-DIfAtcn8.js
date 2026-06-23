import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { A as AppShell, P as PageHeader } from "./app-shell-JvQTbMhg.js";
import { b as Route, u as useAuth } from "./router-KEMZH_Q0.js";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { useState, useEffect } from "react";
import { B as Button } from "./button-BC9oXVxV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.js";
import { i as idr } from "./format-C1KpzYiq.js";
import { toast } from "sonner";
import { z } from "zod";
import "lucide-react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
const schema = z.object({
  recipient_name: z.string().trim().min(2).max(100),
  recipient_email: z.string().trim().email().max(255),
  recipient_phone: z.string().trim().min(8).max(20)
});
function CheckoutPage() {
  const search = Route.useSearch();
  const {
    user,
    profile
  } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const {
    data: pkg
  } = useQuery({
    queryKey: ["pkg", search.package],
    queryFn: async () => (await supabase.from("packages").select("*").eq("slug", search.package).maybeSingle()).data
  });
  const {
    data: methods
  } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: async () => (await supabase.from("payment_methods").select("*").eq("is_active", true).order("sort_order")).data ?? []
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [methodId, setMethodId] = useState("");
  useEffect(() => {
    if (profile && user) {
      setName(profile.full_name ?? "");
      setEmail(user.email ?? "");
      setPhone(profile.phone ?? "");
    }
  }, [profile, user]);
  useEffect(() => {
    if (methods && methods.length && !methodId) setMethodId(methods[0].id);
  }, [methods, methodId]);
  async function submit() {
    if (!pkg || !methodId) return;
    const parsed = schema.safeParse({
      recipient_name: name,
      recipient_email: email,
      recipient_phone: phone
    });
    if (!parsed.success) return toast.error(parsed.error.errors[0].message);
    const {
      data: numRes
    } = await supabase.rpc("generate_order_number").single();
    const num = numRes ?? `PSC-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1e3 + Math.random() * 8999)}`;
    const method = methods.find((m) => m.id === methodId);
    const {
      data,
      error
    } = await supabase.from("orders").insert({
      order_number: num,
      user_id: user.id,
      package_id: pkg.id,
      recipient_name: name,
      recipient_email: email,
      recipient_phone: phone,
      amount: Number(pkg.price),
      method: method.type,
      payment_method_id: method.id,
      status: "pending_payment"
    }).select().single();
    if (error) return toast.error(error.message);
    qc.invalidateQueries({
      queryKey: ["orders"]
    });
    toast.success("Pesanan dibuat. Silakan lakukan pembayaran.");
    navigate({
      to: "/orders/$id",
      params: {
        id: data.id
      }
    });
  }
  if (!pkg) return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Checkout" }),
    /* @__PURE__ */ jsx("p", { children: "Paket tidak ditemukan." })
  ] });
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Checkout", description: `Berlangganan paket ${pkg.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg font-bold", children: "Informasi Penerima" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Nama" }),
            /* @__PURE__ */ jsx(Input, { value: name, onChange: (e) => setName(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Email" }),
            /* @__PURE__ */ jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Nomor HP" }),
            /* @__PURE__ */ jsx(Input, { value: phone, onChange: (e) => setPhone(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Metode Pembayaran" }),
            /* @__PURE__ */ jsxs(Select, { value: methodId, onValueChange: setMethodId, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { children: (methods ?? []).map((m) => /* @__PURE__ */ jsxs(SelectItem, { value: m.id, children: [
                m.name,
                " (",
                m.type.toUpperCase(),
                ")"
              ] }, m.id)) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Button, { onClick: submit, className: "w-full", children: "Buat Pesanan" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "Ringkasan" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: pkg.name }),
          /* @__PURE__ */ jsx("span", { children: idr(Number(pkg.price)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm text-[var(--color-gray-500)]", children: [
          /* @__PURE__ */ jsx("span", { children: "Durasi" }),
          /* @__PURE__ */ jsxs("span", { children: [
            pkg.duration_days,
            " hari"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "my-2 border-t border-[var(--color-gray-100)]" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Total" }),
          /* @__PURE__ */ jsx("span", { className: "text-xl font-black", children: idr(Number(pkg.price)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  CheckoutPage as component
};
