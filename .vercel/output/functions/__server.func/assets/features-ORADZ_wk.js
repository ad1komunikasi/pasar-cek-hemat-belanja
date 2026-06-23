import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { TrendingUp, Scale, MapPin, ShoppingBasket, Bell, BarChart3 } from "lucide-react";
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
  icon: BarChart3,
  title: "Analitik Penghematan",
  desc: "Lihat berapa banyak Anda menghemat setiap bulan dengan PasarCek."
}];
function FeaturesPage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 font-bold", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/auth", className: "text-sm font-semibold text-[var(--color-brand-blue)]", children: "Masuk" })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-6xl px-4 py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black sm:text-5xl", children: "Fitur PasarCek" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-[var(--color-gray-500)]", children: "Semua yang Anda butuhkan untuk belanja sembako lebih hemat." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: features.map((f) => /* @__PURE__ */ jsxs(Link, { to: "/features/$slug", params: {
        slug: f.slug
      }, className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6 transition-colors hover:border-[var(--color-brand-blue)]", children: [
        /* @__PURE__ */ jsx(f.icon, { className: "h-8 w-8 text-[var(--color-brand-blue)]" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 text-lg font-bold", children: f.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[var(--color-gray-500)]", children: f.desc })
      ] }, f.slug)) })
    ] })
  ] });
}
export {
  FeaturesPage as component
};
