import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicPage, PageIntro } from "@/components/site/public-page";

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

const SECTIONS = [
  "Akses & autentikasi",
  "Penyimpanan data",
  "Pembayaran",
  "Tanggung jawab bersama",
  "Retensi & penghapusan",
  "Laporkan masalah keamanan",
];

function TrustPage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="Trust center"
        title="Keamanan & privasi di PasarCek."
        lede="Jawaban langsung untuk pertanyaan tentang akses akun, penyimpanan data, dan pembayaran — ditulis oleh tim yang membangun aplikasinya."
      />
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <aside className="lg:col-span-3">
          <nav className="lg:sticky lg:top-36">
            <div className="eyebrow text-foreground/45">Isi halaman</div>
            <ol className="mt-4 space-y-2.5">
              {SECTIONS.map((t, i) => (
                <li key={t}>
                  <a
                    href={`#s-${i + 1}`}
                    className="group flex gap-3 text-[0.95rem] text-foreground/65 transition-colors hover:text-foreground"
                  >
                    <span className="font-mono text-xs leading-6 text-foreground/35 group-hover:text-chili">
                      0{i + 1}
                    </span>
                    {t}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <article className="lg:col-span-8 lg:col-start-5">
          <p className="rounded-[10px] border border-rule bg-card px-5 py-4 text-[0.95rem] leading-relaxed text-foreground/65">
            Halaman ini bersifat informatif dan bukan sertifikasi independen. Tanggung jawab keamanan
            dibagi antara penyedia infrastruktur, PasarCek sebagai pemilik aplikasi, dan pengguna yang
            menjaga kredensial masing-masing. Rincian pemrosesan data pribadi ada di{" "}
            <Link to="/privasi" className="text-tarp underline underline-offset-4">
              Kebijakan Privasi
            </Link>{" "}
            dan aturan penggunaan layanan di{" "}
            <Link to="/ketentuan" className="text-tarp underline underline-offset-4">
              Syarat & Ketentuan
            </Link>
            .
          </p>

        <Section n={1} title="Akses & autentikasi">
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

        <Section n={2} title="Penyimpanan data">
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

        <Section n={3} title="Pembayaran">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Pembayaran saat ini dilakukan manual via transfer bank/e-wallet, kemudian diverifikasi
              oleh admin sebelum paket diaktifkan.
            </li>
            <li>Nomor rekening tujuan hanya ditampilkan kepada pengguna yang sudah login.</li>
            <li>PasarCek tidak menyimpan data kartu kredit.</li>
          </ul>
        </Section>

        <Section n={4} title="Tanggung jawab bersama">
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

        <Section n={5} title="Retensi & penghapusan">
          <p>
            Anda dapat menghapus bukti transfer dan favorit Anda kapan saja dari aplikasi. Untuk
            permintaan penghapusan akun secara penuh, silakan hubungi tim kami.
          </p>
        </Section>

        <Section n={6} title="Laporkan masalah keamanan">
          <p>
            Jika Anda menemukan potensi celah keamanan, mohon laporkan secara bertanggung jawab
            melalui kanal kontak di halaman utama. Tim kami akan menindaklanjuti laporan secara
            prioritas.
          </p>
        </Section>

          <p className="mt-14 font-mono text-xs text-foreground/45">
            Diperbarui berkala oleh tim PasarCek. Detail spesifik (sertifikasi, audit independen, SLA)
            belum dipublikasikan.
          </p>
        </article>
      </div>
    </PublicPage>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={`s-${n}`} className="scroll-mt-36 border-b border-rule py-10 first-of-type:pt-12">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-chili">0{n}</span>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-[1.7rem]">{title}</h2>
      </div>
      <div className="mt-5 pl-0 leading-relaxed text-foreground/75 sm:pl-10 [&_li]:marker:text-foreground/30 [&_strong]:font-semibold [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  );
}
