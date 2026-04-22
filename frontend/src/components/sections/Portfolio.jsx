import { ArrowUpRight } from "@phosphor-icons/react";

const ITEMS = [
  {
    id: "meridian",
    title: "Meridian",
    client: "FinTech SaaS",
    tag: "Multi Page",
    year: "2025",
    img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1400&q=80",
    className: "md:col-span-7 md:row-span-2",
  },
  {
    id: "plot",
    title: "Plot Studio",
    client: "Architecture Firm",
    tag: "One Page",
    year: "2024",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80",
    className: "md:col-span-5",
  },
  {
    id: "atlas",
    title: "Atlas API",
    client: "Dev Tooling",
    tag: "Special APIs",
    year: "2025",
    img: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1200&q=80",
    className: "md:col-span-5",
  },
  {
    id: "north",
    title: "North & Co.",
    client: "Brand Studio",
    tag: "Multi Page",
    year: "2024",
    img: "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=1400&q=80",
    className: "md:col-span-6",
  },
  {
    id: "quill",
    title: "Quill",
    client: "AI Writing App",
    tag: "Special APIs",
    year: "2025",
    img: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1400&q=80",
    className: "md:col-span-6",
  },
];

export default function Portfolio() {
  return (
    <section
      id="work"
      data-testid="portfolio-section"
      className="border-b border-[var(--zd-border)] py-20 md:py-28"
    >
      <div className="px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow">03 / Selected Work</div>
          </div>
          <div className="col-span-12 md:col-span-9 flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl tracking-tighter">
              Built to ship.{" "}
              <span className="text-[var(--zd-muted)]">Built to last.</span>
            </h2>
            <a href="#contact" className="zd-link font-mono text-[11px] tracking-[0.24em] uppercase">
              Full archive →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[260px] gap-6">
          {ITEMS.map((it) => (
            <a
              key={it.id}
              href="#contact"
              data-testid={`portfolio-item-${it.id}`}
              className={`zd-portfolio-item group relative overflow-hidden border border-[var(--zd-ink)] bg-white block ${it.className}`}
            >
              <img
                src={it.img}
                alt={it.title}
                className="zd-portfolio-img absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
              <div className="relative h-full p-6 md:p-8 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] tracking-[0.24em] uppercase bg-white text-[var(--zd-ink)] px-2 py-1">
                    {it.tag}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase">
                    {it.year}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-80">
                      {it.client}
                    </div>
                    <h3 className="font-display text-2xl md:text-4xl tracking-tighter mt-1">
                      {it.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 bg-white text-[var(--zd-ink)] flex items-center justify-center transition-colors group-hover:bg-[var(--zd-accent)] group-hover:text-white">
                    <ArrowUpRight size={18} weight="bold" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
