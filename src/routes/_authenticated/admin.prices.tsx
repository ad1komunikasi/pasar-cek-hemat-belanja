import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle2, CopyCheck, Loader2, Save, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { isSimulatedSource } from "@/lib/benchmark";
import { fmtDate, idr } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/prices")({
  head: () => ({ meta: [{ title: "Input Harga — Admin PasarCek" }] }),
  component: AdminPrices,
});

const SOURCES = [
  "Survei lapangan",
  "Laporan mitra pasar",
  "Info Pangan Jakarta",
  "Panel Harga Bapanas",
  "PIHPS Bank Indonesia",
  "SP2KP Kemendag",
  "Lainnya",
];

/** Price jumps above this vs the previous real price get flagged as possible typos. */
const DEVIATION_WARN = 0.3;

type PriceRow = {
  id: string;
  product_id: string;
  price: number;
  recorded_at: string;
  source: string | null;
};

const parseRupiah = (v: string) => {
  const digits = v.replace(/[^\d]/g, "");
  return digits ? Number(digits) : null;
};
const formatInput = (n: number) => new Intl.NumberFormat("id-ID").format(n);

function AdminPrices() {
  const qc = useQueryClient();
  const today = new Date().toLocaleDateString("en-CA");
  const [date, setDate] = useState(today);
  const [marketId, setMarketId] = useState<string>("");
  const [sourceType, setSourceType] = useState(SOURCES[0]);
  const [sourceDetail, setSourceDetail] = useState("");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const { data: markets = [] } = useQuery({
    queryKey: ["admin-prices-markets"],
    queryFn: async () =>
      (await supabase.from("markets").select("id,name,city").eq("is_active", true).order("name"))
        .data ?? [],
  });
  const { data: products = [] } = useQuery({
    queryKey: ["admin-prices-products"],
    queryFn: async () =>
      (
        await supabase
          .from("products")
          .select("id,name,category,unit")
          .eq("is_active", true)
          .order("category")
          .order("name")
      ).data ?? [],
  });

  useEffect(() => {
    if (!marketId && markets.length) setMarketId(markets[0].id);
  }, [markets, marketId]);

  // Rows already stored for this market + date, and recent history for comparison.
  const { data: rows, isFetching } = useQuery({
    queryKey: ["admin-prices-rows", marketId, date],
    enabled: !!marketId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_prices")
        .select("id,product_id,price,recorded_at,source")
        .eq("market_id", marketId)
        .lte("recorded_at", date)
        .order("recorded_at", { ascending: false })
        .limit(1000);
      if (error) throw error;
      return (data ?? []) as PriceRow[];
    },
  });

  const { current, previous } = useMemo(() => {
    const current = new Map<string, PriceRow>();
    const previous = new Map<string, PriceRow>();
    for (const r of rows ?? []) {
      if (r.recorded_at === date) current.set(r.product_id, r);
      else if (!previous.has(r.product_id) && !isSimulatedSource(r.source)) {
        previous.set(r.product_id, r);
      }
    }
    return { current, previous };
  }, [rows, date]);

  // Reset drafts whenever the market/date context changes.
  useEffect(() => {
    setDrafts({});
  }, [marketId, date]);

  const { data: seedCount = 0, refetch: refetchSeed } = useQuery({
    queryKey: ["admin-prices-seed-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("product_prices")
        .select("id", { count: "exact", head: true })
        .in("source", ["seed", "simulasi"]);
      return count ?? 0;
    },
  });

  const source = sourceDetail.trim() ? `${sourceType} — ${sourceDetail.trim()}` : sourceType;
  const realCount = products.filter((p: any) => {
    const r = current.get(p.id);
    return r && !isSimulatedSource(r.source);
  }).length;

  const changed = Object.entries(drafts)
    .map(([productId, v]) => ({ productId, price: parseRupiah(v) }))
    .filter((d) => d.price !== null && d.price > 0) as { productId: string; price: number }[];

  function fillFromPrevious() {
    const next: Record<string, string> = { ...drafts };
    let n = 0;
    for (const p of products as any[]) {
      const prev = previous.get(p.id);
      const hasReal = current.get(p.id) && !isSimulatedSource(current.get(p.id)!.source);
      if (prev && !hasReal && !next[p.id]) {
        next[p.id] = formatInput(Number(prev.price));
        n++;
      }
    }
    setDrafts(next);
    toast.info(
      n
        ? `${n} harga disalin dari data sebelumnya — periksa sebelum disimpan.`
        : "Tidak ada harga sebelumnya untuk disalin.",
    );
  }

  async function save() {
    if (!marketId) return toast.error("Pilih pasar dulu");
    if (!changed.length) return toast.error("Belum ada harga yang diisi");
    if (sourceType === "Lainnya" && !sourceDetail.trim())
      return toast.error("Jelaskan sumber datanya pada kolom keterangan");
    setSaving(true);
    const payload = changed.map((d) => ({
      product_id: d.productId,
      market_id: marketId,
      recorded_at: date,
      price: d.price,
      source,
    }));
    const { error } = await supabase
      .from("product_prices")
      .upsert(payload, { onConflict: "product_id,market_id,recorded_at" });
    setSaving(false);
    if (error) return toast.error("Gagal menyimpan: " + error.message);
    toast.success(`${payload.length} harga tersimpan untuk ${fmtDate(date)}`);
    setDrafts({});
    qc.invalidateQueries({ queryKey: ["admin-prices-rows"] });
    qc.invalidateQueries({ queryKey: ["landing-market-boards"] });
  }

  async function removeRow(row: PriceRow) {
    const { error } = await supabase.from("product_prices").delete().eq("id", row.id);
    if (error) return toast.error(error.message);
    toast.success("Harga dihapus");
    qc.invalidateQueries({ queryKey: ["admin-prices-rows"] });
    refetchSeed();
  }

  async function deleteSeed() {
    const { error } = await supabase
      .from("product_prices")
      .delete()
      .in("source", ["seed", "simulasi"]);
    if (error) return toast.error(error.message);
    toast.success("Semua data contoh di database dihapus");
    refetchSeed();
    qc.invalidateQueries({ queryKey: ["admin-prices-rows"] });
  }

  const market = (markets as any[]).find((m) => m.id === marketId);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Input Harga</h1>
          <p className="mt-1 text-sm text-[var(--color-gray-500)]">
            Catat harga hasil survei atau sumber resmi per pasar dan tanggal. Harga dengan sumber
            yang jelas otomatis menggantikan data contoh di aplikasi.
          </p>
        </div>
        {seedCount > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-[var(--color-destructive)]">
                <Trash2 className="mr-1.5 h-4 w-4" /> Hapus {seedCount} data contoh
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus semua data contoh?</AlertDialogTitle>
                <AlertDialogDescription>
                  {seedCount} baris harga bersumber “seed/simulasi” akan dihapus permanen dari
                  database. Harga hasil input dengan sumber lain tidak tersentuh. Lakukan ini
                  setelah data asli cukup tersedia.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={deleteSeed}>Hapus data contoh</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {/* Context */}
      <div className="mb-4 grid gap-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-4 md:grid-cols-[160px_1fr_200px_1fr]">
        <div>
          <Label className="mb-1.5 block text-xs">Tanggal pencatatan</Label>
          <Input type="date" value={date} max={today} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <Label className="mb-1.5 block text-xs">Pasar</Label>
          <Select value={marketId} onValueChange={setMarketId}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih pasar" />
            </SelectTrigger>
            <SelectContent>
              {(markets as any[]).map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name} <span className="text-[var(--color-gray-500)]">· {m.city}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-1.5 block text-xs">Sumber data</Label>
          <Select value={sourceType} onValueChange={setSourceType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SOURCES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-1.5 block text-xs">
            Keterangan sumber{" "}
            <span className="text-[var(--color-gray-500)]">
              {sourceType === "Lainnya" ? "(wajib)" : "(opsional)"}
            </span>
          </Label>
          <Input
            value={sourceDetail}
            onChange={(e) => setSourceDetail(e.target.value)}
            placeholder="mis. nama surveyor atau tautan sumber"
            maxLength={120}
          />
        </div>
      </div>

      {/* Coverage + actions */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm">
          <div className="h-2 w-40 overflow-hidden rounded-full bg-[var(--color-gray-100)]">
            <div
              className="h-full rounded-full bg-[var(--color-brand-green)] transition-[width]"
              style={{ width: `${products.length ? (realCount / products.length) * 100 : 0}%` }}
            />
          </div>
          <span>
            <strong>{realCount}</strong> / {products.length} produk punya harga asli
            {market ? ` di ${market.name}` : ""} · {fmtDate(date)}
          </span>
          {isFetching && <Loader2 className="h-4 w-4 animate-spin text-[var(--color-gray-500)]" />}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fillFromPrevious}>
            <CopyCheck className="mr-1.5 h-4 w-4" /> Salin harga sebelumnya
          </Button>
          <Button size="sm" onClick={save} disabled={saving || !changed.length}>
            {saving ? (
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-1.5 h-4 w-4" />
            )}
            Simpan {changed.length || ""} harga
          </Button>
        </div>
      </div>

      {/* Entry table */}
      <div className="overflow-x-auto rounded-lg border border-[var(--color-gray-100)] bg-white">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
            <tr>
              <th className="px-4 py-3">Produk</th>
              <th className="px-4 py-3">Harga asli sebelumnya</th>
              <th className="px-4 py-3">Status {fmtDate(date)}</th>
              <th className="w-48 px-4 py-3">Harga baru (Rp)</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {(products as any[]).map((p) => {
              const cur = current.get(p.id);
              const prev = previous.get(p.id);
              const draft = drafts[p.id] ?? "";
              const draftValue = parseRupiah(draft);
              const curIsReal = cur && !isSimulatedSource(cur.source);
              const deviation =
                draftValue && prev
                  ? Math.abs(draftValue - Number(prev.price)) / Number(prev.price)
                  : 0;
              return (
                <tr key={p.id} className="border-t border-[var(--color-gray-100)] align-top">
                  <td className="px-4 py-3">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-[var(--color-gray-500)]">
                      {p.category} · per {p.unit}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {prev ? (
                      <>
                        <div>{idr(Number(prev.price))}</div>
                        <div className="text-xs text-[var(--color-gray-500)]">
                          {fmtDate(prev.recorded_at)}
                        </div>
                      </>
                    ) : (
                      <span className="text-xs text-[var(--color-gray-500)]">Belum ada</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {curIsReal ? (
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-green)]" />
                        <div>
                          <div className="font-semibold">{idr(Number(cur.price))}</div>
                          <div
                            className="max-w-[16rem] truncate text-xs text-[var(--color-gray-500)]"
                            title={cur.source ?? ""}
                          >
                            {cur.source}
                          </div>
                        </div>
                      </div>
                    ) : cur ? (
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-semibold text-amber-900">
                        Data contoh · {idr(Number(cur.price))}
                      </span>
                    ) : (
                      <span className="text-xs text-[var(--color-gray-500)]">Belum diisi</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Input
                      inputMode="numeric"
                      placeholder={curIsReal ? "Ubah harga…" : "mis. 45.000"}
                      value={draft}
                      onChange={(e) => {
                        const n = parseRupiah(e.target.value);
                        setDrafts((d) => ({ ...d, [p.id]: n === null ? "" : formatInput(n) }));
                      }}
                      className="h-9 text-right tabular-nums"
                    />
                    {deviation > DEVIATION_WARN && (
                      <div className="mt-1 flex items-center gap-1 text-xs text-amber-700">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Beda {Math.round(deviation * 100)}% dari sebelumnya — cek lagi
                      </div>
                    )}
                  </td>
                  <td className="px-2 py-3 text-right">
                    {cur && (
                      <Button
                        size="icon"
                        variant="ghost"
                        title="Hapus harga tanggal ini"
                        onClick={() => removeRow(cur)}
                      >
                        <Trash2 className="h-4 w-4 text-[var(--color-destructive)]" />
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-[var(--color-gray-500)]">
        Sumber yang disimpan: <strong>{source}</strong>. Menyimpan harga untuk produk yang sudah
        punya harga di tanggal yang sama akan menimpanya.
      </p>
    </>
  );
}
