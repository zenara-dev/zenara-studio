const WORDS = [
  "Design",
  "Strategy",
  "Frontend",
  "APIs",
  "CMS",
  "Motion",
  "Performance",
  "Launch",
];

export default function Marquee() {
  const row = [...WORDS, ...WORDS, ...WORDS];
  return (
    <div
      data-testid="marquee"
      className="border-b border-[var(--zd-border)] bg-[var(--zd-ink)] text-white overflow-hidden"
    >
      <div className="flex zd-marquee whitespace-nowrap py-5">
        {row.map((w, i) => (
          <div
            key={i}
            className="flex items-center gap-10 pl-10 font-display text-2xl md:text-4xl tracking-tight uppercase"
          >
            <span>{w}</span>
            <span className="w-2 h-2 bg-[var(--zd-accent)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
