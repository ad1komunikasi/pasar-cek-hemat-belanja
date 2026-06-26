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
      <DialogContent className="max-w-md border-0 bg-gradient-to-b from-[#0b1528] to-[#040814] text-white p-6 shadow-2xl rounded-2xl overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[var(--color-brand-green)] opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-[var(--color-primary)] opacity-20 blur-3xl pointer-events-none" />

        <DialogHeader className="text-center relative z-10 flex flex-col items-center">
          <div className="mx-auto my-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse">
            <Crown className="h-7 w-7 stroke-[1.5]" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200">
            Buka Fitur Premium
          </DialogTitle>
          {featureName && (
            <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-[11px] font-bold text-amber-300">
              <Sparkles className="h-3 w-3" />
              Memerlukan fitur: {featureName}
            </div>
          )}
          <DialogDescription className="text-slate-300 text-sm mt-2 max-w-xs mx-auto">
            Mulai hemat belanja Anda secara maksimal dengan berlangganan paket Premium PasarCek.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 space-y-3.5 relative z-10">
          {benefits.map((b, idx) => (
            <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-100">{b.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-amber-400 font-bold bg-amber-500/10 py-2 rounded-xl border border-amber-500/20 mb-6">
          Hanya Rp9.900/bulan — Upgrade kapan saja!
        </div>

        <div className="flex flex-col gap-2 relative z-10">
          <Button asChild className="w-full h-11 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:from-amber-600 hover:to-yellow-600 font-black shadow-lg shadow-amber-500/25 border-0 rounded-xl transition-all duration-300 hover:scale-[1.02]">
            <Link to="/pricing">
              Upgrade Sekarang
            </Link>
          </Button>
          <Button variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-white/5" onClick={() => onOpenChange(false)}>
            Mungkin Nanti
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
