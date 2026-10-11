import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalDocument, type LegalSection } from "@/components/site/legal-document";
import { LEGAL } from "@/lib/legal";

export const Route = createFileRoute("/ketentuan")({
  head: () => ({
    meta: [
      { title: "Syarat & Ketentuan — PasarCek" },
      {
        name: "description",
        content:
          "Syarat dan ketentuan penggunaan PasarCek: akun, informasi harga, paket berbayar, pembayaran, pengembalian dana, dan penyelesaian sengketa.",
      },
      { property: "og:title", content: "Syarat & Ketentuan — PasarCek" },
      { property: "og:url", content: "/ketentuan" },
    ],
    links: [{ rel: "canonical", href: "/ketentuan" }],
  }),
  component: TermsPage,
});

const sections: LegalSection[] = [
  {
    id: "penerimaan",
    title: "Penerimaan ketentuan",
    body: (
      <>
        <p>
          Syarat & Ketentuan ini (“Ketentuan”) mengatur penggunaan situs dan aplikasi PasarCek
          (“Layanan”) yang diselenggarakan oleh <strong>{LEGAL.operator}</strong> (“kami”). Dengan
          membuat akun atau menggunakan Layanan, Anda menyatakan telah membaca, memahami, dan
          menyetujui Ketentuan ini serta <Link to="/privasi">Kebijakan Privasi</Link>.
        </p>
        <p>Jika Anda tidak menyetujui Ketentuan ini, mohon untuk tidak menggunakan Layanan.</p>
      </>
    ),
  },
  {
    id: "layanan",
    title: "Tentang Layanan",
    body: (
      <>
        <p>
          PasarCek adalah layanan informasi yang menampilkan dan membandingkan harga bahan pokok di
          pasar tradisional dan modern, serta alat bantu belanja seperti Smart Basket, daftar
          belanja, dan alarm harga.
        </p>
        <p>
          PasarCek <strong>bukan</strong> penjual bahan pokok dan tidak menjadi pihak dalam
          transaksi jual beli antara Anda dan pedagang di pasar.
        </p>
      </>
    ),
  },
  {
    id: "akun",
    title: "Akun dan kelayakan",
    body: (
      <ul>
        <li>
          Anda harus berusia minimal 18 tahun, atau menggunakan Layanan dengan persetujuan dan
          pengawasan orang tua atau wali.
        </li>
        <li>Data yang Anda berikan saat mendaftar harus benar, lengkap, dan terkini.</li>
        <li>
          Anda bertanggung jawab menjaga kerahasiaan kata sandi dan atas aktivitas yang terjadi
          melalui akun Anda. Segera beri tahu kami jika Anda menduga akun Anda digunakan tanpa izin.
        </li>
        <li>Satu akun diperuntukkan bagi satu orang dan tidak boleh dipindahtangankan.</li>
      </ul>
    ),
  },
  {
    id: "harga",
    title: "Sifat informasi harga",
    body: (
      <>
        <p>
          Harga di PasarCek ditampilkan bersama tanggal pencatatannya dan merupakan{" "}
          <strong>informasi referensi</strong>. Selama tahap pengembangan (beta), sebagian atau
          seluruh harga dapat berupa <strong>data contoh (simulasi)</strong> yang ditandai dengan
          jelas di halaman terkait — data contoh bukan harga sebenarnya dan tidak boleh dijadikan
          acuan belanja. Selain itu:
        </p>
        <ul>
          <li>
            harga di lapak dapat berbeda karena kualitas, ukuran, waktu, ketersediaan, atau
            tawar-menawar;
          </li>
          <li>
            kami berupaya menjaga akurasi data, namun tidak menjamin harga yang tertera pasti
            berlaku saat Anda tiba di pasar;
          </li>
          <li>prediksi harga dan saran berbasis AI bersifat perkiraan dan bukan jaminan.</li>
        </ul>
        <p>
          Jika menemukan harga yang keliru, Anda dapat melaporkannya kepada kami agar segera kami
          periksa dan perbaiki.
        </p>
      </>
    ),
  },
  {
    id: "paket",
    title: "Paket berbayar",
    body: (
      <>
        <ul>
          <li>
            Layanan dasar dapat digunakan secara gratis. Fitur tambahan tersedia melalui paket
            berbayar (mis. Premium bulanan atau tahunan) dengan harga dan manfaat sebagaimana
            tercantum di halaman <Link to="/pricing">Paket</Link> pada saat pembelian. Semua harga
            dalam Rupiah.
          </li>
          <li>
            Paket berlaku selama jangka waktu yang tertera (mis. 30 atau 365 hari) sejak diaktifkan
            dan <strong>tidak diperpanjang otomatis</strong>. Anda dapat membeli kembali sebelum
            atau setelah masa berlaku berakhir.
          </li>
          <li>
            Perubahan harga paket tidak berlaku bagi paket yang sudah dibayar dan sedang aktif.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "pembayaran",
    title: "Pembayaran dan aktivasi",
    body: (
      <ol>
        <li>
          Pembayaran dilakukan melalui transfer bank atau dompet digital ke rekening resmi yang
          ditampilkan di halaman pesanan setelah Anda login. Kami tidak pernah meminta pembayaran ke
          rekening pribadi melalui pesan langsung.
        </li>
        <li>
          Pembayaran wajib diselesaikan dalam <strong>24 jam</strong> sejak pesanan dibuat. Pesanan
          yang melewati batas waktu akan dibatalkan secara otomatis.
        </li>
        <li>
          Setelah transfer, unggah bukti pembayaran (gambar atau PDF, maksimal 5 MB) di halaman
          pesanan. Tim kami memverifikasi pembayaran secara manual, lalu mengaktifkan paket dan
          mengirim konfirmasi.
        </li>
        <li>
          Bukti pembayaran yang tidak valid, tidak terbaca, atau nominalnya tidak sesuai dapat
          ditolak. Kami akan menghubungi Anda untuk melengkapinya.
        </li>
      </ol>
    ),
  },
  {
    id: "refund",
    title: "Pembatalan dan pengembalian dana",
    body: (
      <>
        <p>Pengembalian dana penuh diberikan apabila:</p>
        <ul>
          <li>pembayaran telah terverifikasi tetapi paket tidak dapat kami aktifkan;</li>
          <li>terjadi pembayaran ganda untuk pesanan yang sama; atau</li>
          <li>pembayaran diterima setelah pesanan dibatalkan karena melewati batas waktu.</li>
        </ul>
        <p>
          Ajukan permintaan ke <strong>{LEGAL.email}</strong> dengan menyertakan nomor pesanan dan
          bukti transfer. Dana dikembalikan ke rekening asal paling lambat 14 hari kerja setelah
          permintaan disetujui. Di luar keadaan tersebut, paket yang sudah aktif tidak dapat
          dikembalikan secara prorata, tanpa mengurangi hak Anda sebagai konsumen menurut peraturan
          perundang-undangan.
        </p>
      </>
    ),
  },
  {
    id: "larangan",
    title: "Penggunaan yang dilarang",
    body: (
      <>
        <p>Saat menggunakan Layanan, Anda dilarang:</p>
        <ul>
          <li>melaporkan harga palsu atau menyesatkan dengan sengaja;</li>
          <li>
            mengambil data secara otomatis dalam jumlah besar (scraping), atau menyalin dan menjual
            kembali data harga tanpa izin tertulis;
          </li>
          <li>mencoba mengakses akun, data, atau sistem yang bukan milik Anda;</li>
          <li>mengganggu, membebani, atau merusak infrastruktur Layanan;</li>
          <li>menggunakan Layanan untuk tujuan yang melanggar hukum, termasuk UU ITE.</li>
        </ul>
      </>
    ),
  },
  {
    id: "hki",
    title: "Hak kekayaan intelektual",
    body: (
      <p>
        Nama, logo, desain, perangkat lunak, dan kompilasi data PasarCek dilindungi hak kekayaan
        intelektual milik kami atau pemberi lisensi kami. Anda memperoleh hak terbatas,
        non-eksklusif, dan tidak dapat dialihkan untuk menggunakan Layanan bagi keperluan pribadi
        dan non-komersial. Laporan harga yang Anda kirim dapat kami gunakan untuk memperbarui data
        Layanan.
      </p>
    ),
  },
  {
    id: "tanggung-jawab",
    title: "Batasan tanggung jawab",
    body: (
      <>
        <p>
          Kami berupaya menjaga Layanan tetap tersedia dan akurat, namun Layanan dapat sesekali
          terganggu karena pemeliharaan atau hal di luar kendali kami. Sejauh diizinkan oleh hukum,
          kami tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari keputusan
          belanja yang diambil berdasarkan informasi harga referensi.
        </p>
        <p>
          Ketentuan ini tidak membatasi tanggung jawab kami yang tidak dapat dikecualikan menurut
          hukum, termasuk hak-hak Anda sebagai konsumen berdasarkan Undang-Undang Nomor 8 Tahun 1999
          tentang Perlindungan Konsumen.
        </p>
      </>
    ),
  },
  {
    id: "penghentian",
    title: "Penangguhan dan penghapusan akun",
    body: (
      <>
        <p>
          Anda dapat berhenti menggunakan Layanan dan meminta penghapusan akun kapan saja melalui{" "}
          <strong>{LEGAL.email}</strong>. Penanganan data setelah penghapusan mengikuti{" "}
          <Link to="/privasi">Kebijakan Privasi</Link>.
        </p>
        <p>
          Kami dapat menangguhkan atau menutup akun yang melanggar Ketentuan ini setelah memberikan
          pemberitahuan, kecuali pelanggaran tersebut membahayakan pengguna lain atau sistem
          sehingga memerlukan tindakan segera.
        </p>
      </>
    ),
  },
  {
    id: "perubahan",
    title: "Perubahan ketentuan",
    body: (
      <p>
        Kami dapat mengubah Ketentuan ini. Perubahan material akan diberitahukan melalui email atau
        pemberitahuan di aplikasi paling lambat 7 hari sebelum berlaku. Dengan tetap menggunakan
        Layanan setelah tanggal berlaku, Anda dianggap menyetujui perubahan tersebut.
      </p>
    ),
  },
  {
    id: "hukum",
    title: "Hukum yang berlaku dan penyelesaian sengketa",
    body: (
      <>
        <p>Ketentuan ini tunduk pada hukum Negara Republik Indonesia.</p>
        <p>
          Setiap perselisihan akan diselesaikan terlebih dahulu secara musyawarah dalam waktu 30
          hari sejak salah satu pihak menyampaikan keberatan tertulis. Jika tidak tercapai
          kesepakatan, Anda dapat menempuh penyelesaian melalui Badan Penyelesaian Sengketa Konsumen
          (BPSK) atau pengadilan negeri yang berwenang sesuai peraturan perundang-undangan.
        </p>
      </>
    ),
  },
  {
    id: "kontak",
    title: "Kontak",
    body: (
      <p>
        {LEGAL.operator}
        <br />
        {LEGAL.address}
        <br />
        Email: <strong>{LEGAL.email}</strong>
      </p>
    ),
  },
];

function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Syarat & Ketentuan"
      title="Syarat & Ketentuan."
      lede="Aturan main menggunakan PasarCek: akun, sifat informasi harga, paket berbayar, pembayaran, pengembalian dana, dan cara menyelesaikan masalah."
      sections={sections}
      related={[
        { to: "/privasi", label: "Kebijakan Privasi" },
        { to: "/trust", label: "Trust Center (keamanan)" },
      ]}
    />
  );
}
