import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  AppShell,
  PageHeader
} from "./chunk-4Z6KH5LH.mjs";
import {
  Label
} from "./chunk-IIG5XPYQ.mjs";
import "./chunk-SJQOHQ2J.mjs";
import "./chunk-G57E4XNL.mjs";
import {
  toast
} from "./chunk-C7CN73EW.mjs";
import {
  Input
} from "./chunk-KM4Y5GSG.mjs";
import "./chunk-DH7FIRD7.mjs";
import {
  Button
} from "./chunk-AVRRWDIK.mjs";
import "./chunk-NXBQQK3G.mjs";
import "./chunk-IHLGWONG.mjs";
import "./chunk-Y5N26HX3.mjs";
import {
  supabase
} from "./chunk-2FS42ITU.mjs";
import "./chunk-NDUCSHRX.mjs";
import "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/settings-G3_LPDuV.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
function SettingsPage() {
  const [password, setPassword] = (0, import_react.useState)("");
  async function changePw() {
    if (password.length < 6) return toast.error("Password minimal 6 karakter");
    const {
      error
    } = await supabase.auth.updateUser({
      password
    });
    if (error) return toast.error(error.message);
    setPassword("");
    toast.success("Password diperbarui");
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Pengaturan", description: "Keamanan dan preferensi akun." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-xl space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-bold", children: "Ubah Password" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mt-3 space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Password baru" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), minLength: 6 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { onClick: changePw, children: "Perbarui Password" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-destructive)] bg-white p-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-bold text-[var(--color-destructive)]", children: "Hapus Akun" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-2 text-sm text-[var(--color-gray-500)]", children: "Hubungi admin untuk menghapus akun Anda secara permanen." })
      ] })
    ] })
  ] });
}
export {
  SettingsPage as component
};
