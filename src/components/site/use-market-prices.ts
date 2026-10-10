import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
};

// Snapshot of the public price table, used until (or if) the live query resolves.
const FALLBACK: Record<string, [string, Record<string, number>]> = {
  "Cabai Merah": ["kg", { "Pasar Tanah Abang": 53700, "Pasar Senen": 58700, "Pasar Kramat Jati": 57100, "Pasar Mayestik": 58500, "Pasar Minggu": 58000, "Pasar Jatinegara": 52400 }],
  "Beras Premium": ["kg", { "Pasar Tanah Abang": 14000, "Pasar Senen": 15100, "Pasar Kramat Jati": 14500, "Pasar Mayestik": 14500, "Pasar Minggu": 15200, "Pasar Jatinegara": 14600 }],
  "Telur Ayam": ["kg", { "Pasar Tanah Abang": 27300, "Pasar Senen": 26700, "Pasar Kramat Jati": 29500, "Pasar Mayestik": 26100, "Pasar Minggu": 30200, "Pasar Jatinegara": 28200 }],
  "Daging Ayam": ["kg", { "Pasar Tanah Abang": 39800, "Pasar Senen": 40200, "Pasar Kramat Jati": 40400, "Pasar Mayestik": 35200, "Pasar Minggu": 36600, "Pasar Jatinegara": 36500 }],
  "Bawang Merah": ["kg", { "Pasar Tanah Abang": 35400, "Pasar Senen": 36800, "Pasar Kramat Jati": 33000, "Pasar Mayestik": 37500, "Pasar Minggu": 33400, "Pasar Jatinegara": 35800 }],
  "Minyak Goreng": ["liter", { "Pasar Tanah Abang": 18200, "Pasar Senen": 17800, "Pasar Kramat Jati": 17000, "Pasar Mayestik": 17600, "Pasar Minggu": 17800, "Pasar Jatinegara": 17700 }],
  "Cabai Rawit": ["kg", { "Pasar Tanah Abang": 78400, "Pasar Senen": 78200, "Pasar Kramat Jati": 83800, "Pasar Mayestik": 80300, "Pasar Minggu": 75800, "Pasar Jatinegara": 82000 }],
  "Daging Sapi": ["kg", { "Pasar Tanah Abang": 138100, "Pasar Senen": 137200, "Pasar Kramat Jati": 142000, "Pasar Mayestik": 125400, "Pasar Minggu": 128000, "Pasar Jatinegara": 144800 }],
  "Bawang Putih": ["kg", { "Pasar Tanah Abang": 44900, "Pasar Senen": 44500, "Pasar Kramat Jati": 41000, "Pasar Mayestik": 38900, "Pasar Minggu": 38800, "Pasar Jatinegara": 40200 }],
  "Gula Pasir": ["kg", { "Pasar Tanah Abang": 17800, "Pasar Senen": 15400, "Pasar Kramat Jati": 16200, "Pasar Mayestik": 15400, "Pasar Minggu": 16800, "Pasar Jatinegara": 17300 }],
  "Ikan Kembung": ["kg", { "Pasar Tanah Abang": 29500, "Pasar Senen": 33500, "Pasar Kramat Jati": 34000, "Pasar Mayestik": 33800, "Pasar Minggu": 34300, "Pasar Jatinegara": 32500 }],
  "Tempe": ["kg", { "Pasar Tanah Abang": 11600, "Pasar Senen": 11000, "Pasar Kramat Jati": 11100, "Pasar Mayestik": 10500, "Pasar Minggu": 11200, "Pasar Jatinegara": 11200 }],
};
const FALLBACK_CHANGE = [-0.021, 0.004, -0.012, 0.018, -0.034, 0.002, 0.027, -0.006, -0.015, 0.009, -0.011, 0.0];

function toBoard(
  name: string,
  unit: string,
  byMarket: Record<string, number>,
  change: number,
  recordedAt = "2026-06-22",
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
  } satisfies CommodityBoard;
}

export const fallbackBoards: CommodityBoard[] = Object.entries(FALLBACK).map(
  ([name, [unit, m]], i) => toBoard(name, unit, m, FALLBACK_CHANGE[i] ?? 0),
);

type Row = {
  price: number;
  recorded_at: string;
  product: { name: string; unit: string } | null;
  market: { name: string } | null;
};

async function fetchBoards(): Promise<CommodityBoard[]> {
  const { data, error } = await supabase
    .from("product_prices")
    .select("price, recorded_at, product:products(name, unit), market:markets(name)")
    .order("recorded_at", { ascending: false })
    .limit(1000);
  if (error || !data?.length) return fallbackBoards;

  const rows = data as unknown as Row[];
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
  if (!boards.length) return fallbackBoards;

  // Keep the commodities people actually check first, in a stable order.
  const order = Object.keys(FALLBACK);
  return boards.sort((a, b) => {
    const ia = order.indexOf(a.name);
    const ib = order.indexOf(b.name);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });
}

export function useMarketBoards() {
  return useQuery({
    queryKey: ["landing-market-boards"],
    queryFn: fetchBoards,
    placeholderData: fallbackBoards,
    staleTime: 10 * 60 * 1000,
  });
}

export const rupiah = (n: number) => "Rp" + new Intl.NumberFormat("id-ID").format(Math.round(n));
export const shortMarket = (m: string) => m.replace(/^Pasar\s+/i, "");
export const recordedLabel = (iso: string, lang: "id" | "en") =>
  new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-GB", { day: "numeric", month: "short" }).format(
    new Date(iso + "T00:00:00"),
  );
