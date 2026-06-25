import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { idr } from "@/lib/format";
import { getDeterministicBenchmarkPrices } from "@/lib/benchmark";
import { ArrowLeft, MapPin, Clock, ExternalLink } from "lucide-react";

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

      const { data } = await supabase.from("product_prices")
        .select("price, product:products(id,name,unit,category)")
        .eq("market_id", id)
        .eq("recorded_at", dateToUse);
      
      let dbPrices = data ?? [];

      if (dbPrices.length === 0) {
        const { data: products } = await supabase.from("products").select("id,name,category,unit").order("name");
        const { data: markets } = await supabase.from("markets").select("id,name,city").order("name");
        if (products && markets) {
          const benchmarkPrices = getDeterministicBenchmarkPrices(products as any[], markets as any[], dateToUse);
          dbPrices = benchmarkPrices.filter((p: any) => p.market_id === id).map((p: any) => ({
            price: p.price,
            product: p.product
          }));
        }
      }

      return dbPrices;
    },
  });

  if (!market) return <div className="p-10 text-center">Memuat...</div>;

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      <header className="border-b border-[var(--color-gray-100)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/markets" className="flex items-center gap-2 text-sm font-semibold"><ArrowLeft className="h-4 w-4" /> Semua Pasar</Link>
          <Button asChild><Link to="/auth">Masuk</Link></Button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-4xl font-black">{market.name}</h1>
        <p className="mt-2 flex items-center gap-2 text-[var(--color-gray-500)]"><MapPin className="h-4 w-4" />{market.address}, {market.city}</p>
        <div className="mt-2 flex items-center gap-3 text-sm text-[var(--color-gray-700)]">
          {market.hours && <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{market.hours}</span>}
          {market.google_maps_url && <a href={market.google_maps_url} target="_blank" rel="noopener" className="flex items-center gap-1 text-[var(--color-brand-blue)] hover:underline"><ExternalLink className="h-4 w-4" />Buka di Google Maps</a>}
        </div>

        <h2 className="mt-10 text-2xl font-bold">Harga Hari Ini</h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
              <tr><th className="px-4 py-3">Produk</th><th className="px-4 py-3">Kategori</th><th className="px-4 py-3 text-right">Harga</th></tr>
            </thead>
            <tbody>
              {(prices ?? []).map((r: any, i) => (
                <tr key={i} className="border-t border-[var(--color-gray-100)]">
                  <td className="px-4 py-3 font-semibold">{r.product.name} <span className="text-xs text-[var(--color-gray-500)]">/ {r.product.unit}</span></td>
                  <td className="px-4 py-3 text-[var(--color-gray-700)]">{r.product.category}</td>
                  <td className="px-4 py-3 text-right font-bold">{idr(Number(r.price))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
