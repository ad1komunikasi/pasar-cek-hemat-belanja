import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, EmptyState } from "@/components/app-shell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect, useMemo } from "react";
import { idr } from "@/lib/format";
import { getDeterministicBenchmarkPrices, mergeWithDefaultMarkets } from "@/lib/benchmark";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/_authenticated/compare")({
  head: () => ({ meta: [{ title: "Bandingkan Harga Antar Pasar — PasarCek" }] }),
  component: ComparePage,
});

function ComparePage() {
  const qc = useQueryClient();
  const [productId, setProductId] = useState<string>("");
  const [city, setCity] = useState<string>("all");

  // Subscribe to real-time changes on the markets table to auto-update cities and comparison data
  useEffect(() => {
    const channel = supabase
      .channel("realtime-markets-compare")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "markets" },
        () => {
          qc.invalidateQueries({ queryKey: ["cities"] });
          qc.invalidateQueries({ queryKey: ["compare"] });
          qc.invalidateQueries({ queryKey: ["markets-list"] });
          qc.invalidateQueries({ queryKey: ["markets-public"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  const { data: products } = useQuery({
    queryKey: ["products-list"],
    queryFn: async () =>
      (await supabase.from("products").select("id,name,category,unit").order("name")).data ?? [],
  });

  const { data: dbMarkets } = useQuery({
    queryKey: ["markets-list"],
    queryFn: async () =>
      (await supabase.from("markets").select("id,name,city,address").order("name")).data ?? [],
  });

  // Combine DB markets with standard default markets (including Depok, JakBar, JakUt, Bogor, Bekasi, Tangerang)
  const allMarkets = useMemo(() => mergeWithDefaultMarkets(dbMarkets as any), [dbMarkets]);

  // Dynamically extract and sort unique cities from all active/available markets
  const cities = useMemo(() => {
    const citySet = new Set<string>();
    allMarkets.forEach((m: any) => {
      if (m.city?.trim()) citySet.add(m.city.trim());
    });
    return Array.from(citySet).sort((a, b) => a.localeCompare(b, "id"));
  }, [allMarkets]);

  const { data: rows } = useQuery({
    queryKey: ["compare", productId, city, allMarkets],
    enabled: !!productId,
    queryFn: async () => {
      const today = new Date().toLocaleDateString("en-CA");

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

      const selectedProduct = (products ?? []).find((p: any) => p.id === productId);
      if (!selectedProduct) return [];

      const query = supabase
        .from("product_prices")
        .select("price, market_id, market:markets(id,name,city,address)")
        .eq("recorded_at", dateToUse)
        .eq("product_id", productId);
      const { data } = await query;

      const dbPrices = data ?? [];
      const dbPriceMap = new Map<string, any>();
      dbPrices.forEach((r: any) => {
        const mId = r.market_id || r.market?.id;
        if (mId) {
          dbPriceMap.set(mId, r);
        }
      });

      const benchmarkPrices = getDeterministicBenchmarkPrices(
        [selectedProduct] as any[],
        allMarkets as any[],
        dateToUse,
      );

      const mergedPrices = benchmarkPrices.map((bp: any) => {
        const key = bp.market_id;
        if (dbPriceMap.has(key)) {
          const dbRow = dbPriceMap.get(key);
          return {
            price: Number(dbRow.price),
            market: dbRow.market || bp.market,
          };
        }
        return {
          price: bp.price,
          market: bp.market,
        };
      });

      let out = mergedPrices;
      if (city !== "all") out = out.filter((r) => r.market?.city === city);
      out.sort((a, b) => a.price - b.price);
      return out;
    },
  });

  const cheapest = rows?.[0];
  const priciest = rows?.[rows.length - 1];
  const saving = cheapest && priciest ? priciest.price - cheapest.price : 0;

  return (
    <AppShell>
      <PageHeader
        title="Bandingkan Harga Antar Pasar"
        description='"Di pasar mana saya bisa belanja paling hemat hari ini?"'
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-[var(--color-gray-500)]">
            Pilih Produk
          </label>
          <Select value={productId} onValueChange={setProductId}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih produk..." />
            </SelectTrigger>
            <SelectContent>
              {(products ?? []).map((p: any) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name} ({p.unit})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-[var(--color-gray-500)]">
            Kota
          </label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger>
              <SelectValue placeholder="Semua kota" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua kota</SelectItem>
              {(cities ?? []).map((c: string) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!productId && (
        <EmptyState
          title="Pilih produk untuk membandingkan"
          description="Pilih satu produk untuk melihat selisih harga antar pasar."
        />
      )}

      {productId && rows && rows.length === 0 && (
        <EmptyState title="Belum ada data" description="Coba ganti kota atau produk." />
      )}

      {productId && rows && rows.length > 0 && (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-[var(--color-success)] bg-[var(--color-success)]/10 p-5">
              <Trophy className="mb-2 h-6 w-6 text-[var(--color-success)]" />
              <p className="text-xs font-semibold uppercase text-[var(--color-gray-500)]">
                Pasar Termurah
              </p>
              <p className="mt-1 text-lg font-bold text-[var(--color-ink)]">
                {cheapest?.market.name}
              </p>
              <p className="text-2xl font-black text-[var(--color-success)]">
                {idr(cheapest?.price)}
              </p>
            </div>
            <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-5">
              <p className="text-xs font-semibold uppercase text-[var(--color-gray-500)]">
                Harga Termahal
              </p>
              <p className="mt-1 text-lg font-bold text-[var(--color-ink)]">
                {priciest?.market.name}
              </p>
              <p className="text-2xl font-black">{idr(priciest?.price)}</p>
            </div>
            <div className="rounded-lg border border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)] p-5 text-white">
              <p className="text-xs font-semibold uppercase text-white/70">Potensi Penghematan</p>
              <p className="mt-1 text-3xl font-black">{idr(saving)}</p>
              <p className="text-xs text-white/70">per satuan jika belanja di pasar termurah</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white">
            <table className="w-full text-sm">
              <thead className="bg-[var(--color-gray-50)] text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]">
                <tr>
                  <th className="px-4 py-3">Pasar</th>
                  <th className="px-4 py-3">Kota</th>
                  <th className="px-4 py-3 text-right">Harga</th>
                  <th className="px-4 py-3 text-right">Selisih</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={r.market.id}
                    className={`border-t border-[var(--color-gray-100)] ${i === 0 ? "bg-[var(--color-success)]/5" : ""}`}
                  >
                    <td className="px-4 py-3 font-semibold">
                      {r.market.name} {i === 0 && <Badge>TERMURAH</Badge>}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-gray-700)]">{r.market.city}</td>
                    <td
                      className={`px-4 py-3 text-right font-bold ${i === 0 ? "text-[var(--color-success)]" : ""}`}
                    >
                      {idr(r.price)}
                    </td>
                    <td className="px-4 py-3 text-right text-[var(--color-gray-500)]">
                      {i === 0 ? "—" : `+${idr(r.price - cheapest!.price)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </AppShell>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-2 rounded bg-[var(--color-success)] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
      {children}
    </span>
  );
}
