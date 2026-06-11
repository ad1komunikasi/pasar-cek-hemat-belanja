import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShoppingBasket, MapPin, BarChart3, Bell, Heart, ListChecks,
  Check, Sparkles, TrendingDown, Clock, Wallet, Brain,
  Menu, X, ChevronDown, Store, Users, Database, PiggyBank,
  Frown, Search, Map as MapIcon, ShoppingBag,
} from "lucide-react";
import heroImg from "@/assets/hero-illustration.png";
import problemImg from "@/assets/problem-illustration.png";
import familyImg from "@/assets/family-illustration.png";
import mockupImg from "@/assets/app-mockup.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PasarCek – Cek Harga Dulu, Belanja Lebih Hemat" },
      { name: "description", content: "Bandingkan harga sembako antar pasar terdekat secara real-time. Hemat pengeluaran rumah tangga bersama PasarCek." },
      { property: "og:title", content: "PasarCek – Cek Harga Dulu, Belanja Lebih Hemat" },
      { property: "og:description", content: "Aplikasi cek harga sembako & pasar termurah di sekitar Anda." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

/* ---------------- Reusable bits ---------------- */

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 group">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
        <ShoppingBasket className="h-5 w-5" />
      </div>
      <span className="font-display text-xl font-bold text-primary">PasarCek</span>
    </a>
  );
}

function CTAButton({
  children, variant = "primary", href = "#cta", className = "",
}: { children: React.ReactNode; variant?: "primary" | "secondary" | "white"; href?: string; className?: string }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0";
  const styles = {
    primary: "bg-gradient-primary text-primary-foreground shadow-card hover:shadow-elevated",
    secondary: "bg-surface text-primary border border-border hover:border-accent hover:text-accent",
    white: "bg-white text-primary shadow-card hover:shadow-elevated",
  } as const;
  return <a href={href} className={`${base} ${styles[variant]} ${className}`}>{children}</a>;
}

