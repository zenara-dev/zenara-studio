import {
  PencilRuler,
  Code,
  Plugs,
  RocketLaunch,
  ChartLineUp,
  Wrench,
} from "@phosphor-icons/react";

const ITEMS = [
  {
    id: 1,
    icon: PencilRuler,
    title: "Design & Art Direction",
    desc: "Brand-true interfaces with an editorial soul. Figma-first, component-driven.",
  },
  {
    id: 2,
    icon: Code,
    title: "Frontend Engineering",
    desc: "React, Next.js, TypeScript. Pixel-accurate, accessible, and fast by default.",
  },
  {
    id: 3,
    icon: Plugs,
    title: "API & Integrations",
    desc: "Stripe, CRMs, LLMs, webhooks. We bridge the product and the website.",
  },
  {
    id: 4,
    icon: RocketLaunch,
    title: "Launch Engineering",
    desc: "Vercel / Cloudflare deploys, analytics, monitoring, SEO — handed over, fully documented.",
  },
  {
    id: 5,
    icon: ChartLineUp,
    title: "Conversion Copy",
    desc: "Sharp narrative and typography pairing — every line earning its place.",
  },
  {
    id: 6,
    icon: Wrench,
    title: "Maintenance",
    desc: "Retainers for ongoing refinement, A/B tests, and feature iteration.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="border-b border-[var(--zn-border)] py-20 md:py-28"
    >
      <div className="px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow">I · Practice</div>
          </div>
          <h2 className="col-span-12 md:col-span-9 zn-display text-3xl md:text-5xl lg:text-6xl">
            A considered practice,{" "}
            <span className="zn-display-italic text-[var(--zn-muted)]">end to end</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--zn-border)]">
          {ITEMS.map((it) => {
            const Icon = it.icon;
            return (
              <article
                key={it.id}
                data-testid={`service-card-${it.id}`}
                className="group relative border-r border-b border-[var(--zn-border)] p-8 md:p-10 bg-white hover:bg-[var(--zn-ink)] hover:text-white transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] tracking-[0.24em] text-[var(--zn-muted)] group-hover:text-[var(--zn-accent)]">
                    0{it.id}
                  </span>
                  <Icon size={28} weight="light" />
                </div>
                <h3 className="mt-10 font-display text-xl md:text-2xl tracking-tight">
                  {it.title}
                </h3>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-[var(--zn-muted)] group-hover:text-white/70">
                  {it.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
