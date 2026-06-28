import { useState, useEffect, useRef } from "react";

const getItemKey = (item: any) => {
  if (item.id) return item.id;
  const mId = item.market?.id || item.market_id;
  return `${item.product_id}:${mId}`;
};

export function useRealTimePrices<
  T extends {
    id?: string;
    price: number;
    prev?: number | null;
    product_id?: string;
    market_id?: string;
    market?: any;
  },
>(initialPrices: T[] | undefined, dateStr: string) {
  const [prices, setPrices] = useState<T[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Track previous initialPrices to avoid unnecessary resets
  const initialPricesRef = useRef<T[] | undefined>(initialPrices);

  // Sync with initialPrices when they load or change
  useEffect(() => {
    if (initialPrices) {
      setPrices(initialPrices);
      setLastUpdated(new Date());
      initialPricesRef.current = initialPrices;
    } else {
      setPrices([]);
    }
  }, [initialPrices]);

  useEffect(() => {
    const todayStr = new Date().toLocaleDateString("en-CA");
    // Only run live fluctuation if the selected date is today
    if (dateStr !== todayStr || !prices.length) return;

    const interval = setInterval(() => {
      setPrices((currentPrices) => {
        if (!currentPrices.length) return currentPrices;

        // Choose 1 to 3 random items to fluctuate
        const numFluctuations = Math.floor(Math.random() * 3) + 1;
        const updated = [...currentPrices];
        let changed = false;

        for (let i = 0; i < numFluctuations; i++) {
          const randomIndex = Math.floor(Math.random() * updated.length);
          const item = updated[randomIndex];

          if (item && typeof item.price === "number") {
            // Fluctuate by -0.8% to +0.8%
            const percent = (Math.random() * 1.6 - 0.8) / 100;
            const originalItem = initialPricesRef.current?.find(
              (x) => getItemKey(x) === getItemKey(item),
            );
            const basePrice = originalItem ? originalItem.price : item.price;

            let newPrice = Math.round((item.price * (1 + percent)) / 100) * 100;

            // Cap the drift to +/- 5% of base price
            const maxPrice = basePrice * 1.05;
            const minPrice = basePrice * 0.95;
            if (newPrice > maxPrice) newPrice = Math.round(maxPrice / 100) * 100;
            if (newPrice < minPrice) newPrice = Math.round(minPrice / 100) * 100;

            if (newPrice !== item.price) {
              updated[randomIndex] = {
                ...item,
                prev: item.price,
                price: newPrice,
              };
              changed = true;
            }
          }
        }

        if (changed) {
          setLastUpdated(new Date());
          return updated;
        }
        return currentPrices;
      });
    }, 4000); // fluctuate every 4 seconds

    return () => clearInterval(interval);
  }, [prices.length, dateStr]);

  return { prices, lastUpdated };
}
