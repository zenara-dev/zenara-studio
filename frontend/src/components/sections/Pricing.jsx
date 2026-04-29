import { Check, ArrowUpRight } from "@phosphor-icons/react";

const TIERS = [
  {
    key: "vector",
    badge: "Tier 01",
    name: "Vector",
    price: "₹50,000",
    priceNote: "build fee",
    monthly: "₹2,499 / mo",
    monthlyNote: "maintenance",
    lead: "Full-scale coded infrastructure. You own every line.",
    features: [
      "Custom-coded responsive site (you own the code)",
      "Up to 5 pages + lightweight CMS",
      "On-page SEO + analytics setup",
      "Hosting, SSL & uptime monitoring",
      "Monthly: security patches, backups, content updates",
      "2 rounds of revisions during build",
    ],
    delivery: "~14 days",
    cta: "Engage Vector",
  },
  {
    key: "kinetic",
    badge: "Tier 02 / Most chosen",
    name: "Kinetic",
    price: "₹75,000",
    priceNote: "build fee",
    monthly: "₹5,000 / mo",
    monthlyNote: "maintenance",
    lead: "Advanced integrations. Booking, payments, systems — all yours.",
    features: [
      "Everything in Vector",
      "Bookings, payments & checkout",
      "Auth, dashboards & CRM connections",
      "Performance + conversion analytics",
      "Monthly: priority support & integration upkeep",
      "3 rounds of revisions during build",
    ],
    delivery: "~21 days",
    cta: "Engage Kinetic",
    featured: true,
  },
  {
    key: "apex",
    badge: "Tier 03",
    name: "Apex",
    price: "₹1,00,000",
    priceNote: "build fee",
    monthly: "₹8,000 / mo",
    monthlyNote: "maintenance",
    lead: "Complete digital dominance. Built for market leaders.",
    features: [
      "Everything in Kinetic",
      "Custom APIs & advanced architecture",
      "Database design & admin panels",
      "Full SEO, content strategy, A/B testing",
      "Monthly: dedicated engineer, weekly improvements",
      "Unlimited revisions during sprint",
    ],
    delivery: "4–6 weeks",
    cta: "Engage Apex",
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="border-b border-[var(--zn-border)] py-20 md:py-28 bg-[var(--zn-bg)]"
    >
      <div className="px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow">II · Offering</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="zn-display text-3xl md:text-5xl lg:text-6xl">
              Three engagements.{" "}
              <span className="zn-display-italic text-[var(--zn-muted)]">
                No retainers to begin.
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-[var(--zn-ink)]">
              We build code you own.{" "}
              <span className="zn-display-italic">No monthly ransom</span> —
              just elite-tier maintenance.
            </p>
          </div>
        </div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--zn-ink)]">
          {TIERS.map((t, idx) => (
            <article
              key={t.key}
              data-testid={`pricing-card-${t.key}`}
              className={`zn-pricing-card relative p-8 md:p-10 ${
                t.featured ? "" : "bg-white"
              } ${
                idx !== TIERS.length - 1 ? "md:border-r" : ""
              } ${idx !== 0 ? "border-t md:border-t-0" : ""} border-[var(--zn-ink)] ${
                t.featured ? "zn-pricing-card--featured" : ""
              }`}
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-[11px] tracking-[0.22em] uppercase ${
                    t.featured ? "text-[var(--zn-silver)]" : "text-[var(--zn-muted)]"
                  }`}
                >
                  {t.badge}
                </span>
                <span
                  className={`font-mono text-[11px] tracking-[0.2em] uppercase ${
                    t.featured ? "text-white/70" : "text-[var(--zn-muted)]"
                  }`}
                >
                  {t.delivery}
                </span>
              </div>

              {/* Name */}
              <h3 className="mt-8 zn-display text-3xl md:text-4xl">
                {t.name}
              </h3>

              {/* Build fee */}
              <div className="mt-6 flex items-baseline gap-3">
                <span
                  data-testid={`pricing-price-${t.key}`}
                  className="zn-display text-4xl md:text-5xl"
                >
                  {t.price}
                </span>
                <span
                  className={`font-mono text-[11px] tracking-[0.2em] uppercase ${
                    t.featured ? "text-white/70" : "text-[var(--zn-muted)]"
                  }`}
                >
                  {t.priceNote}
                </span>
              </div>

              {/* Monthly */}
              <div className="mt-3 flex items-baseline gap-3">
                <span
                  data-testid={`pricing-monthly-${t.key}`}
                  className={`zn-display text-xl md:text-2xl ${
                    t.featured ? "text-white" : "text-[var(--zn-ink)]"
                  }`}
                >
                  + {t.monthly}
                </span>
                <span
                  className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
                    t.featured ? "text-white/60" : "text-[var(--zn-muted)]"
                  }`}
                >
                  {t.monthlyNote}
                </span>
              </div>

              {/* Lead */}
              <p
                className={`mt-6 text-sm md:text-base leading-relaxed zn-display-italic ${
                  t.featured ? "text-white/90" : "text-[var(--zn-ink)]"
                }`}
              >
                "{t.lead}"
              </p>

              {/* Divider */}
              <div
                className={`my-8 h-px ${
                  t.featured ? "bg-white/20" : "bg-[var(--zn-border)]"
                }`}
              />

              {/* Features */}
              <ul className="space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm md:text-[15px]">
                    <Check
                      size={16}
                      weight="bold"
                      className={t.featured ? "text-[var(--zn-silver)] mt-1" : "text-[var(--zn-ink)] mt-1"}
                    />
                    <span className={t.featured ? "text-white/90" : ""}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`#contact?tier=${t.key}`}
                data-testid={`pricing-cta-${t.key}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("zn:select-tier", { detail: t.name }));
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`mt-10 inline-flex items-center justify-between w-full px-5 py-4 border font-mono text-[12px] tracking-[0.18em] uppercase transition-colors ${
                  t.featured
                    ? "border-white text-white hover:bg-white hover:text-[var(--zn-ink)]"
                    : "border-[var(--zn-ink)] text-[var(--zn-ink)] hover:bg-[var(--zn-ink)] hover:text-white"
                }`}
              >
                <span>{t.cta}</span>
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 eyebrow">
          * International clients welcome. Pricing available in USD, GBP & AED on request.
        </p>
      </div>
    </section>
  );
}
