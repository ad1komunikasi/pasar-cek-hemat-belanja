import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, TrendingUp, Scale, MapPin, ShoppingBasket,
  Heart, Bell, User, Settings, LogOut, Shield, Menu, X, Crown, Clock, ListChecks,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/prices", label: "Harga Hari Ini", icon: TrendingUp },
  { to: "/compare", label: "Bandingkan", icon: Scale },
  { to: "/markets", label: "Pasar", icon: MapPin },
  { to: "/smart-basket", label: "Smart Basket", icon: ShoppingBasket },
  { to: "/wishlist", label: "Daftar Belanja", icon: ListChecks },
  { to: "/favorites", label: "Favorit", icon: Heart },
  { to: "/orders", label: "Riwayat Pesanan", icon: Clock },
  { to: "/notifications", label: "Notifikasi", icon: Bell },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { profile, isAdmin } = useAuth();
  const router = useRouter();
  const qc = useQueryClient();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    router.navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="app-shell min-h-screen bg-[var(--color-gray-50)]">
      {/* Mobile topbar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--color-gray-100)] bg-white px-4 lg:hidden">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold tracking-tight group">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
            <ShoppingBasket className="h-4.5 w-4.5" />
          </div>
          <span className="font-display text-lg font-bold text-primary">PasarCek</span>
        </Link>
        <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="rounded p-2 hover:bg-[var(--color-gray-50)]">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 border-r border-[var(--color-gray-100)] bg-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
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
                    active ? "bg-gradient-primary text-white shadow-soft" : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]",
                  )}
                >
                  <n.icon className="h-4 w-4" />
                  {n.label}
                </Link>
              );
            })}
            <div className="mt-3 border-t border-[var(--color-gray-100)] pt-3">
              <Link to="/pricing" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-md bg-[var(--color-accent-soft)] px-3 py-2 text-sm font-semibold text-[var(--color-brand-green)] hover:opacity-90">
                <Crown className="h-4 w-4" /> Upgrade Premium
              </Link>
            </div>
            {isAdmin && (
              <div className="mt-3 border-t border-[var(--color-gray-100)] pt-3">
                <Link to="/admin" onClick={() => setOpen(false)} className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  path.startsWith("/admin") ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]",
                )}>
                  <Shield className="h-4 w-4" /> Admin
                </Link>
              </div>
            )}
            <div className="mt-3 border-t border-[var(--color-gray-100)] pt-3">
              <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]">
                <User className="h-4 w-4" /> {profile?.full_name ?? "Profil"}
              </Link>
              <Link to="/settings" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]">
                <Settings className="h-4 w-4" /> Pengaturan
              </Link>
              <button onClick={signOut} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]">
                <LogOut className="h-4 w-4" /> Keluar
              </button>
            </div>
          </nav>
        </aside>

        {open && <div className="fixed inset-0 z-20 bg-black/30 lg:hidden" onClick={() => setOpen(false)} />}

        <main className="min-h-screen flex-1 lg:ml-0">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function PageHeader({ title, description, action }: { title: ReactNode; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <h1 className="flex items-center gap-2.5 flex-wrap text-3xl font-black tracking-tight text-[var(--color-ink)] sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 text-sm text-[var(--color-gray-500)] sm:text-base">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function StatCard({ label, value, hint, icon: Icon, accent }: { label: string; value: ReactNode; hint?: string; icon?: React.ComponentType<{ className?: string }>; accent?: "blue" | "green" | "warning" | "danger" }) {
  const color = accent === "green" ? "var(--color-brand-green)" : accent === "warning" ? "var(--color-warning)" : accent === "danger" ? "var(--color-destructive)" : "var(--color-brand-blue)";
  return (
    <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wider text-[var(--color-gray-500)]">{label}</p>
          <div className="mt-2 text-2xl font-black text-[var(--color-ink)] sm:text-3xl">{value}</div>
          {hint && <p className="mt-1 text-xs text-[var(--color-gray-500)]">{hint}</p>}
        </div>
        {Icon && <div className="shrink-0 rounded-md p-2" style={{ backgroundColor: color, color: "white" }}>
          <Icon className="h-5 w-5" />
        </div>}
      </div>
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--color-gray-100)] bg-white px-6 py-12 text-center">
      <h3 className="text-lg font-bold text-[var(--color-ink)]">{title}</h3>
      {description && <p className="mt-2 text-sm text-[var(--color-gray-500)]">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Section({ title, action, children }: { title?: string; action?: ReactNode; children: ReactNode }) {
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
