import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppShell, P as PageHeader, S as Section, a as StatCard, E as EmptyState } from "./app-shell-JvQTbMhg.js";
import { u as useAuth } from "./router-KEMZH_Q0.js";
import { useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { TrendingUp, MapPin, ShoppingBasket, Bell, Scale, Search, Crown, PiggyBank } from "lucide-react";
import { B as Button } from "./button-BC9oXVxV.js";
import { i as idr } from "./format-C1KpzYiq.js";
import "react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "sonner";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
function DashboardPage() {
  const {
    profile,
    user
  } = useAuth();
  const {
    data
  } = useQuery({
    queryKey: ["dashboard-stats", user?.id],
    queryFn: async () => {
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const [prices, markets, unread, baskets] = await Promise.all([supabase.from("product_prices").select("id", {
        count: "exact",
        head: true
      }).eq("recorded_at", today), supabase.from("markets").select("id", {
        count: "exact",
        head: true
      }).eq("is_active", true), supabase.from("notifications").select("id", {
        count: "exact",
        head: true
      }).is("read_at", null).eq("user_id", user.id), supabase.from("smart_baskets").select("id", {
        count: "exact",
        head: true
      }).eq("user_id", user.id)]);
      return {
        priceUpdates: prices.count ?? 0,
        markets: markets.count ?? 0,
        unread: unread.count ?? 0,
        baskets: baskets.count ?? 0
      };
    }
  });
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: `Halo, ${profile?.full_name ?? "Sahabat PasarCek"} 👋`, description: "Hemat Belanja Hari Ini — pantau harga, bandingkan pasar, dan temukan keranjang termurah." }),
    /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Harga Hari Ini", value: data?.priceUpdates ?? 0, hint: "Update harga sembako", icon: TrendingUp, accent: "blue" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Pasar Terdekat", value: data?.markets ?? 0, hint: "Pasar aktif", icon: MapPin, accent: "green" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Smart Basket", value: data?.baskets ?? 0, hint: "Simulasi tersimpan", icon: ShoppingBasket, accent: "warning" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Notifikasi Baru", value: data?.unread ?? 0, hint: "Belum dibaca", icon: Bell, accent: "danger" })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { title: "Aksi Cepat", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsx(QuickAction, { to: "/prices", icon: TrendingUp, label: "Harga Hari Ini" }),
      /* @__PURE__ */ jsx(QuickAction, { to: "/compare", icon: Scale, label: "Bandingkan" }),
      /* @__PURE__ */ jsx(QuickAction, { to: "/markets", icon: Search, label: "Cari Pasar" }),
      /* @__PURE__ */ jsx(QuickAction, { to: "/smart-basket", icon: ShoppingBasket, label: "Smart Basket" }),
      /* @__PURE__ */ jsx(QuickAction, { to: "/pricing", icon: Crown, label: "Upgrade", highlight: true })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-green)] p-6 text-white lg:col-span-2", children: [
        /* @__PURE__ */ jsx(PiggyBank, { className: "mb-3 h-8 w-8" }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black", children: "Belanja Lebih Cerdas Bersama PasarCek" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-white/85", children: "Mulai simulasi belanja dengan Smart Basket dan temukan pasar termurah berdasarkan keranjang Anda." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-4 bg-white text-[var(--color-brand-blue)] hover:bg-white/90", children: /* @__PURE__ */ jsx(Link, { to: "/smart-basket", children: "Mulai Simulasi Belanja" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "Penghematan Bulan Ini" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-black text-[var(--color-brand-green)]", children: idr(0) }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-[var(--color-gray-500)]", children: "Mulai simulasi untuk menghitung penghematan Anda." }),
        /* @__PURE__ */ jsx(EmptyState, { title: "Belum ada data", description: "Tambahkan produk ke Smart Basket untuk mulai menghitung penghematan." })
      ] })
    ] })
  ] });
}
function QuickAction({
  to,
  icon: Icon,
  label,
  highlight
}) {
  return /* @__PURE__ */ jsxs(Link, { to, className: `flex flex-col items-start gap-3 rounded-lg border p-4 transition-colors ${highlight ? "border-[var(--color-brand-green)] bg-[var(--color-accent-soft)] hover:bg-[var(--color-accent-soft)]/80" : "border-[var(--color-gray-100)] bg-white hover:bg-[var(--color-gray-50)]"}`, children: [
    /* @__PURE__ */ jsx(Icon, { className: `h-5 w-5 ${highlight ? "text-[var(--color-brand-green)]" : "text-[var(--color-brand-blue)]"}` }),
    /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-[var(--color-ink)]", children: label })
  ] });
}
export {
  DashboardPage as component
};
