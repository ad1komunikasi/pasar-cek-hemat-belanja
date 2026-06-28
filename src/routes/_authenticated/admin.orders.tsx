import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { idr, fmtDateTime } from "@/lib/format";
import { EmailService } from "@/lib/email";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FileText, CheckCircle, XCircle, Clock, Eye, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/orders")({ component: AdminOrders });

function AdminOrders() {
  const qc = useQueryClient();
  const { data: orders } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () =>
      (
        await supabase
          .from("orders")
          .select("*, package:packages(name,duration_days), profile:profiles(full_name,email)")
          .order("created_at", { ascending: false })
      ).data ?? [],
  });
  const [selected, setSelected] = useState<any>(null);
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState("all");
  const [proofUrl, setProofUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!selected?.proof_url) {
      setProofUrl(null);
      return;
    }

    async function loadSignedUrl() {
      const { data, error } = await supabase.storage
        .from("payment-proofs")
        .createSignedUrl(selected.proof_url, 3600); // 1 hour expiry
      if (data) {
        setProofUrl(data.signedUrl);
      } else {
        console.error("Error creating signed URL:", error);
        setProofUrl(null);
      }
    }

    loadSignedUrl();
  }, [selected]);

  async function approve(o: any) {
    const expires = new Date();
    expires.setDate(expires.getDate() + (o.package?.duration_days ?? 30));
    const { error } = await supabase
      .from("orders")
      .update({
        status: "active",
        paid_at: new Date().toISOString(),
        expires_at: expires.toISOString(),
        admin_note: note || null,
      })
      .eq("id", o.id);
    if (error) return toast.error(error.message);
    await supabase.from("subscriptions").insert({
      user_id: o.user_id,
      package_id: o.package_id,
      order_id: o.id,
      started_at: new Date().toISOString(),
      expires_at: expires.toISOString(),
      status: "active",
    });
    await supabase.from("notifications").insert({
      user_id: o.user_id,
      type: "subscription",
      title: "Paket aktif",
      body: `Paket ${o.package?.name} berhasil diaktifkan.`,
    });

    // Send actual email notification
    try {
      const emailOrder = {
        id: o.id,
        order_number: o.order_number,
        amount: Number(o.amount),
        recipient_name: o.recipient_name || o.profile?.full_name || "Pelanggan",
        recipient_email: o.recipient_email || o.profile?.email || "",
        created_at: o.created_at,
      };
      await EmailService.sendOrderApprovedEmail(emailOrder, o.package?.name || "Premium");
    } catch (emailErr) {
      console.error("Failed to send approval email:", emailErr);
    }

    toast.success("Paket diaktifkan");
    qc.invalidateQueries({ queryKey: ["admin-orders"] });
    setSelected(null);
  }

  async function reject(o: any) {
    if (!note.trim()) return toast.error("Tulis alasan penolakan");
    await supabase.from("orders").update({ status: "rejected", admin_note: note }).eq("id", o.id);
    await supabase
      .from("notifications")
      .insert({ user_id: o.user_id, type: "payment", title: "Pembayaran ditolak", body: note });

    // Send actual email notification
    try {
      const emailOrder = {
        id: o.id,
        order_number: o.order_number,
        amount: Number(o.amount),
        recipient_name: o.recipient_name || o.profile?.full_name || "Pelanggan",
        recipient_email: o.recipient_email || o.profile?.email || "",
        created_at: o.created_at,
      };
      await EmailService.sendOrderRejectedEmail(emailOrder, note);
    } catch (emailErr) {
      console.error("Failed to send rejection email:", emailErr);
    }

    toast.success("Pesanan ditolak");
    qc.invalidateQueries({ queryKey: ["admin-orders"] });
    setSelected(null);
  }

  const waitingCount = (orders ?? []).filter(
    (o: any) => o.status === "proof_uploaded" || o.status === "verifying",
  ).length;

  const filteredOrders = (orders ?? []).filter((o: any) => {
    if (filter === "all") return true;
    if (filter === "pending_verification")
      return o.status === "proof_uploaded" || o.status === "verifying";
    if (filter === "pending_payment") return o.status === "pending_payment";
    if (filter === "active") return o.status === "active" || o.status === "paid";
    if (filter === "rejected") return o.status === "rejected";
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
      case "paid":
        return <Badge className="bg-[var(--color-success)] text-white border-0">Aktif</Badge>;
      case "proof_uploaded":
      case "verifying":
        return (
          <Badge className="bg-[var(--color-info)] text-white border-0">Menunggu Verifikasi</Badge>
        );
      case "pending_payment":
        return (
          <Badge className="bg-[oklch(0.78_0.15_75)] text-[oklch(0.25_0.05_70)] border-0">
            Menunggu Pembayaran
          </Badge>
        );
      case "rejected":
        return <Badge className="bg-[var(--color-destructive)] text-white border-0">Ditolak</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const isPDF = selected?.proof_url?.toLowerCase().endsWith(".pdf");

  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-black">Pesanan Paket</h1>
          <p className="text-sm text-[var(--color-gray-500)]">
            Kelola pesanan langganan premium dan lakukan verifikasi pembayaran.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-[var(--color-gray-100)] pb-px">
        {[
          { key: "all", label: "Semua Pesanan" },
          {
            key: "pending_verification",
            label: "Menunggu Verifikasi",
            count: waitingCount,
            highlight: waitingCount > 0,
          },
          { key: "pending_payment", label: "Belum Bayar" },
          { key: "active", label: "Aktif" },
          { key: "rejected", label: "Ditolak" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              filter === tab.key
                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                : "border-transparent text-[var(--color-gray-500)] hover:text-[var(--color-ink)]"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-2xs font-bold leading-none ${tab.highlight ? "bg-[var(--color-destructive)] text-white animate-pulse" : "bg-[var(--color-gray-200)] text-[var(--color-gray-700)]"}`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-[var(--color-gray-100)] bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
            <tr>
              <th className="px-4 py-3">No Pesanan</th>
              <th className="px-4 py-3">User / Penerima</th>
              <th className="px-4 py-3">Paket</th>
              <th className="px-4 py-3">Tanggal Pemesanan</th>
              <th className="px-4 py-3 text-right">Nominal</th>
              <th className="px-4 py-3">Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[var(--color-gray-500)]">
                  Tidak ada pesanan ditemukan dalam kategori ini.
                </td>
              </tr>
            ) : (
              filteredOrders.map((o: any) => (
                <tr
                  key={o.id}
                  className="border-t border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)] transition-colors duration-150"
                >
                  <td className="px-4 py-3 font-mono font-bold text-[var(--color-ink)]">
                    {o.order_number}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-[var(--color-ink)]">
                      {o.profile?.full_name ?? o.recipient_name}
                    </span>
                    <br />
                    <span className="text-xs text-[var(--color-gray-500)]">
                      {o.profile?.email ?? o.recipient_email}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{o.package?.name}</td>
                  <td className="px-4 py-3 text-[var(--color-gray-500)]">
                    {fmtDateTime(o.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right font-black text-[var(--color-ink)]">
                    {idr(Number(o.amount))}
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(o.status)}</td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1.5"
                      onClick={() => {
                        setSelected(o);
                        setNote(o.admin_note || "");
                      }}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Detail
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-[var(--color-ink)]">
                  {selected.order_number}
                </h3>
                <p className="text-xs text-[var(--color-gray-500)]">
                  {selected.profile?.email ?? selected.recipient_email}
                </p>
              </div>
              <Badge variant="outline">{selected.status.toUpperCase()}</Badge>
            </div>

            <div className="my-4 space-y-3 rounded-lg bg-[var(--color-gray-50)] p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-gray-500)]">Paket:</span>
                <strong className="text-[var(--color-ink)]">{selected.package?.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-gray-500)]">Nominal Tagihan:</span>
                <strong className="text-lg font-black text-[var(--color-ink)]">
                  {idr(Number(selected.amount))}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-gray-500)]">Penerima:</span>
                <span>
                  {selected.recipient_name} ({selected.recipient_phone || "-"})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-gray-500)]">Metode Pembayaran:</span>
                <span className="uppercase font-semibold">{selected.method}</span>
              </div>
            </div>

            {/* Proof of transfer visual preview */}
            {selected.proof_url ? (
              <div className="mt-4 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gray-500)]">
                  Bukti Pembayaran:
                </span>
                {isPDF ? (
                  <a
                    href={proofUrl || undefined}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 rounded-md border border-[var(--color-gray-200)] bg-[oklch(0.95_0.02_195)] p-3.5 text-sm text-[oklch(0.35_0.08_195)] hover:bg-[oklch(0.90_0.04_195)] transition-colors"
                  >
                    <FileText className="h-5 w-5 shrink-0 text-[oklch(0.48_0.08_195)]" />
                    <span className="font-semibold truncate">Buka file PDF bukti transfer</span>
                  </a>
                ) : (
                  <div className="overflow-hidden rounded-md border border-[var(--color-gray-100)] bg-[var(--color-gray-50)]">
                    <img
                      src={proofUrl || undefined}
                      alt="Bukti Transfer"
                      className="max-h-[250px] w-full object-contain cursor-zoom-in hover:opacity-90 transition-opacity"
                      onClick={() => window.open(proofUrl || undefined, "_blank")}
                    />
                    <div className="bg-white p-2 text-center text-2xs text-[var(--color-gray-500)] border-t border-[var(--color-gray-100)]">
                      Klik gambar untuk melihat dalam ukuran penuh (tab baru)
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-2 rounded-md bg-[oklch(0.95_0.02_75)] p-3 text-xs text-[oklch(0.25_0.05_70)]">
                <AlertCircle className="h-4 w-4 shrink-0 text-[oklch(0.55_0.15_75)]" />
                <span>Pengguna belum mengunggah bukti pembayaran.</span>
              </div>
            )}

            <div className="mt-4">
              <label className="mb-1 block text-xs font-semibold text-[var(--color-gray-700)]">
                Catatan Admin / Alasan Penolakan
              </label>
              <Textarea
                placeholder="Tulis alasan penolakan (wajib jika reject) atau catatan aktivasi (opsional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="text-sm"
              />
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                onClick={() => approve(selected)}
                className="flex-1 bg-[var(--color-success)] hover:bg-[oklch(0.55_0.15_145)] text-white flex items-center justify-center gap-1.5"
              >
                <CheckCircle className="h-4 w-4" />
                Setujui & Aktifkan
              </Button>
              <Button
                onClick={() => reject(selected)}
                variant="destructive"
                className="flex-1 flex items-center justify-center gap-1.5"
              >
                <XCircle className="h-4 w-4" />
                Tolak Pembayaran
              </Button>
            </div>
            <Button
              variant="ghost"
              className="mt-2 w-full text-xs text-[var(--color-gray-500)]"
              onClick={() => setSelected(null)}
            >
              Tutup
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
