import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, P as PageHeader, E as EmptyState } from "./app-shell-JvQTbMhg.js";
import { useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { useState } from "react";
import { d as deltaPct, i as idr } from "./format-C1KpzYiq.js";
import { I as Input } from "./input-C0QjszdI.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { Search, ArrowUp, ArrowDown, Minus } from "lucide-react";
import "@tanstack/react-router";
import "./router-KEMZH_Q0.js";
import "sonner";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-select";
import "class-variance-authority";
function PricesPage() {
  const [q, setQ] = useState("");
  const [marketId, setMarketId] = useState("all");
  const [category, setCategory] = useState("all");
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
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Harga Sembako Hari Ini", description: "Update terbaru dari pasar tradisional di sekitar Anda." }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4 grid gap-3 sm:grid-cols-[1fr_200px_200px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-gray-500)]" }),
        /* @__PURE__ */ jsx(Input, { className: "pl-9", placeholder: "Cari produk...", value: q, onChange: (e) => setQ(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: marketId, onValueChange: setMarketId, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Semua pasar" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Semua pasar" }),
          (markets ?? []).map((m) => /* @__PURE__ */ jsx(SelectItem, { value: m.id, children: m.name }, m.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: category, onValueChange: setCategory, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Semua kategori" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Semua kategori" }),
          categories.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c, children: c }, c))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Produk" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kategori" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Pasar" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Harga Hari Ini" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Kemarin" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Perubahan" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        isLoading && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: "px-4 py-8 text-center text-[var(--color-gray-500)]", colSpan: 6, children: "Memuat..." }) }),
        !isLoading && filtered.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, children: /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada data harga", description: "Coba ubah filter atau pilih pasar lain." }) }) }),
        filtered.map((r) => {
          const d = deltaPct(r.price, r.prev);
          const status = d == null ? "stabil" : d > 1 ? "naik" : d < -1 ? "turun" : "stabil";
          return /* @__PURE__ */ jsxs("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 font-semibold text-[var(--color-ink)]", children: [
              r.product.name,
              " ",
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-[var(--color-gray-500)]", children: [
                "/ ",
                r.product.unit
              ] })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-[var(--color-gray-700)]", children: r.product.category }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-[var(--color-gray-700)]", children: r.market.name }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right font-bold", children: idr(r.price) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right text-[var(--color-gray-500)]", children: idr(r.prev) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: status === "naik" ? "border-[var(--color-destructive)] text-[var(--color-destructive)]" : status === "turun" ? "border-[var(--color-success)] text-[var(--color-success)]" : "border-[var(--color-gray-300)] text-[var(--color-gray-500)]", children: [
              status === "naik" && /* @__PURE__ */ jsx(ArrowUp, { className: "mr-1 h-3 w-3" }),
              status === "turun" && /* @__PURE__ */ jsx(ArrowDown, { className: "mr-1 h-3 w-3" }),
              status === "stabil" && /* @__PURE__ */ jsx(Minus, { className: "mr-1 h-3 w-3" }),
              d == null ? "—" : `${d > 0 ? "+" : ""}${d.toFixed(1)}%`
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
