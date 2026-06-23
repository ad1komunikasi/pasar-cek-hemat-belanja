import { jsx, jsxs } from "react/jsx-runtime";
import { useRouter, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { B as Button } from "./button-BC9oXVxV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { c as cn } from "./utils-H80jjgLf.js";
import { s as supabase } from "./client-koMOzLtV.js";
import { toast } from "sonner";
import { u as useAuth } from "./router-KEMZH_Q0.js";
import { z } from "zod";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@tanstack/react-query";
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const emailSchema = z.string().trim().email("Email tidak valid").max(255);
const passSchema = z.string().min(6, "Password minimal 6 karakter").max(72);
function AuthPage() {
  const {
    user,
    loading
  } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && user) router.navigate({
      to: "/dashboard"
    });
  }, [user, loading, router]);
  return /* @__PURE__ */ jsxs("div", { className: "grid min-h-screen lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden bg-[var(--color-brand-blue)] p-12 text-white lg:flex lg:flex-col lg:justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 text-lg font-bold", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex h-8 w-8 items-center justify-center rounded bg-white text-sm font-black text-[var(--color-brand-blue)]", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-5xl font-black leading-tight", children: [
          "Cek Harga Dulu,",
          /* @__PURE__ */ jsx("br", {}),
          "Belanja Lebih Hemat."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-md text-white/80", children: "Pantau harga sembako terbaru, bandingkan antar pasar terdekat, dan temukan keranjang belanja paling hemat hari ini." })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-white/60", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " PasarCek"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center bg-[var(--color-gray-50)] p-6", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "mb-8 inline-flex items-center gap-2 text-sm font-semibold lg:hidden", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: "login", children: [
        /* @__PURE__ */ jsxs(TabsList, { className: "mb-6 grid w-full grid-cols-3", children: [
          /* @__PURE__ */ jsx(TabsTrigger, { value: "login", children: "Masuk" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "register", children: "Daftar" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "forgot", children: "Lupa" })
        ] }),
        /* @__PURE__ */ jsx(TabsContent, { value: "login", children: /* @__PURE__ */ jsx(LoginForm, {}) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "register", children: /* @__PURE__ */ jsx(RegisterForm, {}) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "forgot", children: /* @__PURE__ */ jsx(ForgotForm, {}) })
      ] })
    ] }) })
  ] });
}
function GoogleButton() {
  const [busy, setBusy] = useState(false);
  async function signIn() {
    setBusy(true);
    const res = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard"
      }
    });
    if (res.error) {
      toast.error("Gagal masuk dengan Google");
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "w-full", onClick: signIn, disabled: busy, children: [
    /* @__PURE__ */ jsxs("svg", { className: "mr-2 h-4 w-4", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
      /* @__PURE__ */ jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
      /* @__PURE__ */ jsx("path", { fill: "#FBBC05", d: "M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" }),
      /* @__PURE__ */ jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" })
    ] }),
    "Lanjutkan dengan Google"
  ] });
}
function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    try {
      emailSchema.parse(email);
      passSchema.parse(password);
    } catch (err) {
      toast.error(err.errors?.[0]?.message ?? "Input tidak valid");
      return;
    }
    setBusy(true);
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Selamat datang kembali!");
    navigate({
      to: "/dashboard"
    });
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: "Masuk ke akun Anda" }),
    /* @__PURE__ */ jsx(GoogleButton, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative my-4 text-center text-xs text-[var(--color-gray-500)]", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-[var(--color-gray-50)] px-2", children: "atau email" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-1/2 -z-10 h-px bg-[var(--color-gray-100)]" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Email" }),
      /* @__PURE__ */ jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Password" }),
      /* @__PURE__ */ jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Memproses..." : "Masuk" })
  ] });
}
function RegisterForm() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    if (fullName.trim().length < 2) return toast.error("Nama minimal 2 karakter");
    try {
      emailSchema.parse(email);
      passSchema.parse(password);
    } catch (err) {
      toast.error(err.errors?.[0]?.message ?? "Input tidak valid");
      return;
    }
    setBusy(true);
    const {
      error
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/dashboard",
        data: {
          full_name: fullName
        }
      }
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Pendaftaran berhasil! Silakan cek email Anda.");
    navigate({
      to: "/dashboard"
    });
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: "Buat akun gratis" }),
    /* @__PURE__ */ jsx(GoogleButton, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative my-4 text-center text-xs text-[var(--color-gray-500)]", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-[var(--color-gray-50)] px-2", children: "atau email" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-1/2 -z-10 h-px bg-[var(--color-gray-100)]" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Nama lengkap" }),
      /* @__PURE__ */ jsx(Input, { value: fullName, onChange: (e) => setFullName(e.target.value), required: true, maxLength: 100 })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Email" }),
      /* @__PURE__ */ jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Password" }),
      /* @__PURE__ */ jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6 })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-[var(--color-gray-500)]", children: "Dengan mendaftar Anda setuju dengan syarat & ketentuan PasarCek." }),
    /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Memproses..." : "Daftar" })
  ] });
}
function ForgotForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    try {
      emailSchema.parse(email);
    } catch (err) {
      toast.error(err.errors?.[0]?.message);
      return;
    }
    setBusy(true);
    const {
      error
    } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password"
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Link reset password telah dikirim ke email Anda.");
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: "Lupa password" }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-[var(--color-gray-500)]", children: "Masukkan email Anda, kami akan kirim tautan untuk mengatur ulang password." }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Email" }),
      /* @__PURE__ */ jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Mengirim..." : "Kirim Link Reset" })
  ] });
}
export {
  AuthPage as component
};
