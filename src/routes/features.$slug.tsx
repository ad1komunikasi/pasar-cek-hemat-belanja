import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const details: Record<string, { title: string; desc: string; bullets: string[] }> = {
  "harga-hari-ini": { title: "Harga Sembako Hari Ini", desc: "Update harga real-time dari pasar tradisional di sekitar Anda.", bullets: ["Update harian", "Filter per kategori", "Status naik/turun/stabil", "Riwayat harga"] },
  "bandingkan-harga": { title: "Bandingkan Harga Antar Pasar", desc: "Pilih produk dan lihat selisih harga antar pasar sekaligus.", bullets: ["Highlight pasar termurah", "Hitung potensi penghematan", "Filter per kota"] },
  "lokasi-pasar": { title: "Lokasi Pasar Terdekat", desc: "Cari pasar tradisional terdekat dengan peta interaktif.", bullets: ["Google Maps integration", "Filter radius", "Detail pasar lengkap", "Rute langsung"] },
  "smart-basket": { title: "Smart Basket Simulator", desc: "Simulasikan keranjang belanja Anda dan AI menemukan pasar termurah.", bullets: ["CRUD produk realtime", "Estimasi biaya per pasar", "Rekomendasi pasar termurah", "Simpan & bagikan"] },
  "notifikasi": { title: "Notifikasi Harga", desc: "Dapatkan pemberitahuan saat harga berubah.", bullets: ["Alert harga turun", "Alert harga naik", "Promo pasar"] },
  "analitik": { title: "Analitik Penghematan", desc: "Pantau berapa banyak Anda menghemat setiap bulan.", bullets: ["Grafik penghematan bulanan", "Riwayat simulasi", "Prediksi harga"] },
};

export const Route = createFileRoute("/features/$slug")({
  head: ({ params }) => {
    const d = details[params.slug];
    return { meta: [{ title: `${d?.title ?? "Fitur"} — PasarCek` }, { name: "description", content: d?.desc ?? "" }] };
  },
  component: FeatureDetail,
});

function FeatureDetail() {
  const { slug } = Route.useParams();
  const { user } = useAuth();
  const d = details[slug];
  if (!d) return <div className="p-10 text-center">Fitur tidak ditemukan.</div>;

  const authRoutes: Record<string, string> = {
    "harga-hari-ini": "/prices",
    "bandingkan-harga": "/compare",
    "lokasi-pasar": "/markets",
    "smart-basket": "/smart-basket",
    "notifikasi": "/notifications",
    "analitik": "/dashboard",
  };

  const targetLink = user ? (authRoutes[slug] ?? "/dashboard") : "/auth?tab=register";

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      <header className="border-b border-[var(--color-gray-100)] bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4"><Link to="/features" className="flex items-center gap-2 text-sm font-semibold"><ArrowLeft className="h-4 w-4" />Semua Fitur</Link></div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-black sm:text-5xl">{d.title}</h1>
        <p className="mt-4 text-lg text-[var(--color-gray-700)]">{d.desc}</p>
        <ul className="mt-8 space-y-2">{d.bullets.map((b, i) => <li key={i} className="rounded-lg bg-white p-4 font-medium">✓ {b}</li>)}</ul>
        <Button asChild className="mt-8" size="lg">
          <Link to={targetLink}>
            {user ? "Buka Fitur" : "Mulai Gratis"}
          </Link>
        </Button>
      </main>
    </div>
  );
}
