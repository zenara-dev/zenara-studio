import { Quotes } from "@phosphor-icons/react";

const ITEMS = [
  {
    q: "Shipped our marketing site in ten days flat. The team's eye for typography is unreal — we look like a company 5× our size.",
    name: "Priya Menon",
    role: "Founder, Plot Studio",
  },
  {
    q: "They went deep on our Stripe and Clerk integration and still handed over the cleanest React repo we've seen. Worth every rupee.",
    name: "Rohan Shah",
    role: "CTO, Atlas API",
  },
  {
    q: "Clear scope, fixed price, zero scope creep. Very rare in this industry — we're already planning phase two with them.",
    name: "Ananya Kapoor",
    role: "Head of Brand, North & Co.",
  },
];

export default function Testimonials() {
  return (
    <section
      data-testid="testimonials-section"
      className="border-b border-[var(--zd-border)] py-20 md:py-28 bg-[var(--zd-bg)]"
    >
      <div className="px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow">05 / Testimonials</div>
          </div>
          <h2 className="col-span-12 md:col-span-9 font-display text-3xl md:text-5xl lg:text-6xl tracking-tighter">
            Words from{" "}
            <span className="text-[var(--zd-muted)]">the founders</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[var(--zd-border)]">
          {ITEMS.map((t, i) => (
            <figure
              key={i}
              data-testid={`testimonial-${i}`}
              className="border-r border-b border-[var(--zd-border)] p-8 md:p-10 bg-white"
            >
              <Quotes size={24} weight="fill" className="text-[var(--zd-accent)]" />
              <blockquote className="mt-6 text-base md:text-lg leading-relaxed">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-[var(--zd-ink)] text-white flex items-center justify-center font-display">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="eyebrow">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
