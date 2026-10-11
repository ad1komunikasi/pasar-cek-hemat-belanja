import { useState, useEffect, useRef } from "react";

// Mirrors the loaded price list. It used to randomly nudge prices every few seconds to
// look "live"; that was removed — prices change only when new data is loaded.

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

  return { prices, lastUpdated };
}
