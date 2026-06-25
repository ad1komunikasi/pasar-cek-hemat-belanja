import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  AppShell,
  PageHeader
} from "./chunk-U5CRF4WT.mjs";
import {
  useAuth
} from "./chunk-EG7TMMQE.mjs";
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

// dist/server/assets/profile-CPnAjH2q.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
function ProfilePage() {
  const {
    user,
    profile,
    refresh
  } = useAuth();
  const [fullName, setFullName] = (0, import_react.useState)("");
  const [phone, setPhone] = (0, import_react.useState)("");
  const [city, setCity] = (0, import_react.useState)("");
  (0, import_react.useEffect)(() => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setPhone(profile.phone ?? "");
      setCity(profile.city ?? "");
    }
  }, [profile]);
  async function save() {
    const {
      error
    } = await supabase.from("profiles").update({
      full_name: fullName,
      phone,
      city
    }).eq("id", user.id);
    if (error) return toast.error(error.message);
    toast.success("Profil diperbarui");
    refresh();
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Profil", description: "Kelola informasi akun Anda." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-xl space-y-4 rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: user?.email ?? "", disabled: true })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nama Lengkap" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: fullName, onChange: (e) => setFullName(e.target.value), maxLength: 100 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nomor HP" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: phone, onChange: (e) => setPhone(e.target.value), maxLength: 20 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Kota Domisili" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: city, onChange: (e) => setCity(e.target.value), maxLength: 50 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { onClick: save, children: "Simpan Perubahan" })
    ] })
  ] });
}
export {
  ProfilePage as component
};
