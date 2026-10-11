#!/usr/bin/env node
/**
 * Sinkronisasi harga harian per pasar dari SP2KP Kemendag ke tabel product_prices.
 *
 * Sumber: endpoint publik api-sp2kp.kemendag.go.id/report/api/average-price-public
 * (level 3 = per pasar). Endpoint ini tidak terdokumentasi resmi; dipakai secara sopan:
 * satu provinsi, beberapa halaman, jeda antar-permintaan, maksimal sekali sehari.
 *
 * Pemakaian:
 *   node scripts/sync-sp2kp.mjs --dry-run            # hanya tampilkan, tidak menulis
 *   node scripts/sync-sp2kp.mjs                      # tulis ke Supabase (butuh service role key)
 *   node scripts/sync-sp2kp.mjs --days 5 --date 2026-10-09
 *   node scripts/sync-sp2kp.mjs --add-markets        # tambahkan pasar dari sp2kp-markets.json yang belum ada
 *
 * Env: SUPABASE_URL (atau VITE_SUPABASE_URL), SUPABASE_SERVICE_ROLE_KEY (wajib kecuali --dry-run),
 *      VITE_SUPABASE_PUBLISHABLE_KEY (cukup untuk --dry-run).
 */

const API = "https://api-sp2kp.kemendag.go.id/report/api/average-price-public";
const PROVINCE = "31"; // DKI Jakarta
export const SOURCE = "SP2KP Kemendag";
const PAGE_SIZE = 200;
const PAUSE_MS = 1200;
const USER_AGENT = "PasarCekBot/1.0 (+https://www.pasarcek.com)";

// SP2KP variant_id → nama produk PasarCek. satuan SP2KP: 43 = kg, 44 = liter.
const VARIANT_TO_PRODUCT = {
  51: "Beras Premium",
  52: "Beras Medium",
  25: "Telur Ayam", // Telur Ayam Ras
  27: "Daging Ayam", // Daging Ayam Ras
  19: "Daging Sapi", // Daging Sapi Paha Belakang
  17: "Minyak Goreng", // Minyak Goreng Sawit Kemasan Premium (liter)
  15: "Gula Pasir", // Gula Pasir Kemasan
  41: "Garam", // Garam Halus
  13: "Bawang Merah",
  38: "Bawang Putih", // Bawang Putih Honan
  2: "Cabai Merah", // Cabai Merah Keriting
  10: "Cabai Rawit", // Cabai Rawit Merah
  56: "Tomat",
  57: "Kentang", // Kentang Sedang
  26: "Tepung Terigu",
  35: "Tahu", // Tahu Putih
  36: "Tempe", // Tempe Bungkus
  30: "Ikan Kembung",
};
const UNIT_BY_SATUAN = { 43: "kg", 44: "liter" };

// Nama pasar SP2KP yang berbeda dengan nama di PasarCek.
const MARKET_ALIASES = { "pasar senen blok iii": "pasar senen" };

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const DRY_RUN = flag("dry-run");
const ADD_MARKETS = flag("add-markets");
const DAYS = Math.min(Number(opt("days", "4")), 14);
const END_DATE = opt("date", new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" }));

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const READ_KEY = SERVICE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (s) => (s ?? "").toLowerCase().replace(/\s+/g, " ").trim();

function datesBack(end, n) {
  const out = [];
  const d = new Date(`${end}T00:00:00Z`);
  for (let i = 0; i < n; i++) {
    out.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() - 1);
  }
  return out;
}

async function fetchSp2kpDay(date) {
  const rows = [];
  for (let skip = 0; ; skip += PAGE_SIZE) {
    const url = new URL(API);
    url.search = new URLSearchParams({
      level: "3",
      tanggal: date,
      take: String(PAGE_SIZE),
      skip: String(skip),
      variant_id: "",
      kode_provinsi: PROVINCE,
    }).toString();
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`SP2KP ${date} skip=${skip}: HTTP ${res.status}`);
    const body = await res.json();
    const page = body?.data ?? [];
    rows.push(...page);
    if (!page.length || rows.length >= (body?.totalCount ?? 0)) break;
    await sleep(PAUSE_MS);
  }
  return rows;
}

