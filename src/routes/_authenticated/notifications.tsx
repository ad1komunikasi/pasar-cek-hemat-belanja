import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, EmptyState } from "@/components/app-shell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { fmtDateTime } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/notifications")({
  head: () => ({ meta: [{ title: "Notifikasi — PasarCek" }] }),
  component: NotifPage,
});

function NotifPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data: items } = useQuery({
    queryKey: ["notif", user?.id],
    queryFn: async () =>
      (
        await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", user!.id)
          .order("created_at", { ascending: false })
      ).data ?? [],
  });
  async function markAll() {
    await supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .is("read_at", null)
      .eq("user_id", user!.id);
    qc.invalidateQueries({ queryKey: ["notif"] });
  }
  return (
    <AppShell>
      <PageHeader
        title="Notifikasi"
        description="Pemberitahuan tentang harga, pesanan, dan langganan Anda."
        action={
          <Button variant="outline" onClick={markAll}>
            Tandai semua dibaca
          </Button>
        }
      />
      {!items || items.length === 0 ? (
        <EmptyState
          title="Belum ada notifikasi"
          description="Kami akan memberitahu Anda saat ada perubahan harga."
        />
      ) : (
        <div className="space-y-2">
          {items.map((n: any) => (
            <div
              key={n.id}
              className={`rounded-lg border p-4 ${n.read_at ? "border-[var(--color-gray-100)] bg-white" : "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/5"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold">{n.title}</p>
                  <p className="mt-1 text-sm text-[var(--color-gray-700)]">{n.body}</p>
                </div>
                <span className="shrink-0 text-xs text-[var(--color-gray-500)]">
                  {fmtDateTime(n.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
