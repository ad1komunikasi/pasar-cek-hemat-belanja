import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { MapPin, Star, Clock } from "lucide-react";

export const Route = createFileRoute("/markets")({
  head: () => ({
    meta: [
      { title: "Lokasi Pasar Tradisional Terdekat — PasarCek" },
      { name: "description", content: "Temukan pasar tradisional terdekat di Jakarta dan sekitarnya. Cek alamat, jam buka, dan harga sembako di tiap pasar." },
      { property: "og:title", content: "Lokasi Pasar Tradisional Terdekat — PasarCek" },
      { property: "og:description", content: "Daftar lengkap pasar dengan peta, alamat, dan jam operasional." },
    ],
  }),
  component: MarketsPage,
});

declare global { interface Window { initPasarcekMap?: () => void; google?: any; } }

function MarketsPage() {
  const [q, setQ] = useState("");
  const { data: markets } = useQuery({
    queryKey: ["markets-public"],
    queryFn: async () => (await supabase.from("markets").select("*").eq("is_active", true).order("name")).data ?? [],
  });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const ch = import.meta.env.VITE_GOOGLE_MAPS_TRACKING_ID;
    if (!key) return;
    function init() {
      if (!mapRef.current || !window.google) return;
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: -6.21, lng: 106.84 }, zoom: 11, disableDefaultUI: true, zoomControl: true,
      });
      (markets ?? []).forEach((m: any) => {
        if (m.lat && m.lng) new window.google.maps.Marker({ position: { lat: Number(m.lat), lng: Number(m.lng) }, map: mapInstance.current, title: m.name });
      });
    }
    window.initPasarcekMap = init;
    if (!document.querySelector("script[data-gmaps]")) {
      const s = document.createElement("script");
      s.dataset.gmaps = "1";
      s.async = true;
      s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=initPasarcekMap&channel=${ch ?? ""}`;
      document.head.appendChild(s);
    } else if (window.google) init();
  }, [markets]);

  const filtered = (markets ?? []).filter((m: any) => !q || m.name.toLowerCase().includes(q.toLowerCase()) || m.city.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      <header className="border-b border-[var(--color-gray-100)] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 font-bold"><span className="inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white">PC</span>PasarCek</Link>
          <Button asChild><Link to="/auth">Masuk</Link></Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-4xl font-black">Pasar Tradisional Terdekat</h1>
        <p className="mt-2 text-[var(--color-gray-500)]">Lihat lokasi, alamat, dan jam operasional pasar di sekitar Anda.</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_400px]">
          <div ref={mapRef} className="h-[500px] rounded-lg border border-[var(--color-gray-100)] bg-white" />
          <div>
            <Input placeholder="Cari pasar / kota..." value={q} onChange={(e) => setQ(e.target.value)} />
            <div className="mt-4 max-h-[440px] space-y-3 overflow-y-auto pr-2">
              {filtered.map((m: any) => (
                <Link key={m.id} to="/markets/$id" params={{ id: m.id }} className="block rounded-lg border border-[var(--color-gray-100)] bg-white p-4 transition-colors hover:border-[var(--color-brand-blue)]">
                  <p className="font-bold">{m.name}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-[var(--color-gray-500)]"><MapPin className="h-3 w-3" />{m.address}, {m.city}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-[var(--color-gray-500)]">
                    {m.hours && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{m.hours}</span>}
                    {m.rating > 0 && <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-[var(--color-warning)] text-[var(--color-warning)]" />{m.rating}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
