import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { MapPin, Star, Clock } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

function MarketsPage() {
  const [q, setQ] = useState("");
  const { data: markets } = useQuery({
    queryKey: ["markets-public"],
    queryFn: async () => (await supabase.from("markets").select("*").eq("is_active", true).order("name")).data ?? [],
  });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  // Initialize map once on mount
  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [-6.21, 106.84],
        zoom: 11,
        zoomControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(mapInstance.current);

      // Light themed modern map tiles (Voyager)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(mapInstance.current);

      markersGroupRef.current = L.layerGroup().addTo(mapInstance.current);
    }
  }, []);

  const filtered = (markets ?? []).filter((m: any) => !q || m.name.toLowerCase().includes(q.toLowerCase()) || m.city.toLowerCase().includes(q.toLowerCase()));

  // Update markers and bounds when filtered list changes
  useEffect(() => {
    if (!mapInstance.current || !markersGroupRef.current) return;

    markersGroupRef.current.clearLayers();

    const customIcon = L.divIcon({
      className: "custom-leaflet-icon",
      html: `
        <div class="flex items-center justify-center w-8 h-8 rounded-full bg-[#1e3a8a] text-white shadow-lg border-2 border-white transform transition-transform hover:scale-110 hover:bg-[#127a79]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-white">
            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const coords: [number, number][] = [];

    filtered.forEach((m: any) => {
      if (m.lat && m.lng) {
        const lat = Number(m.lat);
        const lng = Number(m.lng);
        coords.push([lat, lng]);

        const marker = L.marker([lat, lng], { icon: customIcon });

        const popupContent = `
          <div class="p-1 font-sans">
            <h3 class="font-bold text-sm text-[#1e3a8a]">${m.name}</h3>
            <p class="text-xs text-gray-600 mt-1">${m.address}, ${m.city}</p>
            <div class="mt-2 flex items-center justify-between border-t border-gray-100 pt-2 gap-4">
              <span class="text-[10px] text-gray-500 font-semibold">${m.hours || ""}</span>
              <a href="/markets/${m.id}" class="text-xs text-[#127a79] font-bold hover:underline whitespace-nowrap">Lihat Detail &rarr;</a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 220,
          className: "custom-leaflet-popup",
        });

        markersGroupRef.current?.addLayer(marker);
      }
    });

    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      mapInstance.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    } else {
      mapInstance.current.setView([-6.21, 106.84], 11);
    }
  }, [filtered]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      <header className="border-b border-[var(--color-gray-100)] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white">
              PC
            </span>
            PasarCek
          </Link>
          <Button asChild>
            <Link to="/auth">Masuk</Link>
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-4xl font-black">Pasar Tradisional Terdekat</h1>
        <p className="mt-2 text-[var(--color-gray-500)]">
          Lihat lokasi, alamat, dan jam operasional pasar di sekitar Anda.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_400px]">
          <div ref={mapRef} className="relative z-0 h-[500px] overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white shadow-sm" />
          <div>
            <Input placeholder="Cari pasar / kota..." value={q} onChange={(e) => setQ(e.target.value)} />
            <div className="mt-4 max-h-[440px] space-y-3 overflow-y-auto pr-2">
              {filtered.map((m: any) => (
                <Link
                  key={m.id}
                  to="/markets/$id"
                  params={{ id: m.id }}
                  className="block rounded-lg border border-[var(--color-gray-100)] bg-white p-4 transition-colors hover:border-[var(--color-brand-blue)]"
                >
                  <p className="font-bold">{m.name}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-[var(--color-gray-500)]">
                    <MapPin className="h-3 w-3" />
                    {m.address}, {m.city}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-[var(--color-gray-500)]">
                    {m.hours && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {m.hours}
                      </span>
                    )}
                    {m.rating > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-[var(--color-warning)] text-[var(--color-warning)]" />
                        {m.rating}
                      </span>
                    )}
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
