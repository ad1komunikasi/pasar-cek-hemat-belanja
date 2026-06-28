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
          <div className="hidden h-14 items-center gap-2 border-b border-[var(--color-gray-100)] px-5 font-black uppercase tracking-tighter lg:flex">
            <div className="grid h-8 w-8 place-items-center bg-black text-white">
              <ShoppingBasket className="h-4.5 w-4.5" />
            </div>
            <span className="text-lg font-extrabold text-black">PasarCek</span>
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
                    "flex items-center gap-3 rounded-none px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors",
                    active ? "bg-black text-white" : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)]",
                  )}
                >
                  <n.icon className="h-3.5 w-3.5" />
                  {n.label}
                </Link>
              );
            })}
            <div className="mt-3 border-t border-[var(--color-gray-100)] pt-3">
              <Link to="/pricing" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-none bg-[var(--color-swiss-red)] px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:opacity-90">
                <Crown className="h-4 w-4 fill-white" /> Upgrade Premium
              </Link>
            </div>
            {isAdmin && (
              <div className="mt-3 border-t border-[var(--color-gray-100)] pt-3">
                <Link to="/admin" onClick={() => setOpen(false)} className={cn(
                  "flex items-center gap-3 rounded-none px-3 py-2.5 text-xs font-bold uppercase tracking-wider",
                  path.startsWith("/admin") ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)]",
                )}>
                  <Shield className="h-3.5 w-3.5" /> Admin Panel
                </Link>
              </div>
            )}
            <div className="mt-3 border-t border-[var(--color-gray-100)] pt-3">
              <Link to="/profile" search={{ complete: "" }} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-none px-3 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)]">
                <User className="h-3.5 w-3.5" /> {profile?.full_name ?? "Profil"}
              </Link>
              <Link to="/settings" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-none px-3 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)]">
                <Settings className="h-3.5 w-3.5" /> Pengaturan
              </Link>
              <button onClick={signOut} className="flex w-full items-center gap-3 rounded-none px-3 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)]">
                <LogOut className="h-3.5 w-3.5" /> Keluar
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
    <div className="mb-10 border-b border-black pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-4xl font-extrabold tracking-tighter text-[var(--color-ink)] sm:text-5xl uppercase leading-none">{title}</h1>
        {description && <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[var(--color-gray-500)] max-w-2xl">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function StatCard({ label, value, hint, icon: Icon, accent }: { label: string; value: ReactNode; hint?: string; icon?: React.ComponentType<{ className?: string }>; accent?: "blue" | "green" | "warning" | "danger" }) {
  const color = accent === "green" ? "bg-[var(--color-brand-green)]" : accent === "warning" ? "bg-[var(--color-warning)]" : accent === "danger" ? "bg-[var(--color-swiss-red)]" : "bg-black";
  return (
    <div className="relative rounded-none border border-[var(--color-gray-200)] bg-white p-5 pt-6 flex flex-col justify-between transition-colors hover:border-black">
      {/* Swiss Accent Bar */}
      <div className={cn("absolute left-0 top-0 h-1 w-full", color)} />
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-gray-500)]">{label}</p>
        <div className="mt-2 text-3xl font-black tracking-tighter text-[var(--color-ink)] sm:text-4xl leading-none">{value}</div>
      </div>
      {hint && (
        <div className="mt-4 flex items-center justify-between border-t border-[var(--color-gray-100)] pt-2 text-[10px] text-[var(--color-gray-500)] font-medium">
          <span>{hint}</span>
          {Icon && <Icon className="h-3.5 w-3.5 opacity-40" />}
        </div>
      )}
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="rounded-none border border-zinc-200 bg-white px-6 py-12 text-center">
      <h3 className="text-sm font-black uppercase tracking-wider text-[var(--color-ink)]">{title}</h3>
      {description && <p className="mt-2 text-xs text-[var(--color-gray-500)]">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Section({ title, action, children }: { title?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="mb-10 border-t border-black pt-6">
      {(title || action) && (
        <div className="mb-6 flex items-baseline justify-between gap-3">
          {title && <h2 className="text-xs font-black uppercase tracking-widest text-[var(--color-ink)]">{title}</h2>}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
