// Price-source helpers. PasarCek shows recorded prices only (e.g. SP2KP Kemendag, admin
// entries); "seed"/"simulasi" rows are legacy sample data and are never displayed as prices.

export const SIMULATED_SOURCE = "simulasi";

/** True for the legacy sample sources ("seed" from the initial migration, "simulasi"). */
export const isSimulatedSource = (source?: string | null) =>
  !source || source === SIMULATED_SOURCE || source === "seed";

/** Most recent date (≤ `onOrBefore`) that has recorded, non-sample prices — or null. */
export async function fetchLatestRealPriceDate(
  client: {
    from: (t: "product_prices") => any;
  },
  onOrBefore: string,
): Promise<string | null> {
  const { data } = await client
    .from("product_prices")
    .select("recorded_at")
    .lte("recorded_at", onOrBefore)
    .not("source", "in", "(seed,simulasi)")
    .order("recorded_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data?.recorded_at ?? null;
}