async function supabase(path, init = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: init.key ?? READ_KEY,
      Authorization: `Bearer ${init.key ?? READ_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`Supabase ${path}: HTTP ${res.status} ${await res.text()}`);
  // Writes with "return=minimal" answer 201/204 with an empty body.
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

async function main() {
  if (!SUPABASE_URL || !READ_KEY) throw new Error("SUPABASE_URL dan kunci Supabase wajib diisi");
  if (!DRY_RUN && !SERVICE_KEY)
    throw new Error("SUPABASE_SERVICE_ROLE_KEY wajib untuk menulis (atau pakai --dry-run)");

  const [products, markets] = await Promise.all([
    supabase("products?select=id,name,unit&is_active=eq.true"),
    supabase("markets?select=id,name"),
  ]);
  const productByName = new Map(products.map((p) => [norm(p.name), p]));
  const marketByName = new Map(markets.map((m) => [norm(m.name), m]));

  if (ADD_MARKETS) {
    const { readFile } = await import("node:fs/promises");
    const curated = JSON.parse(
      await readFile(new URL("./sp2kp-markets.json", import.meta.url), "utf8"),
    ).markets;
    const missing = Object.entries(curated).filter(([name]) => !marketByName.has(norm(name)));
    const rows = missing.map(([name, m]) => ({
      name,
      slug: name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      city: m.city,
      province: "DKI Jakarta",
      address: m.address,
      type: "tradisional",
      lat: m.lat,
      lng: m.lng,
      google_maps_url: `https://maps.google.com/?q=${encodeURIComponent(`${name}, ${m.city}`)}`,
      is_active: true,
    }));
    console.log(
      `Pasar baru dari SP2KP: ${rows.length}${rows.length ? ` (${rows.map((r) => r.name).join(", ")})` : ""}`,
    );
    if (rows.length && !DRY_RUN) {
      const inserted = await supabase("markets?select=id,name", {
        method: "POST",
        key: SERVICE_KEY,
        headers: { Prefer: "return=representation" },
        body: JSON.stringify(rows),
      });
      for (const m of inserted ?? []) marketByName.set(norm(m.name), m);
      console.log(`  ${inserted?.length ?? 0} pasar ditambahkan.`);
    }
  }

  const payload = [];
  const unmatchedMarkets = new Set();
  const skipped = { unit: 0, price: 0 };

  for (const date of datesBack(END_DATE, DAYS)) {
    const rows = await fetchSp2kpDay(date);
    console.log(`${date}: ${rows.length} baris SP2KP`);
    for (const r of rows) {
      const productName = VARIANT_TO_PRODUCT[r.variant_id];
      if (!productName) continue;
      const product = productByName.get(norm(productName));
      const marketName = norm(r.pasar?.nama);
      const market = marketByName.get(MARKET_ALIASES[marketName] ?? marketName);
      if (!product) continue;
      if (!market) {
        if (r.pasar?.nama) unmatchedMarkets.add(r.pasar.nama);
        continue;
      }
      if (UNIT_BY_SATUAN[r.variant?.satuan_id] !== product.unit) {
        skipped.unit++;
        continue;
      }
      const price = Math.round(Number(r.harga));
      if (!Number.isFinite(price) || price <= 0) {
        skipped.price++;
        continue;
      }
      payload.push({
        product_id: product.id,
        market_id: market.id,
        recorded_at: r.tanggal,
        price,
        source: SOURCE,
        _label: `${r.tanggal} · ${market.name} · ${product.name}`,
      });
    }
    await sleep(PAUSE_MS);
  }

  // One row per (product, market, date) — keep the last seen.
  const unique = [
    ...new Map(payload.map((p) => [`${p.product_id}|${p.market_id}|${p.recorded_at}`, p])).values(),
  ];
  const byMarket = unique.reduce((acc, p) => {
    const m = p._label.split(" · ")[1];
    acc[m] = (acc[m] ?? 0) + 1;
    return acc;
  }, {});

  console.log(`\nSiap ditulis: ${unique.length} harga`);
  console.table(byMarket);
  if (unmatchedMarkets.size)
    console.log(
      `Pasar SP2KP yang belum ada di PasarCek (${unmatchedMarkets.size}): ${[...unmatchedMarkets].sort().join(", ")}`,
    );
  if (skipped.unit || skipped.price)
    console.log(`Dilewati: ${skipped.unit} beda satuan, ${skipped.price} harga tidak valid`);

  if (DRY_RUN) {
    console.log("\n--dry-run: tidak ada yang ditulis. Contoh:");
    for (const p of unique.slice(0, 8))
      console.log(`  ${p._label}: Rp${p.price.toLocaleString("id-ID")}`);
    return;
  }

  const rows = unique.map(({ _label, ...r }) => r);
  for (let i = 0; i < rows.length; i += 500) {
    await supabase("product_prices?on_conflict=product_id,market_id,recorded_at", {
      method: "POST",
      key: SERVICE_KEY,
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(rows.slice(i, i + 500)),
    });
  }
  console.log(`\nSelesai: ${rows.length} harga di-upsert dengan sumber "${SOURCE}".`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
