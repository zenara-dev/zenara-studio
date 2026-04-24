const WORDS = [
  "Design",
  "Strategy",
  "Interfaces",
  "Identity",
  "APIs",
  "Content",
  "Motion",
  "Launch",
];

export default function Marquee() {
  const row = [...WORDS, ...WORDS, ...WORDS, ...WORDS];
  return (
    <div
      data-testid="marquee"
      className="border-b border-[var(--zn-border)] bg-[var(--zn-ink)] text-white overflow-hidden"
    >
      <div className="flex zn-marquee whitespace-nowrap py-7">
        {row.map((w, i) => (
          <div
            key={i}
            className="flex items-center gap-10 pl-10 zn-display text-3xl md:text-5xl tracking-tight"
          >
            <span className="zn-display-italic opacity-90">{w}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--zn-silver)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
