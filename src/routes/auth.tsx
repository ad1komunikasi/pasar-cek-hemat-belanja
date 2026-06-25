import { createFileRoute, Link, useNavigate, useRouter, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    tab: (s.tab as string) ?? "login",
  }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      throw redirect({ to: "/dashboard", replace: true });
    }
  },
  head: () => ({
    meta: [
      { title: "Masuk / Daftar — PasarCek" },
      { name: "description", content: "Masuk ke akun PasarCek untuk mulai mengecek dan membandingkan harga sembako di pasar terdekat." },
    ],
  }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email("Email tidak valid").max(255);
const passSchema = z.string().min(6, "Password minimal 6 karakter").max(72);

function AuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = useNavigate();

  const activeTab = search.tab === "register" || search.tab === "forgot" ? search.tab : "login";

  function handleTabChange(value: string) {
    navigate({ search: { tab: value } });
  }

  useEffect(() => { if (!loading && user) router.navigate({ to: "/dashboard", replace: true }); }, [user, loading, router]);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-[var(--color-brand-blue)] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-white text-sm font-black text-[var(--color-brand-blue)]">PC</span>
          PasarCek
        </Link>
        <div>
          <h1 className="text-5xl font-black leading-tight">Cek Harga Dulu,<br />Belanja Lebih Hemat.</h1>
          <p className="mt-6 max-w-md text-white/80">Pantau harga sembako terbaru, bandingkan antar pasar terdekat, dan temukan keranjang belanja paling hemat hari ini.</p>
        </div>
        <p className="text-sm text-white/60">© {new Date().getFullYear()} PasarCek</p>
      </div>
      <div className="flex items-center justify-center bg-[var(--color-gray-50)] p-6">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold lg:hidden">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white">PC</span>
            PasarCek
          </Link>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="login">Masuk</TabsTrigger>
              <TabsTrigger value="register">Daftar</TabsTrigger>
              <TabsTrigger value="forgot">Lupa</TabsTrigger>
            </TabsList>
            <TabsContent value="login"><LoginForm /></TabsContent>
            <TabsContent value="register"><RegisterForm /></TabsContent>
            <TabsContent value="forgot"><ForgotForm /></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function GoogleButton({ flow }: { flow: "login" | "register" }) {
  const [busy, setBusy] = useState(false);
  async function signIn() {
    setBusy(true);
    const res = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard?flow=${flow}`,
      },
    });
    if (res.error) { toast.error("Gagal masuk dengan Google"); setBusy(false); }
  }
  return (
    <Button type="button" variant="outline" className="w-full" onClick={signIn} disabled={busy}>
      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
      Lanjutkan dengan Google
    </Button>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try { emailSchema.parse(email); passSchema.parse(password); } catch (err: any) { toast.error(err.errors?.[0]?.message ?? "Input tidak valid"); return; }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Selamat datang kembali!");
    navigate({ to: "/dashboard", replace: true });
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <h2 className="text-2xl font-black">Masuk ke akun Anda</h2>
      <GoogleButton flow="login" />
      <div className="relative my-4 text-center text-xs text-[var(--color-gray-500)]"><span className="bg-[var(--color-gray-50)] px-2">atau email</span><div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-[var(--color-gray-100)]" /></div>
      <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
      <div><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
      <Button type="submit" className="w-full" disabled={busy}>{busy ? "Memproses..." : "Masuk"}</Button>
    </form>
  );
}

function RegisterForm() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (fullName.trim().length < 2) return toast.error("Nama minimal 2 karakter");
    try { emailSchema.parse(email); passSchema.parse(password); } catch (err: any) { toast.error(err.errors?.[0]?.message ?? "Input tidak valid"); return; }
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: window.location.origin + "/dashboard", data: { full_name: fullName } },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Pendaftaran berhasil! Silakan cek email Anda.");
    navigate({ to: "/dashboard", replace: true });
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <h2 className="text-2xl font-black">Buat akun gratis</h2>
      <GoogleButton flow="register" />
      <div className="relative my-4 text-center text-xs text-[var(--color-gray-500)]"><span className="bg-[var(--color-gray-50)] px-2">atau email</span><div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-[var(--color-gray-100)]" /></div>
      <div><Label>Nama lengkap</Label><Input value={fullName} onChange={(e) => setFullName(e.target.value)} required maxLength={100} /></div>
      <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
      <div><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} /></div>
      <p className="text-xs text-[var(--color-gray-500)]">Dengan mendaftar Anda setuju dengan syarat & ketentuan PasarCek.</p>
      <Button type="submit" className="w-full" disabled={busy}>{busy ? "Memproses..." : "Daftar"}</Button>
    </form>
  );
}

function ForgotForm() {
  const [email, setEmail] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try { emailSchema.parse(email); } catch (err: any) { toast.error(err.errors?.[0]?.message); return; }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/reset-password" });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Link reset password telah dikirim ke email Anda.");
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <h2 className="text-2xl font-black">Lupa password</h2>
      <p className="text-sm text-[var(--color-gray-500)]">Masukkan email Anda, kami akan kirim tautan untuk mengatur ulang password.</p>
      <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
      <Button type="submit" className="w-full" disabled={busy}>{busy ? "Mengirim..." : "Kirim Link Reset"}</Button>
    </form>
  );
}
