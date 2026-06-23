import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { a as StatCard } from "./app-shell-JvQTbMhg.js";
import { i as idr } from "./format-C1KpzYiq.js";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from "recharts";
import "@supabase/supabase-js";
import "@tanstack/react-router";
import "lucide-react";
import "react";
import "./router-KEMZH_Q0.js";
import "sonner";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
function AdminReports() {
  const {
    data
  } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => {
      const {
        data: orders
      } = await supabase.from("orders").select("amount,created_at,status");
      const byDay = /* @__PURE__ */ new Map();
      (orders ?? []).filter((o) => o.status === "active" || o.status === "paid").forEach((o) => {
        const k = o.created_at.slice(0, 10);
        byDay.set(k, (byDay.get(k) ?? 0) + Number(o.amount));
      });
      const series = Array.from(byDay.entries()).sort().map(([d, v]) => ({
        date: d.slice(5),
        revenue: v
      }));
      const total = series.reduce((s, r) => s + r.revenue, 0);
      return {
        series,
        total,
        count: orders?.length ?? 0
      };
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-6 text-3xl font-black", children: "Laporan" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Total Pendapatan", value: idr(data?.total ?? 0), accent: "green" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Total Pesanan", value: data?.count ?? 0, accent: "blue" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Pesanan Hari Ini", value: (data?.series ?? []).slice(-1)[0]?.revenue ? idr((data?.series ?? []).slice(-1)[0].revenue) : idr(0), accent: "warning" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg font-bold", children: "Pendapatan Harian" }),
      /* @__PURE__ */ jsx("div", { className: "h-64", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data: data?.series ?? [], children: [
        /* @__PURE__ */ jsx(XAxis, { dataKey: "date" }),
        /* @__PURE__ */ jsx(YAxis, {}),
        /* @__PURE__ */ jsx(Tooltip, { formatter: (v) => idr(v) }),
        /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "revenue", stroke: "#1e3a8a", strokeWidth: 2 })
      ] }) }) })
    ] })
  ] });
}
export {
  AdminReports as component
};
