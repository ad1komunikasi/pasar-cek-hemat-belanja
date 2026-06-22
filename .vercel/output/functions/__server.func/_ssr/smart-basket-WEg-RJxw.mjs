import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell, P as PageHeader, E as EmptyState } from "./app-shell-DNK_0Qfv.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-B2Ztv5jM.mjs";
import { u as useAuth } from "./router-fTkOEsEW.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { i as idr } from "./format-C1KpzYiq.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Share2, u as Plus, v as Trash2, k as TrendingDown, j as Store, w as Split, x as Trophy, y as CircleAlert } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
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
        data
      } = await supabase.from("product_prices").select("price,product_id,market:markets(id,name,city)").eq("recorded_at", today).in("product_id", productIds);
      return data ?? [];
    }
  });
  const recommendations = reactExports.useMemo(() => {
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
  const productCheapestPrices = reactExports.useMemo(() => {
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
  const crossMarketTotal = reactExports.useMemo(() => {
    if (!items) return 0;
    return items.reduce((sum, item) => {
      const cheapestPrice = productCheapestPrices[item.product_id]?.price;
      return sum + (cheapestPrice ? cheapestPrice * item.quantity : 0);
    }, 0);
  }, [items, productCheapestPrices]);
  const [newProduct, setNewProduct] = reactExports.useState("");
  const [qty, setQty] = reactExports.useState("1");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Smart Basket", description: "Simulasikan belanja Anda dan temukan pasar termurah hari ini.", action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link disalin");
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
      " Bagikan"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-[var(--color-gray-100)] p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-[1fr_120px_auto]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newProduct, onValueChange: setNewProduct, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih produk..." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (products ?? []).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p.id, children: [
              p.name,
              " (",
              p.unit,
              ")"
            ] }, p.id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0.1", step: "0.1", value: qty, onChange: (e) => setQty(e.target.value), placeholder: "Jumlah" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: addItem, disabled: !newProduct, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Tambah"
          ] })
        ] }) }),
        !items || items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: "Belum ada produk di keranjang", description: "Tambahkan produk untuk mulai menghitung penghematan." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5", children: "Produk" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right", children: "Harga Satuan (Terendah)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-center", children: "Jumlah" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right", children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-center" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((it) => {
            const cheapestInfo = productCheapestPrices[it.product_id];
            const price = cheapestInfo?.price;
            const marketName = cheapestInfo?.marketName;
            const subtotal = price ? price * it.quantity : 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]/50 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: it.product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-[var(--color-gray-500)] font-normal", children: it.product.category || "Umum" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: price ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[var(--color-brand-blue)]", children: idr(price) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-[var(--color-brand-green)] font-medium truncate max-w-[150px] ml-auto", children: [
                  "di ",
                  marketName
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[var(--color-gray-500)]", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0.1", step: "0.1", defaultValue: it.quantity, onBlur: (e) => updateQty(it.id, Number(e.target.value)), className: "w-16 h-8 text-center text-xs font-semibold rounded-md border border-[var(--color-gray-300)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[var(--color-gray-500)]", children: it.unit })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-bold text-[var(--color-ink)]", children: price ? idr(subtotal) : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors", onClick: () => removeItem(it.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-[var(--color-destructive)]" }) }) })
            ] }, it.id);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t-2 border-[var(--color-gray-300)] bg-[var(--color-gray-50)]/50 font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "px-4 py-3 text-left font-semibold text-[var(--color-gray-700)]", children: "Total Belanja Terendah (Campuran Pasar)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-base font-black text-[var(--color-brand-blue)]", children: idr(crossMarketTotal) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", {})
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-green)] p-6 text-white shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-white/70", children: "Estimasi Penghematan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-3xl font-black", children: idr(saving) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/80", children: "Selisih antara pasar termurah & termahal di keranjang Anda" })
        ] }),
        items && items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-4 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-3.5 text-sm font-bold uppercase text-[var(--color-gray-500)] flex items-center gap-1.5 border-b border-[var(--color-gray-100)] pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4 text-[var(--color-brand-blue)]" }),
            "Perbandingan Strategi Belanja"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-[var(--color-gray-50)] p-3 border border-[var(--color-gray-100)] hover:border-[var(--color-brand-blue)]/30 transition-all", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-wider text-[var(--color-brand-blue)] bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded", children: "Taktik A: Satu Lokasi" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-xs mt-1.5 text-[var(--color-ink)] flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "h-3.5 w-3.5 text-[var(--color-brand-blue)]" }),
                    cheapest ? cheapest.name : "Tidak Tersedia"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-[var(--color-brand-blue)] shrink-0", children: cheapest ? idr(cheapest.total) : "—" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[var(--color-gray-500)] mt-1.5 leading-relaxed", children: cheapest ? `Praktis & cepat. Beli seluruh keranjang belanja Anda di ${cheapest.name} (${cheapest.city}).` : "Tidak ada satu pun pasar yang memiliki semua produk ini secara bersamaan hari ini." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-[var(--color-brand-green)]/[0.03] p-3 border border-[var(--color-brand-green)]/15 hover:border-[var(--color-brand-green)]/35 transition-all", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-wider text-[var(--color-brand-green)] bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded", children: "Taktik B: Multi-Pasar" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-xs mt-1.5 text-[var(--color-brand-green)] flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Split, { className: "h-3.5 w-3.5" }),
                    "Lintas Pasar Termurah"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-[var(--color-brand-green)] shrink-0", children: idr(crossMarketTotal) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[var(--color-brand-green)] mt-1.5 leading-relaxed", children: "Beli tiap produk di pasar termurahnya masing-masing untuk mendapatkan total harga paling murah." })
            ] }),
            cheapest && crossMarketTotal > 0 && cheapest.total > crossMarketTotal ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 rounded-md bg-[var(--color-success)]/5 p-3 border border-[var(--color-success)]/15 text-[var(--color-success)] text-[11px] leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 shrink-0 text-[var(--color-success)] mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Hemat tambahan sebesar ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-bold text-xs", children: idr(cheapest.total - crossMarketTotal) }),
                " jika membeli secara terpisah di beberapa pasar berbeda."
              ] })
            ] }) : cheapest ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 rounded-md bg-blue-50/50 p-2.5 border border-blue-100 text-[var(--color-brand-blue)] text-[10px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Harga satu pasar termurah sudah optimal! Belanja di ",
                cheapest.name,
                " memberikan harga terbaik tanpa perlu mengunjungi beberapa pasar."
              ] })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-4 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-sm font-bold uppercase text-[var(--color-gray-500)]", children: "Rekomendasi Pasar" }),
          recommendations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--color-gray-500)]", children: "Tambahkan produk untuk melihat rekomendasi." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: recommendations.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: `flex items-center justify-between rounded-md border p-3 transition-colors ${i === 0 ? "border-[var(--color-success)] bg-[var(--color-success)]/5" : "border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]/50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 font-semibold text-xs sm:text-sm", children: [
                i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-[var(--color-success)]" }),
                m.name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[var(--color-gray-500)]", children: m.city })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm sm:text-base font-black ${i === 0 ? "text-[var(--color-success)]" : ""}`, children: idr(m.total) })
          ] }, m.id)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  SmartBasketPage as component
};
