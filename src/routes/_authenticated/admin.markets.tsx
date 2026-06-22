import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/markets")({ component: AdminMarkets });

function AdminMarkets() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-markets"],
    queryFn: async () => (await supabase.from("markets").select("*").order("name")).data ?? [],
  });
  const [name, setName] = useState(""); const [address, setAddress] = useState(""); const [city, setCity] = useState(""); const [type, setType] = useState<"tradisional" | "modern" | "swalayan">("tradisional"); const [hours, setHours] = useState("");

  async function create() {
    if (!name || !address || !city) return toast.error("Lengkapi data");
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const { error } = await supabase.from("markets").insert({ name, slug, address, city, type, hours, province: "DKI Jakarta" });
    if (error) return toast.error(error.message);
    toast.success("Pasar ditambahkan");
    setName(""); setAddress(""); setCity(""); setHours("");
    qc.invalidateQueries({ queryKey: ["admin-markets"] });
  }
  async function remove(id: string) {
    await supabase.from("markets").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-markets"] });
  }

  return (
    <>
      <h1 className="mb-6 text-3xl font-black">Pasar</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
              <tr><th className="px-4 py-3">Nama</th><th className="px-4 py-3">Kota</th><th className="px-4 py-3">Tipe</th><th className="px-4 py-3">Jam</th><th /></tr>
            </thead>
            <tbody>
              {(data ?? []).map((m: any) => (
                <tr key={m.id} className="border-t border-[var(--color-gray-100)]">
                  <td className="px-4 py-3 font-semibold">{m.name}<br /><span className="text-xs text-[var(--color-gray-500)]">{m.address}</span></td>
                  <td className="px-4 py-3">{m.city}</td>
                  <td className="px-4 py-3 capitalize">{m.type}</td>
                  <td className="px-4 py-3">{m.hours ?? "—"}</td>
                  <td className="px-4 py-3 text-right"><Button size="icon" variant="ghost" onClick={() => remove(m.id)}><Trash2 className="h-4 w-4 text-[var(--color-destructive)]" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-4">
          <h3 className="text-lg font-bold">Tambah Pasar</h3>
          <div><Label>Nama</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label>Alamat</Label><Input value={address} onChange={(e) => setAddress(e.target.value)} /></div>
          <div><Label>Kota</Label><Input value={city} onChange={(e) => setCity(e.target.value)} /></div>
          <div><Label>Tipe</Label>
            <Select value={type} onValueChange={(v: any) => setType(v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="tradisional">Tradisional</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="swalayan">Swalayan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>Jam Operasional</Label><Input value={hours} onChange={(e) => setHours(e.target.value)} placeholder="05:00 - 17:00" /></div>
          <Button onClick={create} className="w-full">Simpan</Button>
        </div>
      </div>
    </>
  );
}
