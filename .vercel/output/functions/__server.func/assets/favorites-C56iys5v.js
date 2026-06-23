import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppShell, P as PageHeader, S as Section, E as EmptyState } from "./app-shell-JvQTbMhg.js";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { u as useAuth } from "./router-KEMZH_Q0.js";
import { Heart } from "lucide-react";
import { B as Button } from "./button-BC9oXVxV.js";
import { toast } from "sonner";
import "react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
function FavoritesPage() {
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const {
    data: products
  } = useQuery({
    queryKey: ["fav-products", user?.id],
    queryFn: async () => (await supabase.from("favorites_products").select("id, product:products(id,name,category,unit)").eq("user_id", user.id)).data ?? []
  });
  const {
    data: markets
  } = useQuery({
    queryKey: ["fav-markets", user?.id],
    queryFn: async () => (await supabase.from("favorites_markets").select("id, market:markets(id,name,city,address)").eq("user_id", user.id)).data ?? []
  });
  async function unfavProduct(id) {
    await supabase.from("favorites_products").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["fav-products"]
    });
    toast.success("Dihapus dari favorit");
  }
  async function unfavMarket(id) {
    await supabase.from("favorites_markets").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["fav-markets"]
    });
  }
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Favorit", description: "Produk dan pasar yang Anda pantau." }),
    /* @__PURE__ */ jsx(Section, { title: "Produk Favorit", children: !products || products.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada produk favorit.", description: "Tandai produk dari halaman Harga.", action: /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/prices", children: "Lihat Harga" }) }) }) : /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: products.map((r) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold", children: r.product.name }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[var(--color-gray-500)]", children: r.product.category })
      ] }),
      /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", onClick: () => unfavProduct(r.id), children: /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4 fill-[var(--color-destructive)] text-[var(--color-destructive)]" }) })
    ] }, r.id)) }) }),
    /* @__PURE__ */ jsx(Section, { title: "Pasar Favorit", children: !markets || markets.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada pasar favorit.", description: "Tambah dari halaman Pasar.", action: /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/markets", children: "Cari Pasar" }) }) }) : /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: markets.map((r) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold", children: r.market.name }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[var(--color-gray-500)]", children: r.market.city })
      ] }),
      /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", onClick: () => unfavMarket(r.id), children: /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4 fill-[var(--color-destructive)] text-[var(--color-destructive)]" }) })
    ] }, r.id)) }) })
  ] });
}
export {
  FavoritesPage as component
};
