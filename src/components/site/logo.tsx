import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import markSrc from "@/assets/brand/pasarcek-mark.png";

/**
 * The PasarCek basket icon. On dark surfaces (`onDark`) it sits on a paper tile so the
 * brand blue stays legible.
 */
export function LogoMark({ className, onDark }: { className?: string; onDark?: boolean }) {
  if (onDark) {
    return (
      <span className={cn("grid h-10 w-10 place-items-center rounded-[9px] bg-[#f4efe4] p-1", className)}>
        <img src={markSrc} alt="" width={64} height={64} className="h-full w-full object-contain" />
      </span>
    );
  }
  return (
    <img
      src={markSrc}
      alt=""
      width={64}
      height={64}
      className={cn("h-10 w-10 object-contain dark:rounded-[9px] dark:bg-[#f4efe4] dark:p-1", className)}
    />
  );
}

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link to="/" aria-label="PasarCek" className={cn("group inline-flex items-center gap-2", className)}>
      <LogoMark
        onDark={inverted}
        className="transition-transform duration-300 group-hover:-rotate-6"
      />
      <span className="font-display text-[1.4rem] font-extrabold leading-none tracking-[-0.035em]">
        <span className={inverted ? "text-[#f4efe4]" : "text-[#1e3a8a] dark:text-[#c3d2fa]"}>Pasar</span>
        <span className={inverted ? "text-[#6fd6d3]" : "text-[#127a79] dark:text-[#3fc2bf]"}>Cek</span>
      </span>
    </Link>
  );
}
