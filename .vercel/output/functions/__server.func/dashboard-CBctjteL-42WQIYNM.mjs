import {
  AppShell,
  EmptyState,
  PageHeader,
  Section,
  StatCard
} from "./chunk-XZNSYGQD.mjs";
import {
  idr
} from "./chunk-HQLZASKI.mjs";
import {
  require_lucide_react
} from "./chunk-KJB73ZNG.mjs";
import {
  useAuth
} from "./chunk-UC4BMYGH.mjs";
import "./chunk-KIHGSOXA.mjs";
import {
  useQuery
} from "./chunk-76F7W2CF.mjs";
import {
  Button
} from "./chunk-4AYWSIRD.mjs";
import "./chunk-QH35MXVZ.mjs";
import "./chunk-HSWPCUUH.mjs";
import {
  supabase
} from "./chunk-7GEO44MB.mjs";
import "./chunk-G46AXIAP.mjs";
import {
  Link
} from "./chunk-TV3ZUI3R.mjs";
import "./chunk-RE5W7UZM.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-MLKSHREV.mjs";
import {
  __toESM
} from "./chunk-KVSJYO5R.mjs";

// dist/server/assets/dashboard-CBctjteL.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
var import_react = __toESM(require_react(), 1);
function DashboardPage() {
  const {
    profile,
    user
  } = useAuth();
  const {
    data
  } = useQuery({
    queryKey: ["dashboard-stats", user?.id],
    queryFn: async () => {
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const [prices, markets, unread, baskets] = await Promise.all([supabase.from("product_prices").select("id", {
        count: "exact",
        head: true
      }).eq("recorded_at", today), supabase.from("markets").select("id", {
        count: "exact",
        head: true
      }).eq("is_active", true), supabase.from("notifications").select("id", {
        count: "exact",
        head: true
      }).is("read_at", null).eq("user_id", user.id), supabase.from("smart_baskets").select("id", {
        count: "exact",
        head: true
      }).eq("user_id", user.id)]);
      return {
        priceUpdates: prices.count ?? 0,
        markets: markets.count ?? 0,
        unread: unread.count ?? 0,
        baskets: baskets.count ?? 0
      };
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: `Halo, ${profile?.full_name ?? "Sahabat PasarCek"} \u{1F44B}`, description: "Hemat Belanja Hari Ini \u2014 pantau harga, bandingkan pasar, dan temukan keranjang termurah." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, { label: "Harga Hari Ini", value: data?.priceUpdates ?? 0, hint: "Update harga sembako", icon: import_lucide_react.TrendingUp, accent: "blue" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, { label: "Pasar Terdekat", value: data?.markets ?? 0, hint: "Pasar aktif", icon: import_lucide_react.MapPin, accent: "green" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, { label: "Smart Basket", value: data?.baskets ?? 0, hint: "Simulasi tersimpan", icon: import_lucide_react.ShoppingBasket, accent: "warning" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, { label: "Notifikasi Baru", value: data?.unread ?? 0, hint: "Belum dibaca", icon: import_lucide_react.Bell, accent: "danger" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { title: "Aksi Cepat", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, { to: "/prices", icon: import_lucide_react.TrendingUp, label: "Harga Hari Ini" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, { to: "/compare", icon: import_lucide_react.Scale, label: "Bandingkan" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, { to: "/markets", icon: import_lucide_react.Search, label: "Cari Pasar" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, { to: "/smart-basket", icon: import_lucide_react.ShoppingBasket, label: "Smart Basket" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, { to: "/pricing", icon: import_lucide_react.Crown, label: "Upgrade", highlight: true })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-green)] p-6 text-white lg:col-span-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.PiggyBank, { className: "mb-3 h-8 w-8" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-2xl font-black", children: "Belanja Lebih Cerdas Bersama PasarCek" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-2 text-white/85", children: "Mulai simulasi belanja dengan Smart Basket dan temukan pasar termurah berdasarkan keranjang Anda." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { asChild: true, className: "mt-4 bg-white text-[var(--color-brand-blue)] hover:bg-white/90", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/smart-basket", children: "Mulai Simulasi Belanja" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-bold", children: "Penghematan Bulan Ini" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-2 text-3xl font-black text-[var(--color-brand-green)]", children: idr(0) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-1 text-xs text-[var(--color-gray-500)]", children: "Mulai simulasi untuk menghitung penghematan Anda." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Belum ada data", description: "Tambahkan produk ke Smart Basket untuk mulai menghitung penghematan." })
      ] })
    ] })
  ] });
}
function QuickAction({
  to,
  icon: Icon,
  label,
  highlight
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to, className: `flex flex-col items-start gap-3 rounded-lg border p-4 transition-colors ${highlight ? "border-[var(--color-brand-green)] bg-[var(--color-accent-soft)] hover:bg-[var(--color-accent-soft)]/80" : "border-[var(--color-gray-100)] bg-white hover:bg-[var(--color-gray-50)]"}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 ${highlight ? "text-[var(--color-brand-green)]" : "text-[var(--color-brand-blue)]"}` }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm font-semibold text-[var(--color-ink)]", children: label })
  ] });
}
export {
  DashboardPage as component
};
