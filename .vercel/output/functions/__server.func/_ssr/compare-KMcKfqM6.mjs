import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell, P as PageHeader, E as EmptyState } from "./app-shell-Brvsmje8.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-B2Ztv5jM.mjs";
import { i as idr } from "./format-C1KpzYiq.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import "../_libs/sonner.mjs";
import { x as Trophy } from "../_libs/lucide-react.mjs";
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
import "./router-Bx_E7duL.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
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
function ComparePage() {
  const [productId, setProductId] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("all");
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
      let query = supabase.from("product_prices").select("price,market:markets(id,name,city,address)").eq("recorded_at", today).eq("product_id", productId);
      const {
        data
      } = await query;
      let out = (data ?? []).map((r) => ({
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Bandingkan Harga Antar Pasar", description: '"Di pasar mana saya bisa belanja paling hemat hari ini?"' }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs font-semibold uppercase text-[var(--color-gray-500)]", children: "Pilih Produk" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: productId, onValueChange: setProductId, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih produk..." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (products ?? []).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p.id, children: [
            p.name,
            " (",
            p.unit,
            ")"
          ] }, p.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs font-semibold uppercase text-[var(--color-gray-500)]", children: "Kota" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: city, onValueChange: setCity, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Semua kota" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Semua kota" }),
            (cities ?? []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c))
          ] })
        ] })
      ] })
    ] }),
    !productId && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: "Pilih produk untuk membandingkan", description: "Pilih satu produk untuk melihat selisih harga antar pasar." }),
    productId && rows && rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: "Belum ada data", description: "Coba ganti kota atau produk." }),
    productId && rows && rows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-[var(--color-success)] bg-[var(--color-success)]/10 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "mb-2 h-6 w-6 text-[var(--color-success)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-[var(--color-gray-500)]", children: "Pasar Termurah" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-lg font-bold text-[var(--color-ink)]", children: cheapest?.market.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black text-[var(--color-success)]", children: idr(cheapest?.price) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-[var(--color-gray-500)]", children: "Harga Termahal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-lg font-bold text-[var(--color-ink)]", children: priciest?.market.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black", children: idr(priciest?.price) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)] p-5 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-white/70", children: "Potensi Penghematan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-3xl font-black", children: idr(saving) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70", children: "per satuan jika belanja di pasar termurah" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Pasar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Kota" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Harga" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Selisih" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-t border-[var(--color-gray-100)] ${i === 0 ? "bg-[var(--color-success)]/5" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold", children: [
            r.market.name,
            " ",
            i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { children: "TERMURAH" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[var(--color-gray-700)]", children: r.market.city }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `px-4 py-3 text-right font-bold ${i === 0 ? "text-[var(--color-success)]" : ""}`, children: idr(r.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-[var(--color-gray-500)]", children: i === 0 ? "—" : `+${idr(r.price - cheapest.price)}` })
        ] }, r.market.id)) })
      ] }) })
    ] })
  ] });
}
function Badge({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 rounded bg-[var(--color-success)] px-2 py-0.5 text-[10px] font-bold uppercase text-white", children });
}
export {
  ComparePage as component
};
