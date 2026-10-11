import { AlertTriangle, Database, ExternalLink } from "lucide-react";
import { fmtDate } from "@/lib/format";
import { isSimulatedSource } from "@/lib/benchmark";

const SOURCE_LINKS: Record<string, string> = {
  "SP2KP Kemendag": "https://sp2kp.kemendag.go.id/",
};

/** Summarises where a list of price rows comes from. */
export function summarizeSources(rows: { source?: string | null }[]) {
  let simulated = 0;
  const sources = new Map<string, number>();
  for (const r of rows) {
    if (isSimulatedSource(r.source)) simulated++;
    else sources.set(r.source as string, (sources.get(r.source as string) ?? 0) + 1);
  }
  return { simulated, real: rows.length - simulated, sources: [...sources.keys()] };
}

function SourceList({ sources }: { sources: string[] }) {
  return (
    <>
      {sources.map((s, i) => {
        const base = s.split(" — ")[0];
        const href = SOURCE_LINKS[base];
        return (
          <span key={s}>
            {i > 0 && ", "}
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 font-semibold underline underline-offset-2"
              >
                {s}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <strong className="font-semibold">{s}</strong>
            )}
          </span>
        );
      })}
    </>
  );
}

/**
 * Honest data-provenance strip for price views: names the real sources, and warns clearly
 * whenever some or all displayed prices are simulated placeholders.
 */
export function DataNotice({
  rows,
  date,
  className = "",
}: {
  rows: { source?: string | null }[];
  date?: string | Date | null;
  className?: string;
}) {
  const { simulated, real, sources } = summarizeSources(rows);
  const dateEl = date && (
    <span className="shrink-0 opacity-75">
      Tanggal data: <strong className="font-semibold">{fmtDate(date)}</strong>
    </span>
  );

  if (simulated > 0) {
    return (
      <div
        role="note"
        className={`flex flex-wrap items-start justify-between gap-3 rounded-lg border border-amber-300/70 bg-amber-50 p-4 text-xs text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100 ${className}`}
      >
        <div className="flex max-w-3xl items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="leading-relaxed">
            {real > 0 ? (
              <>
                <strong className="font-semibold">
                  {real} dari {rows.length} harga
                </strong>{" "}
                bersumber dari <SourceList sources={sources} />. Sisanya{" "}
                <strong className="font-semibold">data contoh (simulasi)</strong> untuk pasar atau
                produk yang belum dipantau, ditandai “contoh” — jangan dijadikan acuan belanja.
              </>
            ) : (
              <>
                <strong className="font-semibold">Data contoh (simulasi).</strong> Harga di halaman
                ini belum berasal dari sumber resmi atau pencatatan lapangan dan hanya untuk uji
                coba fitur. Jangan dijadikan acuan belanja.
              </>
            )}
          </p>
        </div>
        {dateEl}
      </div>
    );
  }
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] p-4 text-xs text-[var(--color-gray-700)] ${className}`}
    >
      <span className="flex items-center gap-1.5">
        <Database className="h-3.5 w-3.5 text-[var(--color-brand-blue)]" />
        Sumber: <SourceList sources={sources} />
      </span>
      {dateEl}
    </div>
  );
}
