import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-koMOzLtV.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { i as idr } from "./format-C1KpzYiq.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { v as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function AdminPackages() {
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["admin-packages"],
    queryFn: async () => (await supabase.from("packages").select("*").order("sort_order")).data ?? []
  });
  const [name, setName] = reactExports.useState("");
  const [slug, setSlug] = reactExports.useState("");
  const [price, setPrice] = reactExports.useState("");
  const [days, setDays] = reactExports.useState("");
  const [desc, setDesc] = reactExports.useState("");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 text-3xl font-black", children: "Paket" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Nama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Slug" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Harga" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Durasi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Aktif" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (data ?? []).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: p.slug }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: idr(Number(p.price)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right", children: [
            p.duration_days,
            " hari"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggle(p.id, p.is_active), className: `rounded px-2 py-1 text-xs ${p.is_active ? "bg-[var(--color-success)] text-white" : "bg-[var(--color-gray-100)]"}`, children: p.is_active ? "ON" : "OFF" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => remove(p.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-[var(--color-destructive)]" }) }) })
        ] }, p.id)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: "Tambah Paket" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Slug" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: slug, onChange: (e) => setSlug(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Harga (IDR)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: price, onChange: (e) => setPrice(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Durasi (hari)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: days, onChange: (e) => setDays(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Deskripsi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: desc, onChange: (e) => setDesc(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: create, className: "w-full", children: "Simpan" })
      ] })
    ] })
  ] });
}
export {
  AdminPackages as component
};
