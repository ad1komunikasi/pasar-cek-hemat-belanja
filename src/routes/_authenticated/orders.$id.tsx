import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { idr, fmtDateTime } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { Copy, Upload } from "lucide-react";

export const Route = createFileRoute("/_authenticated/orders/$id")({
  head: () => ({ meta: [{ title: "Detail Pesanan — PasarCek" }] }),
  component: OrderDetailPage,
});

function OrderDetailPage() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data: order } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => (await supabase.from("orders").select("*, package:packages(*), payment_method:payment_methods(*)").eq("id", id).maybeSingle()).data,
  });

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !order) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("Maks 5MB");
    setUploading(true);
    const path = `${user!.id}/${order.id}-${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("payment-proofs").upload(path, file, { upsert: true });
    if (upErr) { setUploading(false); return toast.error(upErr.message); }
    const { error } = await supabase.from("orders").update({ proof_url: path, status: "proof_uploaded" }).eq("id", order.id);
    setUploading(false);
    if (error) return toast.error(error.message);
    toast.success("Bukti pembayaran berhasil diunggah");
    qc.invalidateQueries({ queryKey: ["order", id] });
  }

  if (!order) return <AppShell><PageHeader title="Detail Pesanan" /><p>Memuat...</p></AppShell>;

  const m = order.payment_method as any;
  const steps = ["pending_payment", "proof_uploaded", "verifying", "active"];
  const stepIdx = steps.indexOf(order.status);

  return (
    <AppShell>
      <PageHeader title={`Pesanan ${order.order_number}`} description={fmtDateTime(order.created_at)} />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
            <h3 className="mb-4 text-lg font-bold">Timeline Status</h3>
            <ol className="space-y-3">
              {["Menunggu Pembayaran", "Bukti Diupload", "Menunggu Verifikasi", "Paket Aktif"].map((s, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i <= stepIdx ? "bg-[var(--color-success)] text-white" : "bg-[var(--color-gray-100)] text-[var(--color-gray-500)]"}`}>{i + 1}</span>
                  <span className={i <= stepIdx ? "font-semibold" : "text-[var(--color-gray-500)]"}>{s}</span>
                </li>
              ))}
            </ol>
            {order.status === "rejected" && <Badge className="mt-3 bg-[var(--color-destructive)] text-white">Pembayaran Ditolak: {order.admin_note}</Badge>}
          </div>

          {m && order.status === "pending_payment" && (
            <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
              <h3 className="mb-3 text-lg font-bold">Instruksi Pembayaran</h3>
              <div className="space-y-2 rounded-md bg-[var(--color-gray-50)] p-4 text-sm">
                <Row label="Metode" value={m.name} />
                {m.account_number && <Row label="No. Rekening" value={m.account_number} copy />}
                {m.account_name && <Row label="Nama Penerima" value={m.account_name} />}
                <Row label="Jumlah Transfer" value={idr(Number(order.amount))} copy />
              </div>
              <p className="mt-3 text-xs text-[var(--color-gray-500)]">{m.instructions}</p>
            </div>
          )}

          {(order.status === "pending_payment" || order.status === "rejected") && (
            <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
              <h3 className="mb-3 text-lg font-bold">Upload Bukti Transfer</h3>
              <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-[var(--color-gray-300)] bg-[var(--color-gray-50)] p-8 hover:bg-white">
                <Upload className="h-6 w-6 text-[var(--color-gray-500)]" />
                <span className="text-sm font-semibold">{uploading ? "Mengunggah..." : "Klik untuk pilih file"}</span>
                <span className="text-xs text-[var(--color-gray-500)]">JPG, PNG, atau PDF — maks 5MB</span>
                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
              </label>
            </div>
          )}

          {order.proof_url && (
            <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
              <h3 className="mb-3 text-lg font-bold">Bukti Transfer</h3>
              <p className="text-sm text-[var(--color-gray-500)]">File: {order.proof_url.split("/").pop()}</p>
            </div>
          )}
        </div>

        <div className="space-y-2 rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
          <h3 className="text-sm font-semibold uppercase text-[var(--color-gray-500)]">Ringkasan</h3>
          <div className="text-2xl font-black">{idr(Number(order.amount))}</div>
          <div className="text-sm">Paket: <strong>{(order.package as any)?.name}</strong></div>
          <div className="text-sm">Penerima: {order.recipient_name}</div>
          <div className="text-sm text-[var(--color-gray-500)]">{order.recipient_email}</div>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value, copy }: { label: string; value: string; copy?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[var(--color-gray-500)]">{label}</span>
      <span className="flex items-center gap-2 font-mono font-semibold">
        {value}
        {copy && <button onClick={() => { navigator.clipboard.writeText(value); toast.success("Disalin"); }}><Copy className="h-3 w-3" /></button>}
      </span>
    </div>
  );
}
