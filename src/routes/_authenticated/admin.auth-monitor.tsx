import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fmtDateTime } from "@/lib/format";
import { StatCard } from "@/components/app-shell";
import { Users, LogIn, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/auth-monitor")({ component: AuthMonitor });

function AuthMonitor() {
  const { data } = useQuery({
    queryKey: ["auth-monitor"],
    queryFn: async () => {
      const [profiles, logs] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("auth_logs").select("*").order("created_at", { ascending: false }).limit(50),
      ]);
      return { totalUsers: profiles.count ?? 0, logs: logs.data ?? [] };
    },
  });
  return (
    <>
      <h1 className="mb-6 text-3xl font-black">Auth Monitor</h1>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Registrasi" value={data?.totalUsers ?? 0} icon={Users} accent="blue" />
        <StatCard label="Login Hari Ini" value={(data?.logs ?? []).filter((l: any) => l.event === "login" && l.created_at.slice(0, 10) === new Date().toISOString().slice(0, 10)).length} icon={LogIn} accent="green" />
        <StatCard label="Failed Login" value={(data?.logs ?? []).filter((l: any) => !l.success).length} icon={ShieldAlert} accent="danger" />
      </div>
      <div className="overflow-x-auto rounded-lg border border-[var(--color-gray-100)] bg-white">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
            <tr><th className="px-4 py-3">Waktu</th><th className="px-4 py-3">Event</th><th className="px-4 py-3">IP</th><th className="px-4 py-3">User Agent</th></tr>
          </thead>
          <tbody>
            {(data?.logs ?? []).map((l: any) => (
              <tr key={l.id} className="border-t border-[var(--color-gray-100)]">
                <td className="px-4 py-3">{fmtDateTime(l.created_at)}</td>
                <td className="px-4 py-3 font-semibold">{l.event}</td>
                <td className="px-4 py-3 font-mono text-xs">{l.ip ?? "—"}</td>
                <td className="px-4 py-3 truncate text-xs text-[var(--color-gray-500)]" style={{ maxWidth: 360 }}>{l.user_agent ?? "—"}</td>
              </tr>
            ))}
            {(data?.logs ?? []).length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-[var(--color-gray-500)]">Belum ada log autentikasi.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
