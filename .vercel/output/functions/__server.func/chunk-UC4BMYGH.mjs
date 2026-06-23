import {
  Toaster
} from "./chunk-KIHGSOXA.mjs";
import {
  QueryClient,
  QueryClientProvider
} from "./chunk-76F7W2CF.mjs";
import {
  supabase
} from "./chunk-7GEO44MB.mjs";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createFileRoute,
  createRootRouteWithContext,
  createRouter,
  lazyRouteComponent,
  redirect,
  useRouter
} from "./chunk-TV3ZUI3R.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-MLKSHREV.mjs";
import {
  __toESM
} from "./chunk-KVSJYO5R.mjs";

// dist/server/assets/router-KEMZH_Q0.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var Ctx = (0, import_react.createContext)({
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
  const [user, setUser] = (0, import_react.useState)(null);
  const [session, setSession] = (0, import_react.useState)(null);
  const [profile, setProfile] = (0, import_react.useState)(null);
  const [roles, setRoles] = (0, import_react.useState)([]);
  const [loading, setLoading] = (0, import_react.useState)(true);
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
  (0, import_react.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, { value: { user, session, profile, roles, isAdmin, loading, refresh }, children });
}
var useAuth = () => (0, import_react.useContext)(Ctx);
var appCss = "/assets/styles-tyFXWJN9.css";
function NotFoundComponent() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "my-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md text-left overflow-auto max-h-40", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-bold mb-1", children: "Error Details:" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: "whitespace-pre-wrap", children: error instanceof Error ? error.message : String(error) }),
      error?.stack && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { className: "mt-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { className: "cursor-pointer font-bold", children: "Stack Trace" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: "mt-1 text-[10px] opacity-75", children: error.stack })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var Route$x = createRootRouteWithContext()({
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", { lang: "id", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$x.useRouteContext();
  const router2 = useRouter();
  (0, import_react.useEffect)(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router2.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router2, queryClient]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
var $$splitComponentImporter$w = () => import("./trust-VpOBj95F-Y7EXM6KW.mjs");
var Route$w = createFileRoute("/trust")({
  head: () => ({
    meta: [{
      title: "Trust & Keamanan \u2014 PasarCek"
    }, {
      name: "description",
      content: "Bagaimana PasarCek menjaga keamanan data pengguna, akses akun, penyimpanan, dan privasi belanja Anda."
    }, {
      property: "og:title",
      content: "Trust & Keamanan \u2014 PasarCek"
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
var $$splitComponentImporter$v = () => import("./reset-password-EqpVsDDE-5LZVTORJ.mjs");
var Route$v = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{
      title: "Reset Password \u2014 PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
var $$splitComponentImporter$u = () => import("./pricing-B1NNTRjZ-ZJJLF5MR.mjs");
var Route$u = createFileRoute("/pricing")({
  head: () => ({
    meta: [{
      title: "Paket Berlangganan \u2014 PasarCek"
    }, {
      name: "description",
      content: "Pilih paket Premium PasarCek mulai Rp9.900/bulan untuk fitur unlimited alert, analitik penghematan, dan prediksi harga sembako."
    }, {
      property: "og:title",
      content: "Paket Berlangganan \u2014 PasarCek"
    }, {
      property: "og:description",
      content: "Mulai Rp9.900/bulan. Unlimited price alert, prediksi harga, dan analitik penghematan."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
var $$splitComponentImporter$t = () => import("./markets-DB6elI7--EX7TGVNV.mjs");
var Route$t = createFileRoute("/markets")({
  head: () => ({
    meta: [{
      title: "Lokasi Pasar Tradisional Terdekat \u2014 PasarCek"
    }, {
      name: "description",
      content: "Temukan pasar tradisional terdekat di Jakarta dan sekitarnya. Cek alamat, jam buka, dan harga sembako di tiap pasar."
    }, {
      property: "og:title",
      content: "Lokasi Pasar Tradisional Terdekat \u2014 PasarCek"
    }, {
      property: "og:description",
      content: "Daftar lengkap pasar dengan peta, alamat, dan jam operasional."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
var $$splitComponentImporter$s = () => import("./features-ORADZ_wk-57Y65EGL.mjs");
var Route$s = createFileRoute("/features")({
  head: () => ({
    meta: [{
      title: "Fitur Lengkap \u2014 PasarCek"
    }, {
      name: "description",
      content: "Fitur PasarCek: cek harga sembako, bandingkan antar pasar, smart basket simulator, peta pasar terdekat, notifikasi harga, dan analitik penghematan."
    }, {
      property: "og:title",
      content: "Fitur Lengkap \u2014 PasarCek"
    }, {
      property: "og:description",
      content: "Smart Basket, Compare, Maps, Price Alert, dan lebih banyak lagi."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
var $$splitComponentImporter$r = () => import("./auth-CPs2--hK-XMXWK6Y6.mjs");
var Route$r = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Masuk / Daftar \u2014 PasarCek"
    }, {
      name: "description",
      content: "Masuk ke akun PasarCek untuk mulai mengecek dan membandingkan harga sembako di pasar terdekat."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
var $$splitComponentImporter$q = () => import("./route-BFsOu0JM-2SBIJMD7.mjs");
var Route$q = createFileRoute("/_authenticated")({
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
var $$splitComponentImporter$p = () => import("./index-BkrF_H9u-VKAP5LRX.mjs");
var Route$p = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "PasarCek \u2014 Cek & Bandingkan Harga Sembako Terdekat | Gratis"
    }, {
      name: "description",
      content: "Cek harga sembako terbaru dan bandingkan antar pasar terdekat. Hemat waktu & uang belanja harian keluarga. Download aplikasi PasarCek gratis!"
    }, {
      name: "keywords",
      content: "cek harga sembako, harga beras hari ini, bandingkan harga pasar, aplikasi belanja hemat, harga cabai, harga telur terdekat, pasar tradisional"
    }, {
      property: "og:title",
      content: "PasarCek \u2014 Cek & Bandingkan Harga Sembako Terdekat"
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
      content: "PasarCek \u2014 Aplikasi cek harga sembako terbaru"
    }, {
      property: "og:image:width",
      content: "1200"
    }, {
      property: "og:image:height",
      content: "630"
    }, {
      name: "twitter:title",
      content: "PasarCek \u2014 Cek & Bandingkan Harga Sembako Terdekat"
    }, {
      name: "twitter:description",
      content: "Cek harga sembako terbaru dan bandingkan antar pasar terdekat. Hemat waktu & uang belanja harian keluarga."
    }, {
      name: "twitter:image",
      content: "/twitter-image.jpg"
    }, {
      name: "twitter:image:alt",
      content: "PasarCek \u2014 Aplikasi cek harga sembako terbaru"
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
var $$splitComponentImporter$o = () => import("./markets._id-DVGP947V-S7FNWNCB.mjs");
var Route$o = createFileRoute("/markets/$id")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Detail Pasar \u2014 PasarCek`
    }, {
      name: "description",
      content: "Detail pasar, jam operasional, dan harga sembako hari ini."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
var details = {
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
var $$splitComponentImporter$n = () => import("./features._slug-lWVGN9di-S27S2WZ6.mjs");
var Route$n = createFileRoute("/features/$slug")({
  head: ({
    params
  }) => {
    const d = details[params.slug];
    return {
      meta: [{
        title: `${d?.title ?? "Fitur"} \u2014 PasarCek`
      }, {
        name: "description",
        content: d?.desc ?? ""
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
var $$splitComponentImporter$m = () => import("./smart-basket-DbzX7gdk-VTJS7LSE.mjs");
var Route$m = createFileRoute("/_authenticated/smart-basket")({
  head: () => ({
    meta: [{
      title: "Smart Basket \u2014 PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
var $$splitComponentImporter$l = () => import("./settings-f7L2MdCd-334B65QV.mjs");
var Route$l = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [{
      title: "Pengaturan \u2014 PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
var $$splitComponentImporter$k = () => import("./profile-CkE9hAuq-OJQYYY6M.mjs");
var Route$k = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [{
      title: "Profil \u2014 PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
var $$splitComponentImporter$j = () => import("./prices-C3ukptSG-KTWPZBC4.mjs");
var Route$j = createFileRoute("/_authenticated/prices")({
  head: () => ({
    meta: [{
      title: "Harga Sembako Hari Ini \u2014 PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
var $$splitComponentImporter$i = () => import("./orders-BE_GmJtd-AX6GNMAO.mjs");
var Route$i = createFileRoute("/_authenticated/orders")({
  head: () => ({
    meta: [{
      title: "Pesanan Saya \u2014 PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
var $$splitComponentImporter$h = () => import("./notifications-BYOgIVNH-RA7FIVFC.mjs");
var Route$h = createFileRoute("/_authenticated/notifications")({
  head: () => ({
    meta: [{
      title: "Notifikasi \u2014 PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
var $$splitComponentImporter$g = () => import("./favorites-C56iys5v-VPRKCC6N.mjs");
var Route$g = createFileRoute("/_authenticated/favorites")({
  head: () => ({
    meta: [{
      title: "Favorit \u2014 PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
var $$splitComponentImporter$f = () => import("./dashboard-CBctjteL-42WQIYNM.mjs");
var Route$f = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard \u2014 PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
var $$splitComponentImporter$e = () => import("./compare-DpLy3nwQ-BBSMR6VX.mjs");
var Route$e = createFileRoute("/_authenticated/compare")({
  head: () => ({
    meta: [{
      title: "Bandingkan Harga Antar Pasar \u2014 PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
var $$splitComponentImporter$d = () => import("./checkout-DIfAtcn8-I5NFAI7E.mjs");
var Route$d = createFileRoute("/_authenticated/checkout")({
  validateSearch: (s) => ({
    package: s.package ?? "premium"
  }),
  head: () => ({
    meta: [{
      title: "Checkout \u2014 PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
var $$splitComponentImporter$c = () => import("./cart-BacHnLLL-GDTX6TGJ.mjs");
var Route$c = createFileRoute("/_authenticated/cart")({
  head: () => ({
    meta: [{
      title: "Keranjang \u2014 PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
var $$splitComponentImporter$b = () => import("./admin-iXIuWLhr-ZGN35UBR.mjs");
var Route$b = createFileRoute("/_authenticated/admin")({
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
      title: "Admin \u2014 PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
var $$splitComponentImporter$a = () => import("./admin.index-C3oBerR--JKWZKVJE.mjs");
var Route$a = createFileRoute("/_authenticated/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
var $$splitComponentImporter$9 = () => import("./orders._id-dcRz_IDP-DZYCDHEM.mjs");
var Route$9 = createFileRoute("/_authenticated/orders/$id")({
  head: () => ({
    meta: [{
      title: "Detail Pesanan \u2014 PasarCek"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./admin.users-BqTXoXcq-P7SSVVXO.mjs");
var Route$8 = createFileRoute("/_authenticated/admin/users")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./admin.settings-DA9c358A-BAEXCQFF.mjs");
var Route$7 = createFileRoute("/_authenticated/admin/settings")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin.reports-D0w_7Vx5-MEV234AR.mjs");
var Route$6 = createFileRoute("/_authenticated/admin/reports")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.products-CP97S5jQ-BQRHIJNH.mjs");
var Route$5 = createFileRoute("/_authenticated/admin/products")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin.payments-Dx9tJBhQ-SD5SS4MH.mjs");
var Route$4 = createFileRoute("/_authenticated/admin/payments")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin.packages--Mt8PvaL-KOD2XDVU.mjs");
var Route$3 = createFileRoute("/_authenticated/admin/packages")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.orders-CAoJsOzU-25OB2RNO.mjs");
var Route$2 = createFileRoute("/_authenticated/admin/orders")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin.markets-D5oKDiAx-LBIQIDGA.mjs");
var Route$1 = createFileRoute("/_authenticated/admin/markets")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.auth-monitor-B3xeX4hT-5UKNSV55.mjs");
var Route = createFileRoute("/_authenticated/admin/auth-monitor")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
var TrustRoute = Route$w.update({
  id: "/trust",
  path: "/trust",
  getParentRoute: () => Route$x
});
var ResetPasswordRoute = Route$v.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$x
});
var PricingRoute = Route$u.update({
  id: "/pricing",
  path: "/pricing",
  getParentRoute: () => Route$x
});
var MarketsRoute = Route$t.update({
  id: "/markets",
  path: "/markets",
  getParentRoute: () => Route$x
});
var FeaturesRoute = Route$s.update({
  id: "/features",
  path: "/features",
  getParentRoute: () => Route$x
});
var AuthRoute = Route$r.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$x
});
var AuthenticatedRouteRoute = Route$q.update({
  id: "/_authenticated",
  getParentRoute: () => Route$x
});
var IndexRoute = Route$p.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$x
});
var MarketsIdRoute = Route$o.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => MarketsRoute
});
var FeaturesSlugRoute = Route$n.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => FeaturesRoute
});
var AuthenticatedSmartBasketRoute = Route$m.update({
  id: "/smart-basket",
  path: "/smart-basket",
  getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$l.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfileRoute = Route$k.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPricesRoute = Route$j.update({
  id: "/prices",
  path: "/prices",
  getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOrdersRoute = Route$i.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedNotificationsRoute = Route$h.update({
  id: "/notifications",
  path: "/notifications",
  getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFavoritesRoute = Route$g.update({
  id: "/favorites",
  path: "/favorites",
  getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$f.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCompareRoute = Route$e.update({
  id: "/compare",
  path: "/compare",
  getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCheckoutRoute = Route$d.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCartRoute = Route$c.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminRoute = Route$b.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminIndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedOrdersIdRoute = Route$9.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => AuthenticatedOrdersRoute
});
var AuthenticatedAdminUsersRoute = Route$8.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminSettingsRoute = Route$7.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminReportsRoute = Route$6.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminProductsRoute = Route$5.update({
  id: "/products",
  path: "/products",
  getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminPaymentsRoute = Route$4.update({
  id: "/payments",
  path: "/payments",
  getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminPackagesRoute = Route$3.update({
  id: "/packages",
  path: "/packages",
  getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminOrdersRoute = Route$2.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminMarketsRoute = Route$1.update({
  id: "/markets",
  path: "/markets",
  getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminAuthMonitorRoute = Route.update({
  id: "/auth-monitor",
  path: "/auth-monitor",
  getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminRouteChildren = {
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
var AuthenticatedAdminRouteWithChildren = AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren);
var AuthenticatedOrdersRouteChildren = {
  AuthenticatedOrdersIdRoute
};
var AuthenticatedOrdersRouteWithChildren = AuthenticatedOrdersRoute._addFileChildren(AuthenticatedOrdersRouteChildren);
var AuthenticatedRouteRouteChildren = {
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
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var FeaturesRouteChildren = {
  FeaturesSlugRoute
};
var FeaturesRouteWithChildren = FeaturesRoute._addFileChildren(
  FeaturesRouteChildren
);
var MarketsRouteChildren = {
  MarketsIdRoute
};
var MarketsRouteWithChildren = MarketsRoute._addFileChildren(MarketsRouteChildren);
var rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute,
  FeaturesRoute: FeaturesRouteWithChildren,
  MarketsRoute: MarketsRouteWithChildren,
  PricingRoute,
  ResetPasswordRoute,
  TrustRoute
};
var routeTree = Route$x._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
var router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));

export {
  useAuth,
  Route$o,
  details,
  Route$n,
  Route$d,
  Route$9,
  router
};
