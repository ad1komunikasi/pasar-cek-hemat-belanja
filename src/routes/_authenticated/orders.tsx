import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, EmptyState } from "@/components/app-shell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { idr, fmtDateTime } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/orders")({
  head: () => ({ meta: [{ title: "Pesanan Saya — PasarCek" }] }),
  component: OrdersPage,
});

const statusLabel: Record<string, { label: string; cls: string }> = {
  pending_payment: { label: "Menunggu Pembayaran", cls: "bg-[var(--color-warning)] text-white" },
  proof_uploaded: { label: "Bukti Diupload", cls: "bg-[var(--color-info)] text-white" },
  verifying: { label: "Menunggu Verifikasi", cls: "bg-[var(--color-info)] text-white" },
  rejected: { label: "Pembayaran Ditolak", cls: "bg-[var(--color-destructive)] text-white" },
  paid: { label: "Pembayaran Berhasil", cls: "bg-[var(--color-success)] text-white" },
  active: { label: "Paket Aktif", cls: "bg-[var(--color-success)] text-white" },
  expired: { label: "Kadaluarsa", cls: "bg-[var(--color-gray-500)] text-white" },
};

function OrdersPage() {
  const { user } = useAuth();
  const { data: orders } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => (await supabase.from("orders").select("*, package:packages(name)").eq("user_id", user!.id).order("created_at", { ascending: false })).data ?? [],
  });
  return (
    <AppShell>
      <PageHeader title="Riwayat Pesanan" description="Semua transaksi langganan Anda." />
      {(!orders || orders.length === 0) ? (
        <EmptyState title="Belum ada transaksi." description="Mulai berlangganan untuk mendapatkan fitur premium." />
      ) : (
        <div className="overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
              <tr><th className="px-4 py-3">No. Pesanan</th><th className="px-4 py-3">Tanggal</th><th className="px-4 py-3">Paket</th><th className="px-4 py-3 text-right">Nominal</th><th className="px-4 py-3">Status</th></tr>
            </thead>
            <tbody>
              {orders.map((o: any) => (
                <tr key={o.id} className="border-t border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]">
                  <td className="px-4 py-3 font-mono font-semibold"><Link to="/orders/$id" params={{ id: o.id }} className="text-[var(--color-brand-blue)] hover:underline">{o.order_number}</Link></td>
                  <td className="px-4 py-3">{fmtDateTime(o.created_at)}</td>
                  <td className="px-4 py-3">{o.package?.name}</td>
                  <td className="px-4 py-3 text-right font-bold">{idr(Number(o.amount))}</td>
                  <td className="px-4 py-3"><Badge className={statusLabel[o.status]?.cls}>{statusLabel[o.status]?.label}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppShell>
  );
}
