const STEPS = [
  {
    n: "01",
    title: "Discovery",
    desc: "We run a 30-min scoping call, map your goals, and quote a flat price with timeline.",
    dur: "Day 1",
  },
  {
    n: "02",
    title: "Design",
    desc: "Editorial, grid-true Figma designs. You approve key frames — not a mountain of screens.",
    dur: "Day 2 — 5",
  },
  {
    n: "03",
    title: "Build",
    desc: "React + Tailwind build. Clean components, accessibility baked in, CMS wired up.",
    dur: "Day 5 — 12",
  },
  {
    n: "04",
    title: "Launch",
    desc: "QA, performance pass, analytics, hand-off docs. We deploy & keep a 14-day warranty.",
    dur: "Day 12 — 14",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      data-testid="process-section"
      className="border-b border-[var(--zn-border)] py-20 md:py-28 bg-white"
    >
      <div className="px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow">IV · Method</div>
          </div>
          <h2 className="col-span-12 md:col-span-9 zn-display text-3xl md:text-5xl lg:text-6xl">
            Scoped weekly.{" "}
            <span className="zn-display-italic text-[var(--zn-muted)]">
              Shipped calmly.
            </span>
          </h2>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-4 border-t border-l border-[var(--zn-border)]">
          {STEPS.map((s) => (
            <li
              key={s.n}
              data-testid={`process-step-${s.n}`}
              className="relative border-r border-b border-[var(--zn-border)] p-8 md:p-10 group hover:bg-[var(--zn-bg)] transition-colors"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-4xl tracking-tighter">{s.n}</span>
                <span className="eyebrow">{s.dur}</span>
              </div>
              <h3 className="mt-10 font-display text-xl md:text-2xl tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-[var(--zn-muted)]">
                {s.desc}
              </p>
              <span className="absolute left-0 top-0 w-full h-[2px] bg-[var(--zn-accent)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
