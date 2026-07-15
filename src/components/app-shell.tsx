import { ReactNode, useState } from "react";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/use-settings-context";
import {
  LayoutDashboard,
  Heart,
  Clock,
  Bell,
  User,
  Settings,
  LogOut,
  Crown,
  Shield,
  ShoppingBasket,
  ListChecks,
  Menu,
  X,
  TrendingUp,
  Scale,
  MapPin,
  Sun,
  Moon,
} from "lucide-react";

const nav = [
  { to: "/dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard },
  { to: "/prices", labelKey: "nav.todayPrices", icon: TrendingUp },
  { to: "/compare", labelKey: "nav.compare", icon: Scale },
  { to: "/markets", labelKey: "nav.markets", icon: MapPin },
  { to: "/smart-basket", labelKey: "nav.smartBasket", icon: ShoppingBasket },
  { to: "/wishlist", labelKey: "nav.shoppingList", icon: ListChecks },
  { to: "/favorites", labelKey: "nav.favorites", icon: Heart },
  { to: "/orders", labelKey: "nav.orders", icon: Clock },
  { to: "/notifications", labelKey: "nav.notifications", icon: Bell },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { profile, isAdmin } = useAuth();
  const router = useRouter();
  const qc = useQueryClient();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const { theme, lang, setTheme, setLang, t } = useSettings();

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    router.navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="app-shell min-h-screen bg-[var(--color-gray-50)] text-foreground">
      {/* Mobile topbar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--color-gray-100)] bg-card px-4 lg:hidden">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold tracking-tight group">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
            <ShoppingBasket className="h-4.5 w-4.5" />
          </div>
          <span className="font-display text-lg font-bold text-primary">PasarCek</span>
        </Link>
        <div className="flex items-center gap-2">
          {/* Quick Controls in Mobile Header */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded p-2 text-muted-foreground hover:bg-[var(--color-gray-50)] transition-colors"
            title={t("common.theme")}
          >
            {theme === "light" ? (
              <Moon className="h-4.5 w-4.5 text-zinc-600 dark:text-zinc-300" />
            ) : (
              <Sun className="h-4.5 w-4.5 text-yellow-500" />
            )}
          </button>
          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="rounded px-2.5 py-1 text-xs font-black text-primary border border-primary hover:bg-primary hover:text-white transition-all duration-200"
            title={t("common.language")}
          >
            {lang === "id" ? "EN" : "ID"}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="rounded p-2 hover:bg-[var(--color-gray-50)] text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 border-r border-[var(--color-gray-100)] bg-card transition-transform duration-200 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 flex flex-col justify-between",
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
        >
          <div className="flex flex-col">
            <div className="hidden h-14 items-center gap-2 border-b border-[var(--color-gray-100)] px-5 font-bold tracking-tight lg:flex">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-white shadow-soft">
                <ShoppingBasket className="h-4.5 w-4.5" />
              </div>
              <span className="font-display text-lg font-bold text-primary">PasarCek</span>
            </div>
            <nav className="flex flex-col gap-1 p-3">
              {nav.map((n) => {
                const active = path === n.to || path.startsWith(n.to + "/");
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                      active
                        ? "bg-gradient-primary text-white shadow-soft"
                        : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]",
                    )}
                  >
                    <n.icon className="h-4 w-4" />
                    {t(n.labelKey)}
                  </Link>
                );
              })}
              <div className="mt-3 border-t border-[var(--color-gray-100)] pt-3">
                <Link
                  to="/pricing"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md bg-[var(--color-accent-soft)] px-3 py-2 text-sm font-semibold text-[var(--color-brand-green)] hover:opacity-90"
                >
                  <Crown className="h-4 w-4" /> {t("nav.upgradePremium")}
                </Link>
              </div>
              {isAdmin && (
                <div className="mt-3 border-t border-[var(--color-gray-100)] pt-3">
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      path.startsWith("/admin")
                        ? "bg-[var(--color-ink)] text-white"
                        : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]",
                    )}
                  >
                    <Shield className="h-4 w-4" /> {t("nav.admin")}
                  </Link>
                </div>
              )}
              <div className="mt-3 border-t border-[var(--color-gray-100)] pt-3">
                <Link
                  to="/profile"
                  search={{ complete: "" }}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]"
                >
                  <User className="h-4 w-4" /> {profile?.full_name ?? t("nav.profile")}
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]"
                >
                  <Settings className="h-4 w-4" /> {t("nav.settings")}
                </Link>
                <button
                  onClick={signOut}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)] cursor-pointer"
                >
                  <LogOut className="h-4 w-4" /> {t("nav.logout")}
                </button>
              </div>
            </nav>
          </div>

          {/* Quick controls at bottom of sidebar */}
          <div className="border-t border-[var(--color-gray-100)] p-4 bg-muted/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[var(--color-gray-500)] uppercase tracking-wider">
                Convenience Mode
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              {/* Language toggle: ID / EN */}
              <div className="flex flex-1 rounded-lg border border-[var(--color-gray-100)] p-0.5 bg-[var(--color-gray-50)]">
                <button
                  type="button"
                  onClick={() => setLang("id")}
                  className={cn(
                    "flex-1 text-[11px] font-bold py-1 rounded-md text-center transition-all cursor-pointer",
                    lang === "id"
                      ? "bg-card text-primary shadow-sm"
                      : "text-[var(--color-gray-500)] hover:text-foreground",
                  )}
                >
                  ID
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={cn(
                    "flex-1 text-[11px] font-bold py-1 rounded-md text-center transition-all cursor-pointer",
                    lang === "en"
                      ? "bg-card text-primary shadow-sm"
                      : "text-[var(--color-gray-500)] hover:text-foreground",
                  )}
                >
                  EN
                </button>
              </div>

              {/* Theme toggle: Light / Dark */}
              <div className="flex flex-1 rounded-lg border border-[var(--color-gray-100)] p-0.5 bg-[var(--color-gray-50)]">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={cn(
                    "flex-1 flex justify-center py-1 rounded-md transition-all cursor-pointer",
                    theme === "light"
                      ? "bg-card text-yellow-500 shadow-sm"
                      : "text-[var(--color-gray-500)] hover:text-foreground",
                  )}
                  title={t("common.lightMode")}
                >
                  <Sun className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "flex-1 flex justify-center py-1 rounded-md transition-all cursor-pointer",
                    theme === "dark"
                      ? "bg-card text-blue-400 shadow-sm"
                      : "text-[var(--color-gray-500)] hover:text-foreground",
                  )}
                  title={t("common.darkMode")}
                >
                  <Moon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-20 bg-black/30 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <main className="min-h-screen flex-1 lg:ml-0 bg-[var(--color-gray-50)] transition-colors duration-200">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: ReactNode;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <h1 className="flex items-center gap-2.5 flex-wrap text-3xl font-black tracking-tight text-[var(--color-ink)] sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm text-[var(--color-gray-500)] sm:text-base">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
  accent?: "blue" | "green" | "warning" | "danger";
}) {
  const color =
    accent === "green"
      ? "var(--color-brand-green)"
      : accent === "warning"
        ? "var(--color-warning)"
        : accent === "danger"
          ? "var(--color-destructive)"
          : "var(--color-brand-blue)";
  return (
    <div className="rounded-lg border border-[var(--color-gray-100)] bg-card p-5 shadow-sm transition-all hover:shadow-md duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]">
            {label}
          </p>
          <div className="mt-2 text-2xl font-black text-[var(--color-ink)] sm:text-3xl">
            {value}
          </div>
          {hint && <p className="mt-1 text-xs text-[var(--color-gray-500)]">{hint}</p>}
        </div>
        {Icon && (
          <div
            className="shrink-0 rounded-md p-2"
            style={{ backgroundColor: color, color: "white" }}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--color-gray-100)] bg-card px-6 py-12 text-center">
      <h3 className="text-lg font-bold text-[var(--color-ink)]">{title}</h3>
      {description && <p className="mt-2 text-sm text-[var(--color-gray-500)]">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Section({
  title,
  action,
  children,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mb-8">
      {(title || action) && (
        <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          {title && <h2 className="truncate text-lg font-bold text-[var(--color-ink)]">{title}</h2>}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
