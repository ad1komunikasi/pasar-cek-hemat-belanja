import { AlertTriangle, Database } from "lucide-react";
import { fmtDate } from "@/lib/format";

/**
 * Honest data-provenance strip for price views. Shows a clear warning whenever any of the
 * displayed prices are simulated placeholders rather than recorded prices.
 */
export function DataNotice({
  simulated,
  date,
  className = "",
}: {
  simulated: boolean;
  date?: string | Date | null;
  className?: string;
}) {
  if (simulated) {
    return (
      <div
        role="note"
        className={`flex flex-wrap items-start justify-between gap-3 rounded-lg border border-amber-300/70 bg-amber-50 p-4 text-xs text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100 ${className}`}
      >
        <div className="flex max-w-3xl items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Data contoh (simulasi).</strong> Harga di halaman ini
            belum berasal dari sumber resmi atau pencatatan lapangan dan hanya untuk uji coba fitur.
            Jangan dijadikan acuan belanja. Integrasi sumber harga resmi sedang disiapkan.
          </p>
        </div>
        {date && (
          <span className="shrink-0 text-amber-900/70 dark:text-amber-100/70">
            Tanggal: <strong className="font-semibold">{fmtDate(date)}</strong>
          </span>
        )}
      </div>
    );
  }
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] p-4 text-xs text-[var(--color-gray-700)] ${className}`}
    >
      <span className="flex items-center gap-1.5 font-medium">
        <Database className="h-3.5 w-3.5 text-[var(--color-brand-blue)]" />
        Harga tercatat di database PasarCek
      </span>
      {date && (
        <span className="text-[var(--color-gray-500)]">
          Tanggal data: <strong className="text-[var(--color-brand-blue)]">{fmtDate(date)}</strong>
        </span>
      )}
    </div>
  );
}
