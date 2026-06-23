import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { i as idr } from "./format-C1KpzYiq.js";
import { ArrowLeft, MapPin, Clock, ExternalLink } from "lucide-react";
import { R as Route } from "./router-KEMZH_Q0.js";
import "@supabase/supabase-js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "sonner";
function MarketDetail() {
  const {
    id
  } = Route.useParams();
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
      return (await supabase.from("product_prices").select("price, product:products(id,name,unit,category)").eq("market_id", id).eq("recorded_at", today)).data ?? [];
    }
  });
  if (!market) return /* @__PURE__ */ jsx("div", { className: "p-10 text-center", children: "Memuat..." });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/markets", className: "flex items-center gap-2 text-sm font-semibold", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Semua Pasar"
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/auth", children: "Masuk" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-6xl px-4 py-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black", children: market.name }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 flex items-center gap-2 text-[var(--color-gray-500)]", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
        market.address,
        ", ",
        market.city
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-3 text-sm text-[var(--color-gray-700)]", children: [
        market.hours && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
          market.hours
        ] }),
        market.google_maps_url && /* @__PURE__ */ jsxs("a", { href: market.google_maps_url, target: "_blank", rel: "noopener", className: "flex items-center gap-1 text-[var(--color-brand-blue)] hover:underline", children: [
          /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4" }),
          "Buka di Google Maps"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "mt-10 text-2xl font-bold", children: "Harga Hari Ini" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Produk" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kategori" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Harga" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: (prices ?? []).map((r, i) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 font-semibold", children: [
            r.product.name,
            " ",
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-[var(--color-gray-500)]", children: [
              "/ ",
              r.product.unit
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-[var(--color-gray-700)]", children: r.product.category }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right font-bold", children: idr(Number(r.price)) })
        ] }, i)) })
      ] }) })
    ] })
  ] });
}
export {
  MarketDetail as component
};
