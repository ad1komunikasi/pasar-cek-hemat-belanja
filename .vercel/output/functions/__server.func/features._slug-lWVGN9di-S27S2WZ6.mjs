import {
  require_lucide_react
} from "./chunk-KJB73ZNG.mjs";
import {
  Route$n,
  details
} from "./chunk-UC4BMYGH.mjs";
import "./chunk-KIHGSOXA.mjs";
import "./chunk-76F7W2CF.mjs";
import {
  Button
} from "./chunk-4AYWSIRD.mjs";
import "./chunk-QH35MXVZ.mjs";
import "./chunk-HSWPCUUH.mjs";
import "./chunk-7GEO44MB.mjs";
import "./chunk-G46AXIAP.mjs";
import {
  Link
} from "./chunk-TV3ZUI3R.mjs";
import "./chunk-RE5W7UZM.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-MLKSHREV.mjs";
import {
  __toESM
} from "./chunk-KVSJYO5R.mjs";

// dist/server/assets/features._slug-lWVGN9di.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
var import_react = __toESM(require_react(), 1);
function FeatureDetail() {
  const {
    slug
  } = Route$n.useParams();
  const d = details[slug];
  if (!d) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-10 text-center", children: "Fitur tidak ditemukan." });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "border-b border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto max-w-4xl px-4 py-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/features", className: "flex items-center gap-2 text-sm font-semibold", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowLeft, { className: "h-4 w-4" }),
      "Semua Fitur"
    ] }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { className: "mx-auto max-w-3xl px-4 py-16", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-4xl font-black sm:text-5xl", children: d.title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-4 text-lg text-[var(--color-gray-700)]", children: d.desc }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "mt-8 space-y-2", children: d.bullets.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "rounded-lg bg-white p-4 font-medium", children: [
        "\u2713 ",
        b
      ] }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { asChild: true, className: "mt-8", size: "lg", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/auth", children: "Mulai Gratis" }) })
    ] })
  ] });
}
export {
  FeatureDetail as component
};
