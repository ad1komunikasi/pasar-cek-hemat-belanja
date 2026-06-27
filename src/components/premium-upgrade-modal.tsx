import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Crown, Check, Sparkles } from "lucide-react";

interface PremiumUpgradeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  featureName?: string;
}

export function PremiumUpgradeModal({ isOpen, onOpenChange, featureName }: PremiumUpgradeModalProps) {
  const benefits = [
    { title: "Alert Harga Tanpa Batas", desc: "Pantau harga komoditas penting di pasar favorit Anda secara real-time." },
    { title: "Prediksi Harga AI", desc: "Ketahui tren kenaikan atau penurunan harga bahan pangan untuk 7 hari ke depan." },
    { title: "Riwayat Penghematan 90 Hari", desc: "Lacak performa belanja hemat Anda dalam grafik yang interaktif." },
    { title: "Analitik Tren 90 Hari", desc: "Analisis grafik histori pergerakan harga untuk strategi belanja optimal." },
    { title: "Smart Basket Lengkap", desc: "Simulasikan belanja tanpa batas produk dan bandingkan lintas pasar sekaligus." },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[95vw] sm:w-full border-0 bg-white p-0 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[92vh] md:max-h-[88vh] gap-0 [&>button]:text-white/80 [&>button]:hover:text-white [&>button]:focus:ring-white/30">
        <DialogHeader className="bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-green)] px-6 py-6 sm:py-8 text-white relative overflow-hidden text-center flex flex-col items-center sm:text-center shrink-0">
          {/* Decorative background glow */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 h-28 w-28 rounded-full bg-white/5 blur-xl pointer-events-none" />

          <div className="relative z-10 mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-amber-950 font-bold border-2 border-white shadow-soft animate-float">
            <Crown className="h-7 w-7 stroke-[2]" />
          </div>
          <DialogTitle className="relative z-10 text-2xl font-black tracking-tight text-white font-display text-center">
            Buka Fitur Premium
          </DialogTitle>
          {featureName && (
            <div className="relative z-10 mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/10 text-[11px] font-extrabold text-white backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
              <span>Memerlukan: {featureName}</span>
            </div>
          )}
          <DialogDescription className="relative z-10 text-white/80 text-xs mt-2.5 max-w-xs mx-auto leading-relaxed text-center">
            Mulai hemat belanja Anda secara maksimal dengan berlangganan paket Premium PasarCek.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 overflow-y-auto flex-1 flex flex-col justify-between min-h-0">
          <div className="space-y-3 relative z-10">
            {benefits.map((b, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] hover:bg-[var(--color-accent-soft)]/20 hover:border-[var(--color-brand-green)]/20 transition-all duration-200 group">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-green)]/10 text-[var(--color-brand-green)] group-hover:scale-105 transition-transform duration-200">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-[var(--color-ink)]">{b.title}</p>
                  <p className="text-[10px] text-[var(--color-gray-500)] mt-0.5 leading-normal">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-[var(--color-brand-green)] font-black bg-[var(--color-accent-soft)] py-2.5 rounded-xl border border-[var(--color-brand-green)]/10 my-5 shadow-2xs shrink-0">
            Hanya Rp9.900/bulan — Upgrade kapan saja!
          </div>

          <div className="flex flex-col gap-2 relative z-10 shrink-0 mt-auto">
            <Button asChild className="w-full h-11 bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-green)] text-white hover:opacity-95 font-bold shadow-md rounded-xl transition-all duration-300 hover:scale-[1.01] border-0">
              <Link to="/pricing">
                Upgrade Sekarang
              </Link>
            </Button>
            <Button variant="ghost" className="w-full text-[var(--color-gray-500)] hover:text-[var(--color-ink)] hover:bg-[var(--color-gray-50)]" onClick={() => onOpenChange(false)}>
              Mungkin Nanti
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
