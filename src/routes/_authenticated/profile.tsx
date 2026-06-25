import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/profile")({
  validateSearch: (s: Record<string, unknown>) => ({
    complete: (s.complete as string) ?? "",
  }),
  head: () => ({ meta: [{ title: "Profil — PasarCek" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, profile, refresh } = useAuth();
  const { complete } = Route.useSearch();
  const [fullName, setFullName] = useState(""); const [phone, setPhone] = useState(""); const [city, setCity] = useState("");

  useEffect(() => {
    if (complete === "true") {
      toast.info("Silakan lengkapi profil Anda terlebih dahulu.");
    }
  }, [complete]);

  useEffect(() => { if (profile) { setFullName(profile.full_name ?? ""); setPhone(profile.phone ?? ""); setCity(profile.city ?? ""); } }, [profile]);

  async function save() {
    const { error } = await supabase.from("profiles").update({ full_name: fullName, phone, city }).eq("id", user!.id);
    if (error) return toast.error(error.message);
    toast.success("Profil diperbarui");
    refresh();
  }

  return (
    <AppShell>
      <PageHeader title="Profil" description="Kelola informasi akun Anda." />
      <div className="max-w-xl space-y-4 rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
        <div><Label>Email</Label><Input value={user?.email ?? ""} disabled /></div>
        <div><Label>Nama Lengkap</Label><Input value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={100} /></div>
        <div><Label>Nomor HP</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} /></div>
        <div><Label>Kota Domisili</Label><Input value={city} onChange={(e) => setCity(e.target.value)} maxLength={50} /></div>
        <Button onClick={save}>Simpan Perubahan</Button>
      </div>
    </AppShell>
  );
}
