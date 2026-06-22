import { createFileRoute, Outlet, redirect, Link, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Users, Package, ShoppingCart, CreditCard, Store, Boxes, BarChart3, Settings, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/auth" });
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
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
  return (
    <div className="app-shell min-h-screen bg-[var(--color-gray-50)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-gray-100)] bg-[var(--color-ink)] text-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
          <Link to="/admin" className="flex items-center gap-2 font-bold"><Shield className="h-5 w-5" /> PasarCek Admin</Link>
          <Link to="/dashboard" className="text-xs text-white/70 hover:text-white">← Kembali ke aplikasi</Link>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-[57px] h-[calc(100vh-57px)] w-56 shrink-0 border-r border-[var(--color-gray-100)] bg-white p-3">
          <nav className="flex flex-col gap-1">
            {adminNav.map((n) => {
              const active = n.exact ? path === n.to : path.startsWith(n.to);
              return (
                <Link key={n.to} to={n.to} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium", active ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]")}>
                  <n.icon className="h-4 w-4" />{n.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
