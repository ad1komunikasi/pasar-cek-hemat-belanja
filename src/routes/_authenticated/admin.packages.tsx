import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { idr } from "@/lib/format";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/packages")({
  component: AdminPackages,
});

function AdminPackages() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-packages"],
    queryFn: async () =>
      (await supabase.from("packages").select("*").order("sort_order")).data ?? [],
  });
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");
  const [desc, setDesc] = useState("");

  async function create() {
    if (!name || !slug || !price || !days) return toast.error("Lengkapi semua field");
    const { error } = await supabase.from("packages").insert({
      name,
      slug,
      price: Number(price),
      duration_days: Number(days),
      description: desc,
      benefits: [],
    });
    if (error) return toast.error(error.message);
    toast.success("Paket dibuat");
    setName("");
    setSlug("");
    setPrice("");
    setDays("");
    setDesc("");
    qc.invalidateQueries({ queryKey: ["admin-packages"] });
  }
  async function remove(id: string) {
    await supabase.from("packages").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-packages"] });
  }
  async function toggle(id: string, is_active: boolean) {
    await supabase.from("packages").update({ is_active: !is_active }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-packages"] });
  }

  return (
    <>
      <h1 className="mb-6 text-3xl font-black">Paket</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-x-auto rounded-lg border border-[var(--color-gray-100)] bg-white">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
              <tr>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3 text-right">Harga</th>
                <th className="px-4 py-3 text-right">Durasi</th>
                <th className="px-4 py-3">Aktif</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((p: any) => (
                <tr key={p.id} className="border-t border-[var(--color-gray-100)]">
                  <td className="px-4 py-3 font-semibold">{p.name}</td>
                  <td className="px-4 py-3 font-mono text-xs">{p.slug}</td>
                  <td className="px-4 py-3 text-right">{idr(Number(p.price))}</td>
                  <td className="px-4 py-3 text-right">{p.duration_days} hari</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggle(p.id, p.is_active)}
                      className={`rounded px-2 py-1 text-xs ${p.is_active ? "bg-[var(--color-success)] text-white" : "bg-[var(--color-gray-100)]"}`}
                    >
                      {p.is_active ? "ON" : "OFF"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="icon" variant="ghost" onClick={() => remove(p.id)}>
                      <Trash2 className="h-4 w-4 text-[var(--color-destructive)]" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-4">
          <h3 className="text-lg font-bold">Tambah Paket</h3>
          <div>
            <Label>Nama</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Slug</Label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div>
            <Label>Harga (IDR)</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div>
            <Label>Durasi (hari)</Label>
            <Input type="number" value={days} onChange={(e) => setDays(e.target.value)} />
          </div>
          <div>
            <Label>Deskripsi</Label>
            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <Button onClick={create} className="w-full">
            Simpan
          </Button>
        </div>
      </div>
    </>
  );
}
