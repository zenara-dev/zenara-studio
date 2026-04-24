import { Check, ArrowUpRight } from "@phosphor-icons/react";

const TIERS = [
  {
    key: "one-page",
    badge: "Tier 01",
    name: "One Page",
    price: "₹15,000",
    priceNote: "starting",
    lead: "A single, razor-sharp scrollable page. Perfect for launches, events and founder profiles.",
    features: [
      "Custom design (Figma)",
      "Responsive, mobile-first build",
      "Contact form + email notifications",
      "Basic on-page SEO",
      "Vercel / Cloudflare deploy",
      "1 round of revisions",
    ],
    delivery: "~7 days",
    cta: "Book One Page",
  },
  {
    key: "multi-page",
    badge: "Tier 02 / Most popular",
    name: "Multi Page",
    price: "₹30,000",
    priceNote: "starting",
    lead: "Up to 5 pages with a lightweight CMS. Ideal for brands, studios and startups post-seed.",
    features: [
      "Everything in One Page",
      "Up to 5 pages + blog/case studies",
      "CMS integration (Sanity / Contentful)",
      "Advanced SEO + schema",
      "Analytics + Plausible/GA4",
      "2 rounds of revisions",
    ],
    delivery: "~14 days",
    cta: "Book Multi Page",
    featured: true,
  },
  {
    key: "special-apis",
    badge: "Tier 03",
    name: "Special APIs",
    price: "₹40,000+",
    priceNote: "quote-based",
    lead: "API-heavy product surfaces. Auth, dashboards, payments, LLMs and everything custom.",
    features: [
      "Everything in Multi Page",
      "Auth (JWT / OAuth / Clerk)",
      "Database architecture (Postgres / Mongo)",
      "Stripe / Razorpay checkout",
      "LLM, webhooks & custom APIs",
      "Unlimited revisions during sprint",
    ],
    delivery: "3–6 weeks",
    cta: "Request Quote",
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
            <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--zn-muted)]">
              Flat project fees. Fixed scope. A deliberate, unhurried process —
              rooted in clarity, finished with care. All figures exclude GST.
            </p>
          </div>
        </div>

        {/* Pricing grid — border-collapse style */}
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
                    t.featured ? "text-[var(--zn-accent)]" : "text-[var(--zn-muted)]"
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

              {/* Price */}
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

              {/* Lead */}
              <p
                className={`mt-5 text-sm md:text-base leading-relaxed ${
                  t.featured ? "text-white/80" : "text-[var(--zn-ink)]"
                }`}
              >
                {t.lead}
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
                      className={t.featured ? "text-[var(--zn-accent)] mt-1" : "text-[var(--zn-ink)] mt-1"}
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
                    ? "border-white text-white hover:bg-[var(--zn-accent)] hover:border-[var(--zn-accent)]"
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
          * All engagements begin with a free 30-min scoping call.
        </p>
      </div>
    </section>
  );
}
