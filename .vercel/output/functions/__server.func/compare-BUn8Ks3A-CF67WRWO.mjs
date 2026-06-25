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
} from "./chunk-BXG2GPOJ.mjs";
import "./chunk-3WLNBR7O.mjs";
import {
  getDeterministicBenchmarkPrices
} from "./chunk-P3OCNXRP.mjs";
import {
  AppShell,
  EmptyState,
  PageHeader
} from "./chunk-U5CRF4WT.mjs";
import "./chunk-EG7TMMQE.mjs";
import "./chunk-SJQOHQ2J.mjs";
import "./chunk-C7CN73EW.mjs";
import {
  idr
} from "./chunk-LEY4RZ2W.mjs";
import {
  useQuery
} from "./chunk-DH7FIRD7.mjs";
import "./chunk-IHLGWONG.mjs";
import "./chunk-Y5N26HX3.mjs";
import {
  supabase
} from "./chunk-2FS42ITU.mjs";
import {
  require_lucide_react
} from "./chunk-NDUCSHRX.mjs";
import "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/compare-BUn8Ks3A.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
function ComparePage() {
  const [productId, setProductId] = (0, import_react.useState)("");
  const [city, setCity] = (0, import_react.useState)("all");
  const {
    data: products
  } = useQuery({
    queryKey: ["products-list"],
    queryFn: async () => (await supabase.from("products").select("id,name,category,unit").order("name")).data ?? []
  });
  const {
    data: cities
  } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("markets").select("city");
      return Array.from(new Set((data ?? []).map((r) => r.city)));
    }
  });
  const {
    data: rows
  } = useQuery({
    queryKey: ["compare", productId, city],
    enabled: !!productId,
    queryFn: async () => {
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const {
        data: latestDateRow
      } = await supabase.from("product_prices").select("recorded_at").order("recorded_at", {
        ascending: false
      }).limit(1).maybeSingle();
      const dateToUse = latestDateRow?.recorded_at || today;
      let query = supabase.from("product_prices").select("price,market:markets(id,name,city,address)").eq("recorded_at", dateToUse).eq("product_id", productId);
      const {
        data
      } = await query;
      let dbPrices = data ?? [];
      if (dbPrices.length === 0) {
        const {
          data: products2
        } = await supabase.from("products").select("id,name,category,unit").order("name");
        const {
          data: markets
        } = await supabase.from("markets").select("id,name,city,address").order("name");
        if (products2 && markets) {
          const benchmarkPrices = getDeterministicBenchmarkPrices(products2, markets, dateToUse);
          dbPrices = benchmarkPrices.filter((p) => p.product_id === productId).map((p) => ({
            price: p.price,
            market: p.market
          }));
        }
      }
      let out = dbPrices.map((r) => ({
        price: Number(r.price),
        market: r.market
      }));
      if (city !== "all") out = out.filter((r) => r.market?.city === city);
      out.sort((a, b) => a.price - b.price);
      return out;
    }
  });
  const cheapest = rows?.[0];
  const priciest = rows?.[rows.length - 1];
  const saving = cheapest && priciest ? priciest.price - cheapest.price : 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Bandingkan Harga Antar Pasar", description: '"Di pasar mana saya bisa belanja paling hemat hari ini?"' }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-6 grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "mb-1 block text-xs font-semibold uppercase text-[var(--color-gray-500)]", children: "Pilih Produk" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, { value: productId, onValueChange: setProductId, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Pilih produk..." }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (products ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, { value: p.id, children: [
            p.name,
            " (",
            p.unit,
            ")"
          ] }, p.id)) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "mb-1 block text-xs font-semibold uppercase text-[var(--color-gray-500)]", children: "Kota" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, { value: city, onValueChange: setCity, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Semua kota" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, { value: "all", children: "Semua kota" }),
            (cities ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, { value: c, children: c }, c))
          ] })
        ] })
      ] })
    ] }),
    !productId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Pilih produk untuk membandingkan", description: "Pilih satu produk untuk melihat selisih harga antar pasar." }),
    productId && rows && rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Belum ada data", description: "Coba ganti kota atau produk." }),
    productId && rows && rows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-6 grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-success)] bg-[var(--color-success)]/10 p-5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trophy, { className: "mb-2 h-6 w-6 text-[var(--color-success)]" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs font-semibold uppercase text-[var(--color-gray-500)]", children: "Pasar Termurah" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-1 text-lg font-bold text-[var(--color-ink)]", children: cheapest?.market.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-2xl font-black text-[var(--color-success)]", children: idr(cheapest?.price) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs font-semibold uppercase text-[var(--color-gray-500)]", children: "Harga Termahal" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-1 text-lg font-bold text-[var(--color-ink)]", children: priciest?.market.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-2xl font-black", children: idr(priciest?.price) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)] p-5 text-white", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs font-semibold uppercase text-white/70", children: "Potensi Penghematan" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-1 text-3xl font-black", children: idr(saving) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs text-white/70", children: "per satuan jika belanja di pasar termurah" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Pasar" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Kota" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 text-right", children: "Harga" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 text-right", children: "Selisih" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: `border-t border-[var(--color-gray-100)] ${i === 0 ? "bg-[var(--color-success)]/5" : ""}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { className: "px-4 py-3 font-semibold", children: [
            r.market.name,
            " ",
            i === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "TERMURAH" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-[var(--color-gray-700)]", children: r.market.city }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: `px-4 py-3 text-right font-bold ${i === 0 ? "text-[var(--color-success)]" : ""}`, children: idr(r.price) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right text-[var(--color-gray-500)]", children: i === 0 ? "\u2014" : `+${idr(r.price - cheapest.price)}` })
        ] }, r.market.id)) })
      ] }) })
    ] })
  ] });
}
function Badge({
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-2 rounded bg-[var(--color-success)] px-2 py-0.5 text-[10px] font-bold uppercase text-white", children });
}
export {
  ComparePage as component
};
