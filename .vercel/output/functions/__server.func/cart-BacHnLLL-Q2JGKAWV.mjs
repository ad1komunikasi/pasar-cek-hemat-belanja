import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  Link
} from "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/cart-BacHnLLL.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var SplitComponent = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-10 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
    "Keranjang belanja menggunakan ",
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/smart-basket", className: "font-bold text-[var(--color-brand-blue)] underline", children: "Smart Basket" }),
    "."
  ] }) });
};
export {
  SplitComponent as component
};
