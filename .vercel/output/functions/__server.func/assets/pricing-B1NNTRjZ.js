import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { i as idr } from "./format-C1KpzYiq.js";
import { Crown, Check } from "lucide-react";
import "@supabase/supabase-js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
function PricingPage() {
  const navigate = useNavigate();
  const {
    data: packages
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => (await supabase.from("packages").select("*").eq("is_active", true).order("sort_order")).data ?? []
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 font-bold", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/auth", children: "Masuk" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-6xl px-4 py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black sm:text-5xl", children: "Belanja Lebih Cerdas Bersama PasarCek" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-[var(--color-gray-500)]", children: "Mulai gratis, upgrade kapan saja untuk fitur premium yang membantu Anda hemat lebih banyak." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: (packages ?? []).map((p) => {
        const featured = p.slug === "premium";
        return /* @__PURE__ */ jsxs("div", { className: `relative rounded-xl border bg-white p-6 ${featured ? "border-[var(--color-brand-blue)] shadow-elevated" : "border-[var(--color-gray-100)]"}`, children: [
          featured && /* @__PURE__ */ jsx("span", { className: "absolute -top-3 right-4 rounded-full bg-[var(--color-brand-blue)] px-3 py-1 text-xs font-bold uppercase text-white", children: "Populer" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            featured && /* @__PURE__ */ jsx(Crown, { className: "h-5 w-5 text-[var(--color-brand-blue)]" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: p.name })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-4xl font-black", children: p.price === 0 ? "Gratis" : idr(p.price) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[var(--color-gray-500)]", children: p.price === 0 ? "Selamanya" : p.duration_days === 365 ? "/tahun" : "/bulan" }),
          p.description && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-[var(--color-gray-700)]", children: p.description }),
          /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-2", children: (p.benefits ?? []).map((b, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
            /* @__PURE__ */ jsx(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" }),
            /* @__PURE__ */ jsx("span", { children: b })
          ] }, i)) }),
          /* @__PURE__ */ jsx(Button, { className: "mt-6 w-full", variant: featured ? "default" : "outline", onClick: () => navigate({
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
