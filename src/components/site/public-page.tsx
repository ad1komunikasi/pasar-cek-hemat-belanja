import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { MarketField } from "./market-field";

/** Shell for the public marketing pages: header + ticker, paper grain, footer. */
export function PublicPage({ children }: { children: ReactNode }) {
  return (
    <div className="grain min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="relative z-10">{children}</main>
      <SiteFooter />
    </div>
  );
}

/** Editorial page intro with the animated market field behind it. */
export function PageIntro({
  eyebrow,
  title,
  lede,
  children,
  className,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-rule", className)}>
      <MarketField className="[mask-image:radial-gradient(ellipse_60%_90%_at_100%_0%,#000_10%,transparent_80%)]" />
      <div className="relative mx-auto max-w-[1240px] px-5 pb-16 pt-14 sm:px-8 md:pb-24 md:pt-24">
        <div className="eyebrow flex items-center gap-3 text-foreground/55 animate-rise">
          <span className="h-px w-8 bg-current opacity-40" />
          {eyebrow}
        </div>
        <h1 className="display-xl mt-6 max-w-4xl text-[clamp(2.6rem,6vw,5rem)] animate-rise [animation-delay:80ms]">
          {title}
        </h1>
        {lede && (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-foreground/65 animate-rise [animation-delay:160ms]">
            {lede}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
