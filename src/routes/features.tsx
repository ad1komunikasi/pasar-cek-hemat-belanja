import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, Scale, MapPin, ShoppingBasket, Bell, BarChart3, ArrowUpRight } from "lucide-react";
import { PublicPage, PageIntro } from "@/components/site/public-page";
import { useReveal } from "@/components/site/use-reveal";

const features = [
  {
    slug: "harga-hari-ini",
    icon: TrendingUp,
    title: "Harga Sembako Hari Ini",
    desc: "Pantau harga terbaru sembako di pasar sekitar Anda, diperbarui setiap hari.",
  },
  {
    slug: "bandingkan-harga",
    icon: Scale,
    title: "Bandingkan Harga Antar Pasar",
    desc: "Lihat selisih harga dan temukan pasar termurah hari ini.",
  },
  {
    slug: "lokasi-pasar",
    icon: MapPin,
    title: "Lokasi Pasar Terdekat",
    desc: "Cari pasar dengan peta Google Maps lengkap jarak dan jam operasional.",
  },
  {
    slug: "smart-basket",
    icon: ShoppingBasket,
    title: "Smart Basket Simulator",
    desc: "Simulasikan keranjang Anda dan ketahui pasar paling hemat.",
  },
  {
    slug: "notifikasi",
    icon: Bell,
    title: "Notifikasi Harga",
    desc: "Dapatkan alert saat harga produk favorit Anda berubah.",
  },
  {
    slug: "analitik",
    icon: BarChart3,
    title: "Analitik Penghematan",
    desc: "Lihat berapa banyak Anda menghemat setiap bulan dengan PasarCek.",
  },
];

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Fitur Lengkap — PasarCek" },
      {
        name: "description",
        content:
          "Fitur PasarCek: cek harga sembako, bandingkan antar pasar, smart basket simulator, peta pasar terdekat, notifikasi harga, dan analitik penghematan.",
      },
      { property: "og:title", content: "Fitur Lengkap — PasarCek" },
      {
        property: "og:description",
        content: "Smart Basket, Compare, Maps, Price Alert, dan lebih banyak lagi.",
      },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  useReveal();
  return (
    <PublicPage>
      <PageIntro
        eyebrow="Fitur"
        title="Semua alat untuk belanja sembako dengan data, bukan tebakan."
        lede="Enam bagian kecil yang saling terhubung: dari harga pagi ini, sampai berapa yang sudah Anda hemat bulan ini."
      />
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 md:py-24">
        <ul className="grid border-l border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <li key={f.slug} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 70}ms` }}>
              <Link
                to="/features/$slug"
                params={{ slug: f.slug }}
                className="group flex h-full min-h-[17rem] flex-col border-b border-r border-rule p-7 transition-colors hover:bg-card sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-foreground/40 transition-colors group-hover:text-chili">
                    0{i + 1}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-foreground/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <f.icon className="mt-auto h-7 w-7 text-tarp transition-transform duration-300 group-hover:-rotate-6" strokeWidth={1.6} />
                <h3 className="mt-5 text-[1.45rem] font-semibold leading-tight tracking-tight">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-foreground/65">{f.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PublicPage>
  );
}
