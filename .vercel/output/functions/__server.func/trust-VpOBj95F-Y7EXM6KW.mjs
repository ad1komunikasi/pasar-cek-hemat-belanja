import {
  require_lucide_react
} from "./chunk-KJB73ZNG.mjs";
import {
  Link
} from "./chunk-TV3ZUI3R.mjs";
import "./chunk-RE5W7UZM.mjs";
import {
  require_jsx_runtime
} from "./chunk-MLKSHREV.mjs";
import {
  __toESM
} from "./chunk-KVSJYO5R.mjs";

// dist/server/assets/trust-VpOBj95F.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
function TrustPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-h-screen bg-white text-[var(--color-ink)]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "border-b border-[var(--color-gray-100)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/", className: "font-black tracking-tight", children: "PasarCek" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { className: "flex gap-5 text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/features", children: "Fitur" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/pricing", children: "Paket" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/auth", children: "Masuk" })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { className: "mx-auto max-w-[900px] px-6 py-16", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mb-2 text-xs font-bold uppercase tracking-widest text-[var(--color-brand-blue)]", children: "Trust Center" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "mb-4 text-4xl font-black md:text-5xl", children: "Keamanan & privasi di PasarCek" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mb-2 max-w-2xl text-lg text-[var(--color-gray-600)]", children: "Halaman ini dikelola oleh tim PasarCek untuk menjawab pertanyaan umum tentang keamanan, akses akun, dan cara kami menangani data Anda." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mb-12 text-sm text-[var(--color-gray-500)]", children: "Halaman ini bersifat informatif dan bukan sertifikasi independen. Tanggung jawab keamanan dibagi antara penyedia infrastruktur, PasarCek sebagai pemilik aplikasi, dan pengguna yang menjaga kredensial masing-masing." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { icon: import_lucide_react.UserCheck, title: "Akses & autentikasi", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { className: "list-disc space-y-2 pl-5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Login email/password dan Google OAuth dengan sesi terenkripsi." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Setiap pengguna hanya dapat melihat & mengubah datanya sendiri (row-level security pada basis data)." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Peran admin diberikan secara manual oleh tim, tidak bisa di-assign sendiri oleh pengguna." })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { icon: import_lucide_react.Database, title: "Penyimpanan data", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { className: "list-disc space-y-2 pl-5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Data aplikasi (profil, basket, pesanan) disimpan pada database terkelola dengan enkripsi at-rest oleh penyedia infrastruktur." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Bukti transfer pembayaran disimpan pada bucket privat \u2014 hanya pengunggah dan admin yang memverifikasi yang dapat mengakses file tersebut." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Data harga pasar bersifat publik dan dapat dilihat tanpa akun." })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { icon: import_lucide_react.Lock, title: "Pembayaran", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { className: "list-disc space-y-2 pl-5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pembayaran saat ini dilakukan manual via transfer bank/e-wallet, kemudian diverifikasi oleh admin sebelum paket diaktifkan." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Nomor rekening tujuan hanya ditampilkan kepada pengguna yang sudah login." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "PasarCek tidak menyimpan data kartu kredit." })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { icon: import_lucide_react.Shield, title: "Tanggung jawab bersama", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { className: "list-disc space-y-2 pl-5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Infrastruktur:" }),
          " isolasi tenant, enkripsi at-rest & in-transit, ketersediaan layanan."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "PasarCek:" }),
          " kontrol akses, kebijakan baris (RLS), audit aktivitas admin, dan verifikasi pesanan."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Pengguna:" }),
          " menjaga kerahasiaan password, tidak membagikan akun, dan menggunakan jaringan tepercaya."
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { icon: import_lucide_react.FileText, title: "Retensi & penghapusan", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Anda dapat menghapus bukti transfer dan favorit Anda kapan saja dari aplikasi. Untuk permintaan penghapusan akun secara penuh, silakan hubungi tim kami." }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { icon: import_lucide_react.Mail, title: "Laporkan masalah keamanan", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Jika Anda menemukan potensi celah keamanan, mohon laporkan secara bertanggung jawab melalui kanal kontak di halaman utama. Tim kami akan menindaklanjuti laporan secara prioritas." }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-12 text-xs text-[var(--color-gray-500)]", children: "Halaman ini diperbarui secara berkala oleh tim PasarCek. Detail spesifik (sertifikasi, audit independen, SLA) belum dipublikasikan." })
    ] })
  ] });
}
function Section({
  icon: Icon,
  title,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "mb-10", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-3 flex items-center gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-brand-blue)] text-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-xl font-bold", children: title })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-[var(--color-gray-700)]", children })
  ] });
}
export {
  TrustPage as component
};
