import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";
export type Language = "id" | "en";

export const translations = {
  id: {
    // Navigation & Shell
    "nav.home": "Beranda",
    "nav.features": "Fitur",
    "nav.howItWorks": "Cara Kerja",
    "nav.pricing": "Harga",
    "nav.faq": "FAQ",
    "nav.dashboard": "Dashboard",
    "nav.todayPrices": "Harga Hari Ini",
    "nav.compare": "Bandingkan",
    "nav.markets": "Pasar",
    "nav.smartBasket": "Smart Basket",
    "nav.shoppingList": "Daftar Belanja",
    "nav.favorites": "Favorit",
    "nav.orders": "Riwayat Pesanan",
    "nav.notifications": "Notifikasi",
    "nav.upgradePremium": "Upgrade Premium",
    "nav.admin": "Admin",
    "nav.settings": "Pengaturan",
    "nav.logout": "Keluar",
    "nav.profile": "Profil",
    "nav.backToApp": "Buka Aplikasi",
    "nav.login": "Masuk",

    // Common
    "common.loading": "Memuat...",
    "common.save": "Simpan",
    "common.theme": "Tema",
    "common.language": "Bahasa",
    "common.lightMode": "Mode Terang",
    "common.darkMode": "Mode Gelap",
    "common.system": "Sistem",

    // Landing Page
    "landing.hero.title": "Belanja Sembako Hemat dengan Cek Harga Terdekat",
    "landing.hero.subtitle":
      "PasarCek membantu keluarga Indonesia membandingkan harga kebutuhan pokok real-time di pasar tradisional dan modern terdekat. Hemat hingga 30% uang belanja Anda!",
    "landing.hero.cta": "Mulai Cek Harga — Gratis",
    "landing.hero.watch": "Lihat Cara Kerja",
    "landing.hero.users": "Telah dipercayai oleh 10,000+ ibu rumah tangga & pelaku UMKM",
    "landing.problem.title": "Kenapa Belanja Harian Terasa Semakin Mahal?",
    "landing.problem.subtitle":
      "Inflasi harga pangan dan ketidakpastian informasi sering kali membuat kita membayar lebih mahal dari yang seharusnya.",
    "landing.problem.item1.title": "Perbedaan Harga Tinggi",
    "landing.problem.item1.desc":
      "Harga komoditas yang sama bisa berbeda hingga Rp 5.000 antar pasar yang berjarak hanya 2 km.",
    "landing.problem.item2.title": "Butuh Waktu & Tenaga",
    "landing.problem.item2.desc":
      "Harus berkeliling pasar secara fisik untuk membandingkan harga sangat tidak efisien.",
    "landing.problem.item3.title": "Tidak Ada Notifikasi",
    "landing.problem.item3.desc":
      "Sering melewatkan momen saat harga komoditas penting seperti cabai atau minyak sedang turun.",

    // Dashboard
    "dash.welcome": "Selamat datang kembali,",
    "dash.subtitle": "Pantau dan bandingkan harga kebutuhan harian Anda agar tetap hemat belanja.",
    "dash.stats.totalProducts": "Total Produk Dipantau",
    "dash.stats.cheapestMarket": "Pasar Termurah Hari Ini",
    "dash.stats.savedBudget": "Estimasi Hemat Bulan Ini",
    "dash.stats.activeAlerts": "Alert Harga Aktif",
    "dash.alerts.title": "Pantau Harga Turun",
    "dash.alerts.desc":
      "Dapatkan notifikasi instan saat produk incaran Anda mencapai harga target.",
    "dash.forecast.title": "Prediksi Harga AI",
    "dash.forecast.desc":
      "Gunakan teknologi cerdas AI kami untuk melihat tren harga sembako 7 hari ke depan.",

    // Settings
    "settings.title": "Pengaturan Preferensi",
    "settings.subtitle": "Kelola kenyamanan tampilan, bahasa, dan keamanan akun Anda.",
    "settings.themeSection": "Tema Tampilan",
    "settings.themeDesc": "Pilih mode tampilan untuk kenyamanan mata Anda.",
    "settings.langSection": "Pilihan Bahasa",
    "settings.langDesc": "Pilih bahasa antarmuka aplikasi PasarCek.",
    "settings.security": "Ubah Password",
    "settings.securityDesc": "Password baru minimal 6 karakter.",
    "settings.deleteAcc": "Hapus Akun",
    "settings.deleteAccDesc": "Hubungi admin untuk menghapus akun Anda secara permanen.",
  },
  en: {
    // Navigation & Shell
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.howItWorks": "How It Works",
    "nav.pricing": "Pricing",
    "nav.faq": "FAQ",
    "nav.dashboard": "Dashboard",
    "nav.todayPrices": "Today's Prices",
    "nav.compare": "Compare",
    "nav.markets": "Markets",
    "nav.smartBasket": "Smart Basket",
    "nav.shoppingList": "Shopping List",
    "nav.favorites": "Favorites",
    "nav.orders": "Order History",
    "nav.notifications": "Notifications",
    "nav.upgradePremium": "Upgrade Premium",
    "nav.admin": "Admin",
    "nav.settings": "Settings",
    "nav.logout": "Logout",
    "nav.profile": "Profile",
    "nav.backToApp": "Open App",
    "nav.login": "Log In",

    // Common
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.theme": "Theme",
    "common.language": "Language",
    "common.lightMode": "Light Mode",
    "common.darkMode": "Dark Mode",
    "common.system": "System",

    // Landing Page
    "landing.hero.title": "Shop Smarter by Comparing Nearby Grocery Prices",
    "landing.hero.subtitle":
      "PasarCek helps families compare real-time prices of basic commodities across nearby traditional and modern markets. Save up to 30% on your daily shopping budget!",
    "landing.hero.cta": "Compare Prices Now — Free",
    "landing.hero.watch": "How it works",
    "landing.hero.users": "Trusted by 10,000+ homemakers & small businesses",
    "landing.problem.title": "Why is Daily Shopping Getting More Expensive?",
    "landing.problem.subtitle":
      "Food inflation and lack of clear price information often lead us to pay more than we should.",
    "landing.problem.item1.title": "High Price Discrepancies",
    "landing.problem.item1.desc":
      "The price of the same commodity can differ by up to Rp 5,000 between markets only 2 km apart.",
    "landing.problem.item2.title": "Time & Energy Consuming",
    "landing.problem.item2.desc":
      "Going around physical markets just to compare prices is highly inefficient.",
    "landing.problem.item3.title": "No Price Alerts",
    "landing.problem.item3.desc":
      "Missing out on pricing drops for key goods like cooking oil or chili peppers when they happen.",

    // Dashboard
    "dash.welcome": "Welcome back,",
    "dash.subtitle":
      "Monitor and compare prices of your daily needs to keep your shopping budget optimized.",
    "dash.stats.totalProducts": "Monitored Products",
    "dash.stats.cheapestMarket": "Cheapest Market Today",
    "dash.stats.savedBudget": "Est. Savings This Month",
    "dash.stats.activeAlerts": "Active Price Alerts",
    "dash.alerts.title": "Track Price Drops",
    "dash.alerts.desc":
      "Get instant notifications when your targeted items drop to your target price.",
    "dash.forecast.title": "AI Price Forecasting",
    "dash.forecast.desc":
      "Use our intelligent AI models to forecast commodity prices for the next 7 days.",

    // Settings
    "settings.title": "Preferences & Settings",
    "settings.subtitle": "Manage theme convenience, language options, and account security.",
    "settings.themeSection": "Display Theme",
    "settings.themeDesc": "Select display mode for your visual preference.",
    "settings.langSection": "Language Choice",
    "settings.langDesc": "Select the interface language for PasarCek.",
    "settings.security": "Change Password",
    "settings.securityDesc": "New password must be at least 6 characters.",
    "settings.deleteAcc": "Delete Account",
    "settings.deleteAccDesc": "Contact support or admin to delete your account permanently.",
  },
};

