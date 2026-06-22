import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { T as TrendingUp, e as Scale, b as MapPin, f as ShoppingBasket, B as Bell, g as ChartColumn } from "../_libs/lucide-react.mjs";
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
const features = [{
  slug: "harga-hari-ini",
  icon: TrendingUp,
  title: "Harga Sembako Hari Ini",
  desc: "Pantau harga terbaru sembako di pasar sekitar Anda, diperbarui setiap hari."
}, {
  slug: "bandingkan-harga",
  icon: Scale,
  title: "Bandingkan Harga Antar Pasar",
  desc: "Lihat selisih harga dan temukan pasar termurah hari ini."
}, {
  slug: "lokasi-pasar",
  icon: MapPin,
  title: "Lokasi Pasar Terdekat",
  desc: "Cari pasar dengan peta Google Maps lengkap jarak dan jam operasional."
}, {
  slug: "smart-basket",
  icon: ShoppingBasket,
  title: "Smart Basket Simulator",
  desc: "Simulasikan keranjang Anda dan ketahui pasar paling hemat."
}, {
  slug: "notifikasi",
  icon: Bell,
  title: "Notifikasi Harga",
  desc: "Dapatkan alert saat harga produk favorit Anda berubah."
}, {
  slug: "analitik",
  icon: ChartColumn,
  title: "Analitik Penghematan",
  desc: "Lihat berapa banyak Anda menghemat setiap bulan dengan PasarCek."
}];
function FeaturesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "text-sm font-semibold text-[var(--color-brand-blue)]", children: "Masuk" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-black sm:text-5xl", children: "Fitur PasarCek" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[var(--color-gray-500)]", children: "Semua yang Anda butuhkan untuk belanja sembako lebih hemat." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/features/$slug", params: {
        slug: f.slug
      }, className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6 transition-colors hover:border-[var(--color-brand-blue)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-8 w-8 text-[var(--color-brand-blue)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-lg font-bold", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[var(--color-gray-500)]", children: f.desc })
      ] }, f.slug)) })
    ] })
  ] });
}
export {
  FeaturesPage as component
};
