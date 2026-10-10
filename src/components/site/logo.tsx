import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** Price-tag mark: the thing every pasar stall hangs over its goods. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={cn("h-8 w-8", className)}>
      <rect width="32" height="32" rx="7" className="fill-tarp" />
      <path
        d="M8 9.5A1.5 1.5 0 0 1 9.5 8h7.4a2 2 0 0 1 1.4.6l6.5 6.5a2 2 0 0 1 0 2.8l-6.6 6.6a2 2 0 0 1-2.8 0L8.6 17.9A2 2 0 0 1 8 16.5z"
        className="fill-paper"
      />
      <circle cx="12.6" cy="12.6" r="2" className="fill-turmeric" />
    </svg>
  );
}

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-6" />
      <span
        className={cn(
          "font-display text-[1.35rem] font-bold leading-none tracking-[-0.04em]",
          inverted ? "text-[#f4efe4]" : "text-foreground",
        )}
      >
        pasar<span className={inverted ? "text-turmeric" : "text-tarp"}>cek</span>
      </span>
    </Link>
  );
}
