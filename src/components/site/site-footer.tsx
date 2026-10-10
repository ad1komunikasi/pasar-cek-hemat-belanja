import { toast } from "sonner";
import { useSettings } from "@/hooks/use-settings-context";
import { LogoMark } from "./logo";

export function SiteFooter() {
  const { lang } = useSettings();
  const id = lang === "id";
  const soon = (name: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info(
      id
        ? `Halaman ${name} sedang disiapkan. Sementara itu, hubungi kami lewat email.`
        : `The ${name} page is on its way. Meanwhile, reach us by email.`,
    );
  };

  const cols = [
    {
      title: id ? "Produk" : "Product",
      links: [
        { label: id ? "Harga hari ini" : "Today's prices", href: "/#harga-hari-ini" },
        { label: id ? "Fitur" : "Features", href: "/features" },
        { label: "Smart Basket", href: "/#smart-basket" },
        { label: id ? "Paket" : "Plans", href: "/pricing" },
      ],
    },
    {
      title: id ? "Perusahaan" : "Company",
      links: [
        { label: id ? "Tentang kami" : "About", href: "/trust" },
        { label: id ? "Kontak" : "Contact", href: "#", onClick: soon(id ? "Kontak" : "Contact") },
        { label: "Blog", href: "#", onClick: soon("Blog") },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: id ? "Privasi" : "Privacy", href: "/trust" },
        { label: id ? "Ketentuan" : "Terms", href: "/trust" },
      ],
    },
  ];

  return (
    <footer className="grain relative overflow-hidden bg-[#0a2e22] text-[#f4efe4]">
      <div className="relative z-10 mx-auto max-w-[1240px] px-5 pt-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <LogoMark className="h-10 w-10 [&_rect]:fill-[#f4efe4] [&_path]:fill-[#0a2e22]" />
            <p className="mt-5 text-[0.95rem] leading-relaxed text-[#f4efe4]/65">
              {id
                ? "Harga sembako dari pasar-pasar di sekitar Anda, dibandingkan setiap hari. Dibuat di Jakarta untuk dapur di seluruh Indonesia."
                : "Staple prices from the markets around you, compared every day. Made in Jakarta for kitchens across Indonesia."}
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="eyebrow text-[#f4efe4]/45">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={l.onClick}
                      className="text-[0.95rem] text-[#f4efe4]/80 transition-colors hover:text-turmeric"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          aria-hidden
          className="mt-20 select-none font-display font-bold leading-[0.78] tracking-[-0.06em] text-[#f4efe4]/[0.07] [font-size:clamp(5rem,21vw,19rem)]"
        >
          pasarcek
        </div>
      </div>
      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-6 font-mono text-[11px] tracking-wide text-[#f4efe4]/45 sm:flex-row sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} PasarCek</span>
          <span>{id ? "Harga dicatat harian · Jakarta & sekitarnya" : "Prices logged daily · Greater Jakarta"}</span>
        </div>
      </div>
    </footer>
  );
}
