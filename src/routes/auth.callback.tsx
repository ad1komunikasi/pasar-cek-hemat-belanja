import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Route: /auth/callback
 *
 * Supabase Google OAuth mengirim pengguna kembali ke sini setelah login berhasil.
 * Route ini bertugas:
 *  1. Menukar code/token dari URL hash/fragment menjadi sesi Supabase aktif.
 *  2. Me-redirect pengguna ke /dashboard.
 *
 * PENTING: URL ini harus didaftarkan di:
 *  - Supabase Dashboard → Authentication → URL Configuration → Redirect URLs
 *    Tambahkan: https://[domain-produksi-anda]/auth/callback
 *  - Google Cloud Console → OAuth 2.0 → Authorized redirect URIs
 *    Tambahkan: https://[domain-produksi-anda]/auth/callback
 */

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function handleCallback() {
      try {
        // Supabase secara otomatis memproses token dari URL hash (#access_token=...)
        // atau code dari query string (?code=...) tergantung flow yang digunakan.
        // Kita cukup memanggil getSession() setelah onAuthStateChange() mendeteksi perubahan.
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("[AuthCallback] getSession error:", error);
          toast.error("Gagal memverifikasi sesi. Silakan coba lagi.");
          if (!cancelled) navigate({ to: "/auth", replace: true });
          return;
        }

        if (data.session) {
          // Sesi sudah aktif — langsung ke dashboard
          if (!cancelled) navigate({ to: "/dashboard", replace: true });
          return;
        }

        // Jika belum ada sesi, tunggu event SIGNED_IN dari Supabase
        // (terjadi saat token di URL hash diproses oleh library)
        const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
          if (cancelled) return;
          if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && session) {
            sub.subscription.unsubscribe();
            navigate({ to: "/dashboard", replace: true });
          } else if (event === "SIGNED_OUT") {
            sub.subscription.unsubscribe();
            toast.error("Login dibatalkan. Silakan coba lagi.");
            navigate({ to: "/auth", replace: true });
          }
        });

        // Timeout fallback — jika 10 detik tidak ada event, kembali ke halaman auth
        setTimeout(() => {
          if (cancelled) return;
          sub.subscription.unsubscribe();
          toast.error("Waktu verifikasi habis. Silakan coba lagi.");
          navigate({ to: "/auth", replace: true });
        }, 10_000);
      } catch (err) {
        console.error("[AuthCallback] Unexpected error:", err);
        if (!cancelled) {
          toast.error("Terjadi kesalahan tak terduga.");
          navigate({ to: "/auth", replace: true });
        }
      }
    }

    handleCallback();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Loading spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm font-medium text-foreground">Memverifikasi akun…</p>
        <p className="text-xs text-muted-foreground">Harap tunggu sebentar</p>
      </div>
    </div>
  );
}
