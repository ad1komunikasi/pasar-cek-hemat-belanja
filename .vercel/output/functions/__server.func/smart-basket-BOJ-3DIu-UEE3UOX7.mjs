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
  getDeterministicBenchmarkPrices
} from "./chunk-P3OCNXRP.mjs";
import {
  AppShell,
  EmptyState,
  PageHeader
} from "./chunk-TQBGYPF4.mjs";
import "./chunk-SJQOHQ2J.mjs";
import {
  idr
} from "./chunk-LEY4RZ2W.mjs";
import {
  useAuth
} from "./chunk-YRLTXJTO.mjs";
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
import "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/smart-basket-BOJ-3DIu.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
function SmartBasketPage() {
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const {
    data: basket
  } = useQuery({
    queryKey: ["basket", user?.id],
    queryFn: async () => {
      const {
        data: existing
      } = await supabase.from("smart_baskets").select("*").eq("user_id", user.id).order("created_at", {
        ascending: false
      }).limit(1).maybeSingle();
      if (existing) return existing;
      const {
        data: created
      } = await supabase.from("smart_baskets").insert({
        user_id: user.id,
        name: "Keranjang Saya"
      }).select().single();
      return created;
    }
  });
  const {
    data: items
  } = useQuery({
    queryKey: ["basket-items", basket?.id],
    enabled: !!basket?.id,
    queryFn: async () => (await supabase.from("basket_items").select("*, product:products(id,name,unit,category)").eq("basket_id", basket.id)).data ?? []
  });
  const {
    data: products
  } = useQuery({
    queryKey: ["products-list-basket"],
    queryFn: async () => (await supabase.from("products").select("id,name,unit").order("name")).data ?? []
  });
  const {
    data: pricesByMarket
  } = useQuery({
    queryKey: ["basket-prices", items?.map((i) => i.product_id).sort().join(",")],
    enabled: !!items && items.length > 0,
    queryFn: async () => {
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const productIds = items.map((i) => i.product_id);
      const {
        data: latestDateRow
      } = await supabase.from("product_prices").select("recorded_at").order("recorded_at", {
        ascending: false
      }).limit(1).maybeSingle();
      const dateToUse = latestDateRow?.recorded_at || today;
      const {
        data
      } = await supabase.from("product_prices").select("price,product_id,market:markets(id,name,city)").eq("recorded_at", dateToUse).in("product_id", productIds);
      let dbPrices = data ?? [];
      if (dbPrices.length === 0) {
        const {
          data: products2
        } = await supabase.from("products").select("id,name,category,unit").order("name");
        const {
          data: markets
        } = await supabase.from("markets").select("id,name,city").order("name");
        if (products2 && markets) {
          const benchmarkPrices = getDeterministicBenchmarkPrices(products2, markets, dateToUse);
          dbPrices = benchmarkPrices.filter((p) => productIds.includes(p.product_id)).map((p) => ({
            price: p.price,
            product_id: p.product_id,
            market: p.market
          }));
        }
      }
      return dbPrices;
    }
  });
  const recommendations = (0, import_react.useMemo)(() => {
    if (!items || !pricesByMarket) return [];
    const markets = /* @__PURE__ */ new Map();
    for (const row of pricesByMarket) {
      const item = items.find((i) => i.product_id === row.product_id);
      if (!item) continue;
      const key = row.market.id;
      const m = markets.get(key) ?? {
        id: row.market.id,
        name: row.market.name,
        city: row.market.city,
        total: 0,
        covered: 0
      };
      m.total += Number(row.price) * Number(item.quantity);
      m.covered += 1;
      markets.set(key, m);
    }
    return Array.from(markets.values()).filter((m) => m.covered === items.length).sort((a, b) => a.total - b.total);
  }, [items, pricesByMarket]);
  const cheapest = recommendations[0];
  const priciest = recommendations[recommendations.length - 1];
  const saving = cheapest && priciest ? priciest.total - cheapest.total : 0;
  const productCheapestPrices = (0, import_react.useMemo)(() => {
    if (!items || !pricesByMarket) return {};
    const prices = {};
    for (const row of pricesByMarket) {
      const pId = row.product_id;
      const priceNum = Number(row.price);
      const current = prices[pId];
      if (!current || priceNum < current.price) {
        prices[pId] = {
          price: priceNum,
          marketName: row.market.name,
          marketId: row.market.id
        };
      }
    }
    return prices;
  }, [items, pricesByMarket]);
  const crossMarketTotal = (0, import_react.useMemo)(() => {
    if (!items) return 0;
    return items.reduce((sum, item) => {
      const cheapestPrice = productCheapestPrices[item.product_id]?.price;
      return sum + (cheapestPrice ? cheapestPrice * item.quantity : 0);
    }, 0);
  }, [items, productCheapestPrices]);
  const [newProduct, setNewProduct] = (0, import_react.useState)("");
  const [qty, setQty] = (0, import_react.useState)("1");
  async function addItem() {
    if (!newProduct || !basket) return;
    const p = products.find((x) => x.id === newProduct);
    const {
      error
    } = await supabase.from("basket_items").insert({
      basket_id: basket.id,
      product_id: newProduct,
      unit: p?.unit ?? "kg",
      quantity: Number(qty) || 1
    });
    if (error) return toast.error(error.message);
    setNewProduct("");
    setQty("1");
    qc.invalidateQueries({
      queryKey: ["basket-items"]
    });
    qc.invalidateQueries({
      queryKey: ["basket-prices"]
    });
  }
  async function removeItem(id) {
    await supabase.from("basket_items").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["basket-items"]
    });
    qc.invalidateQueries({
      queryKey: ["basket-prices"]
    });
  }
  async function updateQty(id, q) {
    await supabase.from("basket_items").update({
      quantity: q
    }).eq("id", id);
    qc.invalidateQueries({
      queryKey: ["basket-items"]
    });
    qc.invalidateQueries({
      queryKey: ["basket-prices"]
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Smart Basket", description: "Simulasikan belanja Anda dan temukan pasar termurah hari ini.", action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { variant: "outline", onClick: () => {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link disalin");
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Share2, { className: "h-4 w-4" }),
      " Bagikan"
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid gap-6 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-b border-[var(--color-gray-100)] p-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid gap-2 sm:grid-cols-[1fr_120px_auto]", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, { value: newProduct, onValueChange: setNewProduct, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Pilih produk..." }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (products ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, { value: p.id, children: [
              p.name,
              " (",
              p.unit,
              ")"
            ] }, p.id)) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { type: "number", min: "0.1", step: "0.1", value: qty, onChange: (e) => setQty(e.target.value), placeholder: "Jumlah" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { onClick: addItem, disabled: !newProduct, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Plus, { className: "h-4 w-4" }),
            " Tambah"
          ] })
        ] }) }),
        !items || items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Belum ada produk di keranjang", description: "Tambahkan produk untuk mulai menghitung penghematan." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-2.5", children: "Produk" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-2.5 text-right", children: "Harga Satuan (Terendah)" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-2.5 text-center", children: "Jumlah" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-2.5 text-right", children: "Subtotal" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-2.5 text-center" })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((it) => {
            const cheapestInfo = productCheapestPrices[it.product_id];
            const price = cheapestInfo?.price;
            const marketName = cheapestInfo?.marketName;
            const subtotal = price ? price * it.quantity : 0;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-t border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]/50 transition-colors", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { className: "px-4 py-3 font-semibold", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: it.product.name }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-[10px] text-[var(--color-gray-500)] font-normal", children: it.product.category || "Umum" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right", children: price ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "font-semibold text-[var(--color-brand-blue)]", children: idr(price) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-[10px] text-[var(--color-brand-green)] font-medium truncate max-w-[150px] ml-auto", children: [
                  "di ",
                  marketName
                ] })
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs text-[var(--color-gray-500)]", children: "\u2014" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-center gap-1.5", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { type: "number", min: "0.1", step: "0.1", defaultValue: it.quantity, onBlur: (e) => updateQty(it.id, Number(e.target.value)), className: "w-16 h-8 text-center text-xs font-semibold rounded-md border border-[var(--color-gray-300)]" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs text-[var(--color-gray-500)]", children: it.unit })
              ] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right font-bold text-[var(--color-ink)]", children: price ? idr(subtotal) : "\u2014" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors", onClick: () => removeItem(it.id), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2, { className: "h-4 w-4 text-[var(--color-destructive)]" }) }) })
            ] }, it.id);
          }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: "border-t-2 border-[var(--color-gray-300)] bg-[var(--color-gray-50)]/50 font-bold", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { colSpan: 3, className: "px-4 py-3 text-left font-semibold text-[var(--color-gray-700)]", children: "Total Belanja Terendah (Campuran Pasar)" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3 text-right text-base font-black text-[var(--color-brand-blue)]", children: idr(crossMarketTotal) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {})
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-green)] p-6 text-white shadow-soft", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs font-semibold uppercase text-white/70", children: "Estimasi Penghematan" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-2 text-3xl font-black", children: idr(saving) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-1 text-xs text-white/80", children: "Selisih antara pasar termurah & termahal di keranjang Anda" })
        ] }),
        items && items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-4 shadow-soft", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { className: "mb-3.5 text-sm font-bold uppercase text-[var(--color-gray-500)] flex items-center gap-1.5 border-b border-[var(--color-gray-100)] pb-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.TrendingDown, { className: "h-4 w-4 text-[var(--color-brand-blue)]" }),
            "Perbandingan Strategi Belanja"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-md bg-[var(--color-gray-50)] p-3 border border-[var(--color-gray-100)] hover:border-[var(--color-brand-blue)]/30 transition-all", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[9px] font-bold uppercase tracking-wider text-[var(--color-brand-blue)] bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded", children: "Taktik A: Satu Lokasi" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", { className: "font-bold text-xs mt-1.5 text-[var(--color-ink)] flex items-center gap-1", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Store, { className: "h-3.5 w-3.5 text-[var(--color-brand-blue)]" }),
                    cheapest ? cheapest.name : "Tidak Tersedia"
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm font-black text-[var(--color-brand-blue)] shrink-0", children: cheapest ? idr(cheapest.total) : "\u2014" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-[10px] text-[var(--color-gray-500)] mt-1.5 leading-relaxed", children: cheapest ? `Praktis & cepat. Beli seluruh keranjang belanja Anda di ${cheapest.name} (${cheapest.city}).` : "Tidak ada satu pun pasar yang memiliki semua produk ini secara bersamaan hari ini." })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-md bg-[var(--color-brand-green)]/[0.03] p-3 border border-[var(--color-brand-green)]/15 hover:border-[var(--color-brand-green)]/35 transition-all", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[9px] font-bold uppercase tracking-wider text-[var(--color-brand-green)] bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded", children: "Taktik B: Multi-Pasar" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", { className: "font-bold text-xs mt-1.5 text-[var(--color-brand-green)] flex items-center gap-1", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Split, { className: "h-3.5 w-3.5" }),
                    "Lintas Pasar Termurah"
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm font-black text-[var(--color-brand-green)] shrink-0", children: idr(crossMarketTotal) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-[10px] text-[var(--color-brand-green)] mt-1.5 leading-relaxed", children: "Beli tiap produk di pasar termurahnya masing-masing untuk mendapatkan total harga paling murah." })
            ] }),
            cheapest && crossMarketTotal > 0 && cheapest.total > crossMarketTotal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-start gap-2 rounded-md bg-[var(--color-success)]/5 p-3 border border-[var(--color-success)]/15 text-[var(--color-success)] text-[11px] leading-relaxed", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trophy, { className: "h-4 w-4 shrink-0 text-[var(--color-success)] mt-0.5" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                "Hemat tambahan sebesar ",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { className: "font-bold text-xs", children: idr(cheapest.total - crossMarketTotal) }),
                " jika membeli secara terpisah di beberapa pasar berbeda."
              ] })
            ] }) : cheapest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-start gap-2 rounded-md bg-blue-50/50 p-2.5 border border-blue-100 text-[var(--color-brand-blue)] text-[10px]", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.AlertCircle, { className: "h-3.5 w-3.5 shrink-0 mt-0.5" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                "Harga satu pasar termurah sudah optimal! Belanja di ",
                cheapest.name,
                " memberikan harga terbaik tanpa perlu mengunjungi beberapa pasar."
              ] })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-4 shadow-soft", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "mb-3 text-sm font-bold uppercase text-[var(--color-gray-500)]", children: "Rekomendasi Pasar" }),
          recommendations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-[var(--color-gray-500)]", children: "Tambahkan produk untuk melihat rekomendasi." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "space-y-2", children: recommendations.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: `flex items-center justify-between rounded-md border p-3 transition-colors ${i === 0 ? "border-[var(--color-success)] bg-[var(--color-success)]/5" : "border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]/50"}`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "flex items-center gap-2 font-semibold text-xs sm:text-sm", children: [
                i === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trophy, { className: "h-4 w-4 text-[var(--color-success)]" }),
                m.name
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-[10px] text-[var(--color-gray-500)]", children: m.city })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: `text-sm sm:text-base font-black ${i === 0 ? "text-[var(--color-success)]" : ""}`, children: idr(m.total) })
          ] }, m.id)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  SmartBasketPage as component
};
