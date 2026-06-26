import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, Sparkles, Check } from "lucide-react";
import { getAiProductSuggestions } from "@/lib/api/ai.functions";

export const Route = createFileRoute("/_authenticated/admin/products")({ component: AdminProducts });

function AdminProducts() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => (await supabase.from("products").select("*").order("name")).data ?? [],
  });
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("kg");

  // AI Assistant state variables
  const [aiQuery, setAiQuery] = useState("");
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiResults, setAiResults] = useState<any[]>([]);

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

  async function handleAiSearch() {
    if (!aiQuery.trim()) {
      return toast.error("Masukkan kata kunci pencarian AI");
    }
    setIsAiSearching(true);
    setAiResults([]);
    try {
      const existing = (data ?? []).map((p: any) => ({
        name: p.name,
        category: p.category,
        unit: p.unit,
      }));

      const localKey = localStorage.getItem("pasardeck_gemini_api_key") || undefined;

      const results = await getAiProductSuggestions({
        data: {
          query: aiQuery,
          existingProducts: existing,
          apiKey: localKey,
        }
      });

      if (Array.isArray(results)) {
        setAiResults(results);
        if (results.length === 0) {
          toast.info("Tidak ditemukan produk baru yang relevan.");
        } else {
          toast.success(`Ditemukan ${results.length} rekomendasi produk.`);
        }
      } else {
        throw new Error("Respon AI tidak valid");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Gagal melakukan pencarian AI");
    } finally {
      setIsAiSearching(false);
    }
  }

  return (
    <>
      <h1 className="mb-6 text-3xl font-black">Produk</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Daftar Produk */}
        <div className="overflow-x-auto rounded-lg border border-[var(--color-gray-100)] bg-white h-fit">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
              <tr>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Satuan</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((p: any) => (
                <tr key={p.id} className="border-t border-[var(--color-gray-100)]">
                  <td className="px-4 py-3 font-semibold">{p.name}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">{p.unit}</td>
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

        {/* Form Tambah & Asisten AI */}
        <div className="space-y-6">
          {/* Form Tambah Produk */}
          <div className="space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-4">
            <h3 className="text-lg font-bold">Tambah Produk</h3>
            <div>
              <Label>Nama</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label>Kategori</Label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div>
              <Label>Satuan</Label>
              <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
            </div>
            <Button onClick={create} className="w-full">Simpan</Button>
          </div>

          {/* Asisten AI Pencarian & Auto-Kategori */}
          <div className="space-y-4 rounded-lg border border-[#127a79]/20 bg-[#127a79]/5 p-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-[#127a79]/10 pb-2">
              <Sparkles className="h-5 w-5 text-[#127a79] animate-pulse" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Asisten AI PasarCek</h3>
                <p className="text-[10px] text-[#127a79] font-medium">Pencarian & auto-kategori produk baru</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-800">Cari Produk Belum Tersedia</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Susu Oat, Telur Puyuh..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="h-9 text-xs border-[#127a79]/25 bg-white focus-visible:ring-[#127a79]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAiSearch();
                  }}
                />
                <Button
                  onClick={handleAiSearch}
                  disabled={isAiSearching}
                  size="sm"
                  className="bg-[#127a79] hover:bg-[#127a79]/90 text-white text-xs font-medium px-3"
                >
                  {isAiSearching ? "Mencari..." : "Cari"}
                </Button>
              </div>
            </div>

            {/* Hasil Pencarian AI */}
            {aiResults.length > 0 && (
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                <p className="text-[10px] font-bold text-[#127a79] uppercase tracking-wider">Hasil Rekomendasi AI:</p>
                <div className="space-y-2">
                  {aiResults.map((item, idx) => (
                    <div key={idx} className="rounded-md border border-gray-100 bg-white p-2.5 shadow-sm text-xs space-y-1.5 hover:border-[#127a79]/30 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-gray-900">{item.name}</span>
                        <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                          item.status === "Belum Tersedia"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      {item.similarity && (
                        <p className="text-[10px] text-amber-600">
                          Mirip dengan: <span className="font-medium">{item.similarity}</span>
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1 text-[10px]">
                        <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                          Kategori: <strong>{item.category}</strong>
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                          Satuan: <strong>{item.unit}</strong>
                        </span>
                      </div>

                      <p className="text-[10px] text-gray-500 italic leading-relaxed">{item.description}</p>

                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full h-7 text-[10px] border-[#127a79]/20 text-[#127a79] hover:bg-[#127a79]/5 hover:text-[#127a79] flex items-center justify-center gap-1 mt-1"
                        onClick={() => {
                          setName(item.name);
                          setCategory(item.category);
                          setUnit(item.unit);
                          toast.success(`Data ${item.name} diterapkan ke form.`);
                        }}
                      >
                        <Check className="h-3 w-3" /> Gunakan Data Ini
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info local API key */}
            {localStorage.getItem("pasardeck_gemini_api_key") && (
              <p className="text-[9px] text-[#127a79]/70 text-right italic">
                Menggunakan local API key dari browser.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
