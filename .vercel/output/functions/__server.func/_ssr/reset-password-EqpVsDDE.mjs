import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { s as supabase } from "./client-koMOzLtV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function ResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-[var(--color-gray-50)] px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "w-full max-w-sm space-y-4 rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black", children: "Atur ulang password" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Password baru" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Menyimpan..." : "Simpan password" })
  ] }) });
}
export {
  ResetPage as component
};
