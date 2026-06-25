import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  getDeterministicBenchmarkPrices
} from "./chunk-P3OCNXRP.mjs";
import {
  Route$o
} from "./chunk-EG7TMMQE.mjs";
import "./chunk-C7CN73EW.mjs";
import {
  idr
} from "./chunk-LEY4RZ2W.mjs";
import {
  useQuery
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
import {
  Link
} from "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/markets._id-DJQi6hb1.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
var import_react = __toESM(require_react(), 1);
function MarketDetail() {
  const {
    id
  } = Route$o.useParams();
  const {
    data: market
  } = useQuery({
    queryKey: ["market", id],
    queryFn: async () => (await supabase.from("markets").select("*").eq("id", id).maybeSingle()).data
  });
  const {
    data: prices
  } = useQuery({
    queryKey: ["market-prices", id],
    queryFn: async () => {
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const {
        data: latestDateRow
      } = await supabase.from("product_prices").select("recorded_at").order("recorded_at", {
        ascending: false
      }).limit(1).maybeSingle();
      const dateToUse = latestDateRow?.recorded_at || today;
      const {
        data
      } = await supabase.from("product_prices").select("price, product:products(id,name,unit,category)").eq("market_id", id).eq("recorded_at", dateToUse);
      let dbPrices = data ?? [];
      if (dbPrices.length === 0) {
        const {
          data: products
        } = await supabase.from("products").select("id,name,category,unit").order("name");
        const {
          data: markets
        } = await supabase.from("markets").select("id,name,city").order("name");
        if (products && markets) {
          const benchmarkPrices = getDeterministicBenchmarkPrices(products, markets, dateToUse);
          dbPrices = benchmarkPrices.filter((p) => p.market_id === id).map((p) => ({
            price: p.price,
            product: p.product
          }));
        }
      }
      return dbPrices;
    }
  });
  if (!market) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-10 text-center", children: "Memuat..." });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "border-b border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/markets", className: "flex items-center gap-2 text-sm font-semibold", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowLeft, { className: "h-4 w-4" }),
        " Semua Pasar"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/auth", children: "Masuk" }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { className: "mx-auto max-w-6xl px-4 py-10", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-4xl font-black", children: market.name }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "mt-2 flex items-center gap-2 text-[var(--color-gray-500)]", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MapPin, { className: "h-4 w-4" }),
        market.address,
        ", ",
        market.city
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mt-2 flex items-center gap-3 text-sm text-[var(--color-gray-700)]", children: [
        market.hours && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Clock, { className: "h-4 w-4" }),
          market.hours
        ] }),
        market.google_maps_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { href: market.google_maps_url, target: "_blank", rel: "noopener", className: "flex items-center gap-1 text-[var(--color-brand-blue)] hover:underline", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ExternalLink, { className: "h-4 w-4" }),
          "Buka di Google Maps"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "mt-10 text-2xl font-bold", children: "Harga Hari Ini" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Produk" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Kategori" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 text-right", children: "Harga" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (prices ?? []).map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { className: "px-4 py-3 font-semibold", children: [
            r.product.name,
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-xs text-[var(--color-gray-500)]", children: [
              "/ ",
              r.product.unit
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-[var(--color-gray-700)]", children: r.product.category }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right font-bold", children: idr(Number(r.price)) })
        ] }, i)) })
      ] }) })
    ] })
  ] });
}
export {
  MarketDetail as component
};
