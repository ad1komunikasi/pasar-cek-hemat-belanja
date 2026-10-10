import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { idr } from "@/lib/format";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PublicPage, PageIntro } from "@/components/site/public-page";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Paket Berlangganan — PasarCek" },
      {
        name: "description",
        content:
          "Pilih paket Premium PasarCek mulai Rp9.900/bulan untuk fitur unlimited alert, analitik penghematan, dan prediksi harga sembako.",
      },
      { property: "og:title", content: "Paket Berlangganan — PasarCek" },
      {
        property: "og:description",
        content:
          "Mulai Rp9.900/bulan. Unlimited price alert, prediksi harga, dan analitik penghematan.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: packages } = useQuery({
    queryKey: ["packages"],
    queryFn: async () =>
      (await supabase.from("packages").select("*").eq("is_active", true).order("sort_order"))
        .data ?? [],
  });

  const choose = (slug: string) => {
    if (user) navigate({ to: "/checkout", search: { package: slug } as any });
    else navigate({ to: "/auth", search: { tab: "register" } as any });
  };

  return (
    <PublicPage>
      <PageIntro
        eyebrow="Paket"
        title="Mulai gratis. Tingkatkan kalau sudah terasa hematnya."
        lede="Semua paket memakai data harga yang sama. Bedanya ada di alarm, prediksi, dan analitik penghematan."
      />
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 md:py-24">
        <div className="grid items-stretch gap-5 md:grid-cols-3">
          {(packages ?? []).map((p: any) => {
            const featured = p.slug === "premium";
            const free = p.price === 0;
            return (
              <div
                key={p.id}
                className={cn(
                  "relative flex flex-col rounded-[14px] p-8",
                  featured
                    ? "grain overflow-hidden bg-[#0f1d47] text-[#f4efe4] shadow-elevated"
                    : "border border-rule bg-card",
                )}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <span className={cn("eyebrow", featured ? "text-[#f4efe4]/60" : "text-foreground/55")}>
                    {p.name}
                  </span>
                  {featured && (
                    <span className="eyebrow rounded-sm bg-turmeric px-2 py-1 text-[10px] text-[#2a1d03]">
                      Paling dipilih
                    </span>
                  )}
                </div>
                <div className="relative z-10 mt-5 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold tracking-tight">
                    {free ? "Rp0" : idr(p.price).replace(/\s/g, "")}
                  </span>
                  <span className={featured ? "text-[#f4efe4]/55" : "text-foreground/50"}>
                    {free ? "selamanya" : p.duration_days === 365 ? "/tahun" : "/bulan"}
                  </span>
                </div>
                {p.description && (
                  <p className={cn("relative z-10 mt-3 leading-relaxed", featured ? "text-[#f4efe4]/65" : "text-foreground/60")}>
                    {p.description}
                  </p>
                )}
                <ul
                  className={cn(
                    "relative z-10 mt-7 flex-1 space-y-3 border-t pt-6",
                    featured ? "border-white/12" : "border-rule",
                  )}
                >
                  {((p.benefits as string[]) ?? []).map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        className={cn("mt-0.5 h-4 w-4 shrink-0", featured ? "text-turmeric" : "text-leaf")}
                        strokeWidth={2.5}
                      />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => choose(p.slug)}
                  disabled={free}
                  className={cn(
                    "group relative z-10 mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-md font-medium transition-colors",
                    featured
                      ? "bg-turmeric text-[#2a1d03] hover:bg-[#f2bf4d]"
                      : "border border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background",
                    free && "pointer-events-none border-rule text-foreground/45",
                  )}
                >
                  {free ? "Paket aktif" : "Pilih paket"}
                  {!free && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
                </button>
              </div>
            );
          })}
        </div>
        <p className="mt-10 font-mono text-xs text-foreground/45">
          Pembayaran via transfer bank / e-wallet, diverifikasi manual. Tanpa kartu kredit.
        </p>
      </div>
    </PublicPage>
  );
}
