import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  Label
} from "./chunk-IIG5XPYQ.mjs";
import "./chunk-SJQOHQ2J.mjs";
import {
  toast
} from "./chunk-C7CN73EW.mjs";
import {
  Input
} from "./chunk-KM4Y5GSG.mjs";
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

// dist/server/assets/reset-password-EqpVsDDE.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
function ResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = (0, import_react.useState)("");
  const [busy, setBusy] = (0, import_react.useState)(false);
  async function submit(e) {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password minimal 6 karakter");
    setBusy(true);
    const {
      error
    } = await supabase.auth.updateUser({
      password
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Password berhasil diperbarui");
    navigate({
      to: "/dashboard"
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex min-h-screen items-center justify-center bg-[var(--color-gray-50)] px-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: submit, className: "w-full max-w-sm space-y-4 rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-2xl font-black", children: "Atur ulang password" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Password baru" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6 })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Menyimpan..." : "Simpan password" })
  ] }) });
}
export {
  ResetPage as component
};
