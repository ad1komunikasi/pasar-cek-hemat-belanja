import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/payments")({ component: AdminPayments });

function AdminPayments() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-pm"],
    queryFn: async () => (await supabase.from("payment_methods").select("*").order("sort_order")).data ?? [],
  });
  async function toggle(id: string, v: boolean) {
    await supabase.from("payment_methods").update({ is_active: !v }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-pm"] });
    toast.success("Diperbarui");
  }
  return (
    <>
      <h1 className="mb-6 text-3xl font-black">Metode Pembayaran</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {(data ?? []).map((m: any) => (
          <div key={m.id} className="rounded-lg border border-[var(--color-gray-100)] bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold">{m.name}</p>
                <p className="text-xs uppercase text-[var(--color-gray-500)]">{m.type}</p>
                {m.account_number && <p className="mt-2 font-mono text-sm">{m.account_number}</p>}
                {m.account_name && <p className="text-xs text-[var(--color-gray-500)]">a.n. {m.account_name}</p>}
              </div>
              <Button size="sm" variant={m.is_active ? "default" : "outline"} onClick={() => toggle(m.id, m.is_active)}>{m.is_active ? "Aktif" : "Nonaktif"}</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
