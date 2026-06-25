import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { idr } from "@/lib/format";
import { Check, Crown, ShoppingBasket } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Paket Berlangganan — PasarCek" },
      { name: "description", content: "Pilih paket Premium PasarCek mulai Rp9.900/bulan untuk fitur unlimited alert, analitik penghematan, dan prediksi harga sembako." },
      { property: "og:title", content: "Paket Berlangganan — PasarCek" },
      { property: "og:description", content: "Mulai Rp9.900/bulan. Unlimited price alert, prediksi harga, dan analitik penghematan." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: packages } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => (await supabase.from("packages").select("*").eq("is_active", true).order("sort_order")).data ?? [],
  });

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      <header className="border-b border-[var(--color-gray-100)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 font-bold group">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
              <ShoppingBasket className="h-4.5 w-4.5" />
            </div>
            <span className="font-display text-lg font-bold text-primary">PasarCek</span>
          </Link>
          <Button asChild variant="outline">
            <Link to={user ? "/dashboard" : "/auth"}>
              {user ? "Dashboard" : "Masuk"}
            </Link>
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-black sm:text-5xl">Belanja Lebih Cerdas Bersama PasarCek</h1>
          <p className="mt-4 text-[var(--color-gray-500)]">Mulai gratis, upgrade kapan saja untuk fitur premium yang membantu Anda hemat lebih banyak.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {(packages ?? []).map((p: any) => {
            const featured = p.slug === "premium";
            return (
              <div key={p.id} className={`relative rounded-xl border bg-white p-6 ${featured ? "border-[var(--color-brand-blue)] shadow-elevated" : "border-[var(--color-gray-100)]"}`}>
                {featured && <span className="absolute -top-3 right-4 rounded-full bg-[var(--color-brand-blue)] px-3 py-1 text-xs font-bold uppercase text-white">Populer</span>}
                <div className="flex items-center gap-2">
                  {featured && <Crown className="h-5 w-5 text-[var(--color-brand-blue)]" />}
                  <h3 className="text-xl font-bold">{p.name}</h3>
                </div>
                <p className="mt-3 text-4xl font-black">{p.price === 0 ? "Gratis" : idr(p.price)}</p>
                <p className="text-xs text-[var(--color-gray-500)]">{p.price === 0 ? "Selamanya" : p.duration_days === 365 ? "/tahun" : "/bulan"}</p>
                {p.description && <p className="mt-3 text-sm text-[var(--color-gray-700)]">{p.description}</p>}
                <ul className="mt-5 space-y-2">
                  {((p.benefits as string[]) ?? []).map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" /><span>{b}</span></li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full"
                  variant={featured ? "default" : "outline"}
                  onClick={() => {
                    if (user) {
                      navigate({ to: "/checkout", search: { package: p.slug } as any });
                    } else {
                      navigate({ to: "/auth", search: { tab: "register" } as any });
                    }
                  }}
                  disabled={p.price === 0}
                >
                  {p.price === 0 ? "Paket aktif" : "Pilih Paket"}
                </Button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
