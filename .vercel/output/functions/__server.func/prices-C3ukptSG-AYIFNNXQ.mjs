import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  Badge
} from "./chunk-OB7EMZ3A.mjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./chunk-FPD4XB2P.mjs";
import {
  AppShell,
  EmptyState,
  PageHeader
} from "./chunk-3NVJ47CE.mjs";
import {
  deltaPct,
  idr
} from "./chunk-GQMM4EHK.mjs";
import {
  require_lucide_react
} from "./chunk-NDUCSHRX.mjs";
import "./chunk-3WLNBR7O.mjs";
import "./chunk-PVA6CGQ6.mjs";
import "./chunk-SJQOHQ2J.mjs";
import "./chunk-C7CN73EW.mjs";
import {
  Input
} from "./chunk-KM4Y5GSG.mjs";
import {
  useQuery
} from "./chunk-DH7FIRD7.mjs";
import "./chunk-NXBQQK3G.mjs";
import "./chunk-IHLGWONG.mjs";
import {
  supabase
} from "./chunk-PQEYI6K5.mjs";
import "./chunk-Y5N26HX3.mjs";
import "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/prices-C3ukptSG.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
function PricesPage() {
  const [q, setQ] = (0, import_react.useState)("");
  const [marketId, setMarketId] = (0, import_react.useState)("all");
  const [category, setCategory] = (0, import_react.useState)("all");
  const {
    data: markets
  } = useQuery({
    queryKey: ["markets-list"],
    queryFn: async () => (await supabase.from("markets").select("id,name,city").order("name")).data ?? []
  });
  const {
    data: prices,
    isLoading
  } = useQuery({
    queryKey: ["prices-today", marketId, category],
    queryFn: async () => {
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const ydaystr = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      let query = supabase.from("product_prices").select("id, price, recorded_at, product:products(id,name,category,unit), market:markets(id,name,city)").eq("recorded_at", today);
      if (marketId !== "all") query = query.eq("market_id", marketId);
      const {
        data
      } = await query;
      const yres = await supabase.from("product_prices").select("product_id,market_id,price").eq("recorded_at", ydaystr);
      const ymap = /* @__PURE__ */ new Map();
      (yres.data ?? []).forEach((r) => ymap.set(r.product_id + ":" + r.market_id, Number(r.price)));
      return (data ?? []).map((r) => ({
        ...r,
        price: Number(r.price),
        prev: ymap.get(r.product.id + ":" + r.market.id) ?? null
      }));
    }
  });
  const categories = Array.from(new Set((prices ?? []).map((p) => p.product.category)));
  const filtered = (prices ?? []).filter((p) => (category === "all" || p.product.category === category) && (!q || p.product.name.toLowerCase().includes(q.toLowerCase())));
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Harga Sembako Hari Ini", description: "Update terbaru dari pasar tradisional di sekitar Anda." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-4 grid gap-3 sm:grid-cols-[1fr_200px_200px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-gray-500)]" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { className: "pl-9", placeholder: "Cari produk...", value: q, onChange: (e) => setQ(e.target.value) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, { value: marketId, onValueChange: setMarketId, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Semua pasar" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, { value: "all", children: "Semua pasar" }),
          (markets ?? []).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, { value: m.id, children: m.name }, m.id))
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, { value: category, onValueChange: setCategory, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Semua kategori" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, { value: "all", children: "Semua kategori" }),
          categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, { value: c, children: c }, c))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Produk" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Kategori" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Pasar" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 text-right", children: "Harga Hari Ini" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 text-right", children: "Kemarin" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 text-right", children: "Perubahan" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
        isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-8 text-center text-[var(--color-gray-500)]", colSpan: 6, children: "Memuat..." }) }),
        !isLoading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { colSpan: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Belum ada data harga", description: "Coba ubah filter atau pilih pasar lain." }) }) }),
        filtered.map((r) => {
          const d = deltaPct(r.price, r.prev);
          const status = d == null ? "stabil" : d > 1 ? "naik" : d < -1 ? "turun" : "stabil";
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { className: "px-4 py-3 font-semibold text-[var(--color-ink)]", children: [
              r.product.name,
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-xs text-[var(--color-gray-500)]", children: [
                "/ ",
                r.product.unit
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-[var(--color-gray-700)]", children: r.product.category }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-[var(--color-gray-700)]", children: r.market.name }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right font-bold", children: idr(r.price) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right text-[var(--color-gray-500)]", children: idr(r.prev) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { variant: "outline", className: status === "naik" ? "border-[var(--color-destructive)] text-[var(--color-destructive)]" : status === "turun" ? "border-[var(--color-success)] text-[var(--color-success)]" : "border-[var(--color-gray-300)] text-[var(--color-gray-500)]", children: [
              status === "naik" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowUp, { className: "mr-1 h-3 w-3" }),
              status === "turun" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowDown, { className: "mr-1 h-3 w-3" }),
              status === "stabil" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Minus, { className: "mr-1 h-3 w-3" }),
              d == null ? "\u2014" : `${d > 0 ? "+" : ""}${d.toFixed(1)}%`
            ] }) })
          ] }, r.id);
        })
      ] })
    ] }) })
  ] });
}
export {
  PricesPage as component
};
