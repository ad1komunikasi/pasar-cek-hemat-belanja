import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  LineChart,
  ListChecks,
  MapPin,
  Plus,
  Scale,
  ShoppingBasket,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useSettings } from "@/hooks/use-settings-context";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { MarketField } from "@/components/site/market-field";
import { useReveal } from "@/components/site/use-reveal";
import heroImg from "@/assets/hero-illustration.jpg";
import problemImg from "@/assets/problem-illustration.jpg";
import familyImg from "@/assets/family-illustration.jpg";
import {
  boardsAreSimulated,
  recordedLabel,
  rupiah,
  useMarketBoards,
  type CommodityBoard,
} from "@/components/site/use-market-prices";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PasarCek — Cek & Bandingkan Harga Sembako Terdekat | Gratis" },
      {
        name: "description",
        content:
          "Cek harga sembako terbaru dan bandingkan antar pasar terdekat. Hemat waktu & uang belanja harian keluarga. Akses aplikasi PasarCek gratis!",
      },
      {
        name: "keywords",
        content:
          "cek harga sembako, harga beras hari ini, bandingkan harga pasar, aplikasi belanja hemat, harga cabai, harga telur terdekat, pasar tradisional",
      },
      { property: "og:title", content: "PasarCek — Cek & Bandingkan Harga Sembako Terdekat" },
      {
        property: "og:description",
        content:
          "Cek harga sembako terbaru dan bandingkan antar pasar terdekat. Hemat waktu & uang belanja harian keluarga.",
      },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:image:alt", content: "PasarCek — Aplikasi cek harga sembako terbaru" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:title", content: "PasarCek — Cek & Bandingkan Harga Sembako Terdekat" },
      {
        name: "twitter:description",
        content:
          "Cek harga sembako terbaru dan bandingkan antar pasar terdekat. Hemat waktu & uang belanja harian keluarga.",
      },
      { name: "twitter:image", content: "/twitter-image.jpg" },
      { name: "twitter:image:alt", content: "PasarCek — Aplikasi cek harga sembako terbaru" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "PasarCek",
          applicationCategory: "ShoppingApplication",
          operatingSystem: "iOS, Android",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "IDR",
          },
          description:
            "Aplikasi cek harga sembako terbaru dan bandingkan antar pasar terdekat untuk belanja lebih hemat.",
          featureList: [
            "Harga sembako per pasar",
            "Bandingkan harga antar pasar",
            "Notifikasi harga turun",
            "Daftar belanja pintar",
            "Pasar terdekat berbasis lokasi",
          ],
        }),
      },
    ],
  }),
  component: LandingPage,
});

/* ---------------- Helpers ---------------- */

function useTx() {
  const { lang } = useSettings();
  return { lang, tx: (id: string, en: string) => (lang === "id" ? id : en) };
}

function useCountUp(target: number, duration = 700) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fromRef.current = target;
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      const v = from + (target - from) * eased;
      setValue(v);
      if (k < 1) raf = requestAnimationFrame(step);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      fromRef.current = target;
    };
  }, [target, duration]);
  return value;
}

const pct = (n: number) => (n * 100).toFixed(0) + "%";

function PrimaryButton({
  href,
  children,
  tone = "tarp",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "tarp" | "paper" | "turmeric";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex h-12 items-center gap-2 rounded-md px-5 text-[0.95rem] font-medium transition-[background-color,transform] duration-200 active:translate-y-px",
        tone === "tarp" && "bg-tarp text-primary-foreground hover:bg-tarp-ink dark:hover:bg-leaf",
        tone === "paper" && "bg-[#f4efe4] text-[#0f1d47] hover:bg-white",
        tone === "turmeric" && "bg-turmeric text-[#2a1d03] hover:bg-[#f2bf4d]",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  );
}

function SectionLabel({
  n,
  children,
  className,
}: {
  n: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("eyebrow flex items-center gap-3 text-foreground/55", className)}>
      <span className="text-chili">{n}</span>
      <span className="h-px w-8 bg-current opacity-40" />
      {children}
    </div>
  );
}

/** Hand-drawn marker stroke under a word. */
function Scribble({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("absolute -bottom-2 left-0 h-[0.32em] w-full overflow-visible", className)}
    >
      <path
        d="M3 15C60 7 140 4 297 10M18 20c70-6 160-8 262-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        pathLength={1}
        className="[stroke-dasharray:1] [stroke-dashoffset:1] [animation:draw_1.1s_0.6s_cubic-bezier(.6,0,.2,1)_forwards]"
      />
      <style>{`@keyframes draw{to{stroke-dashoffset:0}}`}</style>
    </svg>
  );
}

/** A picture taped to the price board — the PasarCek characters live in these. */
function Snapshot({
  src,
  alt,
  label,
  tilt = -1.5,
  float = false,
  eager = false,
  labelAt = "bottom-left",
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  label?: ReactNode;
  tilt?: number;
  float?: boolean;
  eager?: boolean;
  labelAt?: "bottom-left" | "bottom-right" | "top-right";
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={cn(float && "animate-float [animation-duration:7s]", className)}>
      <figure
        className="relative rounded-[16px] border border-rule bg-card p-2 shadow-elevated transition-transform duration-500 hover:rotate-0"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <span
          aria-hidden
          className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rotate-[-3deg] bg-turmeric/55 mix-blend-multiply dark:mix-blend-normal dark:bg-turmeric/40"
        />
        <img
          src={src}
          alt={alt}
          width={900}
          height={900}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          decoding="async"
          className={cn("block h-full w-full rounded-[10px] object-cover", imgClassName)}
        />
        {label && (
          <figcaption
            className={cn(
              "eyebrow absolute rounded-sm",
              labelAt === "bottom-left" && "bottom-5 left-5",
              labelAt === "bottom-right" && "bottom-5 right-5",
              labelAt === "top-right" && "right-5 top-5",
            )}
          >
            <span className="block rounded-sm bg-[#fbf8f1]/92 px-2 py-1 text-[10px] text-[#131a2e] backdrop-blur-sm">
              {label}
            </span>
          </figcaption>
        )}
      </figure>
    </div>
  );
}

