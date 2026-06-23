import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { T as Textarea } from "./textarea-DSyJ1nlY.js";
import { i as idr } from "./format-C1KpzYiq.js";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function AdminPackages() {
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["admin-packages"],
    queryFn: async () => (await supabase.from("packages").select("*").order("sort_order")).data ?? []
  });
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");
  const [desc, setDesc] = useState("");
  async function create() {
    if (!name || !slug || !price || !days) return toast.error("Lengkapi semua field");
    const {
      error
    } = await supabase.from("packages").insert({
      name,
      slug,
      price: Number(price),
      duration_days: Number(days),
      description: desc,
      benefits: []
    });
    if (error) return toast.error(error.message);
    toast.success("Paket dibuat");
    setName("");
    setSlug("");
    setPrice("");
    setDays("");
    setDesc("");
    qc.invalidateQueries({
      queryKey: ["admin-packages"]
    });
  }
  async function remove(id) {
    await supabase.from("packages").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["admin-packages"]
    });
  }
  async function toggle(id, is_active) {
    await supabase.from("packages").update({
      is_active: !is_active
    }).eq("id", id);
    qc.invalidateQueries({
      queryKey: ["admin-packages"]
    });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-6 text-3xl font-black", children: "Paket" }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Nama" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Slug" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Harga" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Durasi" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Aktif" }),
          /* @__PURE__ */ jsx("th", {})
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: (data ?? []).map((p) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-semibold", children: p.name }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono text-xs", children: p.slug }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: idr(Number(p.price)) }),
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-right", children: [
            p.duration_days,
            " hari"
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("button", { onClick: () => toggle(p.id, p.is_active), className: `rounded px-2 py-1 text-xs ${p.is_active ? "bg-[var(--color-success)] text-white" : "bg-[var(--color-gray-100)]"}`, children: p.is_active ? "ON" : "OFF" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", onClick: () => remove(p.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-[var(--color-destructive)]" }) }) })
        ] }, p.id)) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "Tambah Paket" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Nama" }),
          /* @__PURE__ */ jsx(Input, { value: name, onChange: (e) => setName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Slug" }),
          /* @__PURE__ */ jsx(Input, { value: slug, onChange: (e) => setSlug(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Harga (IDR)" }),
          /* @__PURE__ */ jsx(Input, { type: "number", value: price, onChange: (e) => setPrice(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Durasi (hari)" }),
          /* @__PURE__ */ jsx(Input, { type: "number", value: days, onChange: (e) => setDays(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Deskripsi" }),
          /* @__PURE__ */ jsx(Textarea, { value: desc, onChange: (e) => setDesc(e.target.value) })
        ] }),
        /* @__PURE__ */ jsx(Button, { onClick: create, className: "w-full", children: "Simpan" })
      ] })
    ] })
  ] });
}
export {
  AdminPackages as component
};
