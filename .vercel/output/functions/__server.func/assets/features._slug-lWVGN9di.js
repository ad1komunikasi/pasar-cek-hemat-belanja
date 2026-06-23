import { jsx, jsxs } from "react/jsx-runtime";
import { a as Route, d as details } from "./router-KEMZH_Q0.js";
import { Link } from "@tanstack/react-router";
import { B as Button } from "./button-BC9oXVxV.js";
import { ArrowLeft } from "lucide-react";
import "@tanstack/react-query";
import "react";
import "sonner";
import "./client-koMOzLtV.js";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
function FeatureDetail() {
  const {
    slug
  } = Route.useParams();
  const d = details[slug];
  if (!d) return /* @__PURE__ */ jsx("div", { className: "p-10 text-center", children: "Fitur tidak ditemukan." });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl px-4 py-4", children: /* @__PURE__ */ jsxs(Link, { to: "/features", className: "flex items-center gap-2 text-sm font-semibold", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Semua Fitur"
    ] }) }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-3xl px-4 py-16", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black sm:text-5xl", children: d.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-[var(--color-gray-700)]", children: d.desc }),
      /* @__PURE__ */ jsx("ul", { className: "mt-8 space-y-2", children: d.bullets.map((b, i) => /* @__PURE__ */ jsxs("li", { className: "rounded-lg bg-white p-4 font-medium", children: [
        "✓ ",
        b
      ] }, i)) }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-8", size: "lg", children: /* @__PURE__ */ jsx(Link, { to: "/auth", children: "Mulai Gratis" }) })
    ] })
  ] });
}
export {
  FeatureDetail as component
};
