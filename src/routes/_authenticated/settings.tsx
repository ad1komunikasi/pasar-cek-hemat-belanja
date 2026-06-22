import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Pengaturan — PasarCek" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [password, setPassword] = useState("");
  async function changePw() {
    if (password.length < 6) return toast.error("Password minimal 6 karakter");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return toast.error(error.message);
    setPassword("");
    toast.success("Password diperbarui");
  }
  return (
    <AppShell>
      <PageHeader title="Pengaturan" description="Keamanan dan preferensi akun." />
      <div className="max-w-xl space-y-6">
        <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
          <h3 className="text-lg font-bold">Ubah Password</h3>
          <div className="mt-3 space-y-3">
            <Label>Password baru</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} />
            <Button onClick={changePw}>Perbarui Password</Button>
          </div>
        </div>
        <div className="rounded-lg border border-[var(--color-destructive)] bg-white p-6">
          <h3 className="text-lg font-bold text-[var(--color-destructive)]">Hapus Akun</h3>
          <p className="mt-2 text-sm text-[var(--color-gray-500)]">Hubungi admin untuk menghapus akun Anda secara permanen.</p>
        </div>
      </div>
    </AppShell>
  );
}
