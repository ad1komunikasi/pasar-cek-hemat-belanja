import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { idr, fmtDateTime } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Copy, Upload, Clock, AlertTriangle, AlertCircle, CheckCircle2, ShieldAlert, Check } from "lucide-react";

export const Route = createFileRoute("/_authenticated/orders/$id")({
  head: () => ({ meta: [{ title: "Detail Pesanan — PasarCek" }] }),
  component: OrderDetailPage,
});

function OrderDetailPage() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: order } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => (await supabase.from("orders").select("*, package:packages(*), payment_method:payment_methods(*)").eq("id", id).maybeSingle()).data,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === "proof_uploaded" || status === "verifying") {
        return 4000; // Auto-refresh every 4 seconds while verifying
      }
      return false;
    },
  });

  // Calculate and tick countdown
  useEffect(() => {
    if (!order || order.status !== "pending_payment") {
      setTimeLeft(null);
      return;
    }

    const calculateTimeLeft = () => {
      const createdTime = new Date(order.created_at).getTime();
      const limitTime = createdTime + 24 * 60 * 60 * 1000; // 24 hours limit
      const diff = limitTime - Date.now();
      return Math.max(0, diff);
    };

    const initial = calculateTimeLeft();
    setTimeLeft(initial);

    if (initial <= 0) return;

    const timer = setInterval(() => {
      const left = calculateTimeLeft();
      setTimeLeft(left);
      if (left <= 0) {
        clearInterval(timer);
        qc.invalidateQueries({ queryKey: ["order", id] });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [order, id, qc]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File terlalu besar. Ukuran maksimal adalah 5MB.");
      return;
    }
    setSelectedFile(file);
  }

  async function handleSubmitProof() {
    if (!selectedFile || !order) return;
    setUploading(true);

    // Fallback: Attempt to dynamically create the bucket in case client key permissions allow it
    try {
      await supabase.storage.createBucket("payment-proofs", {
        public: false,
        fileSizeLimit: 5 * 1024 * 1024,
      });
    } catch (bucketErr) {
      console.warn("Could not dynamically create bucket (normal for public keys):", bucketErr);
    }

    const path = `${user!.id}/${order.id}-${Date.now()}-${selectedFile.name}`;
    const { error: upErr } = await supabase.storage.from("payment-proofs").upload(path, selectedFile, { upsert: true });
    if (upErr) { 
      setUploading(false); 
      return toast.error(`Gagal mengunggah: ${upErr.message}`); 
    }
    const { error } = await supabase.from("orders").update({ proof_url: path, status: "proof_uploaded" }).eq("id", order.id);
    setUploading(false);
    if (error) return toast.error(error.message);
    
    // Add in-app notification to confirm to the user that the admin has been notified
    await supabase.from("notifications").insert({
      user_id: user!.id,
      type: "payment",
      title: "Bukti Pembayaran Terkirim",
      body: `Bukti transfer Anda untuk pesanan ${order.order_number} telah diteruskan ke Admin untuk diverifikasi. Silakan tunggu proses peninjauan.`,
    });

    toast.success("Bukti transfer berhasil dikirim! Status pembayaran telah diinfokan ke Admin.");
    setSelectedFile(null);
    qc.invalidateQueries({ queryKey: ["order", id] });
  }

  if (!order) return <AppShell><PageHeader title="Detail Pesanan" /><p>Memuat...</p></AppShell>;

  const m = order.payment_method as any;
  const isExpired = order.status === "pending_payment" && timeLeft !== null && timeLeft <= 0;
  
  // Custom mapping for beautiful timeline based on current status and expiry
  const steps = [
    { label: "Pesanan Dibuat", status: "completed" },
    { 
      label: isExpired ? "Pembayaran Kadaluwarsa" : "Bukti Diupload", 
      status: isExpired ? "expired" : (order.status !== "pending_payment" && order.status !== "rejected" ? "completed" : (order.status === "rejected" ? "rejected" : "pending"))
    },
    { 
      label: order.status === "rejected" ? "Pembayaran Ditolak" : "Menunggu Verifikasi", 
      status: order.status === "active" || order.status === "paid" ? "completed" : (order.status === "rejected" ? "failed" : (order.status === "proof_uploaded" || order.status === "verifying" ? "current" : "pending"))
    },
    { 
      label: "Paket Aktif", 
      status: order.status === "active" || order.status === "paid" ? "completed" : "pending" 
    }
  ];

  const formatTimeLeft = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const getDeadlineDate = () => {
    const createdTime = new Date(order.created_at).getTime();
    return new Date(createdTime + 24 * 60 * 60 * 1000);
  };

  return (
    <AppShell>
      <PageHeader title={`Pesanan ${order.order_number}`} description={fmtDateTime(order.created_at)} />
      
      {/* Alert Banner based on payment status */}
      {order.status === "active" || order.status === "paid" ? (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-[var(--color-success)] bg-[oklch(0.95_0.02_145)] p-4 text-[oklch(0.25_0.05_145)]">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-success)]" />
          <div>
            <h4 className="font-bold text-[oklch(0.20_0.05_145)]">Pembayaran Berhasil & Paket Aktif!</h4>
            <p className="text-sm">Terima kasih atas pembayaran Anda. Akun Anda telah resmi ditingkatkan ke Premium. Silakan nikmati semua fitur eksklusif PasarCek.</p>
          </div>
        </div>
      ) : order.status === "rejected" ? (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-[var(--color-destructive)] bg-[oklch(0.95_0.02_27)] p-4 text-[oklch(0.25_0.05_27)]">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-destructive)]" />
          <div>
            <h4 className="font-bold text-[oklch(0.20_0.05_27)]">Pembayaran Ditolak Admin</h4>
            <p className="text-sm">Bukti transfer Anda ditolak dengan alasan: <strong>{order.admin_note || "Data transfer tidak sesuai."}</strong></p>
            <p className="mt-1 text-xs">Silakan transfer dengan nominal yang benar dan unggah ulang bukti pembayaran yang sah di bawah.</p>
          </div>
        </div>
      ) : isExpired ? (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-[var(--color-destructive)] bg-red-50 p-4 text-red-800">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <div>
            <h4 className="font-bold text-red-900">Batas Waktu Pembayaran Habis (Expired)</h4>
            <p className="text-sm">Waktu 24 jam untuk melakukan pembayaran telah berlalu. Pesanan ini telah dibatalkan secara otomatis. Silakan kembali ke halaman penawaran untuk membuat pesanan paket baru.</p>
          </div>
        </div>
      ) : order.status === "pending_payment" ? (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-[oklch(0.78_0.15_75)] bg-[oklch(0.98_0.02_75)] p-4 text-[oklch(0.25_0.05_70)]">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.55_0.15_75)]" />
          <div>
            <h4 className="font-bold text-[oklch(0.20_0.05_70)]">Menunggu Pembayaran</h4>
            <p className="text-sm">Rincian tagihan ini telah dikirim ke email Anda: <strong>{order.recipient_email}</strong>. Silakan lakukan transfer sesuai rincian di bawah dan unggah bukti pembayaran di halaman ini untuk aktivasi instan.</p>
          </div>
        </div>
      ) : order.status === "proof_uploaded" || order.status === "verifying" ? (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-[var(--color-info)] bg-[oklch(0.95_0.02_258)] p-4 text-[oklch(0.25_0.05_258)]">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-info)]" />
          <div>
            <h4 className="font-bold text-[oklch(0.20_0.05_258)]">Menunggu Verifikasi Admin</h4>
            <p className="text-sm">Bukti pembayaran Anda telah kami terima dan sedang diproses oleh admin untuk verifikasi manual. Proses ini biasanya memakan waktu 10-60 menit. Halaman ini akan diperbarui otomatis saat status berubah.</p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {/* Status Timeline */}
          <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold">Timeline Pembayaran</h3>
            <div className="grid gap-4 sm:grid-cols-4">
              {steps.map((s, i) => {
                let colorClass = "bg-[var(--color-gray-100)] text-[var(--color-gray-500)]";
                let textClass = "text-[var(--color-gray-500)]";
                
                if (s.status === "completed") {
                  colorClass = "bg-[var(--color-success)] text-white";
                  textClass = "font-semibold text-[var(--color-ink)]";
                } else if (s.status === "current") {
                  colorClass = "bg-[var(--color-info)] text-white";
                  textClass = "font-semibold text-[var(--color-info)]";
                } else if (s.status === "rejected" || s.status === "failed" || s.status === "expired") {
                  colorClass = "bg-[var(--color-destructive)] text-white";
                  textClass = "font-semibold text-[var(--color-destructive)]";
                }
                
                return (
                  <div key={i} className="flex flex-col items-center text-center">
                    <span className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${colorClass}`}>
                      {i + 1}
                    </span>
                    <span className={`text-xs ${textClass}`}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Countdown & Instructions */}
          {m && order.status === "pending_payment" && !isExpired && (
            <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6 shadow-sm">
              <div className="mb-4 flex flex-col justify-between gap-3 border-b border-[var(--color-gray-100)] pb-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-bold">Instruksi Pembayaran</h3>
                  <p className="text-xs text-[var(--color-gray-500)]">Harap selesaikan pembayaran sebelum batas waktu berakhir</p>
                </div>
                {timeLeft !== null && (
                  <div className="flex items-center gap-2 rounded-md bg-[oklch(0.95_0.02_75)] px-3 py-1.5 text-xs font-bold text-[oklch(0.25_0.05_75)]">
                    <Clock className="h-4 w-4 shrink-0 text-[oklch(0.55_0.15_75)]" />
                    <span>Sisa Waktu: {formatTimeLeft(timeLeft)}</span>
                  </div>
                )}
              </div>

              <div className="mb-4 rounded-md bg-[var(--color-gray-50)] p-4 text-sm space-y-3">
                <Row label="Metode Pembayaran" value={m.name} />
                {m.account_number && <Row label="No. Rekening" value={m.account_number} copy />}
                {m.account_name && <Row label="Nama Penerima" value={m.account_name} />}
                <Row label="Jumlah Transfer" value={idr(Number(order.amount))} copy />
                <Row label="Batas Waktu Transfer" value={fmtDateTime(getDeadlineDate().toISOString())} />
              </div>
              
              {m.instructions && (
                <div className="rounded-md border border-dashed border-[var(--color-gray-300)] bg-white p-4">
                  <span className="text-xs font-bold uppercase text-[var(--color-gray-500)] block mb-1">Catatan Tambahan:</span>
                  <p className="text-sm text-[var(--color-gray-700)] leading-relaxed whitespace-pre-wrap">{m.instructions}</p>
                </div>
              )}
            </div>
          )}

          {/* Step-by-Step Payment Journey Instructions */}
          {order.status === "pending_payment" && !isExpired && (
            <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Panduan Langkah Pembayaran</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[oklch(0.92_0.02_195)] text-xs font-bold text-[oklch(0.48_0.08_195)]">1</div>
                  <div>
                    <h5 className="font-semibold text-sm">Lakukan Transfer Sesuai Nominal</h5>
                    <p className="text-xs text-[var(--color-gray-500)]">Transfer sebesar <strong className="font-mono text-[var(--color-ink)]">{idr(Number(order.amount))}</strong> ke rekening di atas menggunakan ATM, m-banking, atau internet banking Anda.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[oklch(0.92_0.02_195)] text-xs font-bold text-[oklch(0.48_0.08_195)]">2</div>
                  <div>
                    <h5 className="font-semibold text-sm">Simpan Bukti Transfer</h5>
                    <p className="text-xs text-[var(--color-gray-500)]">Ambil screenshot atau simpan struk transfer pembayaran Anda yang menunjukkan nomor transaksi sukses.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[oklch(0.92_0.02_195)] text-xs font-bold text-[oklch(0.48_0.08_195)]">3</div>
                  <div>
                    <h5 className="font-semibold text-sm">Unggah Bukti di Sini</h5>
                    <p className="text-xs text-[var(--color-gray-500)]">Pilih file bukti pembayaran Anda di form di bawah ini dan klik tombol Unggah.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[oklch(0.92_0.02_195)] text-xs font-bold text-[oklch(0.48_0.08_195)]">4</div>
                  <div>
                    <h5 className="font-semibold text-sm">Tunggu Aktivasi</h5>
                    <p className="text-xs text-[var(--color-gray-500)]">Admin akan melakukan verifikasi pembayaran. Setelah diverifikasi, paket Anda akan langsung diaktifkan secara otomatis.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Upload Bukti Transfer */}
          {(order.status === "pending_payment" || order.status === "rejected") && !isExpired && (
            <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold">Upload Bukti Transfer</h3>
              <p className="mb-4 text-xs text-[var(--color-gray-500)]">Pilih file bukti pembayaran Anda di bawah ini, lalu klik tombol kirim bukti transfer.</p>
              
              {!selectedFile ? (
                <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-[var(--color-gray-300)] bg-[var(--color-gray-50)] p-8 hover:bg-white transition-colors duration-200">
                  <Upload className="h-6 w-6 text-[var(--color-gray-500)]" />
                  <span className="text-sm font-semibold">Pilih File Bukti Pembayaran</span>
                  <span className="text-xs text-[var(--color-gray-500)]">JPG, PNG, atau PDF — maks 5MB</span>
                  <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFileChange} />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-md border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate text-[var(--color-ink)]">{selectedFile.name}</p>
                      <p className="text-xs text-[var(--color-gray-500)]">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={() => setSelectedFile(null)} disabled={uploading}>
                      Pilih Ulang
                    </Button>
                  </div>

                  {selectedFile.type.startsWith("image/") && (
                    <div className="mt-3 overflow-hidden rounded-md border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] max-h-[220px] flex justify-center p-2">
                      <img src={URL.createObjectURL(selectedFile)} alt="Preview Bukti Transfer" className="max-h-[200px] object-contain rounded shadow-xs" />
                    </div>
                  )}

                  <Button 
                    type="button" 
                    className="w-full bg-[var(--color-primary)] text-white hover:bg-[oklch(0.48_0.18_268)] flex items-center justify-center gap-2 py-5"
                    onClick={handleSubmitProof} 
                    disabled={uploading}
                  >
                    {uploading ? (
                      <span>Mengunggah...</span>
                    ) : (
                      <>
                        <Check className="h-4.5 w-4.5" />
                        <span>Kirim Bukti Pembayaran</span>
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}

          {order.proof_url && (
            <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold">Bukti Transfer Terkirim</h3>
              <div className="flex items-center justify-between gap-3 rounded-md bg-[var(--color-gray-50)] p-3 text-sm">
                <span className="truncate text-xs font-mono text-[var(--color-gray-500)]">File: {order.proof_url.split("/").pop()}</span>
                <Badge variant="outline" className="bg-[var(--color-success)] text-white border-0">Sudah Diupload</Badge>
              </div>
            </div>
          )}
        </div>

        {/* Right Summary Panel */}
        <div className="space-y-4">
          <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)] mb-3">Ringkasan Pesanan</h3>
            <div className="text-3xl font-black mb-4 text-[var(--color-ink)]">{idr(Number(order.amount))}</div>
            
            <div className="space-y-2.5 border-t border-[var(--color-gray-100)] pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-gray-500)]">Paket</span>
                <strong className="text-[var(--color-ink)]">{(order.package as any)?.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-gray-500)]">Durasi</span>
                <span>{(order.package as any)?.duration_days} Hari</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-gray-500)]">Penerima</span>
                <span>{order.recipient_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-gray-500)]">No. Telepon</span>
                <span>{order.recipient_phone || "-"}</span>
              </div>
              <div className="flex flex-col border-t border-[var(--color-gray-100)] pt-2">
                <span className="text-xs text-[var(--color-gray-500)]">Email Terdaftar</span>
                <span className="truncate font-semibold text-xs">{order.recipient_email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value, copy }: { label: string; value: string; copy?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[var(--color-gray-500)]">{label}</span>
      <span className="flex items-center gap-2 font-mono font-semibold text-right text-xs">
        {value}
        {copy && (
          <button 
            type="button"
            className="rounded p-1 hover:bg-[var(--color-gray-100)] text-[var(--color-gray-500)] hover:text-[var(--color-ink)]"
            onClick={() => { navigator.clipboard.writeText(value); toast.success(`${label} disalin`); }}
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        )}
      </span>
    </div>
  );
}

