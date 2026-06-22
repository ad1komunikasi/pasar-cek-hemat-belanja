import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { Q as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-koMOzLtV.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const Ctx = reactExports.createContext({
  user: null,
  session: null,
  profile: null,
  roles: [],
  isAdmin: false,
  loading: true,
  refresh: async () => {
  }
});
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [session, setSession] = reactExports.useState(null);
  const [profile, setProfile] = reactExports.useState(null);
  const [roles, setRoles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  async function loadExtras(uid) {
    const [{ data: p }, { data: r }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", uid).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", uid)
    ]);
    setProfile(p ?? null);
    setRoles((r ?? []).map((x) => x.role));
  }
  async function refresh() {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    setUser(data.session?.user ?? null);
    if (data.session?.user) await loadExtras(data.session.user.id);
    else {
      setProfile(null);
      setRoles([]);
    }
  }
  reactExports.useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) loadExtras(data.session.user.id).finally(() => setLoading(false));
      else setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, sess) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        setTimeout(() => loadExtras(sess.user.id), 0);
      } else {
        setProfile(null);
        setRoles([]);
      }
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  const isAdmin = roles.includes("admin") || roles.includes("super_admin");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value: { user, session, profile, roles, isAdmin, loading, refresh }, children });
}
const useAuth = () => reactExports.useContext(Ctx);
const appCss = "/assets/styles-tyFXWJN9.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md text-left overflow-auto max-h-40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold mb-1", children: "Error Details:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "whitespace-pre-wrap", children: error instanceof Error ? error.message : String(error) }),
      error?.stack && /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer font-bold", children: "Stack Trace" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-1 text-[10px] opacity-75", children: error.stack })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$x = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "PasarCek" },
      { property: "og:site_name", content: "PasarCek" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "id_ID" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { title: "PasarCek-Hemat Harga" },
      { property: "og:title", content: "PasarCek-Hemat Harga" },
      { name: "twitter:title", content: "PasarCek-Hemat Harga" },
      { name: "description", content: "PasarCek helps users find the cheapest groceries by comparing prices across nearby markets." },
      { property: "og:description", content: "PasarCek helps users find the cheapest groceries by comparing prices across nearby markets." },
      { name: "twitter:description", content: "PasarCek helps users find the cheapest groceries by comparing prices across nearby markets." },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:image", content: "/twitter-image.jpg" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "PasarCek",
              url: "/",
              logo: "/og-image.jpg",
              description: "Aplikasi cek dan bandingkan harga sembako antar pasar terdekat untuk keluarga Indonesia"
            },
            {
              "@type": "WebSite",
              name: "PasarCek",
              url: "/",
              potentialAction: {
                "@type": "SearchAction",
                target: { "@type": "EntryPoint", urlTemplate: "/?q={search_term_string}" },
                "query-input": "required name=search_term_string"
              }
            }
          ]
        })
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "id", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$x.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router2.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router2, queryClient]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$w = () => import("./trust-VpOBj95F.mjs");
const Route$w = createFileRoute("/trust")({
  head: () => ({
    meta: [{
      title: "Trust & Keamanan — PasarCek"
    }, {
      name: "description",
      content: "Bagaimana PasarCek menjaga keamanan data pengguna, akses akun, penyimpanan, dan privasi belanja Anda."
    }, {
      property: "og:title",
      content: "Trust & Keamanan — PasarCek"
    }, {
      property: "og:description",
      content: "Bagaimana PasarCek menjaga keamanan data, akun, dan privasi pengguna."
    }, {
      property: "og:url",
      content: "/trust"
    }],
    links: [{
      rel: "canonical",
      href: "/trust"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("./reset-password-EqpVsDDE.mjs");
const Route$v = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{
      title: "Reset Password — PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("./pricing-B1NNTRjZ.mjs");
const Route$u = createFileRoute("/pricing")({
  head: () => ({
    meta: [{
      title: "Paket Berlangganan — PasarCek"
    }, {
      name: "description",
      content: "Pilih paket Premium PasarCek mulai Rp9.900/bulan untuk fitur unlimited alert, analitik penghematan, dan prediksi harga sembako."
    }, {
      property: "og:title",
      content: "Paket Berlangganan — PasarCek"
    }, {
      property: "og:description",
      content: "Mulai Rp9.900/bulan. Unlimited price alert, prediksi harga, dan analitik penghematan."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./markets-DB6elI7-.mjs");
const Route$t = createFileRoute("/markets")({
  head: () => ({
    meta: [{
      title: "Lokasi Pasar Tradisional Terdekat — PasarCek"
    }, {
      name: "description",
      content: "Temukan pasar tradisional terdekat di Jakarta dan sekitarnya. Cek alamat, jam buka, dan harga sembako di tiap pasar."
    }, {
      property: "og:title",
      content: "Lokasi Pasar Tradisional Terdekat — PasarCek"
    }, {
      property: "og:description",
      content: "Daftar lengkap pasar dengan peta, alamat, dan jam operasional."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./features-ORADZ_wk.mjs");
const Route$s = createFileRoute("/features")({
  head: () => ({
    meta: [{
      title: "Fitur Lengkap — PasarCek"
    }, {
      name: "description",
      content: "Fitur PasarCek: cek harga sembako, bandingkan antar pasar, smart basket simulator, peta pasar terdekat, notifikasi harga, dan analitik penghematan."
    }, {
      property: "og:title",
      content: "Fitur Lengkap — PasarCek"
    }, {
      property: "og:description",
      content: "Smart Basket, Compare, Maps, Price Alert, dan lebih banyak lagi."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./auth-CPs2--hK.mjs");
const Route$r = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Masuk / Daftar — PasarCek"
    }, {
      name: "description",
      content: "Masuk ke akun PasarCek untuk mulai mengecek dan membandingkan harga sembako di pasar terdekat."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./route-BFsOu0JM.mjs");
const Route$q = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("./index-BkrF_H9u.mjs");
const Route$p = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "PasarCek — Cek & Bandingkan Harga Sembako Terdekat | Gratis"
    }, {
      name: "description",
      content: "Cek harga sembako terbaru dan bandingkan antar pasar terdekat. Hemat waktu & uang belanja harian keluarga. Download aplikasi PasarCek gratis!"
    }, {
      name: "keywords",
      content: "cek harga sembako, harga beras hari ini, bandingkan harga pasar, aplikasi belanja hemat, harga cabai, harga telur terdekat, pasar tradisional"
    }, {
      property: "og:title",
      content: "PasarCek — Cek & Bandingkan Harga Sembako Terdekat"
    }, {
      property: "og:description",
      content: "Cek harga sembako terbaru dan bandingkan antar pasar terdekat. Hemat waktu & uang belanja harian keluarga."
    }, {
      property: "og:url",
      content: "/"
    }, {
      property: "og:image",
      content: "/og-image.jpg"
    }, {
      property: "og:image:alt",
      content: "PasarCek — Aplikasi cek harga sembako terbaru"
    }, {
      property: "og:image:width",
      content: "1200"
    }, {
      property: "og:image:height",
      content: "630"
    }, {
      name: "twitter:title",
      content: "PasarCek — Cek & Bandingkan Harga Sembako Terdekat"
    }, {
      name: "twitter:description",
      content: "Cek harga sembako terbaru dan bandingkan antar pasar terdekat. Hemat waktu & uang belanja harian keluarga."
    }, {
      name: "twitter:image",
      content: "/twitter-image.jpg"
    }, {
      name: "twitter:image:alt",
      content: "PasarCek — Aplikasi cek harga sembako terbaru"
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "PasarCek",
        applicationCategory: "ShoppingApplication",
        operatingSystem: "iOS, Android",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "IDR"
        },
        description: "Aplikasi cek harga sembako terbaru dan bandingkan antar pasar terdekat untuk belanja lebih hemat.",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1000"
        },
        featureList: ["Harga sembako real-time", "Bandingkan harga antar pasar", "Notifikasi harga turun", "Daftar belanja pintar", "Pasar terdekat berbasis lokasi"]
      })
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./markets._id-DVGP947V.mjs");
const Route$o = createFileRoute("/markets/$id")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Detail Pasar — PasarCek`
    }, {
      name: "description",
      content: "Detail pasar, jam operasional, dan harga sembako hari ini."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const details = {
  "harga-hari-ini": {
    title: "Harga Sembako Hari Ini",
    desc: "Update harga real-time dari pasar tradisional di sekitar Anda.",
    bullets: ["Update harian", "Filter per kategori", "Status naik/turun/stabil", "Riwayat harga"]
  },
  "bandingkan-harga": {
    title: "Bandingkan Harga Antar Pasar",
    desc: "Pilih produk dan lihat selisih harga antar pasar sekaligus.",
    bullets: ["Highlight pasar termurah", "Hitung potensi penghematan", "Filter per kota"]
  },
  "lokasi-pasar": {
    title: "Lokasi Pasar Terdekat",
    desc: "Cari pasar tradisional terdekat dengan peta interaktif.",
    bullets: ["Google Maps integration", "Filter radius", "Detail pasar lengkap", "Rute langsung"]
  },
  "smart-basket": {
    title: "Smart Basket Simulator",
    desc: "Simulasikan keranjang belanja Anda dan AI menemukan pasar termurah.",
    bullets: ["CRUD produk realtime", "Estimasi biaya per pasar", "Rekomendasi pasar termurah", "Simpan & bagikan"]
  },
  "notifikasi": {
    title: "Notifikasi Harga",
    desc: "Dapatkan pemberitahuan saat harga berubah.",
    bullets: ["Alert harga turun", "Alert harga naik", "Promo pasar"]
  },
  "analitik": {
    title: "Analitik Penghematan",
    desc: "Pantau berapa banyak Anda menghemat setiap bulan.",
    bullets: ["Grafik penghematan bulanan", "Riwayat simulasi", "Prediksi harga"]
  }
};
const $$splitComponentImporter$n = () => import("./features._slug-lWVGN9di.mjs");
const Route$n = createFileRoute("/features/$slug")({
  head: ({
    params
  }) => {
    const d = details[params.slug];
    return {
      meta: [{
        title: `${d?.title ?? "Fitur"} — PasarCek`
      }, {
        name: "description",
        content: d?.desc ?? ""
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./smart-basket-DbzX7gdk.mjs");
const Route$m = createFileRoute("/_authenticated/smart-basket")({
  head: () => ({
    meta: [{
      title: "Smart Basket — PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./settings-f7L2MdCd.mjs");
const Route$l = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [{
      title: "Pengaturan — PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./profile-CkE9hAuq.mjs");
const Route$k = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [{
      title: "Profil — PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./prices-C3ukptSG.mjs");
const Route$j = createFileRoute("/_authenticated/prices")({
  head: () => ({
    meta: [{
      title: "Harga Sembako Hari Ini — PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./orders-BE_GmJtd.mjs");
const Route$i = createFileRoute("/_authenticated/orders")({
  head: () => ({
    meta: [{
      title: "Pesanan Saya — PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./notifications-BYOgIVNH.mjs");
const Route$h = createFileRoute("/_authenticated/notifications")({
  head: () => ({
    meta: [{
      title: "Notifikasi — PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./favorites-C56iys5v.mjs");
const Route$g = createFileRoute("/_authenticated/favorites")({
  head: () => ({
    meta: [{
      title: "Favorit — PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./dashboard-CBctjteL.mjs");
const Route$f = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./compare-DpLy3nwQ.mjs");
const Route$e = createFileRoute("/_authenticated/compare")({
  head: () => ({
    meta: [{
      title: "Bandingkan Harga Antar Pasar — PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./checkout-DIfAtcn8.mjs");
const Route$d = createFileRoute("/_authenticated/checkout")({
  validateSearch: (s) => ({
    package: s.package ?? "premium"
  }),
  head: () => ({
    meta: [{
      title: "Checkout — PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./cart-BacHnLLL.mjs");
const Route$c = createFileRoute("/_authenticated/cart")({
  head: () => ({
    meta: [{
      title: "Keranjang — PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./admin-iXIuWLhr.mjs");
const Route$b = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data
    } = await supabase.auth.getUser();
    if (!data.user) throw redirect({
      to: "/auth"
    });
    const {
      data: roles
    } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
    const isAdmin = (roles ?? []).some((r) => r.role === "admin" || r.role === "super_admin");
    if (!isAdmin) throw redirect({
      to: "/dashboard"
    });
  },
  head: () => ({
    meta: [{
      title: "Admin — PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./admin.index-C3oBerR-.mjs");
const Route$a = createFileRoute("/_authenticated/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./orders._id-dcRz_IDP.mjs");
const Route$9 = createFileRoute("/_authenticated/orders/$id")({
  head: () => ({
    meta: [{
      title: "Detail Pesanan — PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./admin.users-BqTXoXcq.mjs");
const Route$8 = createFileRoute("/_authenticated/admin/users")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin.settings-DA9c358A.mjs");
const Route$7 = createFileRoute("/_authenticated/admin/settings")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.reports-D0w_7Vx5.mjs");
const Route$6 = createFileRoute("/_authenticated/admin/reports")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.products-CP97S5jQ.mjs");
const Route$5 = createFileRoute("/_authenticated/admin/products")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.payments-Dx9tJBhQ.mjs");
const Route$4 = createFileRoute("/_authenticated/admin/payments")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.packages--Mt8PvaL.mjs");
const Route$3 = createFileRoute("/_authenticated/admin/packages")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.orders-CAoJsOzU.mjs");
const Route$2 = createFileRoute("/_authenticated/admin/orders")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.markets-D5oKDiAx.mjs");
const Route$1 = createFileRoute("/_authenticated/admin/markets")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.auth-monitor-B3xeX4hT.mjs");
const Route = createFileRoute("/_authenticated/admin/auth-monitor")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TrustRoute = Route$w.update({
  id: "/trust",
  path: "/trust",
  getParentRoute: () => Route$x
});
const ResetPasswordRoute = Route$v.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$x
});
const PricingRoute = Route$u.update({
  id: "/pricing",
  path: "/pricing",
  getParentRoute: () => Route$x
});
const MarketsRoute = Route$t.update({
  id: "/markets",
  path: "/markets",
  getParentRoute: () => Route$x
});
const FeaturesRoute = Route$s.update({
  id: "/features",
  path: "/features",
  getParentRoute: () => Route$x
});
const AuthRoute = Route$r.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$x
});
const AuthenticatedRouteRoute = Route$q.update({
  id: "/_authenticated",
  getParentRoute: () => Route$x
});
const IndexRoute = Route$p.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$x
});
const MarketsIdRoute = Route$o.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => MarketsRoute
});
const FeaturesSlugRoute = Route$n.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => FeaturesRoute
});
const AuthenticatedSmartBasketRoute = Route$m.update({
  id: "/smart-basket",
  path: "/smart-basket",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedSettingsRoute = Route$l.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedProfileRoute = Route$k.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedPricesRoute = Route$j.update({
  id: "/prices",
  path: "/prices",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedOrdersRoute = Route$i.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedNotificationsRoute = Route$h.update({
  id: "/notifications",
  path: "/notifications",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedFavoritesRoute = Route$g.update({
  id: "/favorites",
  path: "/favorites",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedDashboardRoute = Route$f.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedCompareRoute = Route$e.update({
  id: "/compare",
  path: "/compare",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedCheckoutRoute = Route$d.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedCartRoute = Route$c.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminRoute = Route$b.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminIndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedOrdersIdRoute = Route$9.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => AuthenticatedOrdersRoute
});
const AuthenticatedAdminUsersRoute = Route$8.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminSettingsRoute = Route$7.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminReportsRoute = Route$6.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminProductsRoute = Route$5.update({
  id: "/products",
  path: "/products",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminPaymentsRoute = Route$4.update({
  id: "/payments",
  path: "/payments",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminPackagesRoute = Route$3.update({
  id: "/packages",
  path: "/packages",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminOrdersRoute = Route$2.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminMarketsRoute = Route$1.update({
  id: "/markets",
  path: "/markets",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminAuthMonitorRoute = Route.update({
  id: "/auth-monitor",
  path: "/auth-monitor",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminRouteChildren = {
  AuthenticatedAdminAuthMonitorRoute,
  AuthenticatedAdminMarketsRoute,
  AuthenticatedAdminOrdersRoute,
  AuthenticatedAdminPackagesRoute,
  AuthenticatedAdminPaymentsRoute,
  AuthenticatedAdminProductsRoute,
  AuthenticatedAdminReportsRoute,
  AuthenticatedAdminSettingsRoute,
  AuthenticatedAdminUsersRoute,
  AuthenticatedAdminIndexRoute
};
const AuthenticatedAdminRouteWithChildren = AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren);
const AuthenticatedOrdersRouteChildren = {
  AuthenticatedOrdersIdRoute
};
const AuthenticatedOrdersRouteWithChildren = AuthenticatedOrdersRoute._addFileChildren(AuthenticatedOrdersRouteChildren);
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAdminRoute: AuthenticatedAdminRouteWithChildren,
  AuthenticatedCartRoute,
  AuthenticatedCheckoutRoute,
  AuthenticatedCompareRoute,
  AuthenticatedDashboardRoute,
  AuthenticatedFavoritesRoute,
  AuthenticatedNotificationsRoute,
  AuthenticatedOrdersRoute: AuthenticatedOrdersRouteWithChildren,
  AuthenticatedPricesRoute,
  AuthenticatedProfileRoute,
  AuthenticatedSettingsRoute,
  AuthenticatedSmartBasketRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const FeaturesRouteChildren = {
  FeaturesSlugRoute
};
const FeaturesRouteWithChildren = FeaturesRoute._addFileChildren(
  FeaturesRouteChildren
);
const MarketsRouteChildren = {
  MarketsIdRoute
};
const MarketsRouteWithChildren = MarketsRoute._addFileChildren(MarketsRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute,
  FeaturesRoute: FeaturesRouteWithChildren,
  MarketsRoute: MarketsRouteWithChildren,
  PricingRoute,
  ResetPasswordRoute,
  TrustRoute
};
const routeTree = Route$x._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$o as R,
  Route$n as a,
  Route$d as b,
  Route$9 as c,
  details as d,
  router as r,
  useAuth as u
};
