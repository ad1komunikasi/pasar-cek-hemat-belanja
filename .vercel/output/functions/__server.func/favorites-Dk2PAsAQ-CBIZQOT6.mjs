import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  AppShell,
  EmptyState,
  PageHeader,
  Section
} from "./chunk-QP4ZFRSQ.mjs";
import {
  useAuth
} from "./chunk-QVMPDGJI.mjs";
import {
  toast
} from "./chunk-C7CN73EW.mjs";
import {
  useQuery,
  useQueryClient
} from "./chunk-DH7FIRD7.mjs";
import {
  Button
} from "./chunk-AVRRWDIK.mjs";
import "./chunk-NXBQQK3G.mjs";
import "./chunk-IHLGWONG.mjs";
import {
  supabase
} from "./chunk-PQEYI6K5.mjs";
import "./chunk-Y5N26HX3.mjs";
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

// dist/server/assets/favorites-Dk2PAsAQ.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
var import_react = __toESM(require_react(), 1);
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Favorit", description: "Produk dan pasar yang Anda pantau." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { title: "Produk Favorit", children: !products || products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Belum ada produk favorit.", description: "Tandai produk dari halaman Harga.", action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/prices", children: "Lihat Harga" }) }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: products.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-semibold", children: r.product.name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs text-[var(--color-gray-500)]", children: r.product.category })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { size: "icon", variant: "ghost", onClick: () => unfavProduct(r.id), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Heart, { className: "h-4 w-4 fill-[var(--color-destructive)] text-[var(--color-destructive)]" }) })
    ] }, r.id)) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { title: "Pasar Favorit", children: !markets || markets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Belum ada pasar favorit.", description: "Tambah dari halaman Pasar.", action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/markets", children: "Cari Pasar" }) }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: markets.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-semibold", children: r.market.name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs text-[var(--color-gray-500)]", children: r.market.city })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { size: "icon", variant: "ghost", onClick: () => unfavMarket(r.id), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Heart, { className: "h-4 w-4 fill-[var(--color-destructive)] text-[var(--color-destructive)]" }) })
    ] }, r.id)) }) })
  ] });
}
export {
  FavoritesPage as component
};
