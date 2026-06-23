import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// dist/server/assets/format-C1KpzYiq.js
var idr = (n) => n == null ? "\u2014" : new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
var fmtDateTime = (d) => {
  if (!d) return "\u2014";
  const dt = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(dt);
};
function deltaPct(now, prev) {
  if (!prev || prev === 0) return null;
  return (now - prev) / prev * 100;
}

export {
  idr,
  fmtDateTime,
  deltaPct
};
