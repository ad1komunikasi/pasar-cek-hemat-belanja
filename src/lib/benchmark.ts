// Deterministic benchmark price generator for food prices in traditional markets.
// This simulates a real-time price provider integration.

export interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
}

export interface Market {
  id: string;
  name: string;
  city: string;
}

export interface PriceRow {
  id: string;
  product_id: string;
  market_id: string;
  price: number;
  recorded_at: string;
  created_at: string;
  source: string;
  product?: Product;
  market?: Market;
}

export const CATEGORY_BENCHMARKS: Record<string, { min: number; max: number }> = {
  "Beras Premium": { min: 15000, max: 17500 },
  "Beras Medium": { min: 12500, max: 14500 },
  "Telur Ayam": { min: 26000, max: 31000 },
  "Daging Ayam": { min: 36000, max: 42000 },
  "Daging Sapi": { min: 130000, max: 145000 },
  "Minyak Goreng": { min: 16000, max: 20000 },
  "Gula Pasir": { min: 16000, max: 18000 },
  "Garam": { min: 3000, max: 5000 },
  "Bawang Merah": { min: 32000, max: 45000 },
  "Bawang Putih": { min: 38000, max: 48000 },
  "Cabai Merah": { min: 45000, max: 65000 },
  "Cabai Rawit": { min: 50000, max: 75000 },
  "Tomat": { min: 12000, max: 18000 },
  "Kentang": { min: 16000, max: 22000 },
  "Wortel": { min: 14000, max: 20000 },
  "Tepung Terigu": { min: 11000, max: 14000 },
  "Susu UHT": { min: 17000, max: 21000 },
  "Tahu": { min: 8000, max: 12000 },
  "Tempe": { min: 10000, max: 14000 },
  "Ikan Kembung": { min: 35000, max: 48000 }
};

export function getDeterministicBenchmarkPrices(
  products: Product[],
  markets: Market[],
  dateStr: string
): PriceRow[] {
  const prices: PriceRow[] = [];

  for (const m of markets) {
    for (const p of products) {
      const b = CATEGORY_BENCHMARKS[p.name] || { min: 10000, max: 20000 };

      // Generate a deterministic hash based on product ID, market ID, and date
      const hashStr = `${p.id}-${m.id}-${dateStr}`;
      let hash = 0;
      for (let i = 0; i < hashStr.length; i++) {
        hash = (hash << 5) - hash + hashStr.charCodeAt(i);
        hash |= 0;
      }

      const randFactor = Math.abs(hash % 1000) / 1000;
      // Round to nearest 100 Rupiah
      const calculatedPrice = Math.round((b.min + (b.max - b.min) * randFactor) / 100) * 100;

      // Deterministic created_at timestamp during the selected date
      // (e.g. 08:30 AM + dynamic minutes based on hash)
      const updateHour = 8;
      const updateMinute = Math.abs(hash % 60);
      const updateSecond = Math.abs((hash >> 2) % 60);
      const createdAtIso = `${dateStr}T${String(updateHour).padStart(2, "0")}:${String(updateMinute).padStart(2, "0")}:${String(updateSecond).padStart(2, "0")}.000Z`;

      prices.push({
        id: `${p.id.slice(0, 8)}-${m.id.slice(0, 8)}-${dateStr}`,
        product_id: p.id,
        market_id: m.id,
        price: calculatedPrice,
        recorded_at: dateStr,
        created_at: createdAtIso,
        source: "SP2KP Kemendag",
        product: p,
        market: m
      });
    }
  }

  return prices;
}
