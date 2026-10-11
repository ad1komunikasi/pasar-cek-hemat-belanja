# PasarCek — Cek Harga Dulu, Baru ke Pasar

**[www.pasarcek.com](https://www.pasarcek.com)**

PasarCek membantu keluarga Indonesia membandingkan harga sembako di pasar-pasar terdekat, supaya
tahu harus belanja di mana sebelum keluar rumah.

## Fitur

- **Harga hari ini** — harga beras, cabai, telur, ayam, minyak, bawang, dan bahan pokok lain per pasar.
- **Bandingkan pasar** — satu komoditas, beberapa pasar, termurah langsung terlihat.
- **Pasar terdekat** — peta pasar tradisional (Google Maps, dengan cadangan Leaflet).
- **Smart Basket** — menjumlahkan seluruh daftar belanja di tiap pasar dan menunjuk total termurah.
- **Alarm harga & daftar belanja** — notifikasi saat harga incaran tercapai.
- **Paket Premium** — pembayaran transfer manual dengan verifikasi admin.
- **Panel admin** — kelola pasar, produk, harga, pesanan, pengguna, dan laporan AI (Gemini).

## Teknologi

| Bagian    | Stack                                                        |
| --------- | ------------------------------------------------------------ |
| Framework | [TanStack Start](https://tanstack.com/start) (React 19, SSR) |
| Routing   | TanStack Router (file-based, `src/routes/`)                  |
| Data      | Supabase (Postgres, Auth, Storage, RLS) + TanStack Query     |
| Styling   | Tailwind CSS v4, komponen shadcn/ui (Radix)                  |
| Hosting   | Vercel (`npm run build:vercel` → `.vercel/output`)           |
| Integrasi | Google Identity Services, Google Maps, Gemini, Resend        |

## Menjalankan secara lokal

Butuh Node.js 22.

```bash
npm install
cp .env.example .env.local   # lalu isi nilainya (lihat tabel di bawah)
npm run dev
```

Aplikasi berjalan di `http://localhost:3000` (atau port yang ditampilkan Vite).

### Variabel lingkungan

| Variabel                        | Wajib | Keterangan                                                                                 |
| ------------------------------- | :---: | ------------------------------------------------------------------------------------------ |
| `VITE_SUPABASE_URL`             |   ✓   | URL proyek Supabase                                                                        |
| `VITE_SUPABASE_PUBLISHABLE_KEY` |   ✓   | Publishable key Supabase                                                                   |
| `SUPABASE_SERVICE_ROLE_KEY`     |       | Hanya di server, untuk operasi admin                                                       |
| `VITE_GOOGLE_CLIENT_ID`         |       | Web client ID Google untuk login (tanpa ini, login Google memakai redirect OAuth Supabase) |
| `VITE_GOOGLE_MAPS_API_KEY`      |       | Peta Google; tanpa ini peta memakai Leaflet                                                |
| `GEMINI_API_KEY`                |       | Fitur AI (laporan admin, saran produk/pasar)                                               |
| `VITE_RESEND_API_KEY`           |       | Pengiriman email transaksional                                                             |

> Jangan pernah meng-commit `.env.local` atau service role key.

**Login Google:** daftarkan domain (termasuk `http://localhost:<port>` untuk development) di
Google Cloud Console → Credentials → _Authorized JavaScript origins_, dan pakai client ID yang sama
di Supabase → Authentication → Providers → Google.

## Skrip

| Perintah               | Fungsi                                         |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Server development                             |
| `npm run build`        | Build produksi (`dist/`)                       |
| `npm run build:vercel` | Build + susun output Vercel (`.vercel/output`) |
| `npm run preview`      | Pratinjau hasil build                          |
| `npm run lint`         | ESLint                                         |
| `npm run format`       | Prettier                                       |

## Struktur folder

```
src/
├── routes/                 # Halaman (file-based routing)
│   ├── index.tsx           # Landing page
│   ├── auth.*.tsx          # Login, daftar, callback OAuth
│   ├── pricing.tsx, features*.tsx, trust.tsx
│   ├── privasi.tsx         # Kebijakan Privasi (UU PDP 27/2022)
│   ├── ketentuan.tsx       # Syarat & Ketentuan
│   └── _authenticated/     # Aplikasi setelah login + panel admin
├── components/
│   ├── site/               # Komponen situs publik (header, footer, MarketField, ticker, logo)
│   ├── ui/                 # Komponen shadcn/ui
│   └── app-shell.tsx       # Layout aplikasi setelah login
├── hooks/                  # Auth, pengaturan (tema & bahasa), harga real-time
├── integrations/supabase/  # Klien & tipe Supabase
├── lib/                    # Utilitas, API server (AI), email, data legal
└── assets/                 # Ilustrasi & aset brand
supabase/migrations/        # Skema database & kebijakan RLS
public/                     # Favicon, sitemap, robots, verifikasi Google
```

## Desain

Konsep visual **“papan harga pasar”**: latar kertas krem `#f4efe4`, biru brand `#1e3a8a`, hijau brand
`#127a79`, navy `#0f1d47` untuk bagian gelap, serta aksen cabai `#d0412a` dan kunyit `#e7ad32`.
Font: Bricolage Grotesque (judul), Instrument Sans (teks), JetBrains Mono (harga & label).
Token warna ada di `src/styles.css`; mode gelap tersedia di seluruh halaman.

## Data harga (SP2KP Kemendag)

Harga per pasar diambil dari SP2KP Kementerian Perdagangan lewat skrip
[`scripts/sync-sp2kp.mjs`](scripts/sync-sp2kp.mjs) dan disimpan ke `product_prices` dengan
sumber `SP2KP Kemendag`.

- **Jadwal:** GitHub Actions [`sync-sp2kp.yml`](.github/workflows/sync-sp2kp.yml), Senin–Jumat
  pukul 15.00 WIB, mengambil 4 hari terakhir (upsert, aman dijalankan ulang).
- **Manual:** Actions → _Sinkron harga SP2KP_ → _Run workflow_ (default _dry run_).
- **Lokal:** `npm run sync:sp2kp -- --dry-run`
- **Secret wajib:** `SUPABASE_SERVICE_ROLE_KEY` di Settings → Secrets and variables → Actions.
- **Cakupan:** DKI Jakarta, 18 produk, 20 pasar pantauan SP2KP. Pasar SP2KP baru ditambahkan
  dengan `--add-markets` dari [`scripts/sp2kp-markets.json`](scripts/sp2kp-markets.json)
  (alamat dari SP2KP/OpenStreetMap; koordinat © kontributor OpenStreetMap, ODbL).
  Pasar/produk tanpa data tetap memakai data contoh dan ditandai “contoh” di aplikasi.

Endpoint SP2KP yang dipakai adalah endpoint publik yang tidak terdokumentasi resmi. Skrip memakai
satu provinsi, jeda antar-permintaan, dan maksimal sekali sehari; izin resmi tetap sedang diajukan.

## Deploy

Setiap push ke `main` otomatis di-deploy oleh Vercel ke
[www.pasarcek.com](https://www.pasarcek.com) (`pasarcek.com` dialihkan ke `www`).

## Legal

- Kebijakan Privasi: [/privasi](https://www.pasarcek.com/privasi)
- Syarat & Ketentuan: [/ketentuan](https://www.pasarcek.com/ketentuan)

Identitas penyelenggara (nama badan hukum, alamat, email kontak) diatur di `src/lib/legal.ts`.

---

© PasarCek. Seluruh hak dilindungi.
