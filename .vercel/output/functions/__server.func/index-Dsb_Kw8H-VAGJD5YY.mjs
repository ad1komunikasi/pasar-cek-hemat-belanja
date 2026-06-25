import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  useAuth
} from "./chunk-G57E4XNL.mjs";
import {
  toast
} from "./chunk-C7CN73EW.mjs";
import "./chunk-DH7FIRD7.mjs";
import "./chunk-2FS42ITU.mjs";
import {
  require_lucide_react
} from "./chunk-NDUCSHRX.mjs";
import "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/index-Dsb_Kw8H.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
var heroImg = "/assets/hero-illustration-DOdLhq9W.png";
var problemImg = "/assets/problem-illustration-Ag9aZUXV.png";
var familyImg = "/assets/family-illustration-Bx0H426p.png";
var cookingOilImg = "/assets/cooking-oil-D-GvOysq.png";
var shallotsImg = "/assets/shallots-BYcKtEyf.png";
function Logo() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { href: "#top", className: "flex items-center gap-2 group", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShoppingBasket, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-display text-xl font-bold text-primary", children: "PasarCek" })
  ] });
}
function CTAButton({
  children,
  variant = "primary",
  href = "#cta",
  className = "",
  onClick
}) {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0";
  const styles = {
    primary: "bg-gradient-primary text-primary-foreground shadow-card hover:shadow-elevated",
    secondary: "bg-surface text-primary border border-border hover:border-accent hover:text-accent",
    white: "bg-white text-primary shadow-card hover:shadow-elevated"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href, onClick, className: `${base} ${styles[variant]} ${className}`, children });
}
function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = true
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `${center ? "text-center mx-auto" : ""} max-w-3xl mb-12`, children: [
    eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent mb-4`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Sparkles, { className: "h-3.5 w-3.5" }),
      " ",
      eyebrow
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight", children: title }),
    subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-4 text-base md:text-lg text-muted-foreground", children: subtitle })
  ] });
}
function Navbar() {
  const {
    user
  } = useAuth();
  const [open, setOpen] = (0, import_react.useState)(false);
  const links = [{
    href: "#beranda",
    label: "Beranda"
  }, {
    href: "#fitur",
    label: "Fitur"
  }, {
    href: "#cara-kerja",
    label: "Cara Kerja"
  }, {
    href: "#harga",
    label: "Harga"
  }, {
    href: "#faq",
    label: "FAQ"
  }];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: "sticky top-0 z-50 bg-white/85 backdrop-blur-lg border-b border-border/60", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "hidden md:flex items-center gap-8", children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: l.href, className: "text-sm font-medium text-muted-foreground hover:text-primary transition-colors", children: l.label }) }, l.href)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden md:flex items-center gap-3", children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTAButton, { href: "/dashboard", children: "Buka Aplikasi" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "/auth?tab=login", className: "text-sm font-medium text-muted-foreground hover:text-primary transition-colors", children: "Masuk" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTAButton, { href: "/dashboard", children: "Buka Aplikasi" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 md:hidden", children: [
        user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "/dashboard", className: "text-xs font-semibold text-white bg-gradient-primary px-3 py-2 rounded-xl shadow-soft hover:shadow-elevated transition-all", children: "Dashboard" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "/auth?tab=login", className: "text-xs font-semibold text-muted-foreground hover:text-primary px-3 py-2 rounded-xl border border-border hover:bg-muted/50 transition-all", children: "Masuk" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "/dashboard", className: "text-xs font-semibold text-white bg-gradient-primary px-3 py-2 rounded-xl shadow-soft hover:shadow-elevated transition-all", children: "Buka Aplikasi" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setOpen(!open), "aria-label": "Menu", className: "p-2 rounded-lg hover:bg-muted", children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Menu, { className: "h-5 w-5" }) })
      ] })
    ] }),
    open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "md:hidden border-t border-border bg-white px-4 py-6 space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "space-y-1", children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: l.href, onClick: () => setOpen(false), className: "block text-base font-semibold text-foreground py-2.5 px-3 rounded-xl hover:bg-muted/50 transition-colors", children: l.label }, l.href)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pt-6 border-t border-border flex flex-col gap-3", children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTAButton, { href: "/dashboard", className: "w-full", onClick: () => setOpen(false), children: "Buka Dashboard" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "/auth?tab=login", onClick: () => setOpen(false), className: "flex w-full items-center justify-center rounded-2xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition-all duration-200", children: "Masuk" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTAButton, { href: "/dashboard", className: "w-full", onClick: () => setOpen(false), children: "Buka Aplikasi" })
      ] }) })
    ] })
  ] });
}
function Hero() {
  const {
    user
  } = useAuth();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { id: "beranda", className: "relative overflow-hidden bg-gradient-hero", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "animate-fade-up", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold text-primary border border-border mb-6", children: "\u{1F1EE}\u{1F1E9} Untuk Keluarga Indonesia" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1]", children: [
          "Cari Harga Sembako ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-accent", children: "Termurah" }),
          " Tanpa Keliling Pasar"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-6 text-base md:text-lg text-muted-foreground max-w-xl", children: "PasarCek membantu Anda membandingkan harga sembako antar pasar terdekat secara real-time sehingga pengeluaran rumah tangga lebih hemat." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTAButton, { href: user ? "/dashboard" : "/auth?tab=register", children: "Coba Gratis" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTAButton, { href: "#cara-kerja", variant: "secondary", children: "Lihat Cara Kerja" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "mt-8 flex flex-wrap gap-x-6 gap-y-3", children: ["Data Harga Harian", "Pasar Terdekat", "Gratis Digunakan"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "flex items-center gap-2 text-sm text-foreground/80", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "grid h-5 w-5 place-items-center rounded-full bg-success/15 text-success", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { className: "h-3 w-3", strokeWidth: 3 }) }),
          t
        ] }, t)) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative animate-fade-up", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: heroImg, alt: "Ibu rumah tangga membandingkan harga sembako dengan PasarCek", width: 1024, height: 1024, className: "relative w-full max-w-xl mx-auto animate-float" })
      ] })
    ] })
  ] });
}
function Stats() {
  const stats = [{
    icon: import_lucide_react.Users,
    value: "100.000+",
    label: "Pengguna Terdaftar"
  }, {
    icon: import_lucide_react.Store,
    value: "500+",
    label: "Pasar Terpantau"
  }, {
    icon: import_lucide_react.Database,
    value: "50.000+",
    label: "Update Harga Harian"
  }, {
    icon: import_lucide_react.PiggyBank,
    value: "Rp2 M+",
    label: "Potensi Penghematan"
  }];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "bg-white py-14", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-2xl bg-secondary/60 border border-border p-6 text-center hover:shadow-card transition-shadow", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-2xl md:text-3xl font-bold font-display text-primary", children: s.value }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs md:text-sm text-muted-foreground mt-1", children: s.label })
  ] }, s.label)) }) });
}
function Problems() {
  const problems = [{
    icon: import_lucide_react.TrendingDown,
    title: "Harga berubah setiap hari",
    desc: "Tidak ada acuan harga yang jelas dari satu hari ke hari berikutnya."
  }, {
    icon: import_lucide_react.Search,
    title: "Harus survei pasar satu per satu",
    desc: "Buang waktu dan tenaga keliling pasar hanya untuk cek harga."
  }, {
    icon: import_lucide_react.Frown,
    title: "Tidak tahu pasar termurah",
    desc: "Akhirnya belanja di tempat yang sama meski belum tentu paling murah."
  }, {
    icon: import_lucide_react.Wallet,
    title: "Pengeluaran membengkak",
    desc: "Tanpa data harga, anggaran rumah tangga sulit dikontrol."
  }];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "py-20", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { eyebrow: "Masalah Sehari-hari", title: "Masih Mengalami Masalah Ini Saat Belanja?", subtitle: "Sebagian besar keluarga Indonesia membuang uang lebih banyak karena kurangnya informasi harga." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid lg:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: problemImg, alt: "Frustrasi saat belanja di pasar", width: 900, height: 900, loading: "lazy", className: "w-full max-w-md mx-auto" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid sm:grid-cols-2 gap-4", children: problems.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-2xl bg-white border border-border p-6 hover:shadow-card hover:-translate-y-1 transition-all", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-destructive/10 text-destructive mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "font-semibold text-foreground", children: p.title }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-muted-foreground mt-1", children: p.desc })
      ] }, p.title)) })
    ] })
  ] }) });
}
function Why() {
  const items = [{
    icon: import_lucide_react.BarChart3,
    title: "Data Real-time",
    desc: "Harga sembako diperbarui setiap hari dari pasar tradisional terverifikasi."
  }, {
    icon: import_lucide_react.Store,
    title: "Bandingkan Banyak Pasar",
    desc: "Lihat harga komoditas yang sama di berbagai pasar dalam satu layar."
  }, {
    icon: import_lucide_react.Clock,
    title: "Hemat Waktu & Transport",
    desc: "Tidak perlu keliling \u2014 cukup buka aplikasi sebelum berangkat."
  }, {
    icon: import_lucide_react.Brain,
    title: "Keputusan Belanja Cerdas",
    desc: "Belanja berdasarkan data, bukan tebakan. Anggaran lebih terkontrol."
  }];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "py-20 bg-secondary/40", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { eyebrow: "Mengapa PasarCek", title: "Kenapa Ribuan Keluarga Memilih PasarCek?", subtitle: "Dirancang untuk membantu ibu rumah tangga Indonesia berbelanja lebih cerdas setiap hari." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5", children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "group rounded-3xl bg-white border border-border p-6 hover:shadow-elevated hover:-translate-y-2 transition-all", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground mb-4 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i.icon, { className: "h-7 w-7" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "font-display font-semibold text-lg text-foreground", children: i.title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-muted-foreground mt-2", children: i.desc })
    ] }, i.title)) })
  ] }) });
}
function Features() {
  const {
    user
  } = useAuth();
  const features = [{
    icon: import_lucide_react.BarChart3,
    tag: "Harga Hari Ini",
    title: "Harga Sembako Selalu Terbaru",
    desc: "Lihat harga beras, cabai, telur, ayam, minyak, gula, bawang, dan kebutuhan pokok lainnya \u2014 diperbarui harian."
  }, {
    icon: import_lucide_react.Map,
    tag: "Lokasi",
    title: "Temukan Pasar Terdekat",
    desc: "Berbasis lokasi Anda, lihat pasar tradisional terdekat lengkap dengan jam buka dan rating."
  }, {
    icon: import_lucide_react.BarChart3,
    tag: "Perbandingan",
    title: "Bandingkan Harga Antar Pasar",
    desc: "Lihat harga komoditas yang sama di beberapa pasar sekaligus dalam satu tabel."
  }, {
    icon: import_lucide_react.ListChecks,
    tag: "Wishlist",
    title: "Daftar Belanja Pintar",
    desc: "Buat daftar kebutuhan sebelum berangkat agar belanja lebih terorganisir dan tidak boros."
  }, {
    icon: import_lucide_react.Bell,
    tag: "Notifikasi",
    title: "Notifikasi Harga Turun",
    desc: "Dapatkan pemberitahuan otomatis saat harga komoditas favorit Anda turun."
  }, {
    icon: import_lucide_react.Heart,
    tag: "Favorit",
    title: "Pasar Favorit",
    desc: "Simpan pasar favorit Anda untuk akses cepat ke harga dan promo terbaru."
  }];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { id: "fitur", className: "py-20", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { eyebrow: "Fitur Unggulan", title: "Semua yang Anda Butuhkan Untuk Belanja Lebih Hemat" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-3xl bg-white border border-border p-6 hover:shadow-card transition-all", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs font-semibold text-accent uppercase tracking-wider", children: f.tag })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "font-display font-semibold text-lg text-foreground", children: f.title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-muted-foreground mt-2", children: f.desc })
    ] }, f.title)) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-12 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTAButton, { href: user ? "/dashboard" : "/auth?tab=register", children: "Coba Semua Fitur Gratis" }) })
  ] }) });
}
function HowItWorks() {
  const steps = [{
    icon: import_lucide_react.MapPin,
    title: "Pilih Lokasi",
    desc: "Aktifkan GPS atau pilih area belanja Anda secara manual."
  }, {
    icon: import_lucide_react.BarChart3,
    title: "Bandingkan Harga",
    desc: "Lihat harga komoditas yang Anda butuhkan di berbagai pasar terdekat."
  }, {
    icon: import_lucide_react.ShoppingBag,
    title: "Belanja di Pasar Termurah",
    desc: "Berangkat ke pasar dengan total belanja paling hemat."
  }];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { id: "cara-kerja", className: "py-20 bg-secondary/40", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { eyebrow: "Cara Kerja", title: "Hanya 3 Langkah Untuk Belanja Lebih Hemat" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid md:grid-cols-3 gap-6 relative", children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative rounded-3xl bg-white border border-border p-8 text-center hover:shadow-card transition-all", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold shadow-card", children: i + 1 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground mt-2 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "font-display font-semibold text-xl text-foreground", children: s.title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-muted-foreground mt-2", children: s.desc })
    ] }, s.title)) })
  ] }) });
}
function AppPreview() {
  const screens = ["Home", "Harga Hari Ini", "Pasar Terdekat", "Bandingkan Harga", "Smart Basket", "Profil"];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "py-20", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { eyebrow: "Preview Aplikasi", title: "Lihat Tampilan Aplikasi", subtitle: "Antarmuka yang bersih, ramah, dan mudah dipahami siapa saja." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative rounded-3xl bg-gradient-hero p-8 md:p-12 border border-border overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative flex items-center justify-center animate-float", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative w-full max-w-[325px] h-[600px] rounded-[3rem] border-[10px] border-slate-900 bg-background shadow-elevated overflow-hidden select-none flex flex-col text-left", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-full z-30 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2.5 h-2.5 bg-slate-800 rounded-full ml-auto mr-4" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "px-5 pt-3 pb-1 flex justify-between items-center text-[10px] font-bold text-foreground/75 z-20 bg-white", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "09:41" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: "w-3 h-3 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.07 19.64 10.47 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-3.5 h-2 bg-foreground/75 rounded-xs inline-block" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "px-4 py-2.5 flex items-center justify-between border-b border-border bg-white z-10", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid h-6 w-6 place-items-center rounded-lg bg-gradient-primary text-white shadow-soft", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShoppingBasket, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-display text-sm font-extrabold text-primary", children: "PasarCek" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-1 text-[10px] font-semibold text-accent", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MapPin, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pasar Santa" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex-1 overflow-y-auto px-3.5 py-4 space-y-4 bg-secondary/35", style: {
          scrollbarWidth: "none"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative shadow-soft rounded-2xl", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Search, { className: "absolute left-3.5 top-3 h-4 w-4 text-muted-foreground/60" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "text", placeholder: "Cari minyak, bawang merah...", disabled: true, className: "w-full rounded-2xl bg-white border border-border/80 pl-10 pr-3.5 py-2.5 text-xs text-muted-foreground placeholder:text-muted-foreground/50" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex gap-2 overflow-x-auto pb-1", style: {
            scrollbarWidth: "none"
          }, children: ["Semua", "Minyak", "Bawang", "Beras", "Cabai"].map((cat, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `px-3 py-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-colors border ${idx === 1 || idx === 2 ? "bg-primary text-primary-foreground border-primary" : "bg-white text-muted-foreground border-border/80 shadow-xs"}`, children: cat }, cat)) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between px-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[10px] font-extrabold text-muted-foreground/80 uppercase tracking-wider", children: "Harga Hari Ini" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[9px] font-bold text-accent", children: "Lihat Semua" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white rounded-2xl border border-border/80 p-3.5 shadow-soft flex flex-col gap-3 hover:shadow-card transition-shadow", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-14 h-14 shrink-0 rounded-xl bg-slate-50 border border-border/60 flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: cookingOilImg, alt: "Minyak Goreng", className: "w-full h-full object-contain p-0.5" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[8px] font-extrabold uppercase tracking-wider mb-1", children: "Minyak Goreng" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { className: "font-display font-bold text-xs text-foreground leading-tight", children: "Minyak Goreng Premium 2L" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "border-t border-border/60 pt-3 space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider", children: "Bandingkan Pasar:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-accent/5 border border-accent/10 text-foreground", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-foreground/80", children: "Pasar Santa" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-primary", children: "Rp33.500" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[8px] font-extrabold bg-accent text-white px-1.5 py-0.5 rounded uppercase tracking-wider", children: "Termurah" })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-transparent text-foreground/80", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pasar Kebayoran" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-foreground", children: "Rp35.000" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-transparent text-foreground/80", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pasar Blok M" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-foreground", children: "Rp36.200" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-white rounded-2xl border border-border/80 p-3.5 shadow-soft flex flex-col gap-3 hover:shadow-card transition-shadow", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-14 h-14 shrink-0 rounded-xl bg-slate-50 border border-border/60 flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: shallotsImg, alt: "Bawang Merah", className: "w-full h-full object-contain p-0.5" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[8px] font-extrabold uppercase tracking-wider mb-1", children: "Bumbu Dapur" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { className: "font-display font-bold text-xs text-foreground leading-tight", children: "Bawang Merah Brebes 1kg" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "border-t border-border/60 pt-3 space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider", children: "Bandingkan Pasar:" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-accent/5 border border-accent/10 text-foreground", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-foreground/80", children: "Pasar Kebayoran" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-primary", children: "Rp38.000" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[8px] font-extrabold bg-accent text-white px-1.5 py-0.5 rounded uppercase tracking-wider", children: "Termurah" })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-transparent text-foreground/80", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pasar Blok M" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-foreground", children: "Rp39.500" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-transparent text-foreground/80", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pasar Santa" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-foreground", children: "Rp40.000" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "px-6 py-2.5 border-t border-border bg-white flex justify-between items-center text-[9px] font-bold text-muted-foreground z-10", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-center gap-0.5 text-primary", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShoppingBasket, { className: "h-4 w-4" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Home" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-center gap-0.5 hover:text-primary transition-colors", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MapPin, { className: "h-4 w-4" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pasar" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-center gap-0.5 hover:text-primary transition-colors", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShoppingBag, { className: "h-4 w-4" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Keranjang" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative mt-8 flex flex-wrap justify-center gap-2", children: screens.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rounded-full bg-white/70 backdrop-blur px-4 py-1.5 text-xs font-semibold text-primary border border-border", children: s }, s)) })
    ] })
  ] }) });
}
function SmartBasket() {
  const {
    user
  } = useAuth();
  const markets = [{
    name: "Pasar A",
    price: "Rp205.000",
    best: false
  }, {
    name: "Pasar B",
    price: "Rp195.000",
    best: true
  }, {
    name: "Pasar C",
    price: "Rp215.000",
    best: false
  }];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "py-20 bg-gradient-navy text-white relative overflow-hidden", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold mb-5 backdrop-blur", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Sparkles, { className: "h-3.5 w-3.5" }),
          " Killer Feature"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight", children: "Smart Basket: Temukan Pasar Paling Hemat Secara Otomatis" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-5 text-white/80 text-base md:text-lg", children: "Masukkan daftar belanja Anda dan PasarCek akan menghitung pasar mana yang memberikan total biaya paling murah." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTAButton, { href: user ? "/smart-basket" : "/auth?tab=register", variant: "white", children: "Coba Smart Basket" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 shadow-elevated", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs uppercase tracking-wider text-white/60 font-semibold mb-3", children: "Daftar Belanja" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "space-y-2 mb-6", children: ["Beras 5 kg", "Telur 2 kg", "Cabai 1 kg"].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { className: "h-4 w-4 text-success", strokeWidth: 3 }),
          " ",
          i
        ] }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs uppercase tracking-wider text-white/60 font-semibold mb-3", children: "Hasil Perbandingan" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "space-y-2", children: markets.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `flex items-center justify-between rounded-xl px-4 py-3 ${m.best ? "bg-success text-white" : "bg-white/10"}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-semibold text-sm", children: m.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "font-display font-bold flex items-center gap-2", children: [
            m.price,
            " ",
            m.best && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { className: "h-4 w-4", strokeWidth: 3 })
          ] })
        ] }, m.name)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mt-6 rounded-2xl bg-gradient-primary p-5 text-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs uppercase tracking-wider opacity-90", children: "Hemat Hari Ini" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-3xl font-display font-bold mt-1", children: "Rp20.000" })
        ] })
      ] })
    ] })
  ] });
}
function UseCases() {
  const personas = [{
    emoji: "\u{1F469}\u200D\u{1F373}",
    title: "Ibu Rumah Tangga",
    desc: "Atur anggaran belanja harian dengan lebih percaya diri."
  }, {
    emoji: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}",
    title: "Keluarga Muda",
    desc: "Optimalkan pengeluaran rumah tangga di awal pernikahan."
  }, {
    emoji: "\u{1F4BC}",
    title: "Pekerja Sibuk",
    desc: "Belanja efisien tanpa harus survei keliling pasar."
  }, {
    emoji: "\u{1F393}",
    title: "Mahasiswa & Anak Kost",
    desc: "Hemat uang jajan & belanja bulanan dengan harga termurah."
  }];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "py-20", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { eyebrow: "Untuk Siapa?", title: "Siapa yang Cocok Menggunakan PasarCek?" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5", children: personas.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-3xl bg-white border border-border p-6 text-center hover:shadow-card hover:-translate-y-1 transition-all", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-5xl mb-3", children: p.emoji }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "font-display font-semibold text-lg text-foreground", children: p.title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-muted-foreground mt-2", children: p.desc })
    ] }, p.title)) })
  ] }) });
}
function Benefits() {
  const list = ["Belanja lebih hemat setiap hari", "Mengurangi pengeluaran bulanan", "Tidak perlu survei pasar", "Keputusan belanja lebih cerdas", "Hemat waktu", "Hemat biaya transportasi"];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "py-20 bg-secondary/40", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { eyebrow: "Manfaat", title: "Apa yang Akan Anda Dapatkan?", center: false }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "grid sm:grid-cols-2 gap-3", children: list.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "flex items-start gap-3 rounded-2xl bg-white border border-border p-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success text-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { className: "h-3.5 w-3.5", strokeWidth: 3 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm font-medium text-foreground", children: b })
      ] }, b)) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-3xl bg-destructive/5 border border-destructive/20 p-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold uppercase tracking-wider text-destructive mb-2", children: "Sebelum" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-3xl mb-3", children: "\u{1F629}" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { className: "font-display font-semibold text-foreground", children: "Bingung memilih pasar" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-muted-foreground mt-1", children: "Belanja tanpa data, pengeluaran tak terkontrol." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-3xl bg-success/5 border border-success/30 p-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold uppercase tracking-wider text-success mb-2", children: "Sesudah" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-3xl mb-3", children: "\u{1F389}" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { className: "font-display font-semibold text-foreground", children: "Langsung tahu pasar terbaik" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-muted-foreground mt-1", children: "Belanja cerdas, hemat hingga 20% tiap bulan." })
      ] })
    ] })
  ] }) });
}
function Pricing() {
  const {
    user
  } = useAuth();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { id: "harga", className: "py-20", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { eyebrow: "Harga", title: "Pilih Paket yang Sesuai", subtitle: "Mulai gratis, upgrade kapan saja untuk fitur lengkap." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-3xl bg-white border border-border p-8 hover:shadow-card transition-all", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Free" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 flex items-baseline gap-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-5xl font-display font-bold text-foreground", children: "Rp0" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-muted-foreground mt-2", children: "Untuk memulai perjalanan hemat Anda." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "mt-6 space-y-3", children: ["Harga harian", "Bandingkan pasar", "Smart Basket dasar", "Notifikasi terbatas"].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { className: "h-4 w-4 text-success", strokeWidth: 3 }),
          " ",
          f
        ] }, f)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTAButton, { href: user ? "/dashboard" : "/auth?tab=register", variant: "secondary", className: "w-full mt-8", children: "Mulai Gratis" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative rounded-3xl bg-gradient-navy text-white p-8 shadow-elevated", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-warning px-4 py-1 text-xs font-bold text-warning-foreground shadow-card", children: "Paling Populer" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold uppercase tracking-wider text-white/70", children: "Premium" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mt-3 flex items-baseline gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-5xl font-display font-bold", children: "Rp9.900" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-white/70", children: "/bulan" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-white/80 mt-2", children: "Semua fitur untuk hemat maksimal." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "mt-6 space-y-3", children: ["Alert harga tanpa batas", "Prediksi harga AI", "Riwayat penghematan", "Analitik 90 hari", "Smart Basket lengkap"].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { className: "h-4 w-4 text-success", strokeWidth: 3 }),
          " ",
          f
        ] }, f)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTAButton, { href: user ? "/checkout?package=premium" : "/auth?tab=register", variant: "white", className: "w-full mt-8", children: "Upgrade Premium" })
      ] })
    ] })
  ] }) });
}
function FAQ() {
  const items = [{
    q: "Apakah PasarCek gratis?",
    a: "Ya, fitur dasar PasarCek 100% gratis. Anda bisa upgrade ke Premium kapan saja untuk fitur lanjutan."
  }, {
    q: "Data harga berasal dari mana?",
    a: "Data dikumpulkan dari mitra pasar tradisional, surveyor lokal terverifikasi, dan kontribusi komunitas pengguna."
  }, {
    q: "Seberapa sering data diperbarui?",
    a: "Harga sembako diperbarui setiap hari, dengan beberapa komoditas utama diperbarui beberapa kali sehari."
  }, {
    q: "Apakah tersedia di seluruh Indonesia?",
    a: "Saat ini tersedia di kota-kota besar Jawa & Sumatera, dan terus berkembang ke kota lainnya."
  }, {
    q: "Bagaimana Smart Basket bekerja?",
    a: "Anda memasukkan daftar belanja, lalu PasarCek menghitung total harga di setiap pasar terdekat dan menampilkan yang paling hemat."
  }, {
    q: "Apakah saya bisa menyimpan pasar favorit?",
    a: "Tentu. Anda bisa menyimpan pasar favorit untuk akses cepat dan menerima notifikasi khusus dari pasar tersebut."
  }];
  const [open, setOpen] = (0, import_react.useState)(0);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { id: "faq", className: "py-20 bg-secondary/40", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { eyebrow: "FAQ", title: "Pertanyaan yang Sering Ditanyakan" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "space-y-3", children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-2xl bg-white border border-border overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => setOpen(open === i ? null : i), className: "w-full flex items-center justify-between p-5 text-left", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-display font-semibold text-foreground", children: it.q }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronDown, { className: `h-5 w-5 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}` })
      ] }),
      open === i && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-5 pb-5 text-sm text-muted-foreground animate-fade-up", children: it.a })
    ] }, it.q)) })
  ] }) });
}
function FinalCTA() {
  const {
    user
  } = useAuth();
  const handleWaitlist = (e) => {
    e.preventDefault();
    if (user) {
      toast.success("Terima kasih! Anda sudah terdaftar dalam antrean prioritas rilis aplikasi mobile kami.");
    } else {
      toast.success("Terima kasih! Menghubungkan ke pendaftaran akun untuk prioritas waitlist...");
      setTimeout(() => {
        window.location.href = "/auth?tab=register";
      }, 1500);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { id: "cta", className: "py-20 bg-gradient-navy text-white relative overflow-hidden", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 h-96 w-[120%] rounded-full bg-accent/15 blur-3xl" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight", children: "Mulai Hemat Pengeluaran Belanja Mulai Hari Ini" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-5 text-white/80 text-base md:text-lg max-w-xl", children: "Ribuan keluarga sudah menggunakan PasarCek untuk membuat keputusan belanja yang lebih cerdas." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTAButton, { href: user ? "/dashboard" : "/auth?tab=register", variant: "white", children: "Download Gratis" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "#", onClick: handleWaitlist, className: "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-all", children: "Gabung Waitlist" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: familyImg, alt: "Keluarga bahagia menghemat belanja dengan PasarCek", width: 1024, height: 800, loading: "lazy", className: "w-full max-w-md animate-float" }) })
    ] })
  ] });
}
function Footer() {
  const handleUnderDev = (name) => (e) => {
    e.preventDefault();
    toast.info(`Fitur/Halaman ${name} sedang dalam pengembangan. Hubungi kami via email jika ada pertanyaan!`);
  };
  const cols = [{
    title: "Produk",
    links: [{
      label: "Fitur",
      href: "#fitur"
    }, {
      label: "Harga",
      href: "#harga"
    }, {
      label: "FAQ",
      href: "#faq"
    }]
  }, {
    title: "Perusahaan",
    links: [{
      label: "Tentang Kami",
      href: "/trust"
    }, {
      label: "Kontak",
      href: "#",
      onClick: handleUnderDev("Kontak")
    }, {
      label: "Blog",
      href: "#",
      onClick: handleUnderDev("Blog")
    }]
  }, {
    title: "Legal",
    links: [{
      label: "Privacy Policy",
      href: "/trust"
    }, {
      label: "Terms of Service",
      href: "/trust"
    }]
  }];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { className: "bg-white border-t border-border py-14", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-4 text-sm text-muted-foreground max-w-xs", children: "Cek harga sembako terbaru & bandingkan pasar terdekat. Belanja lebih hemat untuk keluarga Indonesia." })
      ] }),
      cols.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "font-display font-semibold text-foreground mb-3", children: c.title }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "space-y-2", children: c.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: l.href, onClick: l.onClick, className: "text-sm text-muted-foreground hover:text-primary transition-colors", children: l.label }) }, l.label)) })
      ] }, c.title))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-border text-xs text-muted-foreground text-center", children: "\xA9 2026 PasarCek. All Rights Reserved." })
  ] });
}
function LandingPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { id: "top", className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Problems, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Why, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppPreview, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartBasket, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseCases, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Benefits, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCTA, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
  ] });
}
export {
  LandingPage as component
};
