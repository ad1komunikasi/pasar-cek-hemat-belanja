import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { s as supabase } from "./client-koMOzLtV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAuth } from "./router-KEMZH_Q0.mjs";
import { s as stringType } from "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const emailSchema = stringType().trim().email("Email tidak valid").max(255);
const passSchema = stringType().min(6, "Password minimal 6 karakter").max(72);
function AuthPage() {
  const {
    user,
    loading
  } = useAuth();
  const router = useRouter();
  reactExports.useEffect(() => {
    if (!loading && user) router.navigate({
      to: "/dashboard"
    });
  }, [user, loading, router]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-screen lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden bg-[var(--color-brand-blue)] p-12 text-white lg:flex lg:flex-col lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 text-lg font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-8 w-8 items-center justify-center rounded bg-white text-sm font-black text-[var(--color-brand-blue)]", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl font-black leading-tight", children: [
          "Cek Harga Dulu,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Belanja Lebih Hemat."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-md text-white/80", children: "Pantau harga sembako terbaru, bandingkan antar pasar terdekat, dan temukan keranjang belanja paling hemat hari ini." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-white/60", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " PasarCek"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center bg-[var(--color-gray-50)] p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-8 inline-flex items-center gap-2 text-sm font-semibold lg:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "login", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6 grid w-full grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "login", children: "Masuk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "register", children: "Daftar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "forgot", children: "Lupa" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginForm, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "register", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterForm, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "forgot", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForgotForm, {}) })
      ] })
    ] }) })
  ] });
}
function GoogleButton() {
  const [busy, setBusy] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", className: "w-full", onClick: signIn, disabled: busy, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "mr-2 h-4 w-4", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" })
    ] }),
    "Lanjutkan dengan Google"
  ] });
}
function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black", children: "Masuk ke akun Anda" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleButton, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative my-4 text-center text-xs text-[var(--color-gray-500)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-[var(--color-gray-50)] px-2", children: "atau email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-1/2 -z-10 h-px bg-[var(--color-gray-100)]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Memproses..." : "Masuk" })
  ] });
}
function RegisterForm() {
  const navigate = useNavigate();
  const [fullName, setFullName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black", children: "Buat akun gratis" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleButton, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative my-4 text-center text-xs text-[var(--color-gray-500)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-[var(--color-gray-50)] px-2", children: "atau email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-1/2 -z-10 h-px bg-[var(--color-gray-100)]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nama lengkap" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: fullName, onChange: (e) => setFullName(e.target.value), required: true, maxLength: 100 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[var(--color-gray-500)]", children: "Dengan mendaftar Anda setuju dengan syarat & ketentuan PasarCek." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Memproses..." : "Daftar" })
  ] });
}
function ForgotForm() {
  const [email, setEmail] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black", children: "Lupa password" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--color-gray-500)]", children: "Masukkan email Anda, kami akan kirim tautan untuk mengatur ulang password." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Mengirim..." : "Kirim Link Reset" })
  ] });
}
export {
  AuthPage as component
};
