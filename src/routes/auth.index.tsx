import { createFileRoute, Link, useNavigate, useRouter, redirect } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { MarketField } from "@/components/site/market-field";
import {
  recordedLabel,
  rupiah,
  useMarketBoards,
} from "@/components/site/use-market-prices";

export const Route = createFileRoute("/auth/")({
  validateSearch: (s: Record<string, unknown>): { tab?: string } => ({
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
      {
        name: "description",
        content:
          "Masuk ke akun PasarCek untuk mulai mengecek dan membandingkan harga sembako di pasar terdekat.",
      },
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
    navigate({ to: ".", search: { tab: value } });
  }

  useEffect(() => {
    if (!loading && user) router.navigate({ to: "/dashboard", replace: true });
  }, [user, loading, router]);

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[1.05fr_1fr]">
      <AuthAside />
      <div className="grain relative flex flex-col px-5 py-6 sm:px-10">
        <div className="relative z-10 flex items-center justify-between">
          <Logo className="lg:invisible" />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-foreground/60 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Beranda
          </Link>
        </div>
        <div className="relative z-10 mx-auto my-auto w-full max-w-sm py-12">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-10 grid h-auto w-full grid-cols-3 rounded-none border-b border-rule bg-transparent p-0">
              <TabsTrigger value="login" className="-mb-px rounded-none border-0 border-b-2 border-transparent bg-transparent pb-3 pt-1 text-[0.95rem] text-foreground/55 shadow-none data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent">Masuk</TabsTrigger>
              <TabsTrigger value="register" className="-mb-px rounded-none border-0 border-b-2 border-transparent bg-transparent pb-3 pt-1 text-[0.95rem] text-foreground/55 shadow-none data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent">Daftar</TabsTrigger>
              <TabsTrigger value="forgot" className="-mb-px rounded-none border-0 border-b-2 border-transparent bg-transparent pb-3 pt-1 text-[0.95rem] text-foreground/55 shadow-none data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent">Lupa</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
            <TabsContent value="forgot">
              <ForgotForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function AuthAside() {
  const { data: boards = [] } = useMarketBoards();
  const rows = boards.slice(0, 5);
  return (
    <aside className="grain relative hidden overflow-hidden bg-[#0f1d47] text-[#f4efe4] lg:flex lg:flex-col">
      <MarketField tone="light" className="opacity-80" />
      <div className="relative z-10 flex flex-1 flex-col justify-between p-12 xl:p-16">
        <Logo inverted />
        <div className="max-w-md">
          <h1 className="display-xl text-[clamp(3rem,4.6vw,4.6rem)]">
            Cek harga dulu, <span className="text-turmeric">baru</span> ke pasar.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#f4efe4]/65">
            Satu akun untuk papan harga, Smart Basket, dan alarm harga turun di pasar-pasar sekitar
            Anda.
          </p>
          <div className="mt-10 rounded-[12px] border border-white/12 bg-[#0f1d47]/70 backdrop-blur-sm" data-field-avoid>
            <div className="flex justify-between border-b border-white/10 px-5 py-3">
              <span className="eyebrow text-[#f4efe4]/50">Termurah hari ini</span>
              {rows[0] && (
                <span className="eyebrow text-[#f4efe4]/40">
                  dicatat {recordedLabel(rows[0].recordedAt, "id")}
                </span>
              )}
            </div>
            <ul className="px-5 py-2">
              {rows.map((b) => (
                <li
                  key={b.name}
                  className="flex items-baseline justify-between gap-4 border-b border-dashed border-white/10 py-2.5 text-[0.95rem] last:border-0"
                >
                  <span>
                    {b.name}
                    <span className="ml-2 text-sm text-[#f4efe4]/45">{b.quotes[0]?.market}</span>
                  </span>
                  <span className="font-mono text-sm text-turmeric tabular">{rupiah(b.min)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="font-mono text-[11px] tracking-wide text-[#f4efe4]/40">
          © {new Date().getFullYear()} PasarCek · Jakarta
        </p>
      </div>
    </aside>
  );
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

type GoogleIdApi = {
  initialize: (config: Record<string, unknown>) => void;
  renderButton: (el: HTMLElement, options: Record<string, unknown>) => void;
};

let gisScriptPromise: Promise<void> | undefined;
function loadGoogleIdentityScript(): Promise<void> {
  if ((window as any).google?.accounts?.id) return Promise.resolve();
  gisScriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      gisScriptPromise = undefined;
      reject(new Error("Gagal memuat Google Identity Services"));
    };
    document.head.appendChild(script);
  });
  return gisScriptPromise;
}

async function createNonce(): Promise<[raw: string, hashed: string]> {
  const raw = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  const hashed = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return [raw, hashed];
}

/**
 * Login Google memakai Google Identity Services (popup di domain kita sendiri) lalu
 * menukar ID token ke Supabase via signInWithIdToken. Dengan cara ini layar Google
 * menampilkan nama aplikasi / domain PasarCek, bukan "xxxx.supabase.co" seperti pada
 * signInWithOAuth (redirect lewat domain Supabase).
 *
 * Butuh env VITE_GOOGLE_CLIENT_ID (Web client ID yang sama dengan di Supabase → Auth →
 * Providers → Google). Domain aplikasi harus terdaftar di Google Cloud Console →
 * Credentials → Authorized JavaScript origins. Jika env belum diisi atau GIS gagal
 * dimuat, login Google dinonaktifkan agar tidak kembali ke redirect Supabase.
 */
function GoogleButton({ flow }: { flow: "login" | "register" }) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [gisFailed, setGisFailed] = useState(false);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    let cancelled = false;

    (async () => {
      try {
        const [rawNonce, hashedNonce] = await createNonce();
        await loadGoogleIdentityScript();
        if (cancelled || !containerRef.current) return;

        const gid = (window as any).google.accounts.id as GoogleIdApi;
        gid.initialize({
          client_id: GOOGLE_CLIENT_ID,
          nonce: hashedNonce,
          use_fedcm_for_prompt: true,
          callback: async (response: { credential: string }) => {
            const { error } = await supabase.auth.signInWithIdToken({
              provider: "google",
              token: response.credential,
              nonce: rawNonce,
            });
            if (error) {
              console.error("[GoogleSignIn]", error);
              toast.error("Gagal masuk dengan Google");
              return;
            }
            toast.success("Selamat datang di PasarCek!");
            navigate({ to: "/dashboard", replace: true });
          },
        });
        gid.renderButton(containerRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          shape: "rectangular",
          text: flow === "register" ? "signup_with" : "continue_with",
          logo_alignment: "center",
          locale: "id",
          width: Math.min(400, containerRef.current.offsetWidth || 384),
        });
      } catch (err) {
        console.error("[GoogleSignIn]", err);
        if (!cancelled) setGisFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [flow, navigate]);

  if (GOOGLE_CLIENT_ID && !gisFailed) {
    return <div ref={containerRef} className="flex min-h-[44px] w-full justify-center" />;
  }
  return (
    <Button type="button" variant="outline" className="w-full" disabled>
      Login Google belum tersedia
    </Button>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      emailSchema.parse(email);
      passSchema.parse(password);
    } catch (err: any) {
      toast.error(err.errors?.[0]?.message ?? "Input tidak valid");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Selamat datang kembali!");
    navigate({ to: "/dashboard", replace: true });
  }
  return (
    <form onSubmit={submit} className="space-y-5">
      <h2 className="display-xl text-[2.6rem]">Selamat datang kembali.</h2>
      <p className="-mt-2 text-foreground/60">Masuk untuk melihat harga hari ini.</p>
      <GoogleButton flow="login" />
      <div className="eyebrow my-5 flex items-center gap-3 text-foreground/45">
        <span className="h-px flex-1 bg-rule" />
        atau dengan email
        <span className="h-px flex-1 bg-rule" />
      </div>
      <div>
        <Label className="mb-2 block text-sm text-foreground/75">Email</Label>
        <Input className="h-12 bg-card" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label className="mb-2 block text-sm text-foreground/75">Password</Label>
        <Input
          className="h-12 bg-card"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="h-12 w-full rounded-md text-[0.95rem]" disabled={busy}>
        {busy ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}

function RegisterForm() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (fullName.trim().length < 2) return toast.error("Nama minimal 2 karakter");
    try {
      emailSchema.parse(email);
      passSchema.parse(password);
    } catch (err: any) {
      toast.error(err.errors?.[0]?.message ?? "Input tidak valid");
      return;
    }
    setBusy(true);
    const isWaitlist = localStorage.getItem("waitlist_priority_signup") === "true";
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/dashboard",
        data: {
          full_name: fullName,
          waitlist_priority: isWaitlist,
        },
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    if (isWaitlist) {
      localStorage.removeItem("waitlist_priority_signup");
    }
    toast.success("Pendaftaran berhasil! Selamat datang di PasarCek.");
    navigate({ to: "/dashboard", replace: true });
  }
  return (
    <form onSubmit={submit} className="space-y-5">
      <h2 className="display-xl text-[2.6rem]">Buat akun gratis.</h2>
      <p className="-mt-2 text-foreground/60">Satu menit, tanpa kartu.</p>
      <GoogleButton flow="register" />
      <div className="eyebrow my-5 flex items-center gap-3 text-foreground/45">
        <span className="h-px flex-1 bg-rule" />
        atau dengan email
        <span className="h-px flex-1 bg-rule" />
      </div>
      <div>
        <Label className="mb-2 block text-sm text-foreground/75">Nama lengkap</Label>
        <Input
          className="h-12 bg-card"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          maxLength={100}
        />
      </div>
      <div>
        <Label className="mb-2 block text-sm text-foreground/75">Email</Label>
        <Input className="h-12 bg-card" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label className="mb-2 block text-sm text-foreground/75">Password</Label>
        <Input
          className="h-12 bg-card"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <p className="text-xs text-[var(--color-gray-500)]">
        Dengan mendaftar, Anda menyetujui{" "}
        <Link to="/ketentuan" target="_blank" className="text-tarp underline underline-offset-2">
          Syarat & Ketentuan
        </Link>{" "}
        dan{" "}
        <Link to="/privasi" target="_blank" className="text-tarp underline underline-offset-2">
          Kebijakan Privasi
        </Link>{" "}
        PasarCek.
      </p>
      <Button type="submit" className="h-12 w-full rounded-md text-[0.95rem]" disabled={busy}>
        {busy ? "Memproses..." : "Daftar"}
      </Button>
    </form>
  );
}

function ForgotForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      emailSchema.parse(email);
    } catch (err: any) {
      toast.error(err.errors?.[0]?.message);
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Link reset password telah dikirim ke email Anda.");
  }
  return (
    <form onSubmit={submit} className="space-y-5">
      <h2 className="display-xl text-[2.6rem]">Lupa password.</h2>
      <p className="text-sm text-[var(--color-gray-500)]">
        Masukkan email Anda, kami akan kirim tautan untuk mengatur ulang password.
      </p>
      <div>
        <Label className="mb-2 block text-sm text-foreground/75">Email</Label>
        <Input className="h-12 bg-card" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <Button type="submit" className="h-12 w-full rounded-md text-[0.95rem]" disabled={busy}>
        {busy ? "Mengirim..." : "Kirim Link Reset"}
      </Button>
    </form>
  );
}
