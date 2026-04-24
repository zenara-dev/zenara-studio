import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-28 md:pt-36 pb-20 md:pb-28 border-b border-[var(--zn-border)]"
    >
      <div className="px-6 md:px-12 lg:px-16">
        {/* Top meta row */}
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-20">
          <div className="col-span-6 md:col-span-4 zn-animate-in">
            <div className="eyebrow">Est. MMXIX · Bangalore</div>
          </div>
          <div className="col-span-6 md:col-span-4 md:col-start-9 md:text-right zn-animate-in zn-delay-1">
            <div className="eyebrow">Atelier № 014</div>
          </div>
        </div>

        {/* Massive serif headline */}
        <div className="grid grid-cols-12 gap-6 items-end">
          <h1
            data-testid="hero-heading"
            className="col-span-12 md:col-span-11 zn-display text-[44px] sm:text-7xl md:text-[108px] lg:text-[144px] zn-animate-in"
          >
            Boutique
            <br />
            digital <span className="zn-display-italic">infrastructure</span>
            <br />
            for premium
            <br />
            <span className="zn-display-italic">client experiences.</span>
          </h1>
        </div>

        {/* Sub + CTAs row */}
        <div className="grid grid-cols-12 gap-6 mt-14 md:mt-20">
          <div className="col-span-12 md:col-span-6 lg:col-span-5 zn-animate-in zn-delay-2">
            <p className="text-base md:text-[17px] leading-[1.7] text-[var(--zn-ink)] max-w-xl">
              Zenara Studios is a small atelier of designers and engineers building
              considered websites, quietly powerful product surfaces and refined
              brand identity for founders who treat their first impression as an
              investment, not an expense.
            </p>
            <div className="flex flex-wrap gap-3 mt-10">
              <a href="#pricing" data-testid="hero-cta-pricing" className="zn-btn">
                View offering <ArrowUpRight size={14} weight="bold" />
              </a>
              <a
                href="#contact"
                data-testid="hero-cta-contact"
                className="zn-btn zn-btn--ghost"
              >
                Begin an inquiry
              </a>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8 zn-animate-in zn-delay-3">
            <div className="border-t border-[var(--zn-border)]">
              <div className="grid grid-cols-3 divide-x divide-[var(--zn-border)]">
                <Stat k="Flat" v="Project pricing" />
                <Stat k="Fixed" v="Scoped timeline" />
                <Stat k="In-house" v="Design & build" />
              </div>
            </div>

            <div className="mt-8">
              <div className="hair" />
              <p className="mt-6 text-xs leading-relaxed text-[var(--zn-muted)] font-mono tracking-[0.18em] uppercase">
                Select engagements · By invitation & referral
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 md:mt-24 flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--zn-muted)]">
          <ArrowDown size={14} weight="light" />
          <span>Scroll — see the offering</span>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }) {
  return (
    <div className="py-6 px-4 first:pl-0">
      <div className="zn-display text-2xl md:text-4xl">{k}</div>
      <div className="mt-3 eyebrow">{v}</div>
    </div>
  );
}
