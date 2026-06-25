import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { Plus, Edit, Trash2, X, Check, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/admin/payments")({ component: AdminPayments });

function AdminPayments() {
  const qc = useQueryClient();
  const { data: methods } = useQuery({
    queryKey: ["admin-pm"],
    queryFn: async () => (await supabase.from("payment_methods").select("*").order("sort_order")).data ?? [],
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPm, setEditingPm] = useState<any>(null);
  
  // Form State
  const [name, setName] = useState("");
  const [type, setType] = useState<"transfer" | "qris" | "va" | "ewallet">("transfer");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  async function toggle(id: string, v: boolean) {
    await supabase.from("payment_methods").update({ is_active: !v }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-pm"] });
    toast.success("Status keaktifan metode pembayaran diperbarui");
  }

  function openAdd() {
    setEditingPm(null);
    setName("");
    setType("transfer");
    setAccountNumber("");
    setAccountName("");
    setInstructions("");
    setSortOrder(methods ? methods.length : 0);
    setIsActive(true);
    setModalOpen(true);
  }

  function openEdit(m: any) {
    setEditingPm(m);
    setName(m.name || "");
    setType(m.type || "transfer");
    setAccountNumber(m.account_number || "");
    setAccountName(m.account_name || "");
    setInstructions(m.instructions || "");
    setSortOrder(m.sort_order || 0);
    setIsActive(m.is_active);
    setModalOpen(true);
  }

  async function save() {
    if (!name.trim()) return toast.error("Nama wajib diisi");

    const payload = {
      name: name.trim(),
      type,
      account_number: accountNumber.trim() || null,
      account_name: accountName.trim() || null,
      instructions: instructions.trim() || null,
      sort_order: Number(sortOrder) || 0,
      is_active: isActive,
    };

    if (editingPm) {
      const { error } = await supabase.from("payment_methods").update(payload).eq("id", editingPm.id);
      if (error) return toast.error(error.message);
      toast.success("Metode pembayaran berhasil diperbarui");
    } else {
      const { error } = await supabase.from("payment_methods").insert(payload);
      if (error) return toast.error(error.message);
      toast.success("Metode pembayaran berhasil ditambahkan");
    }

    qc.invalidateQueries({ queryKey: ["admin-pm"] });
    setModalOpen(false);
  }

  async function remove(id: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus metode pembayaran ini?")) return;
    const { error } = await supabase.from("payment_methods").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Metode pembayaran berhasil dihapus");
    qc.invalidateQueries({ queryKey: ["admin-pm"] });
  }

  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-black text-[var(--color-ink)]">Metode Pembayaran</h1>
          <p className="text-sm text-[var(--color-gray-500)]">Atur rekening bank, VA, QRIS, atau e-wallet tujuan transfer pembayaran dari pengguna.</p>
        </div>
        <Button onClick={openAdd} className="flex items-center gap-1.5 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Tambah Metode
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(methods ?? []).map((m: any) => (
          <div key={m.id} className={`flex flex-col justify-between rounded-lg border bg-white p-5 shadow-xs transition-all duration-200 ${m.is_active ? "border-[var(--color-gray-100)]" : "border-[var(--color-gray-200)] opacity-70"}`}>
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-bold text-base text-[var(--color-ink)] leading-tight">{m.name}</h3>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Badge variant="outline" className="text-3xs uppercase px-1.5 py-0">
                      {m.type}
                    </Badge>
                    <span className="text-2xs text-[var(--color-gray-500)]">Sortir: {m.sort_order}</span>
                  </div>
                </div>
                <Badge className={m.is_active ? "bg-[var(--color-success)] border-0 text-white" : "bg-[var(--color-gray-200)] text-[var(--color-gray-600)] border-0 flex items-center gap-1"}>
                  {m.is_active ? <Check className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  {m.is_active ? "Aktif" : "Nonaktif"}
                </Badge>
              </div>

              {m.account_number && (
                <div className="my-3 rounded-md bg-[var(--color-gray-50)] p-2.5">
                  <p className="text-[10px] uppercase font-bold text-[var(--color-gray-500)]">Rekening / Tujuan</p>
                  <p className="font-mono text-sm font-bold text-[var(--color-ink)]">{m.account_number}</p>
                  {m.account_name && <p className="text-xs text-[var(--color-gray-700)]">a.n. {m.account_name}</p>}
                </div>
              )}

              {m.instructions && (
                <div className="mt-2 text-xs text-[var(--color-gray-500)] leading-relaxed">
                  <span className="font-semibold block text-[var(--color-gray-700)]">Instruksi:</span>
                  <p className="line-clamp-3 whitespace-pre-wrap">{m.instructions}</p>
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[var(--color-gray-100)] pt-3.5 gap-2">
              <Button size="sm" variant="ghost" className="text-xs font-semibold text-[var(--color-gray-500)]" onClick={() => toggle(m.id, m.is_active)}>
                {m.is_active ? "Nonaktifkan" : "Aktifkan"}
              </Button>
              <div className="flex gap-1">
                <Button size="icon" variant="outline" className="h-8 w-8 text-[var(--color-gray-700)]" onClick={() => openEdit(m)}>
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                <Button size="icon" variant="outline" className="h-8 w-8 text-[var(--color-destructive)] hover:bg-[oklch(0.95_0.02_27)] hover:text-[var(--color-destructive)] border-0" onClick={() => remove(m.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in" onClick={() => setModalOpen(false)}>
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between border-b border-[var(--color-gray-100)] pb-3">
              <h3 className="text-lg font-bold text-[var(--color-ink)]">
                {editingPm ? "Edit Metode Pembayaran" : "Tambah Metode Pembayaran"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="rounded p-1 hover:bg-[var(--color-gray-100)] text-[var(--color-gray-500)]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="pm-name">Nama Metode Pembayaran</Label>
                <Input id="pm-name" placeholder="Contoh: Bank BCA, Mandiri Transfer, QRIS" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="pm-type">Tipe Pembayaran</Label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger id="pm-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transfer">Bank Transfer (transfer)</SelectItem>
                    <SelectItem value="qris">QRIS (qris)</SelectItem>
                    <SelectItem value="va">Virtual Account (va)</SelectItem>
                    <SelectItem value="ewallet">E-Wallet (ewallet)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="pm-number">Nomor Rekening / QR Code Link</Label>
                <Input id="pm-number" placeholder="Contoh: 1234567890 atau link QRIS" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="pm-account-name">Nama Pemilik Rekening</Label>
                <Input id="pm-account-name" placeholder="Contoh: PT Pasar Cek Hemat" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="pm-instructions">Petunjuk Transfer / Panduan Khusus</Label>
                <Textarea id="pm-instructions" placeholder="Petunjuk khusus seperti 'Harap isi berita transfer dengan no. pesanan'..." value={instructions} onChange={(e) => setInstructions(e.target.value)} className="h-20" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pm-sort">Urutan Sortir</Label>
                  <Input id="pm-sort" type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
                </div>
                <div className="flex flex-col justify-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] h-4 w-4" />
                    <span className="text-sm font-semibold text-[var(--color-ink)]">Status Aktif</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-[var(--color-gray-100)] pt-4">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Batal</Button>
              <Button onClick={save}>Simpan Perubahan</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
