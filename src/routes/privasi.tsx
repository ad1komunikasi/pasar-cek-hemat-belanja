import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalDocument, type LegalSection } from "@/components/site/legal-document";
import { LEGAL } from "@/lib/legal";

export const Route = createFileRoute("/privasi")({
  head: () => ({
    meta: [
      { title: "Kebijakan Privasi — PasarCek" },
      {
        name: "description",
        content:
          "Bagaimana PasarCek mengumpulkan, menggunakan, membagikan, dan melindungi data pribadi Anda sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.",
      },
      { property: "og:title", content: "Kebijakan Privasi — PasarCek" },
      { property: "og:url", content: "/privasi" },
    ],
    links: [{ rel: "canonical", href: "/privasi" }],
  }),
  component: PrivacyPage,
});

const sections: LegalSection[] = [
  {
    id: "pengendali",
    title: "Siapa kami",
    body: (
      <>
        <p>
          Kebijakan Privasi ini menjelaskan cara PasarCek memproses data pribadi Anda saat menggunakan
          situs dan aplikasi PasarCek (“Layanan”). PasarCek diselenggarakan oleh{" "}
          <strong>{LEGAL.operator}</strong>, beralamat di {LEGAL.address}, yang bertindak sebagai{" "}
          <strong>Pengendali Data Pribadi</strong> sebagaimana dimaksud dalam Undang-Undang Nomor 27
          Tahun 2022 tentang Pelindungan Data Pribadi (“UU PDP”).
        </p>
        <p>
          Untuk semua pertanyaan dan permintaan terkait data pribadi, hubungi kami di{" "}
          <strong>{LEGAL.email}</strong>.
        </p>
      </>
    ),
  },
  {
    id: "data",
    title: "Data yang kami kumpulkan",
    body: (
      <>
        <p>Kami hanya mengumpulkan data yang diperlukan untuk menjalankan Layanan:</p>
        <table>
          <thead>
            <tr>
              <th>Kategori</th>
              <th>Contoh data</th>
              <th>Sumber</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Akun</td>
              <td>Nama lengkap, alamat email, kata sandi (tersimpan dalam bentuk hash)</td>
              <td>Anda, saat mendaftar</td>
            </tr>
            <tr>
              <td>Login Google</td>
              <td>Nama, alamat email, dan foto profil dari akun Google</td>
              <td>Google, atas persetujuan Anda</td>
            </tr>
            <tr>
              <td>Profil</td>
              <td>Nama pengguna, nomor telepon, kota, foto profil</td>
              <td>Anda (opsional)</td>
            </tr>
            <tr>
              <td>Transaksi</td>
              <td>
                Nomor pesanan, paket, nominal, metode pembayaran, nama dan kontak penerima, bukti
                transfer
              </td>
              <td>Anda, saat membeli paket</td>
            </tr>
            <tr>
              <td>Penggunaan</td>
              <td>Pasar dan produk favorit, Smart Basket, daftar belanja, alarm harga, notifikasi</td>
              <td>Aktivitas Anda di Layanan</td>
            </tr>
            <tr>
              <td>Teknis & keamanan</td>
              <td>Alamat IP, jenis peramban (user agent), waktu dan hasil login</td>
              <td>Otomatis</td>
            </tr>
            <tr>
              <td>Lokasi</td>
              <td>
                Koordinat perangkat untuk mencari pasar terdekat — dihitung di perangkat Anda dan tidak
                kami simpan di server
              </td>
              <td>Perangkat, hanya jika Anda mengizinkan</td>
            </tr>
          </tbody>
        </table>
        <p>
          Kami tidak dengan sengaja mengumpulkan data pribadi yang bersifat spesifik (seperti data
          kesehatan, biometrik, atau keuangan pribadi di luar bukti transfer) dan tidak menyimpan data
          kartu kredit.
        </p>
      </>
    ),
  },
  {
    id: "tujuan",
    title: "Tujuan dan dasar pemrosesan",
    body: (
      <>
        <p>Sesuai Pasal 20 UU PDP, kami memproses data pribadi berdasarkan:</p>
        <ul>
          <li>
            <strong>Pelaksanaan perjanjian</strong> — membuat dan mengelola akun, menampilkan
            perbandingan harga, menjalankan Smart Basket, mengirim alarm harga, serta memproses dan
            mengaktifkan paket berbayar.
          </li>
          <li>
            <strong>Persetujuan</strong> — mengakses lokasi perangkat, login dengan Google, dan
            mengirim informasi atau promosi. Persetujuan dapat ditarik kapan saja.
          </li>
          <li>
            <strong>Kewajiban hukum</strong> — menyimpan catatan transaksi dan menanggapi permintaan
            otoritas yang berwenang sesuai peraturan perundang-undangan.
          </li>
          <li>
            <strong>Kepentingan yang sah</strong> — menjaga keamanan akun, mencegah penipuan dan
            penyalahgunaan, serta memperbaiki kualitas Layanan.
          </li>
        </ul>
        <p>Kami tidak menjual data pribadi Anda kepada pihak mana pun.</p>
      </>
    ),
  },
  {
    id: "pihak-ketiga",
    title: "Pihak yang menerima data",
    body: (
      <>
        <p>
          Kami menggunakan penyedia layanan (Prosesor Data Pribadi) yang memproses data atas nama kami
          dan hanya sesuai instruksi kami:
        </p>
        <table>
          <thead>
            <tr>
              <th>Penyedia</th>
              <th>Fungsi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Supabase</td>
              <td>Basis data, autentikasi, dan penyimpanan file (termasuk bukti transfer)</td>
            </tr>
            <tr>
              <td>Vercel</td>
              <td>Hosting dan pengiriman situs</td>
            </tr>
            <tr>
              <td>Google</td>
              <td>
                Login dengan Google, peta (Google Maps), dan fitur AI (Gemini) — fitur AI hanya
                menerima nama produk, pasar, dan data harga, bukan identitas Anda
              </td>
            </tr>
            <tr>
              <td>Resend</td>
              <td>Pengiriman email transaksional (mis. instruksi pembayaran)</td>
            </tr>
          </tbody>
        </table>
        <p>
          Kami juga dapat mengungkapkan data apabila diwajibkan oleh hukum, perintah pengadilan, atau
          permintaan resmi instansi yang berwenang.
        </p>
      </>
    ),
  },
  {
    id: "transfer",
    title: "Transfer data ke luar negeri",
    body: (
      <p>
        Sebagian penyedia di atas dapat menyimpan atau memproses data di server yang berada di luar
        wilayah Indonesia. Sesuai Pasal 56 UU PDP, kami memastikan penyedia tersebut menerapkan tingkat
        pelindungan data yang setara atau lebih tinggi, termasuk melalui perjanjian pemrosesan data dan
        langkah keamanan yang memadai.
      </p>
    ),
  },
  {
    id: "retensi",
    title: "Berapa lama data disimpan",
    body: (
      <>
        <ul>
          <li>
            <strong>Data akun dan penggunaan</strong> — selama akun Anda aktif, dan dihapus atau
            dianonimkan paling lambat 30 hari setelah akun dihapus.
          </li>
          <li>
            <strong>Data transaksi</strong> — disimpan selama diwajibkan oleh ketentuan perpajakan dan
            kearsipan (umumnya hingga 10 tahun). Bukti transfer dapat Anda hapus dari aplikasi setelah
            pesanan selesai diverifikasi.
          </li>
          <li>
            <strong>Log keamanan</strong> — hingga 12 bulan, kecuali diperlukan lebih lama untuk
            menangani insiden.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "hak",
    title: "Hak Anda sebagai subjek data",
    body: (
      <>
        <p>Berdasarkan Pasal 5 sampai Pasal 13 UU PDP, Anda berhak untuk:</p>
        <ul>
          <li>mendapatkan informasi tentang identitas kami dan tujuan pemrosesan data Anda;</li>
          <li>mengakses dan memperoleh salinan data pribadi Anda;</li>
          <li>melengkapi, memperbarui, atau memperbaiki data yang tidak akurat;</li>
          <li>mengakhiri pemrosesan, menghapus, atau memusnahkan data pribadi Anda;</li>
          <li>menarik kembali persetujuan yang telah diberikan;</li>
          <li>menunda atau membatasi pemrosesan;</li>
          <li>mengajukan keberatan atas keputusan yang semata-mata didasarkan pada pemrosesan otomatis;</li>
          <li>mendapatkan dan/atau menggunakan data pribadi Anda dalam format yang umum digunakan;</li>
          <li>menggugat dan menerima ganti rugi atas pelanggaran pemrosesan data pribadi Anda.</li>
        </ul>
        <p>
          Sebagian data dapat Anda ubah langsung di halaman Profil. Untuk permintaan lain, kirim email ke{" "}
          <strong>{LEGAL.email}</strong> dari alamat email akun Anda. Kami akan memverifikasi identitas
          Anda dan menanggapi permintaan akses atau perbaikan paling lambat <strong>3 × 24 jam</strong>{" "}
          sejak permintaan diterima, sesuai UU PDP. Penghapusan data transaksi tunduk pada kewajiban
          penyimpanan yang dijelaskan di bagian sebelumnya.
        </p>
      </>
    ),
  },
  {
    id: "keamanan",
    title: "Keamanan data",
    body: (
      <>
        <p>Kami menerapkan langkah teknis dan organisasi yang wajar, antara lain:</p>
        <ul>
          <li>koneksi terenkripsi (HTTPS) dan enkripsi data saat disimpan oleh penyedia infrastruktur;</li>
          <li>kata sandi disimpan dalam bentuk hash, tidak pernah dalam teks asli;</li>
          <li>
            pembatasan akses tingkat baris (row-level security) sehingga setiap pengguna hanya dapat
            melihat datanya sendiri;
          </li>
          <li>bukti transfer disimpan di penyimpanan privat yang hanya dapat diakses Anda dan admin verifikator;</li>
          <li>peran admin diberikan secara manual dan aktivitas admin dicatat.</li>
        </ul>
        <p>
          Apabila terjadi kegagalan pelindungan data pribadi, kami akan memberitahukan secara tertulis
          kepada Anda dan lembaga yang berwenang paling lambat <strong>3 × 24 jam</strong>, sesuai Pasal
          46 UU PDP. Informasi lebih lanjut tersedia di <Link to="/trust">Trust Center</Link>.
        </p>
      </>
    ),
  },
  {
    id: "penyimpanan-lokal",
    title: "Cookie dan penyimpanan lokal",
    body: (
      <>
        <p>
          PasarCek tidak menggunakan cookie iklan atau pelacak pihak ketiga. Kami memakai penyimpanan
          lokal di peramban (local storage) untuk:
        </p>
        <ul>
          <li>menjaga sesi login Anda tetap aktif;</li>
          <li>mengingat pilihan bahasa dan tema tampilan;</li>
          <li>menyimpan alarm harga dan preferensi fitur di perangkat Anda.</li>
        </ul>
        <p>
          Anda dapat menghapus data ini kapan saja melalui pengaturan peramban. Konsekuensinya, Anda
          akan keluar dari akun dan preferensi kembali ke pengaturan awal.
        </p>
      </>
    ),
  },
  {
    id: "anak",
    title: "Data pribadi anak",
    body: (
      <p>
        Layanan ditujukan bagi pengguna berusia 18 tahun ke atas. Pengguna di bawah 18 tahun hanya boleh
        menggunakan Layanan dengan persetujuan dan pengawasan orang tua atau wali, sesuai Pasal 25 UU
        PDP. Jika Anda mengetahui ada data anak yang diberikan tanpa persetujuan tersebut, hubungi kami
        agar data tersebut dapat dihapus.
      </p>
    ),
  },
  {
    id: "perubahan",
    title: "Perubahan kebijakan",
    body: (
      <p>
        Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan material akan kami
        beritahukan melalui email atau pemberitahuan di dalam aplikasi sebelum berlaku. Tanggal
        berlakunya versi terbaru selalu tercantum di bagian atas halaman ini.
      </p>
    ),
  },
  {
    id: "kontak",
    title: "Kontak dan pengaduan",
    body: (
      <>
        <p>
          Pertanyaan, permintaan, atau pengaduan terkait data pribadi dapat dikirim ke{" "}
          <strong>{LEGAL.email}</strong> atau ke alamat {LEGAL.operator}, {LEGAL.address}.
        </p>
        <p>
          Jika Anda tidak puas dengan tanggapan kami, Anda dapat menyampaikan pengaduan kepada lembaga
          penyelenggara pelindungan data pribadi yang ditetapkan Pemerintah atau Kementerian Komunikasi
          dan Digital Republik Indonesia.
        </p>
      </>
    ),
  },
];

function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Kebijakan Privasi"
      title="Kebijakan Privasi."
      lede="Data apa yang kami kumpulkan, untuk apa, siapa yang menerimanya, dan bagaimana Anda mengendalikannya — sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi."
      sections={sections}
      related={[
        { to: "/ketentuan", label: "Syarat & Ketentuan" },
        { to: "/trust", label: "Trust Center (keamanan)" },
      ]}
    />
  );
}
