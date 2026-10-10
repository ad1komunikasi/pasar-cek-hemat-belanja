import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { PublicPage, PageIntro } from "./public-page";
import { LEGAL } from "@/lib/legal";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Long-form legal page: intro, sticky table of contents, numbered articles. */
export function LegalDocument({
  eyebrow,
  title,
  lede,
  sections,
  related,
}: {
  eyebrow: string;
  title: string;
  lede: ReactNode;
  sections: LegalSection[];
  related: { to: "/privasi" | "/ketentuan" | "/trust"; label: string }[];
}) {
  return (
    <PublicPage>
      <PageIntro eyebrow={eyebrow} title={title} lede={lede}>
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-3 font-mono text-xs text-foreground/55">
          <div>
            <dt className="inline text-foreground/40">Berlaku sejak </dt>
            <dd className="inline text-foreground/75">{LEGAL.effectiveDate}</dd>
          </div>
          <div>
            <dt className="inline text-foreground/40">Versi </dt>
            <dd className="inline text-foreground/75">{LEGAL.version}</dd>
          </div>
        </dl>
      </PageIntro>

      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-12 lg:gap-10">
        <aside className="print:hidden lg:col-span-3">
          <nav className="lg:sticky lg:top-36" aria-label="Daftar isi">
            <div className="eyebrow text-foreground/45">Daftar isi</div>
            <ol className="mt-4 space-y-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex gap-3 text-[0.92rem] leading-snug text-foreground/65 transition-colors hover:text-foreground"
                  >
                    <span className="w-5 shrink-0 font-mono text-xs leading-6 text-foreground/35 group-hover:text-chili">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-0.5">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-8 border-t border-rule pt-5">
              <div className="eyebrow text-foreground/45">Dokumen terkait</div>
              <ul className="mt-3 space-y-2">
                {related.map((r) => (
                  <li key={r.to}>
                    <Link
                      to={r.to}
                      className="text-[0.92rem] text-tarp underline decoration-tarp/30 underline-offset-4 hover:decoration-tarp"
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>

        <article className="lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-36 border-b border-rule py-9 first:pt-0">
              <h2 className="flex items-baseline gap-4 text-2xl font-semibold tracking-tight sm:text-[1.6rem]">
                <span className="font-mono text-sm font-normal text-chili">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </h2>
              <div className="legal-prose mt-5 sm:pl-10">{s.body}</div>
            </section>
          ))}
          <p className="mt-10 font-mono text-xs leading-relaxed text-foreground/45">
            Dokumen ini dibuat dalam Bahasa Indonesia. Apabila terdapat terjemahan ke bahasa lain, versi
            Bahasa Indonesia yang berlaku.
          </p>
        </article>
      </div>
    </PublicPage>
  );
}
