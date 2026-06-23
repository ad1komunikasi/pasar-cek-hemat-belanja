import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AppShell, P as PageHeader, E as EmptyState } from "./app-shell-JvQTbMhg.js";
import { useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { useState } from "react";
import { i as idr } from "./format-C1KpzYiq.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.js";
import { Trophy } from "lucide-react";
import "@tanstack/react-router";
import "./router-KEMZH_Q0.js";
import "sonner";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-select";
function ComparePage() {
  const [productId, setProductId] = useState("");
  const [city, setCity] = useState("all");
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
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Bandingkan Harga Antar Pasar", description: '"Di pasar mana saya bisa belanja paling hemat hari ini?"' }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-semibold uppercase text-[var(--color-gray-500)]", children: "Pilih Produk" }),
        /* @__PURE__ */ jsxs(Select, { value: productId, onValueChange: setProductId, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih produk..." }) }),
          /* @__PURE__ */ jsx(SelectContent, { children: (products ?? []).map((p) => /* @__PURE__ */ jsxs(SelectItem, { value: p.id, children: [
            p.name,
            " (",
            p.unit,
            ")"
          ] }, p.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-semibold uppercase text-[var(--color-gray-500)]", children: "Kota" }),
        /* @__PURE__ */ jsxs(Select, { value: city, onValueChange: setCity, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Semua kota" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Semua kota" }),
            (cities ?? []).map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c, children: c }, c))
          ] })
        ] })
      ] })
    ] }),
    !productId && /* @__PURE__ */ jsx(EmptyState, { title: "Pilih produk untuk membandingkan", description: "Pilih satu produk untuk melihat selisih harga antar pasar." }),
    productId && rows && rows.length === 0 && /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada data", description: "Coba ganti kota atau produk." }),
    productId && rows && rows.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[var(--color-success)] bg-[var(--color-success)]/10 p-5", children: [
          /* @__PURE__ */ jsx(Trophy, { className: "mb-2 h-6 w-6 text-[var(--color-success)]" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase text-[var(--color-gray-500)]", children: "Pasar Termurah" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-lg font-bold text-[var(--color-ink)]", children: cheapest?.market.name }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-black text-[var(--color-success)]", children: idr(cheapest?.price) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase text-[var(--color-gray-500)]", children: "Harga Termahal" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-lg font-bold text-[var(--color-ink)]", children: priciest?.market.name }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-black", children: idr(priciest?.price) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)] p-5 text-white", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase text-white/70", children: "Potensi Penghematan" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-3xl font-black", children: idr(saving) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-white/70", children: "per satuan jika belanja di pasar termurah" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Pasar" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kota" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Harga" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Selisih" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: rows.map((r, i) => /* @__PURE__ */ jsxs("tr", { className: `border-t border-[var(--color-gray-100)] ${i === 0 ? "bg-[var(--color-success)]/5" : ""}`, children: [
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 font-semibold", children: [
            r.market.name,
            " ",
            i === 0 && /* @__PURE__ */ jsx(Badge, { children: "TERMURAH" })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-[var(--color-gray-700)]", children: r.market.city }),
          /* @__PURE__ */ jsx("td", { className: `px-4 py-3 text-right font-bold ${i === 0 ? "text-[var(--color-success)]" : ""}`, children: idr(r.price) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right text-[var(--color-gray-500)]", children: i === 0 ? "—" : `+${idr(r.price - cheapest.price)}` })
        ] }, r.market.id)) })
      ] }) })
    ] })
  ] });
}
function Badge({
  children
}) {
  return /* @__PURE__ */ jsx("span", { className: "ml-2 rounded bg-[var(--color-success)] px-2 py-0.5 text-[10px] font-bold uppercase text-white", children });
}
export {
  ComparePage as component
};
