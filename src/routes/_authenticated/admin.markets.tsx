import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, Sparkles, Check, Pencil } from "lucide-react";
import { getAiMarketSuggestions } from "@/lib/api/ai.functions";

export const Route = createFileRoute("/_authenticated/admin/markets")({ component: AdminMarkets });

function AdminMarkets() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-markets"],
    queryFn: async () => (await supabase.from("markets").select("*").order("name")).data ?? [],
  });

  const { data: requests } = useQuery({
    queryKey: ["admin-market-requests"],
    queryFn: async () => (await supabase.from("market_requests" as any).select("*").order("created_at", { ascending: false })).data ?? [],
  });

  async function removeRequest(id: string) {
    const { error } = await supabase.from("market_requests" as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Permintaan pengajuan dihapus");
    qc.invalidateQueries({ queryKey: ["admin-market-requests"] });
  }

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("DKI Jakarta");
  const [type, setType] = useState<"tradisional" | "modern" | "swalayan">("tradisional");
  const [hours, setHours] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // AI Assistant state variables
  const [aiQuery, setAiQuery] = useState("");
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiResults, setAiResults] = useState<any[]>([]);

  async function create() {
    if (!name || !address || !city || !province) return toast.error("Lengkapi data");
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    let sanitizedMapsUrl = googleMapsUrl.trim();
    // Normalize or auto-generate link to match pattern: https://www.google.com/maps?q=Nama+Pasar,++Nama+Kota
    if (!sanitizedMapsUrl || sanitizedMapsUrl.includes("/place/") || sanitizedMapsUrl.includes("/search/")) {
      const queryName = encodeURIComponent(name).replace(/%20/g, "+");
      const queryCity = city ? `,++${encodeURIComponent(city).replace(/%20/g, "+")}` : "";
      sanitizedMapsUrl = `https://www.google.com/maps?q=${queryName}${queryCity}`;
    } else {
      if (sanitizedMapsUrl.startsWith("ttps://")) {
        sanitizedMapsUrl = "h" + sanitizedMapsUrl;
      } else if (sanitizedMapsUrl.startsWith("ttp://")) {
        sanitizedMapsUrl = "h" + sanitizedMapsUrl;
      } else if (!/^https?:\/\//i.test(sanitizedMapsUrl)) {
        sanitizedMapsUrl = "https://" + sanitizedMapsUrl;
      }
    }

    const marketData = {
      name,
      slug,
      address,
      city,
      province,
      type,
      hours,
      lat: lat ? Number(lat) : null,
      lng: lng ? Number(lng) : null,
      google_maps_url: sanitizedMapsUrl || null,
    };

    if (editingId) {
      const { error } = await supabase
        .from("markets")
        .update(marketData)
        .eq("id", editingId);
      if (error) return toast.error(error.message);
      toast.success("Pasar diperbarui");
      setEditingId(null);
    } else {
      const { error } = await supabase.from("markets").insert(marketData);
      if (error) return toast.error(error.message);
      toast.success("Pasar ditambahkan");
    }

    setName("");
    setAddress("");
    setCity("");
    setProvince("DKI Jakarta");
    setHours("");
    setLat("");
    setLng("");
    setGoogleMapsUrl("");
    qc.invalidateQueries({ queryKey: ["admin-markets"] });
    qc.invalidateQueries({ queryKey: ["markets-public"] });
    qc.invalidateQueries({ queryKey: ["markets-list"] });
  }

  async function remove(id: string) {
    await supabase.from("markets").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-markets"] });
    qc.invalidateQueries({ queryKey: ["markets-public"] });
    qc.invalidateQueries({ queryKey: ["markets-list"] });
  }

  async function handleAiSearch() {
    if (!aiQuery.trim()) {
      return toast.error("Masukkan kata kunci pencarian AI");
    }
    setIsAiSearching(true);
    setAiResults([]);
    try {
      const existing = (data ?? []).map((m: any) => ({
        name: m.name,
        address: m.address,
        city: m.city,
        type: m.type,
        hours: m.hours,
      }));

      const localKey = localStorage.getItem("pasardeck_gemini_api_key") || undefined;

      const results = await getAiMarketSuggestions({
        data: {
          query: aiQuery,
          existingMarkets: existing,
          apiKey: localKey,
        },
      });

      if (Array.isArray(results)) {
        setAiResults(results);
        if (results.length === 0) {
          toast.info("Tidak ditemukan pasar baru yang relevan.");
        } else {
          toast.success(`Ditemukan ${results.length} rekomendasi pasar.`);
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
      <h1 className="mb-6 text-3xl font-black">Pasar</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Market List */}
        <div className="overflow-x-auto rounded-lg border border-[var(--color-gray-100)] bg-white h-fit">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
              <tr>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Kota</th>
                <th className="px-4 py-3">Tipe</th>
                <th className="px-4 py-3">Jam</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((m: any) => (
                <tr key={m.id} className="border-t border-[var(--color-gray-100)]">
                  <td className="px-4 py-3 font-semibold">
                    {m.name}
                    <br />
                    <span className="text-xs font-normal text-[var(--color-gray-500)]">{m.address}</span>
                    {m.province && (
                      <span className="text-[10px] block text-[var(--color-gray-400)]">{m.province}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{m.city}</td>
                  <td className="px-4 py-3 capitalize">{m.type}</td>
                  <td className="px-4 py-3">{m.hours ?? "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setEditingId(m.id);
                          setName(m.name);
                          setAddress(m.address);
                          setCity(m.city);
                          setProvince(m.province || "DKI Jakarta");
                          setType(m.type);
                          setHours(m.hours || "");
                          setLat(m.lat ? String(m.lat) : "");
                          setLng(m.lng ? String(m.lng) : "");
                          setGoogleMapsUrl(m.google_maps_url || "");
                          toast.info(`Mengedit pasar: ${m.name}`);
                        }}
                      >
                        <Pencil className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => remove(m.id)}>
                        <Trash2 className="h-4 w-4 text-[var(--color-destructive)]" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Side Panel: Form & AI Assistant */}
        <div className="space-y-6">
          {/* Add Market Form */}
          <div className="space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-4">
            <h3 className="text-lg font-bold">{editingId ? "Edit Pasar" : "Tambah Pasar"}</h3>
            <div>
              <Label>Nama</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label>Alamat</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
              <Label>Kota</Label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
              <Label>Provinsi</Label>
              <Input value={province} onChange={(e) => setProvince(e.target.value)} />
            </div>
            <div>
              <Label>Tipe</Label>
              <Select value={type} onValueChange={(v: any) => setType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tradisional">Tradisional</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="swalayan">Swalayan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Jam Operasional</Label>
              <Input value={hours} onChange={(e) => setHours(e.target.value)} placeholder="05:00 - 17:00" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Latitude</Label>
                <Input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="-6.175..." />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input value={lng} onChange={(e) => setLng(e.target.value)} placeholder="106.827..." />
              </div>
            </div>
            <div>
              <Label>Tautan Google Maps</Label>
              <Input value={googleMapsUrl} onChange={(e) => setGoogleMapsUrl(e.target.value)} placeholder="https://google.com/maps/..." />
            </div>
            <Button onClick={create} className="w-full">
              {editingId ? "Simpan Perubahan" : "Simpan"}
            </Button>
            {editingId && (
              <Button
                variant="ghost"
                onClick={() => {
                  setEditingId(null);
                  setName("");
                  setAddress("");
                  setCity("");
                  setProvince("DKI Jakarta");
                  setType("tradisional");
                  setHours("");
                  setLat("");
                  setLng("");
                  setGoogleMapsUrl("");
                }}
                className="w-full text-xs"
              >
                Batal Edit
              </Button>
            )}
          </div>

          {/* AI Market Search & Autocomplete Assistant */}
          <div className="space-y-4 rounded-lg border border-[#127a79]/20 bg-[#127a79]/5 p-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-[#127a79]/10 pb-2">
              <Sparkles className="h-5 w-5 text-[#127a79] animate-pulse" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Asisten AI PasarCek</h3>
                <p className="text-[10px] text-[#127a79] font-medium">Pencarian & auto-isi data pasar baru</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-800">Cari Pasar Belum Tersedia</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Pasar Tomang Barat, Pasar Baru..."
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

            {/* AI Search Results */}
            {aiResults.length > 0 && (
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                <p className="text-[10px] font-bold text-[#127a79] uppercase tracking-wider">Hasil Rekomendasi AI:</p>
                <div className="space-y-2">
                  {aiResults.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-md border border-gray-100 bg-white p-2.5 shadow-sm text-xs space-y-1.5 hover:border-[#127a79]/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-gray-900">{item.name}</span>
                        <span
                          className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                            item.status === "Belum Tersedia"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      {item.similarity && (
                        <p className="text-[10px] text-amber-600">
                          Mirip dengan: <span className="font-medium">{item.similarity}</span>
                        </p>
                      )}

                      <p className="text-[10px] text-gray-700 leading-normal">
                        <strong>Alamat:</strong> {item.address}
                      </p>

                      <div className="flex flex-wrap gap-1 text-[10px]">
                        <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                          Kota: <strong>{item.city}</strong>
                        </span>
                        {item.province && (
                          <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                            Provinsi: <strong>{item.province}</strong>
                          </span>
                        )}
                        <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded capitalize font-medium">
                          Tipe: <strong>{item.type}</strong>
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                          Jam: <strong>{item.hours}</strong>
                        </span>
                      </div>

                      {/* Coordinates & Maps URL */}
                      {(item.lat || item.lng) && (
                        <div className="flex items-center gap-1 text-[10px] bg-blue-50 border border-blue-100 rounded px-1.5 py-1">
                          <svg className="h-3 w-3 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                          <span className="text-blue-700 font-mono">
                            {item.lat != null ? item.lat.toFixed(6) : "—"}, {item.lng != null ? item.lng.toFixed(6) : "—"}
                          </span>
                        </div>
                      )}
                      {item.google_maps_url && (
                        <a
                          href={item.google_maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[10px] text-[#127a79] hover:underline truncate"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          <span className="truncate">{item.google_maps_url}</span>
                        </a>
                      )}
                      {!item.lat && !item.lng && !item.google_maps_url && (
                        <p className="text-[10px] text-amber-600 italic">⚠ Koordinat & link Maps tidak tersedia dari AI</p>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full h-7 text-[10px] border-[#127a79]/20 text-[#127a79] hover:bg-[#127a79]/5 hover:text-[#127a79] flex items-center justify-center gap-1 mt-1"
                        onClick={() => {
                          setName(item.name);
                          setAddress(item.address);
                          setCity(item.city);
                          if (item.province) setProvince(item.province);
                          if (item.type) setType(item.type.toLowerCase() as any);
                          if (item.hours) setHours(item.hours);
                          setLat(item.lat ? String(item.lat) : "");
                          setLng(item.lng ? String(item.lng) : "");
                          setGoogleMapsUrl(item.google_maps_url || "");
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

      {/* Market Requests Section */}
      {requests && requests.length > 0 && (
        <div className="mt-12 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Permintaan Pasar Baru ({requests.filter((r: any) => r.status === "pending").length})
          </h2>
          <div className="overflow-x-auto rounded-lg border border-[var(--color-gray-100)] bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)] border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Nama Pasar</th>
                  <th className="px-4 py-3">Alamat</th>
                  <th className="px-4 py-3">Kota / Provinsi</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {requests.map((r: any) => (
                  <tr key={r.id} className="border-t border-[var(--color-gray-100)] hover:bg-gray-55/20 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-900">{r.market_name}</td>
                    <td className="px-4 py-3 text-gray-600">{r.address || "—"}</td>
                    <td className="px-4 py-3">
                      {r.city}
                      {r.province && <span className="text-xs text-gray-400 block">{r.province}</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                        r.status === "pending" 
                          ? "bg-amber-50 text-amber-700 border border-amber-200" 
                          : r.status === "approved" 
                            ? "bg-green-50 text-green-700 border border-green-200" 
                            : "bg-red-50 text-red-700 border border-red-200"
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setName(r.market_name);
                            setAddress(r.address || "");
                            setCity(r.city || "");
                            setProvince(r.province || "DKI Jakarta");
                            toast.success(`Data ${r.market_name} dimuat ke form.`);
                          }}
                          className="h-8 text-xs flex items-center gap-1 border-gray-200"
                        >
                          <Check className="h-3.5 w-3.5" /> Gunakan
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeRequest(r.id)}
                          className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 text-[var(--color-destructive)]" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

