import { ArrowUpRight } from "@phosphor-icons/react";

const PIECES = [
  {
    key: "xyz-marketing-co",
    title: "XYZ Marketing Co.",
    subtitle: "Concept Work",
    description:
      "Dark editorial agency infrastructure. Performance marketing positioning.",
    tags: ["Concept", "Editorial", "Marketing"],
    href: "https://xyz-marketing-agency.vercel.app",
    year: "2026",
  },
];

export default function Portfolio() {
  return (
    <section
      id="work"
      data-testid="portfolio-section"
      className="border-b border-[var(--zn-border)] py-20 md:py-28 bg-white"
    >
      <div className="px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow">III · Selected Work</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="zn-display text-3xl md:text-5xl lg:text-6xl">
              Built to ship.{" "}
              <span className="zn-display-italic text-[var(--zn-muted)]">
                Built to last.
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--zn-muted)]">
              A tightly curated showcase of studios, concepts and commissions —
              each built the way we build everything: fast, editorial, fully handed
              over.
            </p>
          </div>
        </div>

        {/* Pieces */}
        <div className="space-y-10 md:space-y-14">
          {PIECES.map((p) => (
            <a
              key={p.key}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`portfolio-item-${p.key}`}
              className="group grid grid-cols-12 gap-6 md:gap-10 items-start border border-[var(--zn-ink)] bg-[var(--zn-bg)] p-6 md:p-10 hover:bg-[var(--zn-ink)] hover:text-white transition-colors duration-300"
            >
              {/* Meta column */}
              <div className="col-span-12 md:col-span-3 flex md:flex-col md:h-full gap-4 justify-between">
                <div>
                  <div className="font-mono text-[11px] tracking-[0.24em] uppercase opacity-70">
                    {p.subtitle}
                  </div>
                  <div className="mt-3 font-mono text-[11px] tracking-[0.22em] uppercase opacity-70">
                    {p.year}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 md:mt-auto">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] tracking-[0.18em] uppercase px-2 py-1 border border-current opacity-80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title & description */}
              <div className="col-span-12 md:col-span-7">
                <h3
                  data-testid={`portfolio-title-${p.key}`}
                  className="zn-display text-3xl md:text-5xl lg:text-6xl"
                >
                  {p.title}
                </h3>
                <p className="mt-5 zn-display-italic text-lg md:text-xl leading-snug max-w-2xl opacity-90">
                  "{p.description}"
                </p>
                <div className="mt-6 font-mono text-[11px] tracking-[0.22em] uppercase opacity-70 break-all">
                  {p.href.replace(/^https?:\/\//, "")}
                </div>
              </div>

              {/* Arrow */}
              <div className="col-span-12 md:col-span-2 flex md:justify-end">
                <div className="inline-flex items-center justify-center w-14 h-14 border border-current transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight size={22} weight="light" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-8 eyebrow">
          * More case studies on request. Concept work shown at client's
          invitation.
        </p>
      </div>
    </section>
  );
}
