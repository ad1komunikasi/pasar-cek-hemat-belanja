import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Ping = { x: number; y: number; born: number; label: string; down: boolean };

const LABELS_DOWN = ["−Rp500", "−Rp1.200", "−Rp2.000", "−Rp800", "−Rp3.500", "−Rp1.500"];
const LABELS_UP = ["+Rp300", "+Rp700", "+Rp1.000"];

function readColors(tone: "ink" | "light") {
  const cs = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback;
  if (tone === "light") {
    return {
      dot: "#f4efe4",
      down: "#6fd6d3",
      up: "#ff8a70",
      mono: v("--font-mono", "monospace"),
      dark: true,
    };
  }
  return {
    dot: v("--tarp-ink", "#0f1d47"),
    down: v("--leaf", "#127a79"),
    up: v("--chili", "#d0412a"),
    mono: v("--font-mono", "monospace"),
    dark: document.documentElement.classList.contains("dark"),
  };
}

/**
 * Halftone "market field": a grid of dots that swell in slow waves like a crowd moving
 * between stalls, reacts to the cursor, and occasionally lets a stall "ping" a price change.
 */
export function MarketField({
  className,
  density = 22,
  tone = "ink",
}: {
  className?: string;
  density?: number;
  /** "ink" follows the theme; "light" is for dark, fixed-colour sections. */
  tone?: "ink" | "light";
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors = readColors(tone);
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let visible = true;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const pings: Ping[] = [];
    let nextPing = 0;
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Only ping in empty space — never on top of copy, buttons or cards.
    const isClear = (x: number, y: number) => {
      const rect = canvas.getBoundingClientRect();
      const px = rect.left + x;
      const py = rect.top + y;
      if (px < 0 || py < 0 || px > window.innerWidth || py > window.innerHeight) return false;
      for (const [ox, oy] of [[0, 0], [0, -26], [-30, -26], [30, -26]]) {
        const el = document.elementFromPoint(px + ox, py + oy);
        if (el?.closest("h1,h2,h3,p,a,button,li,dl,figure,img,[data-field-avoid]")) return false;
      }
      return true;
    };

    const spawnPing = (now: number) => {
      const cols = Math.floor(w / density);
      const rows = Math.floor(h / density);
      if (cols < 2 || rows < 2) return;
      let x = 0;
      let y = 0;
      let found = false;
      for (let attempt = 0; attempt < 8 && !found; attempt++) {
        x = (1 + Math.floor(Math.random() * (cols - 1))) * density - density / 2;
        y = (1 + Math.floor(Math.random() * (rows - 1))) * density - density / 2;
        found = isClear(x, y);
      }
      if (!found) return;
      const down = Math.random() < 0.72;
      const pool = down ? LABELS_DOWN : LABELS_UP;
      pings.push({
        x,
        y,
        born: now,
        label: pool[Math.floor(Math.random() * pool.length)],
        down,
      });
      if (pings.length > 6) pings.shift();
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      const baseAlpha = colors.dark ? 0.2 : 0.16;
      ctx.fillStyle = colors.dot;
      for (let y = density / 2; y < h; y += density) {
        for (let x = density / 2; x < w; x += density) {
          // Two slow travelling waves + a diagonal swell — reads as "movement", never as noise.
          const wave =
            Math.sin(x * 0.011 + t * 0.55) * Math.cos(y * 0.014 - t * 0.4) +
            0.6 * Math.sin((x + y) * 0.006 - t * 0.3);
          let r = 0.7 + Math.max(0, wave) * 1.5;

          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140) r += (1 - Math.sqrt(d2) / 140) * 2.4;

          ctx.globalAlpha = baseAlpha + Math.max(0, wave) * 0.22;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduced && now > nextPing) {
        spawnPing(now);
        nextPing = now + 900 + Math.random() * 1400;
      }

      ctx.font = `500 11px ${colors.mono}`;
      ctx.textAlign = "center";
      for (let i = pings.length - 1; i >= 0; i--) {
        const p = pings[i];
        const age = (now - p.born) / 1000;
        if (age > 3.2) {
          pings.splice(i, 1);
          continue;
        }
        const c = p.down ? colors.down : colors.up;
        const k = Math.min(1, age / 1.6);
        // ring
        ctx.globalAlpha = (1 - k) * 0.55;
        ctx.strokeStyle = c;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 + k * 34, 0, Math.PI * 2);
        ctx.stroke();
        // stall dot
        ctx.globalAlpha = Math.max(0, 1 - age / 3.2);
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        // floating label
        const fade = age < 0.3 ? age / 0.3 : Math.max(0, 1 - (age - 1.8) / 1.4);
        ctx.globalAlpha = fade * 0.9;
        ctx.fillText(p.label, p.x, p.y - 12 - age * 9);
        ctx.fillStyle = colors.dot;
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };
    const onVisibility = () => (document.hidden ? pause() : play());

    resize();
    draw(performance.now());
    play();

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    io.observe(canvas);

    const mo = new MutationObserver(() => {
      colors = readColors(tone);
      if (!running) draw(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, tone]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
