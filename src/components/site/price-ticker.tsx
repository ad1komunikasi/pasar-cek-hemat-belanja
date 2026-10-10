import { useMarketBoards, rupiah } from "./use-market-prices";
import { cn } from "@/lib/utils";

/** Running price tape — the market's pulse, in one line. */
export function PriceTicker({ className }: { className?: string }) {
  const { data = [] } = useMarketBoards();
  const items = data.slice(0, 12);
  if (!items.length) return null;

  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((b) => {
        const down = b.change < -0.0005;
        const up = b.change > 0.0005;
        return (
          <li
            key={b.name}
            className="flex items-center gap-2.5 whitespace-nowrap border-r border-white/10 px-5"
          >
            <span className="text-white/55">{b.name.toUpperCase()}</span>
            <span className="text-[#f4efe4]">{rupiah(b.min)}</span>
            <span className="text-white/35">/{b.unit}</span>
            <span
              className={cn(
                "tabular",
                down && "text-[#7fd3a6]",
                up && "text-[#ff8a70]",
                !down && !up && "text-white/45",
              )}
            >
              {down ? "▼" : up ? "▲" : "■"} {Math.abs(b.change * 100).toFixed(1).replace(".", ",")}%
            </span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      className={cn(
        "group relative overflow-hidden bg-[#0a2e22] py-2 font-mono text-[11px] tracking-wide",
        className,
      )}
    >
      <div className="flex w-max animate-ticker group-hover:[animation-play-state:paused]">
        {row()}
        {row(true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a2e22] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a2e22] to-transparent" />
    </div>
  );
}
