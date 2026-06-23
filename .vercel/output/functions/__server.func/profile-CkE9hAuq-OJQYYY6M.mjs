import {
  AppShell,
  PageHeader
} from "./chunk-XZNSYGQD.mjs";
import "./chunk-KJB73ZNG.mjs";
import {
  useAuth
} from "./chunk-UC4BMYGH.mjs";
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

// dist/server/assets/profile-CkE9hAuq.js
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
