import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fmtDateTime } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/admin/users")({ component: AdminUsers });

function AdminUsers() {
  const { data: users } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const [profiles, roles] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("user_roles").select("user_id,role"),
      ]);
      const roleMap = new Map<string, string[]>();
      (roles.data ?? []).forEach((r: any) => roleMap.set(r.user_id, [...(roleMap.get(r.user_id) ?? []), r.role]));
      return (profiles.data ?? []).map((p: any) => ({ ...p, roles: roleMap.get(p.id) ?? [] }));
    },
  });
  return (
    <>
      <h1 className="mb-6 text-3xl font-black">Pengguna</h1>
      <div className="overflow-x-auto rounded-lg border border-[var(--color-gray-100)] bg-white">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
            <tr><th className="px-4 py-3">Nama</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Kota</th><th className="px-4 py-3">Daftar</th><th className="px-4 py-3">Role</th></tr>
          </thead>
          <tbody>
            {(users ?? []).map((u: any) => (
              <tr key={u.id} className="border-t border-[var(--color-gray-100)]">
                <td className="px-4 py-3 font-semibold">{u.full_name ?? "—"}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.city ?? "—"}</td>
                <td className="px-4 py-3">{fmtDateTime(u.created_at)}</td>
                <td className="px-4 py-3 space-x-1">{u.roles.map((r: string) => <Badge key={r} variant="outline">{r}</Badge>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
