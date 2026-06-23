import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, P as PageHeader } from "./app-shell-JvQTbMhg.js";
import { s as supabase } from "./client-koMOzLtV.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { useState } from "react";
import { toast } from "sonner";
import "@tanstack/react-router";
import "lucide-react";
import "./router-KEMZH_Q0.js";
import "@tanstack/react-query";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
function SettingsPage() {
  const [password, setPassword] = useState("");
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
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Pengaturan", description: "Keamanan dan preferensi akun." }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-xl space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "Ubah Password" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { children: "Password baru" }),
          /* @__PURE__ */ jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), minLength: 6 }),
          /* @__PURE__ */ jsx(Button, { onClick: changePw, children: "Perbarui Password" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[var(--color-destructive)] bg-white p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[var(--color-destructive)]", children: "Hapus Akun" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[var(--color-gray-500)]", children: "Hubungi admin untuk menghapus akun Anda secara permanen." })
      ] })
    ] })
  ] });
}
export {
  SettingsPage as component
};
