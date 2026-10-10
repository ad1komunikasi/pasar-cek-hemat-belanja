import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useSettings } from "@/hooks/use-settings-context";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { PriceTicker } from "./price-ticker";

export function SiteHeader({ ticker = true }: { ticker?: boolean }) {
  const { user } = useAuth();
  const { theme, setTheme, lang, setLang, t } = useSettings();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/#harga-hari-ini", label: lang === "id" ? "Harga hari ini" : "Today's prices" },
    { href: "/#fitur", label: t("nav.features") },
    { href: "/#smart-basket", label: "Smart Basket" },
    { href: "/#paket", label: t("nav.pricing") },
    { href: "/#faq", label: t("nav.faq") },
  ];

  const appHref = user ? "/dashboard" : "/auth?tab=register";
  const appLabel = user ? t("nav.backToApp") : lang === "id" ? "Coba gratis" : "Try it free";

  return (
    <header className="sticky top-0 z-50">
      {ticker && <PriceTicker />}
      <div
        className={cn(
          "border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open
            ? "border-rule bg-background/85 backdrop-blur-xl"
            : "border-transparent bg-background/0",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-md px-3 py-2 text-[0.9rem] text-foreground/70 transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setLang(lang === "id" ? "en" : "id")}
              className="hidden h-9 items-center rounded-md px-2 font-mono text-[11px] tracking-wider text-foreground/60 transition-colors hover:text-foreground sm:flex"
              aria-label={t("common.language")}
            >
              <span className={lang === "id" ? "text-foreground" : ""}>ID</span>
              <span className="mx-1 text-foreground/25">/</span>
              <span className={lang === "en" ? "text-foreground" : ""}>EN</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="grid h-9 w-9 place-items-center rounded-md text-foreground/60 transition-colors hover:text-foreground"
              aria-label={t("common.theme")}
            >
              {theme === "light" ? <Moon className="h-[17px] w-[17px]" /> : <Sun className="h-[17px] w-[17px]" />}
            </button>
            {!user && (
              <Link
                to="/auth"
                search={{ tab: "login" }}
                className="hidden h-9 items-center rounded-md px-3 text-[0.9rem] text-foreground/75 transition-colors hover:text-foreground sm:flex"
              >
                {t("nav.login")}
              </Link>
            )}
            <a
              href={appHref}
              className="group ml-1 hidden h-9 items-center gap-1.5 rounded-md bg-tarp pl-3.5 pr-3 text-[0.9rem] font-medium text-primary-foreground transition-colors hover:bg-tarp-ink sm:inline-flex dark:hover:bg-leaf"
            >
              {appLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="grid h-9 w-9 place-items-center rounded-md text-foreground lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="h-[calc(100dvh-6rem)] overflow-y-auto border-t border-rule px-5 pb-10 pt-4 lg:hidden">
            <ul>
              {links.map((l, i) => (
                <li key={l.href} className="border-b border-rule">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4 font-display text-2xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs text-foreground/40">0{i + 1}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <a
                href={appHref}
                className="flex h-12 items-center justify-center gap-2 rounded-md bg-tarp font-medium text-primary-foreground"
              >
                {appLabel} <ArrowUpRight className="h-4 w-4" />
              </a>
              {!user && (
                <Link
                  to="/auth"
                  search={{ tab: "login" }}
                  className="flex h-12 items-center justify-center rounded-md border border-rule font-medium"
                >
                  {t("nav.login")}
                </Link>
              )}
              <button
                type="button"
                onClick={() => setLang(lang === "id" ? "en" : "id")}
                className="mt-2 font-mono text-xs tracking-wider text-foreground/60"
              >
                {lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
