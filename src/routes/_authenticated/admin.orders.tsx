import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { idr, fmtDateTime } from "@/lib/format";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/orders")({ component: AdminOrders });

function AdminOrders() {
  const qc = useQueryClient();
  const { data: orders } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => (await supabase.from("orders").select("*, package:packages(name,duration_days), profile:profiles(full_name,email)").order("created_at", { ascending: false })).data ?? [],
  });
  const [selected, setSelected] = useState<any>(null);
  const [note, setNote] = useState("");

  async function approve(o: any) {
    const expires = new Date();
    expires.setDate(expires.getDate() + (o.package?.duration_days ?? 30));
    const { error } = await supabase.from("orders").update({ status: "active", paid_at: new Date().toISOString(), expires_at: expires.toISOString(), admin_note: note || null }).eq("id", o.id);
    if (error) return toast.error(error.message);
    await supabase.from("subscriptions").insert({ user_id: o.user_id, package_id: o.package_id, order_id: o.id, started_at: new Date().toISOString(), expires_at: expires.toISOString(), status: "active" });
    await supabase.from("notifications").insert({ user_id: o.user_id, type: "subscription", title: "Paket aktif", body: `Paket ${o.package?.name} berhasil diaktifkan.` });
    toast.success("Paket diaktifkan");
    qc.invalidateQueries({ queryKey: ["admin-orders"] });
    setSelected(null);
  }
  async function reject(o: any) {
    if (!note.trim()) return toast.error("Tulis alasan penolakan");
    await supabase.from("orders").update({ status: "rejected", admin_note: note }).eq("id", o.id);
    await supabase.from("notifications").insert({ user_id: o.user_id, type: "payment", title: "Pembayaran ditolak", body: note });
    toast.success("Pesanan ditolak");
    qc.invalidateQueries({ queryKey: ["admin-orders"] });
    setSelected(null);
  }

  return (
    <>
      <h1 className="mb-6 text-3xl font-black">Pesanan</h1>
      <div className="overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
            <tr><th className="px-4 py-3">No</th><th className="px-4 py-3">User</th><th className="px-4 py-3">Paket</th><th className="px-4 py-3">Tanggal</th><th className="px-4 py-3 text-right">Nominal</th><th className="px-4 py-3">Status</th><th /></tr>
          </thead>
          <tbody>
            {(orders ?? []).map((o: any) => (
              <tr key={o.id} className="border-t border-[var(--color-gray-100)]">
                <td className="px-4 py-3 font-mono">{o.order_number}</td>
                <td className="px-4 py-3">{o.profile?.full_name ?? o.recipient_name}<br /><span className="text-xs text-[var(--color-gray-500)]">{o.profile?.email}</span></td>
                <td className="px-4 py-3">{o.package?.name}</td>
                <td className="px-4 py-3">{fmtDateTime(o.created_at)}</td>
                <td className="px-4 py-3 text-right font-bold">{idr(Number(o.amount))}</td>
                <td className="px-4 py-3"><Badge variant="outline">{o.status}</Badge></td>
                <td className="px-4 py-3 text-right"><Button size="sm" variant="outline" onClick={() => { setSelected(o); setNote(""); }}>Detail</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg rounded-lg bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold">{selected.order_number}</h3>
            <p className="text-sm text-[var(--color-gray-500)]">{selected.profile?.email}</p>
            <p className="mt-3 text-2xl font-black">{idr(Number(selected.amount))}</p>
            {selected.proof_url && <p className="mt-2 text-xs text-[var(--color-brand-blue)]">Bukti: {selected.proof_url}</p>}
            <Textarea className="mt-4" placeholder="Catatan admin (opsional / wajib jika menolak)" value={note} onChange={(e) => setNote(e.target.value)} />
            <div className="mt-4 flex gap-2">
              <Button onClick={() => approve(selected)} className="flex-1 bg-[var(--color-success)]">Approve & Aktifkan</Button>
              <Button onClick={() => reject(selected)} variant="destructive" className="flex-1">Reject</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
