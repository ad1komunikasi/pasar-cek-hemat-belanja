import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, EmptyState } from "@/components/app-shell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { idr, deltaPct } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Minus, Search } from "lucide-react";

export const Route = createFileRoute("/_authenticated/prices")({
  head: () => ({ meta: [{ title: "Harga Sembako Hari Ini — PasarCek" }] }),
  component: PricesPage,
});

function PricesPage() {
  const [q, setQ] = useState("");
  const [marketId, setMarketId] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  const { data: markets } = useQuery({
    queryKey: ["markets-list"],
    queryFn: async () => (await supabase.from("markets").select("id,name,city").order("name")).data ?? [],
  });

  const { data: prices, isLoading } = useQuery({
    queryKey: ["prices-today", marketId, category],
    queryFn: async () => {
      const today = new Date().toISOString().slice(0, 10);
      const ydaystr = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      let query = supabase.from("product_prices")
        .select("id, price, recorded_at, product:products(id,name,category,unit), market:markets(id,name,city)")
        .eq("recorded_at", today);
      if (marketId !== "all") query = query.eq("market_id", marketId);
      const { data } = await query;
      // yesterday
      const yres = await supabase.from("product_prices").select("product_id,market_id,price").eq("recorded_at", ydaystr);
      const ymap = new Map<string, number>();
      (yres.data ?? []).forEach((r: any) => ymap.set(r.product_id + ":" + r.market_id, Number(r.price)));
      return (data ?? []).map((r: any) => ({
        ...r,
        price: Number(r.price),
        prev: ymap.get(r.product.id + ":" + r.market.id) ?? null,
      }));
    },
  });

  const categories = Array.from(new Set((prices ?? []).map((p) => p.product.category)));
  const filtered = (prices ?? []).filter((p) =>
    (category === "all" || p.product.category === category) &&
    (!q || p.product.name.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <AppShell>
      <PageHeader title="Harga Sembako Hari Ini" description="Update terbaru dari pasar tradisional di sekitar Anda." />

      <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_200px_200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-gray-500)]" />
          <Input className="pl-9" placeholder="Cari produk..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Select value={marketId} onValueChange={setMarketId}>
          <SelectTrigger><SelectValue placeholder="Semua pasar" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua pasar</SelectItem>
            {(markets ?? []).map((m: any) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger><SelectValue placeholder="Semua kategori" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua kategori</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-gray-50)] text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-500)]">
            <tr>
              <th className="px-4 py-3">Produk</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Pasar</th>
              <th className="px-4 py-3 text-right">Harga Hari Ini</th>
              <th className="px-4 py-3 text-right">Kemarin</th>
              <th className="px-4 py-3 text-right">Perubahan</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td className="px-4 py-8 text-center text-[var(--color-gray-500)]" colSpan={6}>Memuat...</td></tr>}
            {!isLoading && filtered.length === 0 && (
              <tr><td colSpan={6}><EmptyState title="Belum ada data harga" description="Coba ubah filter atau pilih pasar lain." /></td></tr>
            )}
            {filtered.map((r) => {
              const d = deltaPct(r.price, r.prev);
              const status = d == null ? "stabil" : d > 1 ? "naik" : d < -1 ? "turun" : "stabil";
              return (
                <tr key={r.id} className="border-t border-[var(--color-gray-100)]">
                  <td className="px-4 py-3 font-semibold text-[var(--color-ink)]">{r.product.name} <span className="text-xs text-[var(--color-gray-500)]">/ {r.product.unit}</span></td>
                  <td className="px-4 py-3 text-[var(--color-gray-700)]">{r.product.category}</td>
                  <td className="px-4 py-3 text-[var(--color-gray-700)]">{r.market.name}</td>
                  <td className="px-4 py-3 text-right font-bold">{idr(r.price)}</td>
                  <td className="px-4 py-3 text-right text-[var(--color-gray-500)]">{idr(r.prev)}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant="outline" className={
                      status === "naik" ? "border-[var(--color-destructive)] text-[var(--color-destructive)]" :
                      status === "turun" ? "border-[var(--color-success)] text-[var(--color-success)]" :
                      "border-[var(--color-gray-300)] text-[var(--color-gray-500)]"
                    }>
                      {status === "naik" && <ArrowUp className="mr-1 h-3 w-3" />}
                      {status === "turun" && <ArrowDown className="mr-1 h-3 w-3" />}
                      {status === "stabil" && <Minus className="mr-1 h-3 w-3" />}
                      {d == null ? "—" : `${d > 0 ? "+" : ""}${d.toFixed(1)}%`}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
