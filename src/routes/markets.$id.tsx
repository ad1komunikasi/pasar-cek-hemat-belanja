import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { idr } from "@/lib/format";
import { getDeterministicBenchmarkPrices } from "@/lib/benchmark";
import { useEffect, useRef, useMemo } from "react";
import { ArrowLeft, MapPin, Clock, ExternalLink, Star, Store, Heart } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/markets/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Detail Pasar — PasarCek` },
      { name: "description", content: "Detail pasar, jam operasional, dan harga sembako hari ini." },
    ],
  }),
  component: MarketDetail,
});

function MarketDetail() {
  const { id } = Route.useParams();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const { user } = useAuth();
  const qc = useQueryClient();

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

  const { data: market } = useQuery({
    queryKey: ["market", id],
    queryFn: async () => (await supabase.from("markets").select("*").eq("id", id).maybeSingle()).data,
  });

  const { data: prices } = useQuery({
    queryKey: ["market-prices", id],
    queryFn: async () => {
      const today = new Date().toLocaleDateString('en-CA');
      
      const { data: latestDateRow } = await supabase
        .from("product_prices")
        .select("recorded_at")
        .lte("recorded_at", today)
        .order("recorded_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      
      let dateToUse = latestDateRow?.recorded_at || today;
      if (dateToUse > today) {
        dateToUse = today;
      }

      const { data: products } = await supabase.from("products").select("id,name,category,unit").order("name");
      const { data: markets } = await supabase.from("markets").select("id,name,city").order("name");

      if (!products || !markets) return [];

      const currentMarket = markets.find((m) => m.id === id);
      if (!currentMarket) return [];

      const { data } = await supabase.from("product_prices")
        .select("price, product_id, product:products(id,name,unit,category)")
        .eq("market_id", id)
        .eq("recorded_at", dateToUse);
      
      const dbPrices = data ?? [];
      const dbPriceMap = new Map<string, any>();
      dbPrices.forEach((r: any) => {
        const pId = r.product_id || r.product?.id;
        if (pId) {
          dbPriceMap.set(pId, r);
        }
      });

      const benchmarkPrices = getDeterministicBenchmarkPrices(products as any[], [currentMarket] as any[], dateToUse);

      const mergedPrices = benchmarkPrices.map((bp: any) => {
        const key = bp.product_id;
        if (dbPriceMap.has(key)) {
          const dbRow = dbPriceMap.get(key);
          return {
            price: Number(dbRow.price),
            product: dbRow.product || bp.product
          };
        }
        return {
          price: bp.price,
          product: bp.product
        };
      });

      return mergedPrices;
    },
  });

  // Dynamically initialize Leaflet map for this market location
  useEffect(() => {
    if (!market || !market.lat || !market.lng || !mapRef.current) return;

    const lat = Number(market.lat);
    const lng = Number(market.lng);

    Promise.all([
      import("leaflet"),
      // @ts-ignore
      import("leaflet/dist/leaflet.css")
    ]).then(([leafletModule]) => {
      const L = leafletModule.default || leafletModule;
      if (!mapRef.current) return;

      if (!mapInstance.current) {
        mapInstance.current = L.map(mapRef.current, {
          center: [lat, lng],
          zoom: 15,
          zoomControl: false,
          scrollWheelZoom: false,
        });

        L.control.zoom({ position: "bottomright" }).addTo(mapInstance.current);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
          attribution: '&copy; OpenStreetMap &copy; CARTO',
          subdomains: "abcd",
          maxZoom: 20,
        }).addTo(mapInstance.current);

        const customIcon = L.divIcon({
          className: "custom-leaflet-icon",
          html: `
            <div class="flex items-center justify-center w-8 h-8 rounded-full bg-[#1e3a8a] text-white shadow-lg border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        L.marker([lat, lng], { icon: customIcon }).addTo(mapInstance.current);
      } else {
        mapInstance.current.setView([lat, lng], 15);
      }
    }).catch((err) => {
      console.error("Failed to load leaflet dynamically on detail page:", err);
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [market]);

  if (!market) return <div className="p-10 text-center text-gray-500">Memuat detail pasar...</div>;

  // Rating stars generator
  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    const count = Math.round(rating);
    return (
      <div className="flex items-center gap-0.5 text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < count ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1.5 text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Badge background color helper
  const getTypeBadgeStyles = (type: string) => {
    switch (type?.toLowerCase()) {
      case "modern":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "swalayan":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)] pb-12">
      <header className="border-b border-[var(--color-gray-100)] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            to="/markets"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[var(--color-brand-blue)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Peta Pasar
          </Link>
          <Button asChild size="sm">
            <Link to="/auth">Masuk</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Top Info Banner Card */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-black text-gray-900 leading-tight">{market.name}</h1>
                <button
                  onClick={() => toggleFavMarket(market.id)}
                  className="focus:outline-none p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  title={favMarketIds.has(market.id) ? "Hapus dari Favorit" : "Tambah ke Favorit"}
                >
                  <Heart
                    className={`h-6 w-6 transition-all duration-200 ${
                      favMarketIds.has(market.id)
                        ? "fill-[var(--color-destructive)] text-[var(--color-destructive)] scale-110"
                        : "text-gray-300 hover:text-[var(--color-destructive)]"
                    }`}
                  />
                </button>
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${getTypeBadgeStyles(
                    market.type
                  )}`}
                >
                  <Store className="mr-1 h-3 w-3" />
                  {market.type}
                </span>
              </div>
              <p className="flex items-start gap-1.5 text-gray-600 text-sm">
                <MapPin className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                <span>{market.address}, {market.city}, {market.province || "DKI Jakarta"}</span>
              </p>
              {market.rating && <div className="pt-1">{renderStars(market.rating)}</div>}
            </div>

            <div className="flex flex-col gap-2 min-w-[200px]">
              {market.hours && (
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-2.5 border border-gray-100 text-xs text-gray-700">
                  <Clock className="h-4 w-4 text-[var(--color-brand-blue)]" />
                  <div>
                    <p className="font-semibold text-gray-500">Jam Operasional</p>
                    <p className="font-bold">{market.hours}</p>
                  </div>
                </div>
              )}
              {market.google_maps_url && (
                <Button asChild variant="outline" className="w-full text-xs" size="sm">
                  <a href={market.google_maps_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Buka di Google Maps
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Grid: Price list & Map */}
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Sembako Prices */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Daftar Harga Sembako Terbaru</h2>
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Bahan Pokok (Sembako)</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4 text-right">Harga Satuan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(prices ?? []).length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-gray-500 italic">
                        Belum ada data harga sembako untuk pasar ini saat ini.
                      </td>
                    </tr>
                  ) : (
                    (prices ?? []).map((r: any, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {r.product.name}
                          <span className="ml-1 text-xs font-normal text-gray-500">/ {r.product.unit}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 capitalize">{r.product.category}</td>
                        <td className="px-6 py-4 text-right font-black text-emerald-600">
                          {idr(Number(r.price))}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Location / Map sidebar */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Lokasi & Navigasi</h2>
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm space-y-4">
              {market.lat && market.lng ? (
                <>
                  <div
                    ref={mapRef}
                    className="relative z-0 h-[240px] w-full rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shadow-inner"
                  />
                  <div className="space-y-2 text-xs text-gray-600">
                    <p>
                      <strong>Koordinat:</strong> {market.lat.toFixed(6)}, {market.lng.toFixed(6)}
                    </p>
                    <p className="leading-relaxed">
                      Peta di atas menunjukkan lokasi tepat dari <strong>{market.name}</strong>. Anda dapat melihat navigasi langsung dengan mengklik tombol "Buka di Google Maps" di atas.
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-gray-200 rounded-lg p-6 bg-gray-50">
                  <MapPin className="h-10 w-10 text-gray-300 mb-3" />
                  <p className="text-sm font-semibold text-gray-500">Peta Tidak Tersedia</p>
                  <p className="text-xs text-gray-400 mt-1 max-w-[220px]">
                    Koordinat lokasi pasar ini belum diperbarui di database oleh Admin.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
