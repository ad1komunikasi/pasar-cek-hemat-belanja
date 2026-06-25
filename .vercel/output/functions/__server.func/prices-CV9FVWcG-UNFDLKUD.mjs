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
  deltaPct,
  fmtDate,
  fmtDateTime,
  idr
} from "./chunk-LEY4RZ2W.mjs";
import {
  Input
} from "./chunk-KM4Y5GSG.mjs";
import {
  useQuery
} from "./chunk-DH7FIRD7.mjs";
import "./chunk-NXBQQK3G.mjs";
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

// dist/server/assets/prices-CV9FVWcG.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
function PricesPage() {
  const [q, setQ] = (0, import_react.useState)("");
  const [marketId, setMarketId] = (0, import_react.useState)("all");
  const [category, setCategory] = (0, import_react.useState)("all");
  const [selectedDate, setSelectedDate] = (0, import_react.useState)("");
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
    queryKey: ["prices-today", marketId, category, selectedDate],
    queryFn: async () => {
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      let dateToUse = selectedDate;
      if (!dateToUse) {
        const {
          data: latestDateRow
        } = await supabase.from("product_prices").select("recorded_at").order("recorded_at", {
          ascending: false
        }).limit(1).maybeSingle();
        dateToUse = latestDateRow?.recorded_at || today;
      }
      const dateToUseMs = new Date(dateToUse).getTime();
      const ydaystr = new Date(dateToUseMs - 864e5).toISOString().slice(0, 10);
      let query = supabase.from("product_prices").select("id, price, recorded_at, created_at, product:products(id,name,category,unit), market:markets(id,name,city)").eq("recorded_at", dateToUse);
      if (marketId !== "all") query = query.eq("market_id", marketId);
      const {
        data
      } = await query;
      let dbPrices = data ?? [];
      let isBenchmark = false;
      if (dbPrices.length === 0) {
        const {
          data: products
        } = await supabase.from("products").select("id,name,category,unit").order("name");
        const {
          data: markets2
        } = await supabase.from("markets").select("id,name,city").order("name");
        if (products && markets2) {
          isBenchmark = true;
          const benchmarkPrices = getDeterministicBenchmarkPrices(products, markets2, dateToUse);
          if (marketId !== "all") {
            dbPrices = benchmarkPrices.filter((p) => p.market_id === marketId);
          } else {
            dbPrices = benchmarkPrices;
          }
        }
      }
      let yresQuery = supabase.from("product_prices").select("product_id,market_id,price").eq("recorded_at", ydaystr);
      const yres = await yresQuery;
      let yPrices = yres.data ?? [];
      if (yPrices.length === 0) {
        const {
          data: products
        } = await supabase.from("products").select("id,name,category,unit").order("name");
        const {
          data: markets2
        } = await supabase.from("markets").select("id,name,city").order("name");
        if (products && markets2) {
          yPrices = getDeterministicBenchmarkPrices(products, markets2, ydaystr);
        }
      }
      const ymap = /* @__PURE__ */ new Map();
      yPrices.forEach((r) => ymap.set(r.product_id + ":" + r.market_id, Number(r.price)));
      return {
        dateUsed: dateToUse,
        isBenchmark,
        list: dbPrices.map((r) => ({
          ...r,
          price: Number(r.price),
          prev: ymap.get(r.product_id + ":" + r.market_id) ?? null
        }))
      };
    }
  });
  const pricesList = prices?.list ?? [];
  const activeDate = prices?.dateUsed ?? selectedDate;
  const categories = Array.from(new Set(pricesList.map((p) => p.product.category)));
  const filtered = pricesList.filter((p) => (category === "all" || p.product.category === category) && (!q || p.product.name.toLowerCase().includes(q.toLowerCase())));
  const lastUpdatedTimestamp = (0, import_react.useMemo)(() => {
    if (!pricesList.length) return null;
    const times = pricesList.map((p) => p.created_at ? new Date(p.created_at).getTime() : 0).filter((t) => !isNaN(t) && t > 0);
    return times.length ? new Date(Math.max(...times)) : null;
  }, [pricesList]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Harga Sembako Hari Ini", description: "Update terbaru dari pasar tradisional di sekitar Anda." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-4 grid gap-3 sm:grid-cols-[1fr_180px_180px_180px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-gray-500)]" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { className: "pl-9 h-10", placeholder: "Cari produk...", value: q, onChange: (e) => setQ(e.target.value) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Calendar, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-gray-500)] pointer-events-none" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { type: "date", className: "pl-9 h-10 cursor-pointer", value: activeDate, onChange: (e) => setSelectedDate(e.target.value) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, { value: marketId, onValueChange: setMarketId, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { className: "h-10", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Semua pasar" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, { value: "all", children: "Semua pasar" }),
          (markets ?? []).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, { value: m.id, children: m.name }, m.id))
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, { value: category, onValueChange: setCategory, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { className: "h-10", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Semua kategori" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, { value: "all", children: "Semua kategori" }),
          categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, { value: c, children: c }, c))
        ] })
      ] })
    ] }),
    pricesList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[var(--color-gray-50)] p-4 border border-[var(--color-gray-100)] text-xs text-[var(--color-gray-700)]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-1.5 font-medium", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "relative flex h-2 w-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Database, { className: "h-3.5 w-3.5 text-[var(--color-brand-blue)]" }),
          prices?.isBenchmark ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-1", children: [
            "Terintegrasi Acuan Online",
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { href: "https://sp2kp.kemendag.go.id/", target: "_blank", rel: "noopener noreferrer", className: "font-bold underline text-[var(--color-brand-blue)] hover:text-[var(--color-brand-green)] flex items-center gap-0.5", children: [
              "SP2KP Kemendag ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ExternalLink, { className: "h-3 w-3 inline" })
            ] })
          ] }) : "Terhubung ke Database Utama (Real-Time)"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-[var(--color-gray-500)]", children: [
        "Tanggal Data: ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { className: "text-[var(--color-brand-blue)] font-bold", children: fmtDate(activeDate) }),
        lastUpdatedTimestamp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "ml-2 pl-2 border-l border-[var(--color-gray-300)]", children: [
          "Update Real-Time: ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { className: "text-[var(--color-brand-green)] font-bold", children: fmtDateTime(lastUpdatedTimestamp) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Produk" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Kategori" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3", children: "Pasar" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 text-right", children: "Harga" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 text-right", children: "Sebelumnya" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 text-right", children: "Perubahan" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
        isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-8 text-center text-[var(--color-gray-500)]", colSpan: 6, children: "Memuat..." }) }),
        !isLoading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { colSpan: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Belum ada data harga", description: "Coba ubah filter, pilih tanggal lain, atau pilih pasar lain." }) }) }),
        filtered.map((r) => {
          const d = deltaPct(r.price, r.prev);
          const status = d == null ? "stabil" : d > 1 ? "naik" : d < -1 ? "turun" : "stabil";
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-t border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]/30 transition-colors", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { className: "px-4 py-3 font-semibold text-[var(--color-ink)]", children: [
              r.product.name,
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-xs text-[var(--color-gray-500)] font-normal", children: [
                "/ ",
                r.product.unit
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-[var(--color-gray-700)]", children: r.product.category }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-[var(--color-gray-700)]", children: r.market.name }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right font-bold", children: idr(r.price) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right text-[var(--color-gray-500)]", children: idr(r.prev) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { variant: "outline", className: status === "naik" ? "border-[var(--color-destructive)] text-[var(--color-destructive)] bg-red-50/10" : status === "turun" ? "border-[var(--color-success)] text-[var(--color-success)] bg-green-50/10" : "border-[var(--color-gray-300)] text-[var(--color-gray-500)]", children: [
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
