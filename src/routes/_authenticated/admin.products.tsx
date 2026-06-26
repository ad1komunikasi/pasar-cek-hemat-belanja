import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/products")({ component: AdminProducts });

function AdminProducts() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => (await supabase.from("products").select("*").order("name")).data ?? [],
  });
  const [name, setName] = useState(""); const [category, setCategory] = useState(""); const [unit, setUnit] = useState("kg");

  async function create() {
    if (!name || !category) return toast.error("Lengkapi data");
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const { error } = await supabase.from("products").insert({ name, slug, category, unit });
    if (error) return toast.error(error.message);
    toast.success("Produk ditambahkan");
    setName(""); setCategory("");
    qc.invalidateQueries({ queryKey: ["admin-products"] });
  }
  async function remove(id: string) {
    await supabase.from("products").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-products"] });
  }

  return (
    <>
      <h1 className="mb-6 text-3xl font-black">Produk</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-x-auto rounded-lg border border-[var(--color-gray-100)] bg-white">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]"><tr><th className="px-4 py-3">Nama</th><th className="px-4 py-3">Kategori</th><th className="px-4 py-3">Satuan</th><th /></tr></thead>
            <tbody>
              {(data ?? []).map((p: any) => (
                <tr key={p.id} className="border-t border-[var(--color-gray-100)]">
                  <td className="px-4 py-3 font-semibold">{p.name}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">{p.unit}</td>
                  <td className="px-4 py-3 text-right"><Button size="icon" variant="ghost" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4 text-[var(--color-destructive)]" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-4">
          <h3 className="text-lg font-bold">Tambah Produk</h3>
          <div><Label>Nama</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label>Kategori</Label><Input value={category} onChange={(e) => setCategory(e.target.value)} /></div>
          <div><Label>Satuan</Label><Input value={unit} onChange={(e) => setUnit(e.target.value)} /></div>
          <Button onClick={create} className="w-full">Simpan</Button>
        </div>
      </div>
    </>
  );
}
