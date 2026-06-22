import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as Route$n, d as details } from "./router-Bx_E7duL.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import "../_libs/sonner.mjs";
import { A as ArrowLeft } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./client-B2Ztv5jM.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
function FeatureDetail() {
  const {
    slug
  } = Route$n.useParams();
  const d = details[slug];
  if (!d) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-10 text-center", children: "Fitur tidak ditemukan." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/features", className: "flex items-center gap-2 text-sm font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Semua Fitur"
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-3xl px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-black sm:text-5xl", children: d.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-[var(--color-gray-700)]", children: d.desc }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-2", children: d.bullets.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-lg bg-white p-4 font-medium", children: [
        "✓ ",
        b
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-8", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: "Mulai Gratis" }) })
    ] })
  ] });
}
export {
  FeatureDetail as component
};
