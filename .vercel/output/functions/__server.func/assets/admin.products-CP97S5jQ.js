import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
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
function AdminProducts() {
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => (await supabase.from("products").select("*").order("name")).data ?? []
  });
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("kg");
  async function create() {
    if (!name || !category) return toast.error("Lengkapi data");
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const {
      error
    } = await supabase.from("products").insert({
      name,
      slug,
      category,
      unit
    });
    if (error) return toast.error(error.message);
    toast.success("Produk ditambahkan");
    setName("");
    setCategory("");
    qc.invalidateQueries({
      queryKey: ["admin-products"]
    });
  }
  async function remove(id) {
    await supabase.from("products").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["admin-products"]
    });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-6 text-3xl font-black", children: "Produk" }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Nama" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kategori" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Satuan" }),
          /* @__PURE__ */ jsx("th", {})
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: (data ?? []).map((p) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-semibold", children: p.name }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: p.category }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: p.unit }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", onClick: () => remove(p.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-[var(--color-destructive)]" }) }) })
        ] }, p.id)) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "Tambah Produk" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Nama" }),
          /* @__PURE__ */ jsx(Input, { value: name, onChange: (e) => setName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Kategori" }),
          /* @__PURE__ */ jsx(Input, { value: category, onChange: (e) => setCategory(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Satuan" }),
          /* @__PURE__ */ jsx(Input, { value: unit, onChange: (e) => setUnit(e.target.value) })
        ] }),
        /* @__PURE__ */ jsx(Button, { onClick: create, className: "w-full", children: "Simpan" })
      ] })
    ] })
  ] });
}
export {
  AdminProducts as component
};
