import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 border-b border-[var(--zd-border)] zd-grain"
    >
      <div className="px-6 md:px-12 lg:px-16">
        {/* Top meta row */}
        <div className="grid grid-cols-12 gap-6 mb-10 md:mb-16">
          <div className="col-span-6 md:col-span-3 zd-animate-in">
            <div className="eyebrow">Est. 2019 / Bangalore</div>
          </div>
          <div className="col-span-6 md:col-span-3 md:col-start-10 md:text-right zd-animate-in zd-delay-1">
            <div className="eyebrow">Digital Studio № 014</div>
          </div>
        </div>

        {/* Massive headline */}
        <div className="grid grid-cols-12 gap-6 items-end">
          <h1
            data-testid="hero-heading"
            className="col-span-12 md:col-span-11 font-display text-[42px] leading-[0.95] sm:text-6xl md:text-[104px] lg:text-[132px] tracking-[-0.04em] uppercase zd-animate-in"
          >
            Websites that
            <br />
            <span className="inline-block">do the&nbsp;</span>
            <span className="inline-block relative">
              <span className="relative z-10">heavy</span>
              <span className="absolute left-0 right-0 bottom-[0.12em] h-[0.28em] bg-[var(--zd-accent)] -z-0" />
            </span>
            <br />
            lifting.
          </h1>
        </div>

        {/* Sub + CTAs row */}
        <div className="grid grid-cols-12 gap-6 mt-12 md:mt-16">
          <div className="col-span-12 md:col-span-6 lg:col-span-5 zd-animate-in zd-delay-2">
            <p className="text-base md:text-lg leading-relaxed text-[var(--zd-ink)]">
              Z-Digital Solutions is a boutique studio crafting fast, editorial-grade
              websites for founders, funded startups and ambitious brands — from a
              sharp one-pager to API-heavy product surfaces.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#pricing" data-testid="hero-cta-pricing" className="zd-btn">
                See Pricing <ArrowUpRight size={14} weight="bold" />
              </a>
              <a href="#contact" data-testid="hero-cta-contact" className="zd-btn zd-btn--ghost">
                Start a project
              </a>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8 zd-animate-in zd-delay-3">
            <div className="border-t border-[var(--zd-border)]">
              <div className="grid grid-cols-3 divide-x divide-[var(--zd-border)]">
                <Stat k="Flat" v="Project pricing" />
                <Stat k="Fixed" v="Scoped timeline" />
                <Stat k="In-house" v="Design & build" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 md:mt-20 flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] uppercase text-[var(--zd-muted)]">
          <ArrowDown size={14} weight="bold" />
          <span>Scroll — see our pricing</span>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }) {
  return (
    <div className="py-6 px-4 first:pl-0">
      <div className="font-display text-2xl md:text-4xl tracking-tight">{k}</div>
      <div className="mt-2 eyebrow">{v}</div>
    </div>
  );
}
