
# PasarCek — Web App Scaffold Plan

Goal: bangun **semua route** (customer, auth, admin) di atas landing page yang sudah ada, dengan UI lengkap, data dummy/seed terhubung ke database, dan logika utama berjalan untuk halaman kunci. Detail bisnis diisi bertahap.

## Stack Keputusan
- TanStack Start (lanjut), TypeScript, Tailwind v4.
- Lovable Cloud (Supabase) untuk DB, Auth, Storage, RLS — menggantikan Prisma/Postgres/JWT manual.
- Google Maps Platform (konektor Lovable) untuk peta, geocoding, jarak.
- shadcn/ui + Lucide + Recharts + Framer Motion (sudah/akan dipasang).
- Roboto via `@fontsource/roboto` (override Poppins/Inter landing → tetap dipertahankan untuk landing, Roboto untuk app shell).

## Design System (Swiss Style)
Tambah token di `src/styles.css`:
- Brand: `--brand-blue #1e3a8a`, `--brand-green #127a79`, scale gray `#F8F8F8 → #424242`.
- Status: success/warning/danger/info hex sesuai brief.
- Spacing scale 4/8/12/16/24/32/48/64/96 sebagai utilitas.
- Radius 8/12/16, shadow subtle.
- Layout: 12-col desktop, 8-col tablet, 4-col mobile via Tailwind grid utilities.
- Komponen shell baru: `AppShell`, `Sidebar`, `Topbar`, `PageHeader`, `DataTable`, `StatCard`, `PriceCell`, `EmptyState`, `Section`.

## Information Architecture (route files)

Public (top-level, SSR on, head() unik):
- `/` (sudah), `/features`, `/features/$slug`, `/markets`, `/markets/$id`, `/pricing`, `/auth` (login+register+forgot tabs).

Authenticated (di bawah `_authenticated/` managed gate):
- `/dashboard`, `/profile`, `/smart-basket`, `/cart`, `/checkout`, `/orders`, `/orders/$id`, `/favorites`, `/notifications`, `/settings`, `/prices` (Harga Hari Ini), `/compare` (Bandingkan Harga).

Admin (`_authenticated/_admin/` dengan RBAC `has_role(admin)`):
- `/admin`, `/admin/users`, `/admin/packages`, `/admin/orders`, `/admin/orders/$id`, `/admin/payments`, `/admin/markets`, `/admin/products`, `/admin/reports`, `/admin/settings`, `/admin/auth-monitor`.

Server routes (TSS): `src/routes/api/public/webhooks/payment.ts` (placeholder), tidak dipakai dulu.

## Database (Supabase migrations)
Enum `app_role` (`customer`, `premium`, `admin`, `super_admin`).
Tabel (RLS + GRANT lengkap):
- `profiles` (id=uuid ref auth.users, full_name, username unique, phone, city, avatar_url).
- `user_roles` (id, user_id, role app_role) + `has_role()` SECURITY DEFINER.
- `markets` (id, name, address, city, lat, lng, hours, photo_url, type, google_maps_url, rating).
- `products` (id, name, category, unit, image_url).
- `product_prices` (id, product_id, market_id, price, recorded_at) — index (product_id, market_id, recorded_at desc).
- `favorites_products`, `favorites_markets` (user_id + fk).
- `smart_baskets` (id, user_id, name, created_at), `basket_items` (basket_id, product_id, unit, quantity).
- `notifications` (user_id, type, title, body, read_at).
- `packages` (id, name, price, duration_days, benefits jsonb, sort_order, status).
- `orders` (id, order_number `PSC-YYYYMMDD-XXXX`, user_id, package_id, amount, method, status enum, proof_url, admin_note, created_at).
- `payments` (id, order_id, ...) + `subscriptions` (user_id, package_id, started_at, expires_at, status).
- `activity_logs`, `auth_logs`, `payment_methods` (admin CRUD).
- Storage buckets: `payment-proofs` (private), `market-photos` (public), `product-images` (public), `avatars` (public).
- Trigger auto `profiles` & default role `customer` saat signup.

