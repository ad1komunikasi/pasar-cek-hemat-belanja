import {
  AppShell,
  PageHeader
} from "./chunk-XZNSYGQD.mjs";
import "./chunk-KJB73ZNG.mjs";
import "./chunk-UC4BMYGH.mjs";
import {
  Label
} from "./chunk-5MVIPTMN.mjs";
import "./chunk-XAC4VDGA.mjs";
import {
  toast
} from "./chunk-KIHGSOXA.mjs";
import {
  Input
} from "./chunk-5KSQNLU6.mjs";
import "./chunk-76F7W2CF.mjs";
import {
  Button
} from "./chunk-4AYWSIRD.mjs";
import "./chunk-QH35MXVZ.mjs";
import "./chunk-HSWPCUUH.mjs";
import {
  supabase
} from "./chunk-7GEO44MB.mjs";
import "./chunk-G46AXIAP.mjs";
import "./chunk-TV3ZUI3R.mjs";
import "./chunk-RE5W7UZM.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-MLKSHREV.mjs";
import {
  __toESM
} from "./chunk-KVSJYO5R.mjs";

// dist/server/assets/settings-f7L2MdCd.js
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
