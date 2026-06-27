import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fmtDateTime } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Crown, Sparkles, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/admin/users")({ component: AdminUsers });

function AdminUsers() {
  const qc = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const [profiles, roles] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("user_roles").select("user_id,role"),
      ]);
      const roleMap = new Map<string, string[]>();
      (roles.data ?? []).forEach((r: any) => roleMap.set(r.user_id, [...(roleMap.get(r.user_id) ?? []), r.role]));
      return (profiles.data ?? []).map((p: any) => ({
        ...p,
        roles: roleMap.get(p.id) ?? [],
        waitlist_priority: !!(p as any).waitlist_priority,
      }));
    },
  });

  const toggleWaitlistPriority = async (userId: string, currentVal: boolean) => {
    setUpdatingId(userId);
    const { error } = await supabase
      .from("profiles")
      .update({ waitlist_priority: !currentVal } as any)
      .eq("id", userId);
    setUpdatingId(null);
    if (error) {
      toast.error("Gagal memperbarui prioritas: " + error.message);
    } else {
      toast.success(`Status prioritas waitlist berhasil di${!currentVal ? "aktifkan" : "nonaktifkan"}!`);
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    }
  };

  // Calculations
  const totalCount = users?.length ?? 0;
  const priorityCount = users?.filter((u) => u.waitlist_priority).length ?? 0;
  const regularCount = totalCount - priorityCount;
  const considerationRate = totalCount > 0 ? ((priorityCount / totalCount) * 100).toFixed(1) : "0.0";

  // Filtered Users
  const filteredUsers = (users ?? []).filter((u) => {
    const matchesSearch =
      (u.full_name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.city ?? "").toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "priority") {
      return matchesSearch && u.waitlist_priority;
    }
    if (activeTab === "regular") {
      return matchesSearch && !u.waitlist_priority;
    }
    return matchesSearch;
  });

  return (
    <>
      <h1 className="mb-6 text-3xl font-black text-[var(--color-gray-900)]">Pengguna & Prioritas</h1>

      {/* Metrics Summary */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="border border-[var(--color-gray-100)] bg-white shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-[var(--color-gray-500)]">Total Pengguna</CardTitle>
            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-black text-[var(--color-gray-900)]">{totalCount}</div>
            <p className="text-xs text-[var(--color-gray-400)] mt-1">Pengguna terdaftar di platform</p>
          </CardContent>
        </Card>

        <Card className="border border-amber-100 bg-amber-50/10 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-amber-800">Prioritas Waitlist</CardTitle>
            <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
              <Crown className="h-4 w-4 fill-amber-500 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-black text-amber-700">{priorityCount}</div>
            <p className="text-xs text-amber-600 mt-1">High-Intent / High-Consideration users</p>
          </CardContent>
        </Card>

        <Card className="border border-emerald-100 bg-emerald-50/10 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-emerald-800">Consideration Rate</CardTitle>
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <Sparkles className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-black text-emerald-700">{considerationRate}%</div>
            <p className="text-xs text-emerald-600 mt-1">Rasio minat tinggi fitur web app</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-gray-400)]" />
          <Input
            type="text"
            placeholder="Cari pengguna berdasarkan nama, email, atau kota..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-[var(--color-gray-200)] focus:border-indigo-500 rounded-xl"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-[var(--color-gray-100)] p-1 rounded-xl">
            <TabsTrigger
              value="all"
              className="rounded-lg px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-soft"
            >
              Semua ({totalCount})
            </TabsTrigger>
            <TabsTrigger
              value="priority"
              className="rounded-lg px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-soft text-amber-700 data-[state=active]:text-amber-800"
            >
              Prioritas ({priorityCount})
            </TabsTrigger>
            <TabsTrigger
              value="regular"
              className="rounded-lg px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-soft"
            >
              Biasa ({regularCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl border border-[var(--color-gray-100)] bg-white shadow-soft">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center p-12 text-muted-foreground font-medium">
            Tidak ditemukan pengguna yang cocok dengan kriteria saringan.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)] border-b border-[var(--color-gray-100)]">
              <tr>
                <th className="px-6 py-4">Nama / Detail</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Kota</th>
                <th className="px-6 py-4 text-center">Prioritas Waitlist</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Daftar Pada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-gray-100)]">
              {filteredUsers.map((u: any) => (
                <tr key={u.id} className="hover:bg-[var(--color-gray-50)]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs border border-indigo-100">
                        {u.full_name
                          ? u.full_name.charAt(0).toUpperCase()
                          : u.email
                            ? u.email.charAt(0).toUpperCase()
                            : "?"}
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--color-gray-900)] flex items-center gap-2">
                          {u.full_name ?? "—"}
                          {u.waitlist_priority && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                              <Crown className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                              Prioritas
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">@{u.username ?? "username"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-gray-600)]">{u.email}</td>
                  <td className="px-6 py-4 text-[var(--color-gray-600)]">{u.city ?? "—"}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <Switch
                        checked={u.waitlist_priority}
                        disabled={updatingId === u.id}
                        onCheckedChange={() => toggleWaitlistPriority(u.id, u.waitlist_priority)}
                      />
                      {updatingId === u.id && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {u.roles.map((r: string) => {
                        const isAdm = r === "admin" || r === "super_admin";
                        return (
                          <Badge
                            key={r}
                            variant="outline"
                            className={
                              isAdm
                                ? "bg-red-50 text-red-700 border-red-200 font-bold"
                                : "bg-blue-50 text-blue-700 border-blue-200 font-semibold"
                            }
                          >
                            {r}
                          </Badge>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">{fmtDateTime(u.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
