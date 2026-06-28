import { createFileRoute, Outlet, redirect, Link, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import {
  Shield,
  Users,
  Package,
  ShoppingCart,
  CreditCard,
  Store,
  Boxes,
  BarChart3,
  Settings,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/auth" });
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id);
    const isAdmin = (roles ?? []).some((r) => r.role === "admin" || r.role === "super_admin");
    if (!isAdmin) throw redirect({ to: "/dashboard" });
  },
  head: () => ({ meta: [{ title: "Admin — PasarCek" }] }),
  component: AdminLayout,
});

const adminNav = [
  { to: "/admin", label: "Dashboard", icon: Shield, exact: true },
  { to: "/admin/users", label: "Pengguna", icon: Users },
  { to: "/admin/packages", label: "Paket", icon: Package },
  { to: "/admin/orders", label: "Pesanan", icon: ShoppingCart },
  { to: "/admin/payments", label: "Pembayaran", icon: CreditCard },
  { to: "/admin/markets", label: "Pasar", icon: Store },
  { to: "/admin/products", label: "Produk", icon: Boxes },
  { to: "/admin/reports", label: "Laporan", icon: BarChart3 },
  { to: "/admin/auth-monitor", label: "Auth Monitor", icon: LogIn },
  { to: "/admin/settings", label: "Pengaturan", icon: Settings },
];

function AdminLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="app-shell min-h-screen bg-[var(--color-gray-50)]">
      <header className="sticky top-0 z-30 border-b border-black bg-black text-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-none p-1.5 hover:bg-white/10 lg:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link
              to="/admin"
              className="flex items-center gap-2 font-black uppercase tracking-tighter text-sm"
            >
              <Shield className="h-4.5 w-4.5 text-[var(--color-swiss-red)]" /> PasarCek Admin
              Control
            </Link>
          </div>
          <Link
            to="/dashboard"
            className="text-[10px] font-black uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            ← App Dashboard
          </Link>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1400px]">
        {/* Backdrop for mobile */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 top-[57px] z-30 bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        <aside
          className={cn(
            "fixed bottom-0 top-[57px] left-0 z-40 w-56 border-r border-[var(--color-gray-200)] bg-white p-3 transition-transform duration-200 ease-in-out lg:sticky lg:h-[calc(100vh-57px)] lg:translate-x-0",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
        >
          <nav className="flex flex-col gap-1">
            <div className="px-3 py-2 text-[9px] font-black tracking-widest text-[var(--color-gray-500)] uppercase">
              Sistem Operasional
            </div>
            {adminNav.map((n) => {
              const active = n.exact ? path === n.to : path.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-none px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors",
                    active
                      ? "bg-black text-white"
                      : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)]",
                  )}
                >
                  <n.icon className="h-3.5 w-3.5" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 p-6 lg:p-10 w-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
