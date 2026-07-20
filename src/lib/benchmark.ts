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
  address?: string;
  province?: string;
  type?: string;
  hours?: string;
  lat?: number | null;
  lng?: number | null;
  google_maps_url?: string | null;
}

export const DEFAULT_MARKETS: Market[] = [
  { id: "8c7647ec-8579-4c9c-bff4-c1928256332d", name: "Pasar Tanah Abang", city: "Jakarta Pusat", address: "Jl. Fachrudin, Tanah Abang" },
  { id: "6fa2a1ab-3a44-41da-8619-0c233ebf565f", name: "Pasar Senen", city: "Jakarta Pusat", address: "Jl. Pasar Senen, Senen" },
  { id: "a708c13e-0813-41bc-8e6f-7a7435378815", name: "Pasar Kramat Jati", city: "Jakarta Timur", address: "Jl. Raya Bogor KM 17" },
  { id: "0821497c-d785-469a-85ca-0699ba947169", name: "Pasar Jatinegara", city: "Jakarta Timur", address: "Jl. Jatinegara Timur" },
  { id: "7de886ac-879d-46c6-ac33-b21206a82b66", name: "Pasar Mayestik", city: "Jakarta Selatan", address: "Jl. Tebah, Gunung" },
  { id: "376232e4-4a01-416d-b276-ceea0a9ba16f", name: "Pasar Minggu", city: "Jakarta Selatan", address: "Jl. Raya Pasar Minggu" },
  { id: "def-depok-1", name: "Pasar Kemiri Muka", city: "Depok", address: "Jl. Margonda Raya, Beji" },
  { id: "def-depok-2", name: "Pasar Cisalak", city: "Depok", address: "Jl. Raya Bogor KM 31, Cimanggis" },
  { id: "def-jakbar-1", name: "Pasar Tomang Barat", city: "Jakarta Barat", address: "Jl. Tanjung Duren Raya" },
  { id: "def-jakut-1", name: "Pasar Muara Karang", city: "Jakarta Utara", address: "Jl. Muara Karang Raya" },
  { id: "def-bogor-1", name: "Pasar Anyar Bogor", city: "Bogor", address: "Jl. Dewi Sartika, Bogor Tengah" },
  { id: "def-bekasi-1", name: "Pasar Kranji", city: "Bekasi", address: "Jl. Pemuda, Kranji" },
  { id: "def-tangerang-1", name: "Pasar Anyar Tangerang", city: "Tangerang", address: "Jl. Ahmad Yani" },
];

export function mergeWithDefaultMarkets(dbMarkets: Market[] | null | undefined): Market[] {
  const map = new Map<string, Market>();
  DEFAULT_MARKETS.forEach((m) => map.set(m.name.toLowerCase().trim(), m));
  (dbMarkets ?? []).forEach((m) => {
    if (m && m.name) {
      map.set(m.name.toLowerCase().trim(), m);
    }
  });
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, "id"));
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
  Garam: { min: 3000, max: 5000 },
  "Bawang Merah": { min: 32000, max: 45000 },
  "Bawang Putih": { min: 38000, max: 48000 },
  "Cabai Merah": { min: 45000, max: 65000 },
  "Cabai Rawit": { min: 50000, max: 75000 },
  Tomat: { min: 12000, max: 18000 },
  Kentang: { min: 16000, max: 22000 },
  Wortel: { min: 14000, max: 20000 },
  "Tepung Terigu": { min: 11000, max: 14000 },
  "Susu UHT": { min: 17000, max: 21000 },
  Tahu: { min: 8000, max: 12000 },
  Tempe: { min: 10000, max: 14000 },
  "Ikan Kembung": { min: 35000, max: 48000 },
};

function getLocationFactor(market: Market): number {
  const city = market.city?.toLowerCase() || "";
  const name = market.name?.toLowerCase() || "";

  // Wholesale / Induk markets are cheaper
  if (name.includes("induk") || name.includes("kramat jati")) {
    return 0.9; // 10% cheaper
  }

  if (city.includes("selatan")) {
    return 1.05; // 5% more expensive
  }
  if (city.includes("pusat")) {
    return 1.02; // 2% more expensive
  }
  if (city.includes("utara") || city.includes("barat")) {
    return 1.0;
  }
  if (city.includes("timur")) {
    return 0.95; // 5% cheaper
  }

  return 1.0;
}

export function getDeterministicBenchmarkPrices(
  products: Product[],
  markets: Market[],
  dateStr: string,
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
      const basePrice = b.min + (b.max - b.min) * randFactor;
      const locationFactor = getLocationFactor(m);

      // Round to nearest 100 Rupiah
      const calculatedPrice = Math.round((basePrice * locationFactor) / 100) * 100;

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
        market: m,
      });
    }
  }

  return prices;
}
