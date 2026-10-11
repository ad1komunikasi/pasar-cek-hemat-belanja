import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { isSimulatedSource } from "@/lib/benchmark";

export type MarketQuote = { market: string; price: number };
export type CommodityBoard = {
  name: string;
  unit: string;
  quotes: MarketQuote[]; // sorted cheapest first
  min: number;
  max: number;
  avg: number;
  change: number; // avg vs previous recorded day, as a fraction
  recordedAt: string; // ISO date of the latest price
  simulated: boolean; // true while the numbers are sample/seed data, not recorded prices
};

// Commodities people check first, in display order.
const ORDER = [
  "Cabai Merah",
  "Beras Premium",
  "Telur Ayam",
  "Daging Ayam",
  "Bawang Merah",
  "Minyak Goreng",
  "Cabai Rawit",
  "Daging Sapi",
  "Bawang Putih",
  "Gula Pasir",
  "Ikan Kembung",
  "Tempe",
];

function toBoard(
  name: string,
  unit: string,
  byMarket: Record<string, number>,
  change: number,
  recordedAt: string,
  simulated = false,
) {
  const quotes = Object.entries(byMarket)
    .map(([market, price]) => ({ market, price }))
    .sort((a, b) => a.price - b.price);
  const prices = quotes.map((q) => q.price);
  return {
    name,
    unit,
    quotes,
    min: prices[0],
    max: prices[prices.length - 1],
    avg: prices.reduce((a, b) => a + b, 0) / prices.length,
    change,
    recordedAt,
    simulated,
  } satisfies CommodityBoard;
}

type Row = {
  price: number;
  recorded_at: string;
  source: string | null;
  product: { name: string; unit: string } | null;
  market: { name: string } | null;
};

async function fetchBoards(): Promise<CommodityBoard[]> {
  // Recorded prices only (no sample data), for active markets and products.
  const { data, error } = await supabase
    .from("product_prices")
    .select(
      "price, recorded_at, source, product:products!inner(name, unit, is_active), market:markets!inner(name, is_active)",
    )
    .not("source", "in", "(seed,simulasi)")
    .eq("product.is_active", true)
    .eq("market.is_active", true)
    .order("recorded_at", { ascending: false })
    .limit(2000);
  if (error || !data?.length) return [];

  const rows = (data as unknown as Row[]).filter((r) => !isSimulatedSource(r.source));
  const dates = [...new Set(rows.map((r) => r.recorded_at))].sort().reverse();
  const [latest, previous] = dates;

  const grouped = new Map<string, { unit: string; now: Record<string, number>; prev: number[] }>();
  for (const r of rows) {
    if (!r.product || !r.market) continue;
    const g = grouped.get(r.product.name) ?? { unit: r.product.unit, now: {}, prev: [] };
    if (r.recorded_at === latest) g.now[r.market.name] = Number(r.price);
    else if (r.recorded_at === previous) g.prev.push(Number(r.price));
    grouped.set(r.product.name, g);
  }

  const boards: CommodityBoard[] = [];
  for (const [name, g] of grouped) {
    if (Object.keys(g.now).length < 2) continue;
    const b = toBoard(name, g.unit, g.now, 0, latest);
    const prevAvg = g.prev.length ? g.prev.reduce((a, c) => a + c, 0) / g.prev.length : b.avg;
    b.change = (b.avg - prevAvg) / prevAvg;
    boards.push(b);
  }

  return boards.sort((a, b) => {
    const ia = ORDER.indexOf(a.name);
    const ib = ORDER.indexOf(b.name);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });
}

/** True if any board is built from sample data (no longer produced; kept as a safety net). */
export const boardsAreSimulated = (boards: CommodityBoard[]) => boards.some((b) => b.simulated);

export function useMarketBoards() {
  return useQuery({
    queryKey: ["landing-market-boards"],
    queryFn: fetchBoards,
    staleTime: 10 * 60 * 1000,
  });
}

export const rupiah = (n: number) => "Rp" + new Intl.NumberFormat("id-ID").format(Math.round(n));
export const shortMarket = (m: string) => m.replace(/^Pasar\s+/i, "");
export const recordedLabel = (iso: string | null | undefined, lang: "id" | "en") => {
  const d = iso ? new Date(iso + "T00:00:00") : null;
  if (!d || Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "short",
  }).format(d);
};
