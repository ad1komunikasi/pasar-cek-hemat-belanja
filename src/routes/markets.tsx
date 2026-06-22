import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { MapPin, Star, Clock } from "lucide-react";

let scriptLoaded = false;
let scriptLoadingPromise: Promise<void> | null = null;

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (scriptLoaded) return Promise.resolve();
  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && (window as any).google && (window as any).google.maps) {
      scriptLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    script.onerror = (err) => {
      scriptLoadingPromise = null;
      reject(err);
    };
    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

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
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  // Load Google Maps Script
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
    if (!apiKey) {
      console.error("Google Maps API Key is missing");
      return;
    }
    loadGoogleMapsScript(apiKey)
      .then(() => setMapsLoaded(true))
      .catch((err) => console.error("Failed to load Google Maps script", err));
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapsLoaded || !mapRef.current || mapInstance.current) return;

    mapInstance.current = new google.maps.Map(mapRef.current, {
      center: { lat: -6.21, lng: 106.84 },
      zoom: 11,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
    });
  }, [mapsLoaded]);

  const filtered = (markets ?? []).filter((m: any) => !q || m.name.toLowerCase().includes(q.toLowerCase()) || m.city.toLowerCase().includes(q.toLowerCase()));

  // Update markers and bounds when filtered list or map instance changes
  useEffect(() => {
    if (!mapInstance.current || !mapsLoaded) return;

    // Clear old markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const bounds = new google.maps.LatLngBounds();
    let hasCoords = false;

    filtered.forEach((m: any) => {
      if (m.lat && m.lng) {
        const lat = Number(m.lat);
        const lng = Number(m.lng);
        const position = { lat, lng };

        bounds.extend(position);
        hasCoords = true;

        const marker = new google.maps.Marker({
          position,
          map: mapInstance.current!,
          title: m.name,
          icon: {
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            fillColor: "#1e3a8a",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 1.5,
            anchor: new google.maps.Point(12, 22),
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 4px; font-family: sans-serif; max-width: 200px;">
              <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold; color: #1e3a8a;">${m.name}</h3>
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #4b5563;">${m.address}, ${m.city}</p>
              <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #f3f4f6; padding-top: 8px; gap: 8px;">
                <span style="font-size: 10px; color: #6b7280; font-weight: 600;">${m.hours || ""}</span>
                <a href="/markets/${m.id}" style="font-size: 12px; color: #127a79; font-weight: bold; text-decoration: none; white-space: nowrap;">Lihat Detail &rarr;</a>
              </div>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(mapInstance.current, marker);
        });

        markersRef.current.push(marker);
      }
    });

    if (hasCoords) {
      mapInstance.current.fitBounds(bounds);
      // Avoid zooming too close if there is only 1 marker
      if (filtered.length === 1) {
        const listener = google.maps.event.addListener(mapInstance.current, "idle", () => {
          if (mapInstance.current) {
            mapInstance.current.setZoom(14);
          }
          google.maps.event.removeListener(listener);
        });
      }
    } else {
      mapInstance.current.setCenter({ lat: -6.21, lng: 106.84 });
      mapInstance.current.setZoom(11);
    }
  }, [filtered, mapsLoaded]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      mapInstance.current = null;
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
