import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
const SplitComponent = () => {
  return /* @__PURE__ */ jsx("div", { className: "p-10 text-center", children: /* @__PURE__ */ jsxs("p", { children: [
    "Keranjang belanja menggunakan ",
    /* @__PURE__ */ jsx(Link, { to: "/smart-basket", className: "font-bold text-[var(--color-brand-blue)] underline", children: "Smart Basket" }),
    "."
  ] }) });
};
export {
  SplitComponent as component
};