function SectionTitle({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-12`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent mb-4`}>
          <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-base md:text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

/* ---------------- Navbar ---------------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#beranda", label: "Beranda" },
    { href: "#fitur", label: "Fitur" },
    { href: "#cara-kerja", label: "Cara Kerja" },
    { href: "#harga", label: "Harga" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-lg border-b border-border/60">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <CTAButton href="#cta">Download Gratis</CTAButton>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="md:hidden p-2 rounded-lg hover:bg-muted">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 space-y-3">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground py-2">{l.label}</a>
          ))}
          <CTAButton href="#cta" className="w-full">Download Gratis</CTAButton>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold text-primary border border-border mb-6">
            🇮🇩 Untuk Keluarga Indonesia
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1]">
            Cari Harga Sembako <span className="text-accent">Termurah</span> Tanpa Keliling Pasar
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl">
            PasarCek membantu Anda membandingkan harga sembako antar pasar terdekat secara real-time
            sehingga pengeluaran rumah tangga lebih hemat.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href="#cta">Coba Gratis</CTAButton>
            <CTAButton href="#cara-kerja" variant="secondary">Lihat Cara Kerja</CTAButton>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {["Data Harga Harian", "Pasar Terdekat", "Gratis Digunakan"].map(t => (
              <li key={t} className="flex items-center gap-2 text-sm text-foreground/80">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-success/15 text-success">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative animate-fade-up">
          <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
          <img
            src={heroImg}
            alt="Ibu rumah tangga membandingkan harga sembako dengan PasarCek"
            width={1024}
            height={1024}
            className="relative w-full max-w-xl mx-auto animate-float"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */

function Stats() {
  const stats = [
    { icon: Users, value: "100.000+", label: "Pengguna Terdaftar" },
    { icon: Store, value: "500+", label: "Pasar Terpantau" },
    { icon: Database, value: "50.000+", label: "Update Harga Harian" },
    { icon: PiggyBank, value: "Rp2 M+", label: "Potensi Penghematan" },
  ];
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-2xl bg-secondary/60 border border-border p-6 text-center hover:shadow-card transition-shadow">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground mb-3">
              <s.icon className="h-6 w-6" />
            </div>
            <div className="text-2xl md:text-3xl font-bold font-display text-primary">{s.value}</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Problems ---------------- */

function Problems() {
  const problems = [
    { icon: TrendingDown, title: "Harga berubah setiap hari", desc: "Tidak ada acuan harga yang jelas dari satu hari ke hari berikutnya." },
    { icon: Search, title: "Harus survei pasar satu per satu", desc: "Buang waktu dan tenaga keliling pasar hanya untuk cek harga." },
    { icon: Frown, title: "Tidak tahu pasar termurah", desc: "Akhirnya belanja di tempat yang sama meski belum tentu paling murah." },
    { icon: Wallet, title: "Pengeluaran membengkak", desc: "Tanpa data harga, anggaran rumah tangga sulit dikontrol." },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Masalah Sehari-hari"
          title="Masih Mengalami Masalah Ini Saat Belanja?"
          subtitle="Sebagian besar keluarga Indonesia membuang uang lebih banyak karena kurangnya informasi harga."
        />
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <img src={problemImg} alt="Frustrasi saat belanja di pasar" width={900} height={900} loading="lazy" className="w-full max-w-md mx-auto" />
          <div className="grid sm:grid-cols-2 gap-4">
            {problems.map(p => (
              <div key={p.title} className="rounded-2xl bg-white border border-border p-6 hover:shadow-card hover:-translate-y-1 transition-all">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-destructive/10 text-destructive mb-3">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why PasarCek ---------------- */

function Why() {
  const items = [
    { icon: BarChart3, title: "Data Real-time", desc: "Harga sembako diperbarui setiap hari dari pasar tradisional terverifikasi." },
    { icon: Store, title: "Bandingkan Banyak Pasar", desc: "Lihat harga komoditas yang sama di berbagai pasar dalam satu layar." },
    { icon: Clock, title: "Hemat Waktu & Transport", desc: "Tidak perlu keliling — cukup buka aplikasi sebelum berangkat." },
    { icon: Brain, title: "Keputusan Belanja Cerdas", desc: "Belanja berdasarkan data, bukan tebakan. Anggaran lebih terkontrol." },
  ];
  return (
    <section className="py-20 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Mengapa PasarCek"
          title="Kenapa Ribuan Keluarga Memilih PasarCek?"
          subtitle="Dirancang untuk membantu ibu rumah tangga Indonesia berbelanja lebih cerdas setiap hari."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(i => (
            <div key={i.title} className="group rounded-3xl bg-white border border-border p-6 hover:shadow-elevated hover:-translate-y-2 transition-all">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <i.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">{i.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */

function Features() {
  const features = [
    { icon: BarChart3, tag: "Harga Hari Ini", title: "Harga Sembako Selalu Terbaru", desc: "Lihat harga beras, cabai, telur, ayam, minyak, gula, bawang, dan kebutuhan pokok lainnya — diperbarui harian." },
    { icon: MapIcon, tag: "Lokasi", title: "Temukan Pasar Terdekat", desc: "Berbasis lokasi Anda, lihat pasar tradisional terdekat lengkap dengan jam buka dan rating." },
    { icon: BarChart3, tag: "Perbandingan", title: "Bandingkan Harga Antar Pasar", desc: "Lihat harga komoditas yang sama di beberapa pasar sekaligus dalam satu tabel." },
    { icon: ListChecks, tag: "Wishlist", title: "Daftar Belanja Pintar", desc: "Buat daftar kebutuhan sebelum berangkat agar belanja lebih terorganisir dan tidak boros." },
    { icon: Bell, tag: "Notifikasi", title: "Notifikasi Harga Turun", desc: "Dapatkan pemberitahuan otomatis saat harga komoditas favorit Anda turun." },
    { icon: Heart, tag: "Favorit", title: "Pasar Favorit", desc: "Simpan pasar favorit Anda untuk akses cepat ke harga dan promo terbaru." },
  ];
  return (
    <section id="fitur" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Fitur Unggulan"
          title="Semua yang Anda Butuhkan Untuk Belanja Lebih Hemat"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(f => (
            <div key={f.title} className="rounded-3xl bg-white border border-border p-6 hover:shadow-card transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                  <f.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">{f.tag}</span>
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <CTAButton href="#cta">Coba Semua Fitur Gratis</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */

function HowItWorks() {
  const steps = [
    { icon: MapPin, title: "Pilih Lokasi", desc: "Aktifkan GPS atau pilih area belanja Anda secara manual." },
    { icon: BarChart3, title: "Bandingkan Harga", desc: "Lihat harga komoditas yang Anda butuhkan di berbagai pasar terdekat." },
    { icon: ShoppingBag, title: "Belanja di Pasar Termurah", desc: "Berangkat ke pasar dengan total belanja paling hemat." },
  ];
  return (
    <section id="cara-kerja" className="py-20 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Cara Kerja" title="Hanya 3 Langkah Untuk Belanja Lebih Hemat" />
        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-3xl bg-white border border-border p-8 text-center hover:shadow-card transition-all">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold shadow-card">
                {i + 1}
              </div>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground mt-2 mb-4">
                <s.icon className="h-8 w-8" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- App Preview ---------------- */

function AppPreview() {
  const screens = ["Home", "Harga Hari Ini", "Pasar Terdekat", "Bandingkan Harga", "Smart Basket", "Profil"];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Preview Aplikasi" title="Lihat Tampilan Aplikasi" subtitle="Antarmuka yang bersih, ramah, dan mudah dipahami siapa saja." />
        <div className="relative rounded-3xl bg-gradient-hero p-8 md:p-12 border border-border overflow-hidden">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative flex items-center justify-center">
            <img src={mockupImg} alt="Tampilan aplikasi PasarCek" width={700} height={1200} loading="lazy" className="w-full max-w-sm drop-shadow-2xl animate-float" />
          </div>
          <div className="relative mt-8 flex flex-wrap justify-center gap-2">
            {screens.map(s => (
              <span key={s} className="rounded-full bg-white/70 backdrop-blur px-4 py-1.5 text-xs font-semibold text-primary border border-border">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Smart Basket ---------------- */

function SmartBasket() {
  const markets = [
    { name: "Pasar A", price: "Rp205.000", best: false },
    { name: "Pasar B", price: "Rp195.000", best: true },
    { name: "Pasar C", price: "Rp215.000", best: false },
  ];
  return (
    <section className="py-20 bg-gradient-navy text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold mb-5 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Killer Feature
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Smart Basket: Temukan Pasar Paling Hemat Secara Otomatis
          </h2>
          <p className="mt-5 text-white/80 text-base md:text-lg">
            Masukkan daftar belanja Anda dan PasarCek akan menghitung pasar mana yang memberikan total biaya paling murah.
          </p>
          <div className="mt-8">
            <CTAButton href="#cta" variant="white">Coba Smart Basket</CTAButton>
          </div>
        </div>
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 shadow-elevated">
          <div className="text-xs uppercase tracking-wider text-white/60 font-semibold mb-3">Daftar Belanja</div>
          <ul className="space-y-2 mb-6">
            {["Beras 5 kg", "Telur 2 kg", "Cabai 1 kg"].map(i => (
              <li key={i} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm">
                <Check className="h-4 w-4 text-success" strokeWidth={3} /> {i}
              </li>
            ))}
          </ul>
          <div className="text-xs uppercase tracking-wider text-white/60 font-semibold mb-3">Hasil Perbandingan</div>
          <div className="space-y-2">
            {markets.map(m => (
              <div key={m.name} className={`flex items-center justify-between rounded-xl px-4 py-3 ${m.best ? "bg-success text-white" : "bg-white/10"}`}>
                <span className="font-semibold text-sm">{m.name}</span>
                <span className="font-display font-bold flex items-center gap-2">
                  {m.price} {m.best && <Check className="h-4 w-4" strokeWidth={3} />}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-gradient-primary p-5 text-center">
            <div className="text-xs uppercase tracking-wider opacity-90">Hemat Hari Ini</div>
            <div className="text-3xl font-display font-bold mt-1">Rp20.000</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Use cases ---------------- */

function UseCases() {
  const personas = [
    { emoji: "👩‍🍳", title: "Ibu Rumah Tangga", desc: "Atur anggaran belanja harian dengan lebih percaya diri." },
    { emoji: "👨‍👩‍👧", title: "Keluarga Muda", desc: "Optimalkan pengeluaran rumah tangga di awal pernikahan." },
    { emoji: "💼", title: "Pekerja Sibuk", desc: "Belanja efisien tanpa harus survei keliling pasar." },
    { emoji: "🎓", title: "Mahasiswa & Anak Kost", desc: "Hemat uang jajan & belanja bulanan dengan harga termurah." },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Untuk Siapa?" title="Siapa yang Cocok Menggunakan PasarCek?" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personas.map(p => (
            <div key={p.title} className="rounded-3xl bg-white border border-border p-6 text-center hover:shadow-card hover:-translate-y-1 transition-all">
              <div className="text-5xl mb-3">{p.emoji}</div>
              <h3 className="font-display font-semibold text-lg text-foreground">{p.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Benefits Before/After ---------------- */

function Benefits() {
  const list = [
    "Belanja lebih hemat setiap hari",
    "Mengurangi pengeluaran bulanan",
    "Tidak perlu survei pasar",
    "Keputusan belanja lebih cerdas",
    "Hemat waktu",
    "Hemat biaya transportasi",
  ];
  return (
    <section className="py-20 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <SectionTitle eyebrow="Manfaat" title="Apa yang Akan Anda Dapatkan?" center={false} />
          <ul className="grid sm:grid-cols-2 gap-3">
            {list.map(b => (
              <li key={b} className="flex items-start gap-3 rounded-2xl bg-white border border-border p-4">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium text-foreground">{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-3xl bg-destructive/5 border border-destructive/20 p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-destructive mb-2">Sebelum</div>
            <div className="text-3xl mb-3">😩</div>
            <h4 className="font-display font-semibold text-foreground">Bingung memilih pasar</h4>
            <p className="text-sm text-muted-foreground mt-1">Belanja tanpa data, pengeluaran tak terkontrol.</p>
          </div>
          <div className="rounded-3xl bg-success/5 border border-success/30 p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-success mb-2">Sesudah</div>
            <div className="text-3xl mb-3">🎉</div>
            <h4 className="font-display font-semibold text-foreground">Langsung tahu pasar terbaik</h4>
            <p className="text-sm text-muted-foreground mt-1">Belanja cerdas, hemat hingga 20% tiap bulan.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */

function Pricing() {
  return (
    <section id="harga" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Harga" title="Pilih Paket yang Sesuai" subtitle="Mulai gratis, upgrade kapan saja untuk fitur lengkap." />
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-3xl bg-white border border-border p-8 hover:shadow-card transition-all">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Free</div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-5xl font-display font-bold text-foreground">Rp0</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Untuk memulai perjalanan hemat Anda.</p>
            <ul className="mt-6 space-y-3">
              {["Harga harian", "Bandingkan pasar", "Smart Basket dasar", "Notifikasi terbatas"].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" strokeWidth={3} /> {f}
                </li>
              ))}
            </ul>
            <CTAButton href="#cta" variant="secondary" className="w-full mt-8">Mulai Gratis</CTAButton>
          </div>
          <div className="relative rounded-3xl bg-gradient-navy text-white p-8 shadow-elevated">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-warning px-4 py-1 text-xs font-bold text-warning-foreground shadow-card">
              Paling Populer
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/70">Premium</div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-5xl font-display font-bold">Rp9.900</span>
              <span className="text-white/70">/bulan</span>
            </div>
            <p className="text-sm text-white/80 mt-2">Semua fitur untuk hemat maksimal.</p>
            <ul className="mt-6 space-y-3">
              {["Alert harga tanpa batas", "Prediksi harga AI", "Riwayat penghematan", "Analitik 90 hari", "Smart Basket lengkap"].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" strokeWidth={3} /> {f}
                </li>
              ))}
            </ul>
            <CTAButton href="#cta" variant="white" className="w-full mt-8">Upgrade Premium</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  const items = [
    { q: "Apakah PasarCek gratis?", a: "Ya, fitur dasar PasarCek 100% gratis. Anda bisa upgrade ke Premium kapan saja untuk fitur lanjutan." },
    { q: "Data harga berasal dari mana?", a: "Data dikumpulkan dari mitra pasar tradisional, surveyor lokal terverifikasi, dan kontribusi komunitas pengguna." },
    { q: "Seberapa sering data diperbarui?", a: "Harga sembako diperbarui setiap hari, dengan beberapa komoditas utama diperbarui beberapa kali sehari." },
    { q: "Apakah tersedia di seluruh Indonesia?", a: "Saat ini tersedia di kota-kota besar Jawa & Sumatera, dan terus berkembang ke kota lainnya." },
    { q: "Bagaimana Smart Basket bekerja?", a: "Anda memasukkan daftar belanja, lalu PasarCek menghitung total harga di setiap pasar terdekat dan menampilkan yang paling hemat." },
    { q: "Apakah saya bisa menyimpan pasar favorit?", a: "Tentu. Anda bisa menyimpan pasar favorit untuk akses cepat dan menerima notifikasi khusus dari pasar tersebut." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 bg-secondary/40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="FAQ" title="Pertanyaan yang Sering Ditanyakan" />
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={it.q} className="rounded-2xl bg-white border border-border overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-display font-semibold text-foreground">{it.q}</span>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground animate-fade-up">{it.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCTA() {
  return (
    <section id="cta" className="py-20 bg-gradient-navy text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-[120%] rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Mulai Hemat Pengeluaran Belanja Mulai Hari Ini
          </h2>
          <p className="mt-5 text-white/80 text-base md:text-lg max-w-xl">
            Ribuan keluarga sudah menggunakan PasarCek untuk membuat keputusan belanja yang lebih cerdas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href="#" variant="white">Download Gratis</CTAButton>
            <a href="#" className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-all">
              Gabung Waitlist
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <img src={familyImg} alt="Keluarga bahagia menghemat belanja dengan PasarCek" width={1024} height={800} loading="lazy" className="w-full max-w-md animate-float" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  const cols = [
    { title: "Produk", links: ["Fitur", "Harga", "FAQ"] },
    { title: "Perusahaan", links: ["Tentang Kami", "Kontak", "Blog"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
  ];
  return (
    <footer className="bg-white border-t border-border py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Cek harga sembako terbaru & bandingkan pasar terdekat. Belanja lebih hemat untuk keluarga Indonesia.
          </p>
        </div>
        {cols.map(c => (
          <div key={c.title}>
            <div className="font-display font-semibold text-foreground mb-3">{c.title}</div>
            <ul className="space-y-2">
              {c.links.map(l => (
                <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-border text-xs text-muted-foreground text-center">
        © 2026 PasarCek. All Rights Reserved.
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */

function LandingPage() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Problems />
        <Why />
        <Features />
        <HowItWorks />
        <AppPreview />
        <SmartBasket />
        <UseCases />
        <Benefits />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
