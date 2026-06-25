import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./chunk-7L2FJIXR.mjs";
import "./chunk-3WLNBR7O.mjs";
import {
  Label
} from "./chunk-IIG5XPYQ.mjs";
import "./chunk-SJQOHQ2J.mjs";
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
} from "./chunk-KXW3467E.mjs";
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

// dist/server/assets/admin.markets-DEwuqXkm.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
function AdminMarkets() {
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["admin-markets"],
    queryFn: async () => (await supabase.from("markets").select("*").order("name")).data ?? []
  });
  const [name, setName] = (0, import_react.useState)("");
  const [address, setAddress] = (0, import_react.useState)("");
  const [city, setCity] = (0, import_react.useState)("");
  const [type, setType] = (0, import_react.useState)("tradisional");
  const [hours, setHours] = (0, import_react.useState)("");
  async function create() {
    if (!name || !address || !city) return toast.error("Lengkapi data");
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const {
      error
    } = await supabase.from("markets").insert({
      name,
      slug,
      address,
      city,
      type,
      hours,
      province: "DKI Jakarta"
    });
    if (error) return toast.error(error.message);
    toast.success("Pasar ditambahkan");
    setName("");
    setAddress("");
    setCity("");
    setHours("");
    qc.invalidateQueries({
      queryKey: ["admin-markets"]
    });
  }
  async function remove(id) {
    await supabase.from("markets").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["admin-markets"]
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "mb-6 text-3xl font-black", children: "Pasar" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid gap-6 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Nama" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Kota" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Tipe" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Jam" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (data ?? []).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { className: "px-4 py-3 font-semibold", children: [
            m.name,
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs text-[var(--color-gray-500)]", children: m.address })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3", children: m.city }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 capitalize", children: m.type }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3", children: m.hours ?? "\u2014" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { size: "icon", variant: "ghost", onClick: () => remove(m.id), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2, { className: "h-4 w-4 text-[var(--color-destructive)]" }) }) })
        ] }, m.id)) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-bold", children: "Tambah Pasar" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nama" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: name, onChange: (e) => setName(e.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Alamat" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: address, onChange: (e) => setAddress(e.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Kota" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: city, onChange: (e) => setCity(e.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tipe" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, { value: type, onValueChange: (v) => setType(v), children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, { value: "tradisional", children: "Tradisional" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, { value: "modern", children: "Modern" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, { value: "swalayan", children: "Swalayan" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Jam Operasional" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: hours, onChange: (e) => setHours(e.target.value), placeholder: "05:00 - 17:00" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { onClick: create, className: "w-full", children: "Simpan" })
      ] })
    ] })
  ] });
}
export {
  AdminMarkets as component
};
