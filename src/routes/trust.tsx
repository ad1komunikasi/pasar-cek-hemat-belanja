import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Lock, Database, UserCheck, FileText, Mail, ShoppingBasket } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Trust & Keamanan — PasarCek" },
      {
        name: "description",
        content:
          "Bagaimana PasarCek menjaga keamanan data pengguna, akses akun, penyimpanan, dan privasi belanja Anda.",
      },
      { property: "og:title", content: "Trust & Keamanan — PasarCek" },
      {
        property: "og:description",
        content: "Bagaimana PasarCek menjaga keamanan data, akun, dan privasi pengguna.",
      },
      { property: "og:url", content: "/trust" },
    ],
    links: [{ rel: "canonical", href: "/trust" }],
  }),
  component: TrustPage,
});

function TrustPage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-white text-[var(--color-ink)]">
      <header className="border-b border-[var(--color-gray-100)]">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 font-bold tracking-tight group">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
              <ShoppingBasket className="h-4.5 w-4.5" />
            </div>
            <span className="font-display text-lg font-bold text-primary">PasarCek</span>
          </Link>
          <nav className="flex gap-5 text-sm">
            <Link to="/features">Fitur</Link>
            <Link to="/pricing">Paket</Link>
            <Link to={user ? "/dashboard" : "/auth"}>{user ? "Dashboard" : "Masuk"}</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-6 py-16">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--color-brand-blue)]">
          Trust Center
        </p>
        <h1 className="mb-4 text-4xl font-black md:text-5xl">Keamanan & privasi di PasarCek</h1>
        <p className="mb-2 max-w-2xl text-lg text-[var(--color-gray-600)]">
          Halaman ini dikelola oleh tim PasarCek untuk menjawab pertanyaan umum tentang keamanan,
          akses akun, dan cara kami menangani data Anda.
        </p>
        <p className="mb-12 text-sm text-[var(--color-gray-500)]">
          Halaman ini bersifat informatif dan bukan sertifikasi independen. Tanggung jawab keamanan
          dibagi antara penyedia infrastruktur, PasarCek sebagai pemilik aplikasi, dan pengguna yang
          menjaga kredensial masing-masing.
        </p>

        <Section icon={UserCheck} title="Akses & autentikasi">
          <ul className="list-disc space-y-2 pl-5">
            <li>Login email/password dan Google OAuth dengan sesi terenkripsi.</li>
            <li>
              Setiap pengguna hanya dapat melihat & mengubah datanya sendiri (row-level security
              pada basis data).
            </li>
            <li>
              Peran admin diberikan secara manual oleh tim, tidak bisa di-assign sendiri oleh
              pengguna.
            </li>
          </ul>
        </Section>

        <Section icon={Database} title="Penyimpanan data">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Data aplikasi (profil, basket, pesanan) disimpan pada database terkelola dengan
              enkripsi at-rest oleh penyedia infrastruktur.
            </li>
            <li>
              Bukti transfer pembayaran disimpan pada bucket privat — hanya pengunggah dan admin
              yang memverifikasi yang dapat mengakses file tersebut.
            </li>
            <li>Data harga pasar bersifat publik dan dapat dilihat tanpa akun.</li>
          </ul>
        </Section>

        <Section icon={Lock} title="Pembayaran">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Pembayaran saat ini dilakukan manual via transfer bank/e-wallet, kemudian diverifikasi
              oleh admin sebelum paket diaktifkan.
            </li>
            <li>Nomor rekening tujuan hanya ditampilkan kepada pengguna yang sudah login.</li>
            <li>PasarCek tidak menyimpan data kartu kredit.</li>
          </ul>
        </Section>

        <Section icon={Shield} title="Tanggung jawab bersama">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Infrastruktur:</strong> isolasi tenant, enkripsi at-rest & in-transit,
              ketersediaan layanan.
            </li>
            <li>
              <strong>PasarCek:</strong> kontrol akses, kebijakan baris (RLS), audit aktivitas
              admin, dan verifikasi pesanan.
            </li>
            <li>
              <strong>Pengguna:</strong> menjaga kerahasiaan password, tidak membagikan akun, dan
              menggunakan jaringan tepercaya.
            </li>
          </ul>
        </Section>

        <Section icon={FileText} title="Retensi & penghapusan">
          <p>
            Anda dapat menghapus bukti transfer dan favorit Anda kapan saja dari aplikasi. Untuk
            permintaan penghapusan akun secara penuh, silakan hubungi tim kami.
          </p>
        </Section>

        <Section icon={Mail} title="Laporkan masalah keamanan">
          <p>
            Jika Anda menemukan potensi celah keamanan, mohon laporkan secara bertanggung jawab
            melalui kanal kontak di halaman utama. Tim kami akan menindaklanjuti laporan secara
            prioritas.
          </p>
        </Section>

        <p className="mt-12 text-xs text-[var(--color-gray-500)]">
          Halaman ini diperbarui secara berkala oleh tim PasarCek. Detail spesifik (sertifikasi,
          audit independen, SLA) belum dipublikasikan.
        </p>
      </main>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-brand-blue)] text-white">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="text-[var(--color-gray-700)]">{children}</div>
    </section>
  );
}
