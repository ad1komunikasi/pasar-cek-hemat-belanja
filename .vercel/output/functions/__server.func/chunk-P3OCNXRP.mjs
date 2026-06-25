import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// dist/server/assets/benchmark-F0lzK3pm.js
var CATEGORY_BENCHMARKS = {
  "Beras Premium": { min: 15e3, max: 17500 },
  "Beras Medium": { min: 12500, max: 14500 },
  "Telur Ayam": { min: 26e3, max: 31e3 },
  "Daging Ayam": { min: 36e3, max: 42e3 },
  "Daging Sapi": { min: 13e4, max: 145e3 },
  "Minyak Goreng": { min: 16e3, max: 2e4 },
  "Gula Pasir": { min: 16e3, max: 18e3 },
  "Garam": { min: 3e3, max: 5e3 },
  "Bawang Merah": { min: 32e3, max: 45e3 },
  "Bawang Putih": { min: 38e3, max: 48e3 },
  "Cabai Merah": { min: 45e3, max: 65e3 },
  "Cabai Rawit": { min: 5e4, max: 75e3 },
  "Tomat": { min: 12e3, max: 18e3 },
  "Kentang": { min: 16e3, max: 22e3 },
  "Wortel": { min: 14e3, max: 2e4 },
  "Tepung Terigu": { min: 11e3, max: 14e3 },
  "Susu UHT": { min: 17e3, max: 21e3 },
  "Tahu": { min: 8e3, max: 12e3 },
  "Tempe": { min: 1e4, max: 14e3 },
  "Ikan Kembung": { min: 35e3, max: 48e3 }
};
function getDeterministicBenchmarkPrices(products, markets, dateStr) {
  const prices = [];
  for (const m of markets) {
    for (const p of products) {
      const b = CATEGORY_BENCHMARKS[p.name] || { min: 1e4, max: 2e4 };
      const hashStr = `${p.id}-${m.id}-${dateStr}`;
      let hash = 0;
      for (let i = 0; i < hashStr.length; i++) {
        hash = (hash << 5) - hash + hashStr.charCodeAt(i);
        hash |= 0;
      }
      const randFactor = Math.abs(hash % 1e3) / 1e3;
      const calculatedPrice = Math.round((b.min + (b.max - b.min) * randFactor) / 100) * 100;
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

export {
  getDeterministicBenchmarkPrices
};
