import { Check, ArrowUpRight } from "@phosphor-icons/react";

const BUNDLES = [
  {
    key: "starter-identity",
    badge: "01 / Starter Identity Pack",
    name: "Starter Identity",
    price: "₹8,000",
    priceNote: "one-time",
    lead: "The essentials to show up professionally online — logo, a pair of flyers and a digital card.",
    features: [
      "1 Custom Professional Logo",
      "2 Digital Marketing Flyers",
      "1 Digital Business Card",
      "1 Revision included",
    ],
    delivery: "~5 days",
    cta: "Book Starter Pack",
  },
  {
    key: "professional-brand",
    badge: "02 / Professional Brand Pack",
    name: "Professional Brand",
    price: "₹12,000",
    priceNote: "one-time",
    lead: "A rounded brand kit for founders ready to look sharp across web, GMB and social.",
    features: [
      "1 Custom Professional Logo",
      "1 Social Media Banner (GMB / LinkedIn)",
      "2 Digital Marketing Flyers",
      "1 Digital Business Card",
      "2 Revisions included",
    ],
    delivery: "~7 days",
    cta: "Book Brand Pack",
    featured: true,
  },
  {
    key: "established-clinic",
    badge: "03 / Established Clinic Bundle",
    name: "Established Clinic",
    price: "₹18,000",
    priceNote: "one-time",
    lead: "A premium set for established practices — including a signature animated logo in 4K.",
    features: [
      "1 Custom Professional Logo",
      "1 Signature Animated Logo (4K)",
      "1 Social Media Banner",
      "2 Digital Marketing Flyers",
      "1 Digital Business Card",
      "Priority Support & 3 Revisions",
    ],
    delivery: "~10 days",
    cta: "Book Clinic Bundle",
  },
];

export default function IdentityAssets() {
  const go = (name) => (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("zn:select-tier", { detail: name }));
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="identity"
      data-testid="identity-section"
      className="border-b border-[var(--zn-border)] py-20 md:py-28 bg-white"
    >
      <div className="px-6 md:px-12 lg:px-16">
        {/* Heading */}
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow">III · Identity</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2
              data-testid="identity-heading"
              className="zn-display text-3xl md:text-5xl lg:text-6xl"
            >
              Creative{" "}
              <span className="zn-display-italic text-[var(--zn-muted)]">&</span>{" "}
              identity assets.
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--zn-muted)]">
              Standalone graphic bundles — marks, flyers, banners and animated
              signatures. Commissioned alongside an engagement, or on their own.
            </p>
          </div>
        </div>

        {/* Bundle grid — same border-collapse aesthetic as Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--zn-ink)]">
          {BUNDLES.map((b, idx) => (
            <article
              key={b.key}
              data-testid={`identity-card-${b.key}`}
              className={`zn-pricing-card relative p-8 md:p-10 flex flex-col ${
                b.featured ? "" : "bg-white"
              } ${
                idx !== BUNDLES.length - 1 ? "md:border-r" : ""
              } ${idx !== 0 ? "border-t md:border-t-0" : ""} border-[var(--zn-ink)] ${
                b.featured ? "zn-pricing-card--featured" : ""
              }`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`font-mono text-[11px] tracking-[0.22em] uppercase ${
                    b.featured ? "text-[var(--zn-accent)]" : "text-[var(--zn-muted)]"
                  }`}
                >
                  {b.badge}
                </span>
                <span
                  className={`font-mono text-[11px] tracking-[0.2em] uppercase whitespace-nowrap ${
                    b.featured ? "text-white/70" : "text-[var(--zn-muted)]"
                  }`}
                >
                  {b.delivery}
                </span>
              </div>

              {/* Name */}
              <h3 className="mt-8 zn-display text-3xl md:text-4xl">
                {b.name}
              </h3>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-3">
                <span
                  data-testid={`identity-price-${b.key}`}
                  className="zn-display text-4xl md:text-5xl"
                >
                  {b.price}
                </span>
                <span
                  className={`font-mono text-[11px] tracking-[0.2em] uppercase ${
                    b.featured ? "text-white/70" : "text-[var(--zn-muted)]"
                  }`}
                >
                  {b.priceNote}
                </span>
              </div>

              {/* Lead */}
              <p
                className={`mt-5 text-sm md:text-base leading-relaxed ${
                  b.featured ? "text-white/80" : "text-[var(--zn-ink)]"
                }`}
              >
                {b.lead}
              </p>

              {/* Divider */}
              <div
                className={`my-8 h-px ${
                  b.featured ? "bg-white/20" : "bg-[var(--zn-border)]"
                }`}
              />

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {b.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm md:text-[15px]"
                  >
                    <Check
                      size={16}
                      weight="bold"
                      className={
                        b.featured
                          ? "text-[var(--zn-accent)] mt-1"
                          : "text-[var(--zn-ink)] mt-1"
                      }
                    />
                    <span className={b.featured ? "text-white/90" : ""}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                onClick={go(b.name)}
                data-testid={`identity-cta-${b.key}`}
                className={`mt-10 inline-flex items-center justify-between w-full px-5 py-4 border font-mono text-[12px] tracking-[0.18em] uppercase transition-colors ${
                  b.featured
                    ? "border-white text-white hover:bg-[var(--zn-accent)] hover:border-[var(--zn-accent)]"
                    : "border-[var(--zn-ink)] text-[var(--zn-ink)] hover:bg-[var(--zn-ink)] hover:text-white"
                }`}
              >
                <span>{b.cta}</span>
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 eyebrow">
          * Source files delivered in Figma, PDF, PNG & SVG. GST excluded.
        </p>
      </div>
    </section>
  );
}
