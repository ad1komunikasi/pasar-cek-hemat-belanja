import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  Textarea
} from "./chunk-AYVNPAHU.mjs";
import {
  Label
} from "./chunk-IIG5XPYQ.mjs";
import "./chunk-SJQOHQ2J.mjs";
import {
  idr
} from "./chunk-LEY4RZ2W.mjs";
import {
  toast
} from "./chunk-C7CN73EW.mjs";
import {
  Input
} from "./chunk-KM4Y5GSG.mjs";
import {
  useQuery,
  useQueryClient
} from "./chunk-DH7FIRD7.mjs";
import {
  Button
} from "./chunk-AVRRWDIK.mjs";
import "./chunk-NXBQQK3G.mjs";
import "./chunk-IHLGWONG.mjs";
import "./chunk-Y5N26HX3.mjs";
import {
  supabase
} from "./chunk-2FS42ITU.mjs";
import {
  require_lucide_react
} from "./chunk-NDUCSHRX.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/admin.packages-Cc071pmC.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
function AdminPackages() {
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["admin-packages"],
    queryFn: async () => (await supabase.from("packages").select("*").order("sort_order")).data ?? []
  });
  const [name, setName] = (0, import_react.useState)("");
  const [slug, setSlug] = (0, import_react.useState)("");
  const [price, setPrice] = (0, import_react.useState)("");
  const [days, setDays] = (0, import_react.useState)("");
  const [desc, setDesc] = (0, import_react.useState)("");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "mb-6 text-3xl font-black", children: "Paket" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid gap-6 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Nama" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Slug" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 text-right", children: "Harga" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 text-right", children: "Durasi" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Aktif" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (data ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 font-semibold", children: p.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 font-mono text-xs", children: p.slug }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right", children: idr(Number(p.price)) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { className: "px-4 py-3 text-right", children: [
            p.duration_days,
            " hari"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => toggle(p.id, p.is_active), className: `rounded px-2 py-1 text-xs ${p.is_active ? "bg-[var(--color-success)] text-white" : "bg-[var(--color-gray-100)]"}`, children: p.is_active ? "ON" : "OFF" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { size: "icon", variant: "ghost", onClick: () => remove(p.id), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2, { className: "h-4 w-4 text-[var(--color-destructive)]" }) }) })
        ] }, p.id)) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-bold", children: "Tambah Paket" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nama" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: name, onChange: (e) => setName(e.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Slug" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: slug, onChange: (e) => setSlug(e.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Harga (IDR)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { type: "number", value: price, onChange: (e) => setPrice(e.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Durasi (hari)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { type: "number", value: days, onChange: (e) => setDays(e.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Deskripsi" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, { value: desc, onChange: (e) => setDesc(e.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { onClick: create, className: "w-full", children: "Simpan" })
      ] })
    ] })
  ] });
}
export {
  AdminPackages as component
};
