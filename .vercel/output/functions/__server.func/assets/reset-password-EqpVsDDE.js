import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { B as Button } from "./button-BC9oXVxV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { s as supabase } from "./client-koMOzLtV.js";
import { toast } from "sonner";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "@supabase/supabase-js";
function ResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
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
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-[var(--color-gray-50)] px-4", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "w-full max-w-sm space-y-4 rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black", children: "Atur ulang password" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Password baru" }),
      /* @__PURE__ */ jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6 })
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Menyimpan..." : "Simpan password" })
  ] }) });
}
export {
  ResetPage as component
};
