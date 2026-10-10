import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PublicPage, PageIntro } from "@/components/site/public-page";
import { useAuth } from "@/hooks/use-auth";

const details: Record<string, { title: string; desc: string; bullets: string[] }> = {
  "harga-hari-ini": {
    title: "Harga Sembako Hari Ini",
    desc: "Update harga real-time dari pasar tradisional di sekitar Anda.",
    bullets: ["Update harian", "Filter per kategori", "Status naik/turun/stabil", "Riwayat harga"],
  },
  "bandingkan-harga": {
    title: "Bandingkan Harga Antar Pasar",
    desc: "Pilih produk dan lihat selisih harga antar pasar sekaligus.",
    bullets: ["Highlight pasar termurah", "Hitung potensi penghematan", "Filter per kota"],
  },
  "lokasi-pasar": {
    title: "Lokasi Pasar Terdekat",
    desc: "Cari pasar tradisional terdekat dengan peta interaktif.",
    bullets: ["Google Maps integration", "Filter radius", "Detail pasar lengkap", "Rute langsung"],
  },
  "smart-basket": {
    title: "Smart Basket Simulator",
    desc: "Simulasikan keranjang belanja Anda dan AI menemukan pasar termurah.",
    bullets: [
      "CRUD produk realtime",
      "Estimasi biaya per pasar",
      "Rekomendasi pasar termurah",
      "Simpan & bagikan",
    ],
  },
  notifikasi: {
    title: "Notifikasi Harga",
    desc: "Dapatkan pemberitahuan saat harga berubah.",
    bullets: ["Alert harga turun", "Alert harga naik", "Promo pasar"],
  },
  analitik: {
    title: "Analitik Penghematan",
    desc: "Pantau berapa banyak Anda menghemat setiap bulan.",
    bullets: ["Grafik penghematan bulanan", "Riwayat simulasi", "Prediksi harga"],
  },
};

export const Route = createFileRoute("/features/$slug")({
  head: ({ params }) => {
    const d = details[params.slug];
    return {
      meta: [
        { title: `${d?.title ?? "Fitur"} — PasarCek` },
        { name: "description", content: d?.desc ?? "" },
      ],
    };
  },
  component: FeatureDetail,
});

function FeatureDetail() {
  const { slug } = Route.useParams();
  const { user } = useAuth();
  const d = details[slug];
  if (!d)
    return (
      <PublicPage>
        <PageIntro eyebrow="404" title="Fitur tidak ditemukan." lede="Mungkin tautannya sudah berubah." />
      </PublicPage>
    );

  const authRoutes: Record<string, string> = {
    "harga-hari-ini": "/prices",
    "bandingkan-harga": "/compare",
    "lokasi-pasar": "/markets",
    "smart-basket": "/smart-basket",
    notifikasi: "/notifications",
    analitik: "/dashboard",
  };

  const targetLink = user ? (authRoutes[slug] ?? "/dashboard") : "/auth?tab=register";

  return (
    <PublicPage>
      <PageIntro
        eyebrow={
          <Link to="/features" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Semua fitur
          </Link>
        }
        title={d.title}
        lede={d.desc}
      />
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12">
        <ul className="border-t border-rule lg:col-span-7">
          {d.bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-5 border-b border-rule py-5 text-lg">
              <span className="font-mono text-sm text-foreground/40">0{i + 1}</span>
              <span className="flex-1">{b}</span>
              <Check className="h-5 w-5 text-leaf" strokeWidth={2.25} />
            </li>
          ))}
        </ul>
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="rounded-[14px] border border-rule bg-card p-7">
            <p className="leading-relaxed text-foreground/70">
              {user
                ? "Fitur ini sudah tersedia di akun Anda."
                : "Gratis untuk dicoba — cukup buat akun dalam satu menit."}
            </p>
            <a
              href={targetLink}
              className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-tarp font-medium text-primary-foreground transition-colors hover:bg-tarp-ink dark:hover:bg-leaf"
            >
              {user ? "Buka fitur" : "Mulai gratis"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </PublicPage>
  );
}
