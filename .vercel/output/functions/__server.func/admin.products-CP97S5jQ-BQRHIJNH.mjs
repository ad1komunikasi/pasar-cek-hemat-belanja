import {
  require_lucide_react
} from "./chunk-KJB73ZNG.mjs";
import {
  Label
} from "./chunk-5MVIPTMN.mjs";
import "./chunk-XAC4VDGA.mjs";
import {
  toast
} from "./chunk-KIHGSOXA.mjs";
import {
  Input
} from "./chunk-5KSQNLU6.mjs";
import {
  useQuery,
  useQueryClient
} from "./chunk-76F7W2CF.mjs";
import {
  Button
} from "./chunk-4AYWSIRD.mjs";
import "./chunk-QH35MXVZ.mjs";
import "./chunk-HSWPCUUH.mjs";
import {
  supabase
} from "./chunk-7GEO44MB.mjs";
import "./chunk-G46AXIAP.mjs";
import "./chunk-RE5W7UZM.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-MLKSHREV.mjs";
import {
  __toESM
} from "./chunk-KVSJYO5R.mjs";

// dist/server/assets/admin.products-CP97S5jQ.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
function AdminProducts() {
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => (await supabase.from("products").select("*").order("name")).data ?? []
  });
  const [name, setName] = (0, import_react.useState)("");
  const [category, setCategory] = (0, import_react.useState)("");
  const [unit, setUnit] = (0, import_react.useState)("kg");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "mb-6 text-3xl font-black", children: "Produk" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid gap-6 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Nama" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Kategori" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Satuan" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (data ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 font-semibold", children: p.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3", children: p.category }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3", children: p.unit }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { size: "icon", variant: "ghost", onClick: () => remove(p.id), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2, { className: "h-4 w-4 text-[var(--color-destructive)]" }) }) })
        ] }, p.id)) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-bold", children: "Tambah Produk" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nama" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: name, onChange: (e) => setName(e.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Kategori" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: category, onChange: (e) => setCategory(e.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Satuan" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: unit, onChange: (e) => setUnit(e.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { onClick: create, className: "w-full", children: "Simpan" })
      ] })
    ] })
  ] });
}
export {
  AdminProducts as component
};
