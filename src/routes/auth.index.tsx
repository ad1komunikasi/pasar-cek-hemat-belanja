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
import { ShoppingBasket, MapPin, TrendingDown, Sparkles } from "lucide-react";
import { CelenganAyamIcon } from "@/components/celengan-ayam-icon";

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
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-gradient-navy p-12 text-white lg:flex lg:flex-col lg:justify-between relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

        {/* Header Logo */}
        <Link to="/" className="flex items-center gap-2 text-lg font-bold group relative z-10">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
            <ShoppingBasket className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold text-white tracking-tight">PasarCek</span>
        </Link>

        {/* Content & Animation */}
        <div className="relative z-10 my-auto flex flex-col items-center">
          <div className="text-left w-full max-w-md">
            <h1 className="text-5xl font-black leading-tight text-white">
              Cek Harga Dulu,
              <br />
              Belanja Lebih Hemat.
            </h1>
            <p className="mt-6 text-white/80 text-base leading-relaxed">
              Pantau harga sembako terbaru, bandingkan antar pasar terdekat, dan temukan keranjang
              belanja paling hemat hari ini.
            </p>
          </div>

          {/* Interactive Animated Graphic */}
          <div className="relative mt-16 w-full max-w-sm h-64 flex items-center justify-center">
            {/* Background glowing circle */}
            <div className="absolute inset-0 m-auto h-48 w-48 rounded-full bg-gradient-primary opacity-20 blur-2xl animate-pulse" />

            {/* Smart Basket Card Mockup */}
            <div className="relative w-72 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-elevated animate-float z-10">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-soft">
                  Simulasi Keranjang
                </span>
                <span className="text-[10px] font-medium bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                  -12% Lebih Hemat
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="font-medium text-white/90">Minyak Goreng 2L</span>
                  </div>
                  <span className="font-bold text-white">
                    Rp28.500{" "}
                    <span className="text-white/40 line-through text-[10px]">Rp32.000</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="font-medium text-white/90">Beras Premium 5kg</span>
                  </div>
                  <span className="font-bold text-white">
                    Rp64.000{" "}
                    <span className="text-white/40 line-through text-[10px]">Rp69.000</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                    <span className="font-medium text-white/90">Telur Ayam 1kg</span>
                  </div>
                  <span className="font-bold text-white">
                    Rp26.000{" "}
                    <span className="text-white/40 line-through text-[10px]">Rp29.000</span>
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-white/70">Total Penghematan</span>
                <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                  Hemat Rp11.500
                </span>
              </div>
            </div>

            {/* Floating Icons */}
            {/* MapPin Icon */}
            <div
              className="absolute -top-4 right-12 z-20 bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-full text-accent shadow-card animate-float"
              style={{ animationDelay: "1s", animationDuration: "5s" }}
            >
              <MapPin className="h-5 w-5" />
            </div>

            {/* TrendingDown Icon */}
            <div
              className="absolute -bottom-6 left-12 z-20 bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-full text-emerald-400 shadow-card animate-float"
              style={{ animationDelay: "2s", animationDuration: "7s" }}
            >
              <TrendingDown className="h-5 w-5" />
            </div>

            {/* Celengan Ayam */}
            <div
              className="absolute top-12 -left-10 z-20 bg-white/10 backdrop-blur-md border border-white/15 p-2 rounded-2xl shadow-card animate-float"
              style={{ animationDelay: "0.5s", animationDuration: "6s" }}
            >
              <CelenganAyamIcon className="w-12 h-12" />
            </div>

            {/* Uang Koin Rupiah */}
            <div
              className="absolute top-2 -left-16 z-30 bg-white/10 backdrop-blur-md border border-white/15 p-2 rounded-full shadow-card animate-float"
              style={{ animationDelay: "1.5s", animationDuration: "5s" }}
            >
              <svg
                viewBox="0 0 32 32"
                className="w-6 h-6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="url(#goldGrad)"
                  stroke="#b45309"
                  strokeWidth="1"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="11"
                  stroke="#fef08a"
                  strokeWidth="0.7"
                  strokeDasharray="1.5 1"
                />
                <text
                  x="16"
                  y="19.5"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="900"
                  fontSize="10"
                  fill="#78350f"
                  textAnchor="middle"
                >
                  Rp
                </text>
                <path d="M8 8L9.5 9.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
                <defs>
                  <linearGradient
                    id="goldGrad"
                    x1="2"
                    y1="2"
                    x2="30"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#fcd34d" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#ca8a04" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Sparkles Icon */}
            <div
              className="absolute bottom-12 -right-4 z-20 bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-full text-amber-300 shadow-card animate-float"
              style={{ animationDelay: "3s", animationDuration: "8s" }}
            >
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
        </div>

        <p className="text-sm text-white/50 relative z-10">© {new Date().getFullYear()} PasarCek</p>
      </div>
      <div className="flex items-center justify-center bg-[var(--color-gray-50)] p-6">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold lg:hidden group"
          >
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
              <ShoppingBasket className="h-4.5 w-4.5" />
            </div>
            <span className="font-display text-lg font-bold text-primary">PasarCek</span>
          </Link>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="login">Masuk</TabsTrigger>
              <TabsTrigger value="register">Daftar</TabsTrigger>
              <TabsTrigger value="forgot">Lupa</TabsTrigger>
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
    <form onSubmit={submit} className="space-y-4">
      <h2 className="text-2xl font-black">Masuk ke akun Anda</h2>
      <GoogleButton flow="login" />
      <div className="relative my-4 text-center text-xs text-[var(--color-gray-500)]">
        <span className="bg-[var(--color-gray-50)] px-2">atau email</span>
        <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-[var(--color-gray-100)]" />
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={busy}>
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
    <form onSubmit={submit} className="space-y-4">
      <h2 className="text-2xl font-black">Buat akun gratis</h2>
      <GoogleButton flow="register" />
      <div className="relative my-4 text-center text-xs text-[var(--color-gray-500)]">
        <span className="bg-[var(--color-gray-50)] px-2">atau email</span>
        <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-[var(--color-gray-100)]" />
      </div>
      <div>
        <Label>Nama lengkap</Label>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          maxLength={100}
        />
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <p className="text-xs text-[var(--color-gray-500)]">
        Dengan mendaftar Anda setuju dengan syarat & ketentuan PasarCek.
      </p>
      <Button type="submit" className="w-full" disabled={busy}>
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
    <form onSubmit={submit} className="space-y-4">
      <h2 className="text-2xl font-black">Lupa password</h2>
      <p className="text-sm text-[var(--color-gray-500)]">
        Masukkan email Anda, kami akan kirim tautan untuk mengatur ulang password.
      </p>
      <div>
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? "Mengirim..." : "Kirim Link Reset"}
      </Button>
    </form>
  );
}
