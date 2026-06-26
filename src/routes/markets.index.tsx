import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState, useMemo } from "react";
import { MapPin, Star, Clock, Heart } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import type L from "leaflet";

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

export const Route = createFileRoute("/markets/")({
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
  const { user } = useAuth();
  const qc = useQueryClient();

  const searchRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // New Market Request states
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [reqName, setReqName] = useState("");
  const [reqAddress, setReqAddress] = useState("");
  const [reqCity, setReqCity] = useState("");
  const [reqProvince, setReqProvince] = useState("DKI Jakarta");
  const [isSubmittingReq, setIsSubmittingReq] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: markets } = useQuery({
    queryKey: ["markets-public"],
    queryFn: async () => (await supabase.from("markets").select("*").eq("is_active", true).order("name")).data ?? [],
  });

  // Extract unique cities from active markets
  const allCities = useMemo(() => {
    const cities = new Set<string>();
    (markets ?? []).forEach((m: any) => {
      if (m.city) cities.add(m.city);
    });
    return Array.from(cities);
  }, [markets]);

  // Matches for cities based on q
  const matchedCities = useMemo(() => {
    if (!q.trim()) return [];
    return allCities.filter(city => city.toLowerCase().includes(q.toLowerCase())).slice(0, 3);
  }, [allCities, q]);

  // Matches for markets based on q
  const matchedMarkets = useMemo(() => {
    if (!q.trim()) return [];
    return (markets ?? []).filter(m => m.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5);
  }, [markets, q]);

  async function submitRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!reqName || !reqAddress || !reqCity) {
      toast.error("Lengkapi data permintaan pasar.");
      return;
    }
    setIsSubmittingReq(true);
    try {
      const { error } = await supabase.from("market_requests" as any).insert({
        user_id: user?.id || null,
        market_name: reqName,
        address: reqAddress,
        city: reqCity,
        province: reqProvince,
        status: "pending"
      });
      if (error) throw error;

      toast.success("Permintaan tambah pasar berhasil dikirim!");
      setShowRequestModal(false);
      setReqName("");
      setReqAddress("");
      setReqCity("");
      setReqProvince("DKI Jakarta");
    } catch (err: any) {
      console.error(err);
      toast.error("Gagal mengirim permintaan: " + err.message);
    } finally {
      setIsSubmittingReq(false);
    }
  }

  const { data: favMarkets } = useQuery({
    queryKey: ["fav-markets", user?.id],
    queryFn: async () => {
      if (!user) return [];
      return (await supabase.from("favorites_markets").select("market_id").eq("user_id", user.id)).data ?? [];
    },
    enabled: !!user,
  });

  const favMarketIds = useMemo(() => new Set((favMarkets ?? []).map((fm: any) => fm.market_id)), [favMarkets]);

  async function toggleFavMarket(marketId: string) {
    if (!user) {
      toast.error("Silakan masuk terlebih dahulu untuk menyimpan pasar favorit.");
      return;
    }
    const isFav = favMarketIds.has(marketId);
    if (isFav) {
      const { data } = await supabase.from("favorites_markets").select("id").eq("user_id", user.id).eq("market_id", marketId).maybeSingle();
      if (data) {
        await supabase.from("favorites_markets").delete().eq("id", data.id);
        toast.success("Dihapus dari pasar favorit");
      }
    } else {
      await supabase.from("favorites_markets").insert({
        user_id: user.id,
        market_id: marketId
      });
      toast.success("Ditambahkan ke pasar favorit");
    }
    qc.invalidateQueries({ queryKey: ["fav-markets"] });
  }

  // Separate refs for different map instances
  const googleMapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<HTMLDivElement>(null);

  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [useLeafletFallback, setUseLeafletFallback] = useState(false);

  // Leaflet references
  const leafletMapInstance = useRef<L.Map | null>(null);
  const leafletMarkersGroupRef = useRef<L.LayerGroup | null>(null);

  // Load Google Maps Script & Setup Fallback Triggers
  useEffect(() => {
    // Register global Google Maps authentication failure callback
    (window as any).gm_authFailure = () => {
      console.warn("Google Maps authentication failed (e.g. invalid key or domain restrictions). Falling back to Leaflet.");
      setUseLeafletFallback(true);
    };

    const isLocalhost = typeof window !== "undefined" && 
      (window.location.hostname === "localhost" || 
       window.location.hostname === "127.0.0.1" || 
       window.location.hostname.includes("192.168."));

    const hasCustomKey = !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // If on production Vercel and NO custom key is provided:
    // We immediately fallback to Leaflet to prevent loading the restricted Lovable key
    if (!isLocalhost && !hasCustomKey) {
      console.info("Production Vercel environment detected without custom Google Maps key. Defaulting to Leaflet.");
      setUseLeafletFallback(true);
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
    if (!apiKey) {
      console.warn("Google Maps API Key is missing. Falling back to Leaflet.");
      setUseLeafletFallback(true);
      return;
    }

    loadGoogleMapsScript(apiKey)
      .then(() => {
        if (!useLeafletFallback) {
          setMapsLoaded(true);
        }
      })
      .catch((err) => {
        console.error("Failed to load Google Maps script", err);
        setUseLeafletFallback(true);
      });

    return () => {
      delete (window as any).gm_authFailure;
    };
  }, [useLeafletFallback]);

  // Clean up Google Maps instance if we switch to Leaflet
  useEffect(() => {
    if (useLeafletFallback) {
      if (markersRef.current) {
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
      }
      mapInstance.current = null;
    }
  }, [useLeafletFallback]);

  // Initialize Google Map
  useEffect(() => {
    if (useLeafletFallback) return;
    if (!mapsLoaded || !googleMapRef.current || mapInstance.current) return;

    mapInstance.current = new google.maps.Map(googleMapRef.current, {
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
  }, [mapsLoaded, useLeafletFallback]);

  // Check for Google Maps rendering errors in the container (Double safety fallback)
  useEffect(() => {
    if (useLeafletFallback || !googleMapRef.current || !mapsLoaded) return;

    // Helper to find elements inside Shadow DOM recursively
    const findInShadowDOM = (root: Element | ShadowRoot, selector: string): Element | null => {
      const found = root.querySelector(selector);
      if (found) return found;

      const elements = root.querySelectorAll("*");
      for (const el of Array.from(elements)) {
        if (el.shadowRoot) {
          const res = findInShadowDOM(el.shadowRoot, selector);
          if (res) return res;
        }
      }
      return null;
    };

    // Helper to find text content inside Shadow DOM recursively
    const findTextInShadowDOM = (root: Element | ShadowRoot, text: string): boolean => {
      if (root.textContent && root.textContent.includes(text)) {
        return true;
      }

      const elements = root.querySelectorAll("*");
      for (const el of Array.from(elements)) {
        if (el.shadowRoot) {
          if (findTextInShadowDOM(el.shadowRoot, text)) {
            return true;
          }
        }
      }
      return false;
    };

    const checkForGmapsError = () => {
      if (googleMapRef.current) {
        // 1. Check for the error documentation link (language-independent and cannot be obfuscated!)
        const hasErrorLink = findInShadowDOM(googleMapRef.current, 'a[href*="error-messages"]') ||
                             findInShadowDOM(googleMapRef.current, 'a[href*="staticmaperror"]') ||
                             findInShadowDOM(googleMapRef.current, 'a[href*="developers.google.com/maps"]');

        // 2. Check for localized error texts (English and Indonesian)
        const hasErrorText = findTextInShadowDOM(googleMapRef.current, "Oops!") ||
                             findTextInShadowDOM(googleMapRef.current, "Something went wrong") ||
                             findTextInShadowDOM(googleMapRef.current, "Maaf!") ||
                             findTextInShadowDOM(googleMapRef.current, "Terjadi kesalahan") ||
                             findTextInShadowDOM(googleMapRef.current, "tidak memuat Google Maps dengan benar");

        // 3. Check for typical class names
        const hasErrorClass = findInShadowDOM(googleMapRef.current, ".gm-err-container") || 
                              findInShadowDOM(googleMapRef.current, ".gm-err-content");
        
        if (hasErrorLink || hasErrorText || hasErrorClass) {
          console.warn("Google Maps error detected via DOM/Shadow DOM scanning. Triggering Leaflet fallback.");
          setUseLeafletFallback(true);
          return true;
        }
      }
      return false;
    };

    // Run check immediately and then periodically for 6 seconds
    const interval = setInterval(() => {
      if (checkForGmapsError()) {
        clearInterval(interval);
      }
    }, 500);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [mapsLoaded, useLeafletFallback]);

  const filtered = (markets ?? []).filter((m: any) => !q || m.name.toLowerCase().includes(q.toLowerCase()) || m.city.toLowerCase().includes(q.toLowerCase()));

  // Update Google Maps markers when filtered list or map instance changes
  useEffect(() => {
    if (useLeafletFallback || !mapInstance.current || !mapsLoaded) return;

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
  }, [filtered, mapsLoaded, useLeafletFallback]);

  // Initialize and update Leaflet Map (Runs on fallback only, loads code dynamically to prevent SSR errors)
  useEffect(() => {
    if (!useLeafletFallback || !leafletMapRef.current) return;

    Promise.all([
      import("leaflet"),
      // @ts-ignore
      import("leaflet/dist/leaflet.css")
    ]).then(([leafletModule]) => {
      const L = leafletModule.default || leafletModule;
      if (!leafletMapRef.current) return;

      if (!leafletMapInstance.current) {
        leafletMapInstance.current = L.map(leafletMapRef.current, {
          center: [-6.21, 106.84],
          zoom: 11,
          zoomControl: false,
        });

        L.control.zoom({ position: "bottomright" }).addTo(leafletMapInstance.current);

        // Light themed clean Voyager tiles
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }).addTo(leafletMapInstance.current);

        leafletMarkersGroupRef.current = L.layerGroup().addTo(leafletMapInstance.current);
      }

      if (leafletMarkersGroupRef.current) {
        leafletMarkersGroupRef.current.clearLayers();
      }

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

          leafletMarkersGroupRef.current?.addLayer(marker);
        }
      });

      if (coords.length > 0 && leafletMapInstance.current) {
        const bounds = L.latLngBounds(coords);
        leafletMapInstance.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      } else if (leafletMapInstance.current) {
        leafletMapInstance.current.setView([-6.21, 106.84], 11);
      }
    }).catch(err => {
      console.error("Failed to load leaflet modules dynamically", err);
    });
  }, [useLeafletFallback, filtered]);

  // Clean up Leaflet on unmount
  useEffect(() => {
    return () => {
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-4xl font-black">Pasar Tradisional Terdekat</h1>
        <p className="mt-2 text-[var(--color-gray-500)]">
          Lihat lokasi, alamat, dan jam operasional pasar di sekitar Anda.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_400px]">
          {useLeafletFallback ? (
            <div
              key="leaflet-container"
              ref={leafletMapRef}
              className="relative z-0 h-[500px] overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white shadow-sm"
            />
          ) : (
            <div
              key="google-container"
              ref={googleMapRef}
              className="relative z-0 h-[500px] overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white shadow-sm"
            />
          )}
          <div className="flex flex-col gap-3">
            <div className="relative" ref={searchRef}>
              <Input
                placeholder="Cari pasar / kota..."
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              {showDropdown && q.trim().length > 0 && (
                <div className="absolute left-0 right-0 mt-1 z-50 max-h-[300px] overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-lg space-y-3">
                  {matchedCities.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider px-1">Kota</p>
                      <div className="space-y-0.5">
                        {matchedCities.map((city) => (
                          <button
                            key={city}
                            type="button"
                            className="w-full text-left px-2 py-1.5 rounded hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors flex items-center gap-1.5"
                            onClick={() => {
                              setQ(city);
                              setShowDropdown(false);
                            }}
                          >
                            <MapPin className="h-3 w-3 text-gray-400 shrink-0" />
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchedMarkets.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider px-1">Pasar</p>
                      <div className="space-y-0.5">
                        {matchedMarkets.map((m) => (
                          <Link
                            key={m.id}
                            to="/markets/$id"
                            params={{ id: m.id }}
                            className="w-full text-left px-2 py-1.5 rounded hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors flex items-center gap-1.5"
                            onClick={() => setShowDropdown(false)}
                          >
                            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span className="truncate">{m.name}</span>
                            <span className="text-[10px] text-gray-400 font-normal ml-auto truncate max-w-[120px]">{m.city}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchedCities.length === 0 && matchedMarkets.length === 0 ? (
                    <div className="py-3 text-center space-y-2">
                      <p className="text-xs text-gray-500 italic">Pasar/kota "{q}" tidak ditemukan.</p>
                      <Button
                        size="sm"
                        type="button"
                        onClick={() => {
                          setReqName(q);
                          setShowRequestModal(true);
                          setShowDropdown(false);
                        }}
                        className="text-xs bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue)]/90 text-white"
                      >
                        Ajukan Permintaan Pasar Baru
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-[10px]">
                      <span className="text-gray-400 px-1">Tidak menemukan pasar Anda?</span>
                      <button
                        type="button"
                        onClick={() => {
                          setReqName(q);
                          setShowRequestModal(true);
                          setShowDropdown(false);
                        }}
                        className="text-[var(--color-brand-blue)] font-bold hover:underline px-1"
                      >
                        Ajukan Baru
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="max-h-[440px] space-y-3 overflow-y-auto pr-2">
              {filtered.map((m: any) => (
                <Link
                  key={m.id}
                  to="/markets/$id"
                  params={{ id: m.id }}
                  className="block rounded-lg border border-[var(--color-gray-100)] bg-white p-4 transition-colors hover:border-[var(--color-brand-blue)]"
                >
                  <div className="flex items-start justify-between">
                    <p className="font-bold">{m.name}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavMarket(m.id);
                      }}
                      className="focus:outline-none p-1 -mt-1 -mr-1 rounded-full hover:bg-gray-100 transition-colors"
                      title={favMarketIds.has(m.id) ? "Hapus dari Favorit" : "Tambah ke Favorit"}
                    >
                      <Heart
                        className={`h-4 w-4 transition-all duration-200 ${
                          favMarketIds.has(m.id)
                            ? "fill-[var(--color-destructive)] text-[var(--color-destructive)] scale-110"
                            : "text-[var(--color-gray-300)] hover:text-[var(--color-destructive)]"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="mt-1 flex items-start gap-1 text-xs text-[var(--color-gray-500)]">
                    <MapPin className="h-3 w-3 shrink-0 mt-0.5" />
                    <span>{m.address}, {m.city}</span>
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

      {/* Request Market Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">Ajukan Pasar Baru</h3>
              <button 
                onClick={() => setShowRequestModal(false)}
                className="text-gray-400 hover:text-gray-600 font-semibold text-lg"
              >
                &times;
              </button>
            </div>
            <form onSubmit={submitRequest} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Nama Pasar</label>
                <Input 
                  value={reqName} 
                  onChange={(e) => setReqName(e.target.value)} 
                  placeholder="e.g. Pasar Jaya Tebet"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Alamat Lengkap</label>
                <Input 
                  value={reqAddress} 
                  onChange={(e) => setReqAddress(e.target.value)} 
                  placeholder="e.g. Jl. Tebet Barat Raya No. 1"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Kota</label>
                  <Input 
                    value={reqCity} 
                    onChange={(e) => setReqCity(e.target.value)} 
                    placeholder="e.g. Jakarta Selatan"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Provinsi</label>
                  <Input 
                    value={reqProvince} 
                    onChange={(e) => setReqProvince(e.target.value)} 
                    placeholder="e.g. DKI Jakarta"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1"
                >
                  Batal
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmittingReq}
                  className="flex-1 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue)]/90 text-white"
                >
                  {isSubmittingReq ? "Mengirim..." : "Kirim Pengajuan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
