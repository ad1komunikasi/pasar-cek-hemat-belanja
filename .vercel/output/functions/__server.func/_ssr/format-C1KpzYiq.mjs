const idr = (n) => n == null ? "—" : new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
const fmtDateTime = (d) => {
  if (!d) return "—";
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
  deltaPct as d,
  fmtDateTime as f,
  idr as i
};
