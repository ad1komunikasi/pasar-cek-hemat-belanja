import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, Scale, MapPin, ShoppingBasket, Bell, BarChart3 } from "lucide-react";

const features = [
  { slug: "harga-hari-ini", icon: TrendingUp, title: "Harga Sembako Hari Ini", desc: "Pantau harga terbaru sembako di pasar sekitar Anda, diperbarui setiap hari." },
  { slug: "bandingkan-harga", icon: Scale, title: "Bandingkan Harga Antar Pasar", desc: "Lihat selisih harga dan temukan pasar termurah hari ini." },
  { slug: "lokasi-pasar", icon: MapPin, title: "Lokasi Pasar Terdekat", desc: "Cari pasar dengan peta Google Maps lengkap jarak dan jam operasional." },
  { slug: "smart-basket", icon: ShoppingBasket, title: "Smart Basket Simulator", desc: "Simulasikan keranjang Anda dan ketahui pasar paling hemat." },
  { slug: "notifikasi", icon: Bell, title: "Notifikasi Harga", desc: "Dapatkan alert saat harga produk favorit Anda berubah." },
  { slug: "analitik", icon: BarChart3, title: "Analitik Penghematan", desc: "Lihat berapa banyak Anda menghemat setiap bulan dengan PasarCek." },
];

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Fitur Lengkap — PasarCek" },
      { name: "description", content: "Fitur PasarCek: cek harga sembako, bandingkan antar pasar, smart basket simulator, peta pasar terdekat, notifikasi harga, dan analitik penghematan." },
      { property: "og:title", content: "Fitur Lengkap — PasarCek" },
      { property: "og:description", content: "Smart Basket, Compare, Maps, Price Alert, dan lebih banyak lagi." },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      <header className="border-b border-[var(--color-gray-100)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 font-bold"><span className="inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white">PC</span>PasarCek</Link>
          <Link to="/auth" className="text-sm font-semibold text-[var(--color-brand-blue)]">Masuk</Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-black sm:text-5xl">Fitur PasarCek</h1>
          <p className="mt-4 text-[var(--color-gray-500)]">Semua yang Anda butuhkan untuk belanja sembako lebih hemat.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link key={f.slug} to="/features/$slug" params={{ slug: f.slug }} className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6 transition-colors hover:border-[var(--color-brand-blue)]">
              <f.icon className="h-8 w-8 text-[var(--color-brand-blue)]" />
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-gray-500)]">{f.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
