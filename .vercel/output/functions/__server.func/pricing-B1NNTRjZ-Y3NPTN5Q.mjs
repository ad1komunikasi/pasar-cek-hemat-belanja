import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  idr
} from "./chunk-GQMM4EHK.mjs";
import {
  require_lucide_react
} from "./chunk-NDUCSHRX.mjs";
import {
  useQuery
} from "./chunk-DH7FIRD7.mjs";
import {
  Button
} from "./chunk-AVRRWDIK.mjs";
import "./chunk-NXBQQK3G.mjs";
import "./chunk-IHLGWONG.mjs";
import {
  supabase
} from "./chunk-PQEYI6K5.mjs";
import "./chunk-Y5N26HX3.mjs";
import {
  Link,
  useNavigate
} from "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/pricing-B1NNTRjZ.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
var import_react = __toESM(require_react(), 1);
function PricingPage() {
  const navigate = useNavigate();
  const {
    data: packages
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => (await supabase.from("packages").select("*").eq("is_active", true).order("sort_order")).data ?? []
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "border-b border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/", className: "flex items-center gap-2 font-bold", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/auth", children: "Masuk" }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { className: "mx-auto max-w-6xl px-4 py-16", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-4xl font-black sm:text-5xl", children: "Belanja Lebih Cerdas Bersama PasarCek" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-4 text-[var(--color-gray-500)]", children: "Mulai gratis, upgrade kapan saja untuk fitur premium yang membantu Anda hemat lebih banyak." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: (packages ?? []).map((p) => {
        const featured = p.slug === "premium";
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `relative rounded-xl border bg-white p-6 ${featured ? "border-[var(--color-brand-blue)] shadow-elevated" : "border-[var(--color-gray-100)]"}`, children: [
          featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-3 right-4 rounded-full bg-[var(--color-brand-blue)] px-3 py-1 text-xs font-bold uppercase text-white", children: "Populer" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2", children: [
            featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Crown, { className: "h-5 w-5 text-[var(--color-brand-blue)]" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-xl font-bold", children: p.name })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-3 text-4xl font-black", children: p.price === 0 ? "Gratis" : idr(p.price) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs text-[var(--color-gray-500)]", children: p.price === 0 ? "Selamanya" : p.duration_days === 365 ? "/tahun" : "/bulan" }),
          p.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-3 text-sm text-[var(--color-gray-700)]", children: p.description }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "mt-5 space-y-2", children: (p.benefits ?? []).map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "flex items-start gap-2 text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b })
          ] }, i)) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { className: "mt-6 w-full", variant: featured ? "default" : "outline", onClick: () => navigate({
            to: "/checkout",
            search: {
              package: p.slug
            }
          }), disabled: p.price === 0, children: p.price === 0 ? "Paket aktif" : "Pilih Paket" })
        ] }, p.id);
      }) })
    ] })
  ] });
}
export {
  PricingPage as component
};