/* ---------------- Hero ---------------- */

const HERO_PICKS = [
  "Cabai Rawit",
  "Cabai Merah",
  "Daging Ayam",
  "Telur Ayam",
  "Bawang Merah",
  "Bawang Putih",
  "Beras Premium",
];

function Hero() {
  const { user } = useAuth();
  const { tx, lang } = useTx();
  const { data: boards = [] } = useMarketBoards();
  const sample = boardsAreSimulated(boards);
  // Lead with whichever everyday staple has the widest gap in the latest log, and open the board on it.
  const candidates = HERO_PICKS.map((n) => boards.find((b) => b.name === n)).filter(
    (b): b is CommodityBoard => !!b,
  );
  const lead = [...candidates].sort((a, b) => b.max - b.min - (a.max - a.min))[0] ?? boards[0];
  const picks = lead
    ? [lead, ...candidates.filter((b) => b.name !== lead.name)].slice(0, 5)
    : candidates;
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (pinned || picks.length < 2) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % picks.length), 4800);
    return () => window.clearInterval(id);
  }, [pinned, picks.length]);

  const board = picks[active] ?? boards[0];
  const marketCount = new Set(boards.flatMap((b) => b.quotes.map((q) => q.market))).size;

  return (
    <section id="beranda" className="relative overflow-hidden">
      <MarketField className="[mask-image:radial-gradient(ellipse_80%_32%_at_100%_0%,#000_20%,transparent_100%)] lg:[mask-image:radial-gradient(ellipse_75%_70%_at_60%_40%,#000_35%,transparent_100%)]" />
      <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 gap-14 px-5 pb-20 pt-12 sm:px-8 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="lg:col-span-6 lg:pt-6">
          <div className="eyebrow flex items-center gap-2.5 text-foreground/60 animate-rise">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
            </span>
            {tx("Papan harga pasar", "Market price board")} · Jakarta
          </div>

          <h1 className="display-xl mt-7 text-[clamp(2.75rem,6vw,5.1rem)] text-foreground animate-rise [animation-delay:80ms]">
            {lang === "id" ? (
              <>
                Cabai yang sama, harganya bisa beda{" "}
                <span className="relative inline-block whitespace-nowrap text-chili">
                  ribuan rupiah
                  <Scribble className="text-turmeric" />
                </span>{" "}
                sekilo.
              </>
            ) : (
              <>
                The same chili can cost{" "}
                <span className="relative inline-block whitespace-nowrap text-chili">
                  thousands
                  <Scribble className="text-turmeric" />
                </span>{" "}
                more a kilo next door.
              </>
            )}
          </h1>

          <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-foreground/70 animate-rise [animation-delay:160ms]">
            {tx(
              "PasarCek membandingkan harga sembako antar pasar di sekitar Anda, supaya Anda tahu harus belanja di mana sebelum keluar rumah.",
              "PasarCek compares staple prices across the markets near you, so you know where to shop before you leave the house.",
            )}
            {sample &&
              tx(
                " Versi beta: angka di papan harga masih data contoh selama integrasi sumber harga resmi disiapkan.",
                " Beta: the numbers on the board are sample data while we connect an official price source.",
              )}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 animate-rise [animation-delay:240ms]">
            <PrimaryButton href={user ? "/dashboard" : "/auth?tab=register"}>
              {user
                ? tx("Buka papan harga", "Open price board")
                : tx("Mulai cek harga — gratis", "Start checking — free")}
            </PrimaryButton>
            <a
              href="#cara-kerja"
              className="group inline-flex items-center gap-2 text-[0.95rem] font-medium text-foreground/80 underline decoration-foreground/25 underline-offset-[6px] transition-colors hover:text-foreground hover:decoration-foreground"
            >
              {tx("Lihat cara kerjanya", "See how it works")}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 border-t border-rule pt-5 animate-rise [animation-delay:320ms]">
            {[
              [marketCount ? String(marketCount) : "—", tx("pasar", "markets")],
              [boards.length ? String(boards.length) : "—", tx("komoditas", "staples")],
              sample
                ? ["Beta", tx("data masih contoh", "sample data for now")]
                : [
                    recordedLabel(boards[0]?.recordedAt ?? "", lang),
                    tx("tanggal data terbaru", "latest data date"),
                  ],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-semibold tracking-tight">{v}</dt>
                <dd className="mt-1 text-sm text-foreground/55">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-6 lg:h-[640px]">
          <Snapshot
            src={heroImg}
            alt={tx(
              "Ibu rumah tangga mengecek harga sembako di PasarCek sebelum belanja",
              "A home cook checking staple prices on PasarCek before shopping",
            )}
            label={tx("Cek dulu di HP", "Checked on the phone first")}
            labelAt="top-right"
            tilt={2}
            float
            eager
            className="ml-auto w-[86%] animate-rise [animation-delay:120ms] sm:w-[62%] lg:absolute lg:right-0 lg:top-0 lg:w-[64%]"
            imgClassName="aspect-[4/5] object-[50%_20%]"
          />
          {board && (
            <div className="relative z-10 -mt-28 mr-8 sm:-mt-64 sm:mr-auto sm:w-[22rem] lg:absolute lg:bottom-0 lg:left-0 lg:mt-0 lg:w-[20rem]">
              <PriceBoard
                compact
                boards={picks}
                active={active}
                onPick={(i) => {
                  setActive(i);
                  setPinned(true);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PriceBoard({
  boards,
  active,
  onPick,
  compact = false,
}: {
  boards: CommodityBoard[];
  active: number;
  onPick: (i: number) => void;
  compact?: boolean;
}) {
  const { tx, lang } = useTx();
  const b = boards[active];
  if (!b) return null;
  const range = b.max - b.min || 1;

  return (
    <figure className="relative animate-rise [animation-delay:260ms]">
      <div className="relative rotate-[-1deg] rounded-[14px] border border-rule bg-card shadow-elevated transition-transform duration-500 hover:rotate-0">
        <div className="flex items-center justify-between border-b border-rule px-5 py-3.5">
          <span className="eyebrow text-foreground/55">
            {tx("Harga per", "Price per")} {b.unit}
          </span>
          <span className="eyebrow flex items-center gap-1.5 text-foreground/55">
            <span
              className={cn("h-1.5 w-1.5 rounded-full", b.simulated ? "bg-turmeric" : "bg-leaf")}
            />
            {b.simulated ? tx("data contoh", "sample data") : tx("dicatat", "recorded")} ·{" "}
            {recordedLabel(b.recordedAt, lang)}
          </span>
        </div>

        <div className="flex gap-1 overflow-x-auto border-b border-rule px-3 py-2.5 [mask-image:linear-gradient(90deg,#000_85%,transparent)] [scrollbar-width:none]">
          {boards.map((x, i) => (
            <button
              key={x.name}
              type="button"
              onClick={() => onPick(i)}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-[0.82rem] transition-colors",
                i === active
                  ? "bg-foreground text-background"
                  : "text-foreground/60 hover:bg-secondary hover:text-foreground",
              )}
            >
              {x.name}
            </button>
          ))}
        </div>

        <ol key={b.name} className="px-5 py-3">
          {b.quotes.slice(0, compact ? 4 : 6).map((q, i) => {
            const isBest = i === 0;
            const w = 18 + ((q.price - b.min) / range) * 82;
            return (
              <li
                key={q.market}
                className="grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-dashed border-rule py-2.5 last:border-0 animate-rise"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "truncate text-[0.95rem]",
                        isBest ? "font-semibold" : "text-foreground/80",
                      )}
                    >
                      {q.market}
                    </span>
                    {isBest && !compact && (
                      <span className="eyebrow rounded-sm bg-leaf/15 px-1.5 py-0.5 text-[10px] text-leaf">
                        {tx("termurah", "cheapest")}
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 h-[5px] overflow-hidden rounded-full bg-secondary">
                    <div
                      className={cn(
                        "h-full rounded-full transition-[width] duration-700 ease-out",
                        isBest
                          ? "bg-leaf"
                          : i === b.quotes.length - 1
                            ? "bg-chili/80"
                            : "bg-foreground/25",
                      )}
                      style={{ width: `${w}%` }}
                    />
                  </div>
                </div>
                <span
                  className={cn(
                    "font-mono text-[0.95rem] tabular",
                    isBest && "font-bold text-leaf",
                  )}
                >
                  {rupiah(q.price)}
                </span>
              </li>
            );
          })}
        </ol>

        <figcaption className="flex items-end justify-between gap-4 rounded-b-[14px] border-t border-rule bg-secondary/60 px-5 py-4">
          <div>
            <div className="eyebrow text-foreground/50">
              {tx("Selisih termurah–termahal", "Cheapest-to-priciest gap")}
            </div>
            <div className="mt-1 font-display text-2xl font-semibold tracking-tight">
              {rupiah(b.max - b.min)}
              <span className="ml-2 font-mono text-sm font-normal text-chili">
                {pct((b.max - b.min) / b.min)}
              </span>
            </div>
          </div>
          <div className="flex gap-1" aria-hidden>
            {boards.map((x, i) => (
              <span
                key={x.name}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === active ? "w-6 bg-foreground" : "w-2 bg-foreground/20",
                )}
              />
            ))}
          </div>
        </figcaption>
      </div>

      {/* stamp */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[15.5rem] bottom-2 hidden rotate-[-8deg] xl:block rounded-full border-2 border-chili/80 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-chili [animation:stamp_.6s_1.2s_both]"
      >
        {tx("Cek dulu · baru belanja", "Check first · then shop")}
      </div>
    </figure>
  );
}

/* ---------------- Problem: two receipts ---------------- */

const WEEKLY: [name: string, qty: number][] = [
  ["Beras Premium", 5],
  ["Telur Ayam", 2],
  ["Daging Ayam", 1],
  ["Minyak Goreng", 2],
  ["Bawang Merah", 0.5],
  ["Cabai Merah", 0.5],
];

function basketTotals(boards: CommodityBoard[], items: [string, number][]) {
  const markets = new Set(boards.flatMap((b) => b.quotes.map((q) => q.market)));
  const out: {
    market: string;
    total: number;
    lines: { name: string; qty: number; unit: string; cost: number }[];
  }[] = [];
  for (const market of markets) {
    let total = 0;
    const lines = [];
    let complete = true;
    for (const [name, qty] of items) {
      const b = boards.find((x) => x.name === name);
      const q = b?.quotes.find((x) => x.market === market);
      if (!b || !q) {
        complete = false;
        break;
      }
      const cost = q.price * qty;
      total += cost;
      lines.push({ name, qty, unit: b.unit, cost });
    }
    if (complete) out.push({ market, total, lines });
  }
  return out.sort((a, b) => a.total - b.total);
}

function Receipt({
  market,
  lines,
  total,
  tone,
  className,
  style,
}: {
  market: string;
  lines: { name: string; qty: number; unit: string; cost: number }[];
  total: number;
  tone: "best" | "worst";
  className?: string;
  style?: CSSProperties;
}) {
  const { tx } = useTx();
  const qty = (q: number, u: string) => `${String(q).replace(".", ",")} ${u === "liter" ? "L" : u}`;
  return (
    <div
      data-reveal
      style={style}
      className={cn(
        "relative w-full max-w-[19rem] drop-shadow-[0_18px_22px_rgb(15_29_71/0.16)]",
        className,
      )}
    >
      <div className="receipt-edge bg-[#fdfbf6] px-6 pb-10 pt-6 font-mono text-[12.5px] text-[#1a2033] dark:bg-[#ece7da]">
        <div className="text-center">
          <div className="font-bold uppercase tracking-[0.2em]">{market}</div>
          <div className="mt-1 text-[10.5px] uppercase tracking-[0.18em] text-[#1a2033]/55">
            {tx("belanja mingguan", "weekly shop")}
          </div>
        </div>
        <div className="my-4 border-t border-dashed border-[#1a2033]/30" />
        <ul className="space-y-1.5">
          {lines.map((l) => (
            <li key={l.name} className="flex justify-between gap-3">
              <span className="truncate">
                {l.name} <span className="text-[#1a2033]/50">{qty(l.qty, l.unit)}</span>
              </span>
              <span className="tabular">{new Intl.NumberFormat("id-ID").format(l.cost)}</span>
            </li>
          ))}
        </ul>
        <div className="my-4 border-t border-dashed border-[#1a2033]/30" />
        <div className="flex justify-between text-[15px] font-bold">
          <span>TOTAL</span>
          <span className="tabular">{rupiah(total)}</span>
        </div>
      </div>
      {tone === "best" && (
        <div className="absolute -right-3 -top-3 rotate-[8deg] bg-[#fdfbf6] rounded-sm border-2 border-[#127a79] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#127a79]">
          {tx("termurah", "cheapest")}
        </div>
      )}
    </div>
  );
}

function Problem() {
  const { tx, lang } = useTx();
  const { data: boards = [] } = useMarketBoards();
  const sample = boardsAreSimulated(boards);
  const totals = basketTotals(boards, WEEKLY);
  const best = totals[0];
  const worst = totals[totals.length - 1];
  const diff = best && worst ? worst.total - best.total : 0;

  const points = [
    [
      tx("Harga bergerak setiap hari", "Prices move every day"),
      tx(
        "Cabai bisa naik turun ribuan rupiah dalam seminggu. Tanpa catatan, Anda hanya bisa mengira-ngira.",
        "Chili can swing by thousands of rupiah in a week. Without a record, you're guessing.",
      ),
    ],
    [
      tx("Keliling pasar itu mahal", "Market-hopping costs money"),
      tx(
        "Ongkos ojek dan waktu dua jam sering habis hanya untuk membandingkan harga.",
        "Ojek fares and two hours of your morning, just to compare prices.",
      ),
    ],
    [
      tx("Kebiasaan bukan berarti termurah", "Habit isn't the cheapest"),
      tx(
        "Pasar langganan terasa aman, tapi belum tentu memberi harga terbaik minggu ini.",
        "Your usual market feels safe, but it may not have this week's best prices.",
      ),
    ],
  ];

  return (
    <section id="harga-hari-ini" className="relative border-t border-rule bg-paper-deep/60">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-16 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionLabel n="01">{tx("Masalahnya", "The problem")}</SectionLabel>
          <h2
            data-reveal
            className="mt-6 text-[clamp(2.2rem,4.6vw,3.9rem)] font-bold leading-[1.02]"
          >
            {tx(
              "Harga di pasar tidak pernah sama. Selama ini Anda hanya tidak melihatnya.",
              "Market prices are never the same. You just couldn't see it.",
            )}
          </h2>
          <ol className="mt-12 border-t border-rule">
            {points.map(([title, desc], i) => (
              <li
                key={title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-rule py-6"
              >
                <span className="font-mono text-sm text-foreground/40">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1.5 max-w-md leading-relaxed text-foreground/65">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative lg:col-span-6 lg:pl-6">
          {best && worst && best.market !== worst.market ? (
            <>
              <p data-reveal className="max-w-sm text-foreground/65 lg:ml-auto lg:text-right">
                {sample
                  ? tx(
                      "Ilustrasi: daftar belanja yang sama, dihitung dengan data contoh di dua pasar Jakarta.",
                      "Illustration: the same shopping list, priced with sample data at two Jakarta markets.",
                    )
                  : tx(
                      `Daftar belanja yang sama, dihitung dengan harga tercatat ${recordedLabel(boards[0]?.recordedAt ?? "", lang)} di dua pasar:`,
                      `The same shopping list, priced with recorded prices from ${recordedLabel(boards[0]?.recordedAt ?? "", lang)} at two markets:`,
                    )}
              </p>
              <Snapshot
                src={problemImg}
                alt={tx(
                  "Pembeli bingung membandingkan harga di pasar dengan daftar belanja dan kalkulator",
                  "A shopper puzzling over prices at the market with a list and a calculator",
                )}
                label={tx("Sebelum: menebak-nebak harga", "Before: guessing the prices")}
                labelAt="top-right"
                tilt={-2}
                className="mt-8 w-[88%] sm:w-[70%] lg:ml-auto lg:w-[78%]"
                imgClassName="aspect-[5/4] object-[50%_25%]"
              />
              <div className="relative z-10 -mt-24 flex flex-col items-center gap-6 sm:-mt-40 sm:flex-row sm:items-start sm:justify-center lg:justify-end">
                <Receipt
                  market={worst.market}
                  lines={worst.lines}
                  total={worst.total}
                  tone="worst"
                  className="sm:-rotate-2 sm:translate-y-6"
                />
                <Receipt
                  market={best.market}
                  lines={best.lines}
                  total={best.total}
                  tone="best"
                  className="sm:rotate-[1.5deg]"
                  style={{ ["--reveal-delay" as string]: "140ms" }}
                />
              </div>
              <div
                data-reveal
                className="mt-14 flex items-baseline justify-center gap-4 lg:justify-end"
              >
                <span className="eyebrow text-foreground/55">
                  {sample
                    ? tx("Contoh selisih seminggu", "Example weekly difference")
                    : tx("Selisih seminggu", "Weekly difference")}
                </span>
                <span className="font-display text-5xl font-bold tracking-tight text-leaf">
                  {rupiah(diff)}
                </span>
              </div>
              <p data-reveal className="mt-2 text-center text-sm text-foreground/50 lg:text-right">
                {tx(
                  `Kira-kira ${rupiah(diff * 52)} setahun${sample ? " pada contoh ini" : ", untuk satu keluarga"}.`,
                  `Roughly ${rupiah(diff * 52)} a year, for one household.`,
                )}
              </p>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */

function Features() {
  const { user } = useAuth();
  const { tx } = useTx();
  const features = [
    {
      icon: LineChart,
      title: tx("Harga hari ini", "Today's prices"),
      desc: tx(
        "Beras, cabai, telur, ayam, minyak, bawang — per pasar, lengkap dengan tanggal pencatatannya.",
        "Rice, chili, eggs, chicken, oil, shallots — per market, each with the date it was recorded.",
      ),
      href: "/prices",
    },
    {
      icon: Scale,
      title: tx("Bandingkan pasar", "Compare markets"),
      desc: tx(
        "Satu komoditas, beberapa pasar, satu tabel. Termurah langsung terlihat.",
        "One staple, several markets, one table. The cheapest stands out.",
      ),
      href: "/compare",
    },
    {
      icon: MapPin,
      title: tx("Pasar terdekat", "Nearby markets"),
      desc: tx(
        "Peta pasar tradisional di sekitar Anda, lengkap dengan jam buka dan rute.",
        "A map of traditional markets around you, with opening hours and directions.",
      ),
      href: "/markets",
    },
    {
      icon: ShoppingBasket,
      title: "Smart Basket",
      desc: tx(
        "Masukkan daftar belanja, kami hitung pasar mana yang totalnya paling murah.",
        "Enter your list, we work out which market gives the lowest total.",
      ),
      href: "/smart-basket",
    },
    {
      icon: Bell,
      title: tx("Alarm harga turun", "Price-drop alerts"),
      desc: tx(
        "Tentukan harga incaran. Kami kabari begitu harganya tercapai.",
        "Set a target price. We'll tell you the moment it's reached.",
      ),
      href: "/notifications",
    },
    {
      icon: ListChecks,
      title: tx("Daftar belanja", "Shopping list"),
      desc: tx(
        "Catatan belanja yang tahu harga — total perkiraan sebelum berangkat.",
        "A list that knows prices — an estimated total before you go.",
      ),
      href: "/wishlist",
    },
  ];

  return (
    <section id="fitur" className="border-t border-rule">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-36">
            <SectionLabel n="02">{tx("Isinya", "What's inside")}</SectionLabel>
            <h2
              data-reveal
              className="mt-6 text-[clamp(2.2rem,4.2vw,3.5rem)] font-bold leading-[1.02]"
            >
              {tx("Enam alat untuk berhenti menebak.", "Six tools to stop guessing.")}
            </h2>
            <p data-reveal className="mt-6 max-w-sm leading-relaxed text-foreground/65">
              {tx(
                "Dibuat untuk orang yang belanja sendiri ke pasar — bukan untuk analis. Buka, lihat, berangkat.",
                "Built for people who do their own market run — not for analysts. Open, look, go.",
              )}
            </p>
          </div>
        </div>

        <ul className="border-t border-rule lg:col-span-8">
          {features.map((f, i) => (
            <li
              key={f.href}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 70}ms` }}
            >
              <a
                href={user ? f.href : "/auth?tab=register"}
                className="group grid grid-cols-[2.25rem_1fr_auto] items-start gap-x-5 border-b border-rule py-7 transition-colors sm:grid-cols-[3rem_14rem_1fr_auto] sm:items-center"
              >
                <span className="font-mono text-sm text-foreground/40 transition-colors group-hover:text-chili">
                  0{i + 1}
                </span>
                <h3 className="flex items-center gap-3 text-xl font-semibold tracking-tight sm:text-[1.35rem]">
                  <f.icon
                    className="h-5 w-5 shrink-0 text-tarp transition-transform duration-300 group-hover:-rotate-6"
                    strokeWidth={1.75}
                  />
                  {f.title}
                </h3>
                <p className="col-start-2 mt-2 leading-relaxed text-foreground/65 sm:col-start-3 sm:mt-0">
                  {f.desc}
                </p>
                <ArrowUpRight className="col-start-3 row-start-1 h-5 w-5 text-foreground/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground sm:col-start-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */

function HowItWorks() {
  const { tx } = useTx();
  const steps = [
    [
      tx("Pilih area Anda", "Pick your area"),
      tx(
        "Izinkan lokasi, atau pilih kota dan pasar secara manual.",
        "Share your location, or pick a city and markets yourself.",
      ),
    ],
    [
      tx("Lihat siapa termurah", "See who's cheapest"),
      tx(
        "Bandingkan harga hari ini untuk barang yang Anda butuhkan.",
        "Compare today's prices for the things you need.",
      ),
    ],
    [
      tx("Berangkat dengan rencana", "Leave with a plan"),
      tx(
        "Datang ke pasar yang tepat, dengan perkiraan total di tangan.",
        "Head to the right market with an estimated total in hand.",
      ),
    ],
  ];
  return (
    <section id="cara-kerja" className="border-t border-rule bg-paper-deep/60">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel n="03">{tx("Cara kerja", "How it works")}</SectionLabel>
            <h2
              data-reveal
              className="mt-6 max-w-xl text-[clamp(2.2rem,4.2vw,3.5rem)] font-bold leading-[1.02]"
            >
              {tx(
                "Tiga langkah, sebelum kopi pagi habis.",
                "Three steps, before your coffee's done.",
              )}
            </h2>
          </div>
          <p
            data-reveal
            className="max-w-xs border-l-2 border-turmeric pl-4 leading-relaxed text-foreground/65"
          >
            {tx(
              "Tanpa install. PasarCek berjalan langsung di browser HP Anda — buka, cek, berangkat.",
              "Nothing to install. PasarCek runs right in your phone's browser — open, check, go.",
            )}
          </p>
        </div>
        <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[2.1rem] hidden border-t border-dashed border-foreground/25 md:block"
          />
          {steps.map(([title, desc], i) => (
            <li
              key={title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
              className="relative"
            >
              <div className="relative inline-grid h-[4.2rem] w-[4.2rem] place-items-center rounded-full border border-rule bg-background font-display text-2xl font-bold">
                {i + 1}
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 max-w-xs leading-relaxed text-foreground/65">{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Smart Basket (interactive) ---------------- */

const BASKET_CHOICES: [name: string, qty: number][] = [
  ["Beras Premium", 5],
  ["Telur Ayam", 1],
  ["Daging Ayam", 1],
  ["Minyak Goreng", 2],
  ["Cabai Merah", 0.5],
  ["Bawang Merah", 0.5],
  ["Bawang Putih", 0.25],
  ["Gula Pasir", 1],
  ["Tempe", 1],
  ["Ikan Kembung", 1],
];

function SmartBasket() {
  const { user } = useAuth();
  const { tx } = useTx();
  const { data: boards = [] } = useMarketBoards();
  const sample = boardsAreSimulated(boards);
  const available = BASKET_CHOICES.filter(([n]) => boards.some((b) => b.name === n));
  const [picked, setPicked] = useState<string[]>([
    "Beras Premium",
    "Telur Ayam",
    "Daging Ayam",
    "Minyak Goreng",
    "Cabai Merah",
  ]);
  const items = available.filter(([n]) => picked.includes(n));
  const totals = items.length ? basketTotals(boards, items) : [];
  const best = totals[0];
  const worst = totals[totals.length - 1];
  const saving = best && worst ? worst.total - best.total : 0;
  const shown = useCountUp(saving);
  const maxTotal = worst?.total || 1;
  const minTotal = best?.total || 0;

  const toggle = (n: string) =>
    setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  return (
    <section
      id="smart-basket"
      className="grain relative overflow-hidden bg-[#0f1d47] text-[#f4efe4]"
    >
      <MarketField
        tone="light"
        className="opacity-70 [mask-image:linear-gradient(90deg,transparent,#000_30%,#000_70%,transparent)]"
      />
      <div className="relative z-10 mx-auto grid max-w-[1240px] grid-cols-1 gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="eyebrow flex items-center gap-3 text-[#f4efe4]/55">
            <span className="text-turmeric">04</span>
            <span className="h-px w-8 bg-current opacity-40" />
            Smart Basket
          </div>
          <h2
            data-reveal
            className="mt-6 text-[clamp(2.2rem,4.4vw,3.7rem)] font-bold leading-[1.02]"
          >
            {tx(
              "Bukan barang termurah. Pasar termurah.",
              "Not the cheapest item. The cheapest market.",
            )}
          </h2>
          <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-[#f4efe4]/70">
            {tx(
              "Tidak ada yang mau ke tiga pasar untuk tiga barang. Smart Basket menjumlahkan seluruh daftar Anda di tiap pasar, lalu menunjuk satu tempat dengan total paling hemat.",
              "Nobody visits three markets for three items. Smart Basket totals your whole list at every market and points to the one place with the lowest bill.",
            )}
          </p>
          <div data-reveal className="mt-8">
            <div className="eyebrow text-[#f4efe4]/45">
              {tx("Coba — ketuk untuk ubah daftar", "Try it — tap to edit the list")}
              {sample && tx(" (data contoh)", " (sample data)")}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {available.map(([n, q]) => {
                const on = picked.includes(n);
                const unit = boards.find((b) => b.name === n)?.unit === "liter" ? "L" : "kg";
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => toggle(n)}
                    aria-pressed={on}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-all duration-200",
                      on
                        ? "border-turmeric bg-turmeric text-[#2a1d03]"
                        : "border-white/15 text-[#f4efe4]/70 hover:border-white/40 hover:text-[#f4efe4]",
                    )}
                  >
                    {on ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                    {n}
                    <span
                      className={cn(
                        "font-mono text-[11px]",
                        on ? "text-[#2a1d03]/60" : "text-[#f4efe4]/40",
                      )}
                    >
                      {String(q).replace(".", ",")}
                      {unit}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <div
            data-reveal
            className="rounded-[14px] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-[#f4efe4]/50">
                {tx("Total per pasar", "Total per market")}
              </span>
              <span className="font-mono text-xs text-[#f4efe4]/45">
                {items.length} {tx("barang", "items")}
              </span>
            </div>

            {totals.length ? (
              <ul className="mt-6 space-y-3.5">
                {totals.map((t, i) => {
                  const w = 30 + ((t.total - minTotal) / (maxTotal - minTotal || 1)) * 70;
                  return (
                    <li
                      key={t.market}
                      className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 sm:grid-cols-[10.5rem_1fr_auto]"
                    >
                      <span
                        className={cn(
                          "truncate text-[0.95rem]",
                          i === 0 ? "font-semibold text-turmeric" : "text-[#f4efe4]/75",
                        )}
                      >
                        {t.market}
                      </span>
                      <div className="order-last col-span-2 h-2 overflow-hidden rounded-full bg-white/8 sm:order-none sm:col-span-1 sm:h-2.5">
                        <div
                          className={cn(
                            "h-full rounded-full transition-[width] duration-700 ease-out",
                            i === 0 ? "bg-turmeric" : "bg-white/25",
                          )}
                          style={{ width: `${w}%` }}
                        />
                      </div>
                      <span
                        className={cn(
                          "font-mono text-sm tabular",
                          i === 0 && "font-bold text-turmeric",
                        )}
                      >
                        {rupiah(t.total)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-8 text-[#f4efe4]/55">
                {tx("Pilih minimal satu barang.", "Pick at least one item.")}
              </p>
            )}

            <div className="mt-8 flex flex-col justify-between gap-6 border-t border-white/12 pt-6 sm:flex-row sm:items-end">
              <div>
                <div className="eyebrow text-[#f4efe4]/50">
                  {tx("Belanja di", "Shop at")} {best ? best.market : "—"}, {tx("hemat", "save")}
                </div>
                <div className="mt-2 font-display text-[clamp(2.6rem,5vw,3.6rem)] font-bold leading-none tracking-tight text-turmeric tabular">
                  {rupiah(shown)}
                </div>
                <div className="mt-2 text-sm text-[#f4efe4]/50">
                  {tx(
                    "dibanding pasar termahal untuk daftar ini",
                    "versus the priciest market for this list",
                  )}
                </div>
              </div>
              <PrimaryButton tone="turmeric" href={user ? "/smart-basket" : "/auth?tab=register"}>
                {tx("Pakai daftar saya", "Use my own list")}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Who it's for ---------------- */

function ForWhom() {
  const { tx } = useTx();
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 md:py-32">
        <SectionLabel n="05">{tx("Untuk siapa", "Who it's for")}</SectionLabel>
        <p
          data-reveal
          className="mt-8 max-w-5xl font-display text-[clamp(1.9rem,4vw,3.4rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-foreground/35"
        >
          {tx("Untuk ", "For ")}
          <span className="text-foreground">
            {tx("ibu yang belanja tiap pagi", "the parent shopping every morning")}
          </span>
          ,{" "}
          <span className="text-foreground">
            {tx("anak kos di akhir bulan", "the student at month's end")}
          </span>
          ,{" "}
          <span className="text-foreground">
            {tx("pemilik warung yang kulakan tiap minggu", "the warung owner restocking weekly")}
          </span>
          {tx(
            ", dan siapa pun yang pernah pulang dari pasar lalu berpikir, ",
            ", and anyone who's come home from the market thinking, ",
          )}
          <span className="relative whitespace-nowrap italic text-chili">
            {tx("“kok mahal, ya?”", "“why was that so expensive?”")}
          </span>
        </p>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */

function Pricing() {
  const { user } = useAuth();
  const { tx } = useTx();
  const free = [
    tx("Harga semua komoditas per pasar", "Prices for every staple, per market"),
    tx("Bandingkan pasar", "Compare markets"),
    tx("Smart Basket dasar", "Basic Smart Basket"),
    tx("3 alarm harga", "3 price alerts"),
  ];
  const premium = [
    tx("Alarm harga tanpa batas", "Unlimited price alerts"),
    tx("Prediksi harga 7 hari", "7-day price forecast"),
    tx("Riwayat & analitik 90 hari", "90-day history & analytics"),
    tx("Smart Basket lengkap", "Full Smart Basket"),
    tx("Catatan total penghematan", "Savings tracker"),
  ];
  return (
    <section id="paket" className="border-t border-rule bg-paper-deep/60">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionLabel n="06">{tx("Paket", "Plans")}</SectionLabel>
          <h2
            data-reveal
            className="mt-6 text-[clamp(2.2rem,4.2vw,3.5rem)] font-bold leading-[1.02]"
          >
            {tx(
              "Gratis untuk dipakai. Murah untuk ditingkatkan.",
              "Free to use. Cheap to upgrade.",
            )}
          </h2>
          <p data-reveal className="mt-6 max-w-sm leading-relaxed text-foreground/65">
            {tx(
              "Premium seharga kurang dari sekilo cabai sebulan — dan biasanya kembali modal di belanja pertama.",
              "Premium costs less than a kilo of chili a month — and usually pays for itself on the first shop.",
            )}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:col-span-8">
          <div data-reveal className="flex flex-col rounded-[14px] border border-rule bg-card p-8">
            <div className="eyebrow text-foreground/55">{tx("Gratis", "Free")}</div>
            <div className="mt-5 font-display text-6xl font-bold tracking-tight">Rp0</div>
            <p className="mt-2 text-foreground/60">
              {tx("Selamanya, tanpa kartu.", "Forever, no card.")}
            </p>
            <ul className="mt-8 flex-1 space-y-3 border-t border-rule pt-6">
              {free.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" strokeWidth={2.5} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={user ? "/dashboard" : "/auth?tab=register"}
              className="mt-10 inline-flex h-12 items-center justify-center rounded-md border border-foreground/20 font-medium transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            >
              {tx("Mulai gratis", "Start free")}
            </a>
          </div>

          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="grain relative flex flex-col overflow-hidden rounded-[14px] bg-[#0f1d47] p-8 text-[#f4efe4]"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="eyebrow text-[#f4efe4]/60">Premium</div>
              <div className="eyebrow rounded-sm bg-turmeric px-2 py-1 text-[10px] text-[#2a1d03]">
                {tx("Paling dipilih", "Most picked")}
              </div>
            </div>
            <div className="relative z-10 mt-5 flex items-baseline gap-2">
              <span className="font-display text-6xl font-bold tracking-tight">Rp9.900</span>
              <span className="text-[#f4efe4]/55">/{tx("bulan", "month")}</span>
            </div>
            <p className="relative z-10 mt-2 text-[#f4efe4]/65">
              {tx("Batalkan kapan saja.", "Cancel anytime.")}
            </p>
            <ul className="relative z-10 mt-8 flex-1 space-y-3 border-t border-white/12 pt-6">
              {premium.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-turmeric" strokeWidth={2.5} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <PrimaryButton
              tone="turmeric"
              href={user ? "/checkout?package=premium" : "/auth?tab=register"}
              className="relative z-10 mt-10 justify-center"
            >
              {tx("Ambil Premium", "Get Premium")}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  const { tx } = useTx();
  const { data: boards = [] } = useMarketBoards();
  const sample = boardsAreSimulated(boards);
  const items = [
    [
      tx("Apakah PasarCek benar-benar gratis?", "Is PasarCek really free?"),
      tx(
        "Ya. Papan harga, perbandingan pasar, dan Smart Basket dasar gratis selamanya. Premium hanya untuk yang butuh alarm tanpa batas dan prediksi harga.",
        "Yes. The price board, market comparison and basic Smart Basket are free forever. Premium is for unlimited alerts and price forecasts.",
      ),
    ],
    [
      tx("Dari mana data harganya?", "Where do the prices come from?"),
      sample
        ? tx(
            "Saat ini PasarCek masih versi beta dan harga yang tampil adalah data contoh (simulasi), ditandai jelas di setiap halaman harga. Kami sedang menyiapkan integrasi dengan sumber harga resmi pemerintah; setelah aktif, sumber dan tanggal pencatatan akan tercantum di setiap harga.",
            "PasarCek is in beta and the prices shown are sample (simulated) data, clearly marked on every price page. We're preparing an integration with an official government price source; once live, the source and recording date will be shown with every price.",
          )
        : tx(
            "Dari SP2KP (Sistem Pemantauan Pasar dan Kebutuhan Pokok) Kementerian Perdagangan: harga per pasar yang dicatat petugas setiap hari kerja. Setiap harga tampil bersama sumber dan tanggalnya. Pasar atau produk yang belum dipantau SP2KP masih memakai data contoh dan ditandai “contoh”.",
            "From SP2KP, the Ministry of Trade's market monitoring system: per-market prices recorded by officers every working day. Every price shows its source and date. Markets or items SP2KP doesn't cover yet still use sample data, marked “sample”.",
          ),
    ],
    [
      tx("Seberapa sering harga diperbarui?", "How often are prices updated?"),
      sample
        ? tx(
            "Mengikuti jadwal sumber resmi yang nanti kami gunakan — umumnya harian pada hari kerja. Setiap harga selalu ditampilkan bersama tanggal pencatatannya, jadi Anda tahu seberapa baru datanya.",
            "It will follow the schedule of the official source we connect — typically daily on working days. Every price always shows the date it was recorded, so you know how fresh it is.",
          )
        : tx(
            "Sekali sehari pada hari kerja, setelah petugas SP2KP menginput harga (sekitar siang hari). Sabtu, Minggu, dan hari libur tidak ada pembaruan — yang tampil adalah harga hari kerja terakhir, lengkap dengan tanggalnya.",
            "Once a day on working days, after SP2KP officers enter prices (around midday). There are no updates on weekends or holidays — you'll see the last working day's prices, with their date.",
          ),
    ],
    [
      tx("Kota mana saja yang sudah tersedia?", "Which cities are covered?"),
      tx(
        "Saat ini Jakarta dan sekitarnya, lalu kota-kota besar di Jawa dan Sumatra. Daftar pasar bertambah setiap bulan.",
        "Greater Jakarta today, then major cities in Java and Sumatra. The market list grows every month.",
      ),
    ],
    [
      tx("Bagaimana Smart Basket menghitung?", "How does Smart Basket calculate?"),
      tx(
        "Ia menjumlahkan harga terbaru setiap barang di daftar Anda, di setiap pasar terdekat, lalu mengurutkan totalnya dari yang paling hemat.",
        "It sums the latest price of every item on your list at each nearby market, then ranks the totals from lowest.",
      ),
    ],
    [
      tx("Bisa menyimpan pasar langganan?", "Can I save my usual markets?"),
      tx(
        "Bisa. Simpan pasar favorit untuk akses cepat dan notifikasi khusus dari pasar tersebut.",
        "Yes. Save favourite markets for quick access and alerts specific to them.",
      ),
    ],
  ];
  return (
    <section id="faq" className="border-t border-rule">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionLabel n="07">FAQ</SectionLabel>
          <h2
            data-reveal
            className="mt-6 text-[clamp(2.2rem,4.2vw,3.5rem)] font-bold leading-[1.02]"
          >
            {tx("Yang sering ditanyakan.", "Asked often.")}
          </h2>
        </div>
        <div className="border-t border-rule lg:col-span-8">
          {items.map(([q, a], i) => (
            <details key={q} data-reveal open={i === 0} className="group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium tracking-tight sm:text-xl [&::-webkit-details-marker]:hidden">
                {q}
                <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-rule transition-colors group-open:border-foreground group-open:bg-foreground group-open:text-background">
                  <Plus className="h-4 w-4 transition-transform duration-300 group-open:rotate-45" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pr-12 leading-relaxed text-foreground/65">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCTA() {
  const { user } = useAuth();
  const { tx } = useTx();
  const [busy, setBusy] = useState(false);

  const handleWaitlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      setBusy(true);
      const { error } = await supabase
        .from("profiles")
        .update({ waitlist_priority: true })
        .eq("id", user.id);
      setBusy(false);
      if (error) {
        toast.error("Gagal mendaftar antrean prioritas: " + error.message);
      } else {
        toast.success(
          "Terima kasih! Akun Anda telah dimasukkan ke daftar prioritas antrean PasarCek.",
        );
      }
    } else {
      localStorage.setItem("waitlist_priority_signup", "true");
      toast.success("Terima kasih! Menghubungkan ke pendaftaran akun untuk prioritas waitlist...");
      setTimeout(() => {
        window.location.href = "/auth?tab=register";
      }, 1500);
    }
  };

  return (
    <section id="cta" className="relative overflow-hidden border-t border-rule">
      <MarketField
        density={26}
        className="[mask-image:radial-gradient(ellipse_60%_80%_at_30%_100%,#000_20%,transparent_100%)]"
      />
      <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-16 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2 data-reveal className="display-xl max-w-3xl text-[clamp(2.8rem,6.4vw,5.6rem)]">
            {tx(
              "Besok pagi, belanja di pasar yang tepat.",
              "Tomorrow morning, shop at the right market.",
            )}
          </h2>
          <p data-reveal className="mt-7 max-w-lg text-lg leading-relaxed text-foreground/65">
            {tx(
              "Daftar butuh satu menit. Harga hari ini sudah menunggu.",
              "Sign-up takes a minute. Today's prices are already waiting.",
            )}
          </p>
          <div data-reveal className="mt-10 flex flex-wrap items-center gap-4">
            <PrimaryButton href={user ? "/dashboard" : "/auth?tab=register"}>
              {tx("Buat akun gratis", "Create a free account")}
            </PrimaryButton>
            <button
              type="button"
              onClick={handleWaitlist}
              disabled={busy}
              className="inline-flex h-12 items-center rounded-md border border-foreground/20 px-5 text-[0.95rem] font-medium transition-colors hover:border-foreground disabled:opacity-50"
            >
              {busy
                ? tx("Memproses…", "Working…")
                : tx("Gabung waitlist aplikasi", "Join the app waitlist")}
            </button>
          </div>
        </div>
        <div data-reveal className="relative lg:col-span-5">
          <Snapshot
            src={familyImg}
            alt={tx(
              "Keluarga tersenyum setelah belanja hemat di pasar",
              "A family smiling after a well-priced market run",
            )}
            label={tx("Sesudah: belanja dengan rencana", "After: shopping with a plan")}
            tilt={1.5}
            float
            className="mx-auto w-[88%] sm:w-[70%] lg:w-full"
            imgClassName="aspect-[4/5] object-[50%_30%]"
          />
          <div
            aria-hidden
            className="absolute -left-2 top-10 rotate-[-10deg] rounded-full border-2 border-leaf bg-background/85 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-leaf backdrop-blur-sm sm:left-4 lg:-left-10"
          >
            {tx("Hemat tiap minggu", "Saving every week")}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */

function LandingPage() {
  useReveal();
  return (
    <div id="top" className="grain min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <SmartBasket />
        <ForWhom />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