type TranslationKey = keyof typeof translations.id;

type SettingsContextType = {
  theme: Theme;
  lang: Language;
  setTheme: (theme: Theme) => void;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [lang, setLangState] = useState<Language>("id");

  useEffect(() => {
    // 1. Theme Hydration from localStorage
    const savedTheme = localStorage.getItem("pasarcek_theme") as Theme;
    if (savedTheme === "dark" || savedTheme === "light") {
      setThemeState(savedTheme);
      updateDocumentTheme(savedTheme);
    } else {
      // Default to system settings
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = systemPrefersDark ? "dark" : "light";
      setThemeState(initialTheme);
      updateDocumentTheme(initialTheme);
    }

    // 2. Language Hydration from localStorage
    const savedLang = localStorage.getItem("pasarcek_lang") as Language;
    if (savedLang === "en" || savedLang === "id") {
      setLangState(savedLang);
    }
  }, []);

  const updateDocumentTheme = (newTheme: Theme) => {
    if (typeof document !== "undefined") {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("pasarcek_theme", newTheme);
    updateDocumentTheme(newTheme);
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("pasarcek_lang", newLang);
  };

  const t = (key: TranslationKey): string => {
    return translations[lang]?.[key] || translations["id"]?.[key] || String(key);
  };

  return (
    <SettingsContext.Provider value={{ theme, lang, setTheme, setLang, t }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
