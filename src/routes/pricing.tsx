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
          <h1 className="text-4xl font-black sm:text-5xl tracking-tight text-[var(--color-ink)]">
            Belanja Lebih Cerdas Bersama{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-green)]">
              PasarCek
            </span>
          </h1>
          <p className="mt-4 text-[var(--color-gray-500)] text-sm sm:text-base">
            Mulai gratis, upgrade kapan saja untuk fitur premium yang membantu Anda hemat lebih banyak.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3 items-stretch">
          {(packages ?? []).map((p: any) => {
            const featured = p.slug === "premium";
            return (
              <div
                key={p.id}
                className={`relative rounded-xl border bg-white p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] ${
                  featured
                    ? "border-[var(--color-brand-green)] shadow-elevated ring-1 ring-[var(--color-brand-green)]/15"
                    : "border-[var(--color-gray-100)] shadow-soft"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-green)] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                    Populer
                  </span>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    {featured && <Crown className="h-5 w-5 text-amber-500 fill-amber-500/10" />}
                    <h3 className="text-xl font-black text-[var(--color-ink)]">{p.name}</h3>
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tight text-[var(--color-ink)]">
                      {p.price === 0 ? "Gratis" : idr(p.price)}
                    </span>
                    <span className="text-xs text-[var(--color-gray-500)] font-medium">
                      {p.price === 0 ? "/ selamanya" : p.duration_days === 365 ? "/ tahun" : "/ bulan"}
                    </span>
                  </div>
                  {p.description && (
                    <p className="mt-3 text-xs text-[var(--color-gray-500)] leading-relaxed">
                      {p.description}
                    </p>
                  )}
                  
                  <div className="my-5 border-t border-[var(--color-gray-100)]" />
                  
                  <ul className="space-y-2.5">
                    {((p.benefits as string[]) ?? []).map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--color-gray-700)]">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 rounded-full p-0.5 ${
                            featured
                              ? "bg-[var(--color-brand-green)]/10 text-[var(--color-brand-green)]"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        />
                        <span className="leading-normal">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Button
                    className={`w-full font-bold h-10 transition-all ${
                      featured
                        ? "bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-green)] text-white hover:opacity-95 hover:scale-[1.01] border-0 shadow-md shadow-emerald-500/5"
                        : "border-[var(--color-gray-100)] text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]"
                    }`}
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
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
