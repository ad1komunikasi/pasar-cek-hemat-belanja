import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppShell, P as PageHeader, S as Section, E as EmptyState } from "./app-shell-JvQTbMhg.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-koMOzLtV.mjs";
import { u as useAuth } from "./router-KEMZH_Q0.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { H as Heart } from "../_libs/lucide-react.mjs";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Favorit", description: "Produk dan pasar yang Anda pantau." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Produk Favorit", children: !products || products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: "Belum ada produk favorit.", description: "Tandai produk dari halaman Harga.", action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/prices", children: "Lihat Harga" }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: products.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: r.product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[var(--color-gray-500)]", children: r.product.category })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => unfavProduct(r.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 fill-[var(--color-destructive)] text-[var(--color-destructive)]" }) })
    ] }, r.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Pasar Favorit", children: !markets || markets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: "Belum ada pasar favorit.", description: "Tambah dari halaman Pasar.", action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/markets", children: "Cari Pasar" }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: markets.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: r.market.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[var(--color-gray-500)]", children: r.market.city })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => unfavMarket(r.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 fill-[var(--color-destructive)] text-[var(--color-destructive)]" }) })
    ] }, r.id)) }) })
  ] });
}
export {
  FavoritesPage as component
};