## Integrasi Data Harga (jawaban user: GitHub/data link)
- Buat server function `import_prices_from_url` (admin only, `has_role(admin)`) menerima URL CSV/JSON GitHub raw → parse → upsert ke `products` + `product_prices`.
- Halaman `/admin/products` punya tombol "Import dari URL" + preview & dry-run.
- Sediakan seed migration awal dengan ~10 pasar contoh (Jakarta) + ~30 produk + harga acak 30 hari supaya semua chart/compare/smart-basket bisa demo.

## Google Maps
- Aktifkan konektor `google_maps`.
- Browser key untuk Maps JS di `/markets`, `/markets/$id`, smart-basket "Lihat Rute".
- Server gateway untuk geocoding alamat saat admin tambah pasar dan compute distance matrix di "Pasar Terdekat".

## Authentication
- Supabase email/password + Google (broker Lovable + `supabase--configure_social_auth`).
- Route `/auth` (tabs login/register/forgot), `/reset-password` public.
- `_authenticated/route.tsx` managed gate (sudah pola standar).
- Profile page: update profil, ubah password, hapus akun (server fn admin).

## Halaman Kunci — kedalaman implementasi iterasi 1
- **Dashboard**: cards (Harga Hari Ini count, Pasar Terdekat, Penghematan bulan ini placeholder, Notifikasi), quick actions linking ke fitur. Data nyata dari Supabase.
- **Harga Hari Ini** (`/prices`): table+card toggle, filter kota/kategori/pasar/tanggal, hitung delta vs harga kemarin, badge naik/turun/stabil.
- **Bandingkan Harga** (`/compare`): pilih produk + kota + radius → table pasar × harga, highlight termurah, summary selisih.
- **Pasar** (`/markets`): list + Google Map dengan markers, filter radius (pakai geolocation browser), card detail.
- **Smart Basket** (`/smart-basket`): CRUD basket items, realtime kalkulasi per pasar, rekomendasi pasar termurah, simpan ke DB, share link.
- **Pricing + Checkout**: pilih paket → form checkout → generate `order_number` di server fn → instruksi transfer → upload bukti ke `payment-proofs` → tracking timeline.
- **Notifikasi & Favorit**: list + mark as read, toggle favorite.
- **Admin**: CRUD penuh untuk packages, products, markets, payment_methods; orders dengan Approve/Reject (server fn → aktifkan subscription); users list dengan suspend; auth monitor (dari `auth_logs`); reports basic charts (Recharts).

Empty states, success/error toasts, copywriting bahasa Indonesia sesuai brief.

## Roadmap Iterasi
1. **Iterasi 1 (sekarang)**: enable Cloud + Google Maps, design tokens & shell, semua route file dengan UI lengkap (banyak pakai data dummy + beberapa sudah live ke Supabase), migration DB lengkap + seed, Auth + RLS, Smart Basket & Compare & Markets fungsional, Pricing→Order→Upload bukti fungsional, Admin CRUD packages/markets/products + approve orders.
2. **Iterasi 2**: import data harga dari GitHub URL, prediksi/analitik premium, Google Maps routing, reports export.
3. **Iterasi 3**: payment gateway nyata, notifikasi push/email, role super_admin granular.

## Technical Notes
- Semua data fetch via `createServerFn` + TanStack Query (`ensureQueryData` di loader, `useSuspenseQuery` di komponen).
- RBAC admin via `has_role()` SECURITY DEFINER + pathless `_admin` layout dengan `beforeLoad` redirect bila bukan admin.
- Storage upload bukti pakai signed URL via server fn.
- Setiap route punya `head()` SEO unik + errorComponent + notFoundComponent.
- Landing page existing tetap, hanya navbar diberi link "Masuk" dan "Dashboard" (jika login).

## Hal yang Belum Diputuskan (akan default)
- Kota awal seed = Jakarta (5 pasar nyata: Tanah Abang, Senen, Kramat Jati, dst).
- Format harga: IDR, tanpa desimal, `Intl.NumberFormat('id-ID')`.
- Default radius pasar: 3 km.

Setelah plan ini disetujui, saya akan mulai dari: enable Lovable Cloud → connect Google Maps → migration DB → design tokens & app shell → route scaffolding.
