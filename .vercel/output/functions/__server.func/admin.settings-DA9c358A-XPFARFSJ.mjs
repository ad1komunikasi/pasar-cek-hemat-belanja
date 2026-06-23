import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  require_jsx_runtime
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/admin.settings-DA9c358A.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "mb-6 text-3xl font-black", children: "Pengaturan" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-[var(--color-gray-500)]", children: "Pengaturan global aplikasi akan tersedia di iterasi berikutnya." }) })
] });
export {
  SplitComponent as component
};
