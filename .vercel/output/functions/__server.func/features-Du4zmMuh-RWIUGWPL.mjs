import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  require_lucide_react
} from "./chunk-NDUCSHRX.mjs";
import {
  Link
} from "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/features-Du4zmMuh.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
var features = [{
  slug: "harga-hari-ini",
  icon: import_lucide_react.TrendingUp,
  title: "Harga Sembako Hari Ini",
  desc: "Pantau harga terbaru sembako di pasar sekitar Anda, diperbarui setiap hari."
}, {
  slug: "bandingkan-harga",
  icon: import_lucide_react.Scale,
  title: "Bandingkan Harga Antar Pasar",
  desc: "Lihat selisih harga dan temukan pasar termurah hari ini."
}, {
  slug: "lokasi-pasar",
  icon: import_lucide_react.MapPin,
  title: "Lokasi Pasar Terdekat",
  desc: "Cari pasar dengan peta Google Maps lengkap jarak dan jam operasional."
}, {
  slug: "smart-basket",
  icon: import_lucide_react.ShoppingBasket,
  title: "Smart Basket Simulator",
  desc: "Simulasikan keranjang Anda dan ketahui pasar paling hemat."
}, {
  slug: "notifikasi",
  icon: import_lucide_react.Bell,
  title: "Notifikasi Harga",
  desc: "Dapatkan alert saat harga produk favorit Anda berubah."
}, {
  slug: "analitik",
  icon: import_lucide_react.BarChart3,
  title: "Analitik Penghematan",
  desc: "Lihat berapa banyak Anda menghemat setiap bulan dengan PasarCek."
}];
function FeaturesPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "border-b border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/", className: "flex items-center gap-2 font-bold group", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-white shadow-soft group-hover:scale-105 transition-transform duration-200", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShoppingBasket, { className: "h-4.5 w-4.5" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-display text-lg font-bold text-primary", children: "PasarCek" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/auth", className: "text-sm font-semibold text-primary hover:text-accent transition-colors", children: "Masuk" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { className: "mx-auto max-w-6xl px-4 py-16", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-4xl font-black sm:text-5xl", children: "Fitur PasarCek" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-4 text-[var(--color-gray-500)]", children: "Semua yang Anda butuhkan untuk belanja sembako lebih hemat." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/features/$slug", params: {
        slug: f.slug
      }, className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6 transition-colors hover:border-[var(--color-brand-blue)]", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-8 w-8 text-[var(--color-brand-blue)]" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "mt-4 text-lg font-bold", children: f.title }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-2 text-sm text-[var(--color-gray-500)]", children: f.desc })
      ] }, f.slug)) })
    ] })
  ] });
}
export {
  FeaturesPage as component
};
