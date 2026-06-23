import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, P as PageHeader } from "./app-shell-JvQTbMhg.js";
import { u as useAuth } from "./router-KEMZH_Q0.js";
import { s as supabase } from "./client-koMOzLtV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import "@tanstack/react-router";
import "lucide-react";
import "@tanstack/react-query";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
function ProfilePage() {
  const {
    user,
    profile,
    refresh
  } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Profil", description: "Kelola informasi akun Anda." }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-xl space-y-4 rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Email" }),
        /* @__PURE__ */ jsx(Input, { value: user?.email ?? "", disabled: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Nama Lengkap" }),
        /* @__PURE__ */ jsx(Input, { value: fullName, onChange: (e) => setFullName(e.target.value), maxLength: 100 })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Nomor HP" }),
        /* @__PURE__ */ jsx(Input, { value: phone, onChange: (e) => setPhone(e.target.value), maxLength: 20 })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Kota Domisili" }),
        /* @__PURE__ */ jsx(Input, { value: city, onChange: (e) => setCity(e.target.value), maxLength: 50 })
      ] }),
      /* @__PURE__ */ jsx(Button, { onClick: save, children: "Simpan Perubahan" })
    ] })
  ] });
}
export {
  ProfilePage as component
};
