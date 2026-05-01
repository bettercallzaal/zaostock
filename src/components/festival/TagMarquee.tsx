interface Props {
  tags: string[];
  speedSeconds?: number;
}

export function TagMarquee({ tags, speedSeconds = 60 }: Props) {
  const doubled = [...tags, ...tags, ...tags, ...tags];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.08] py-4">
      <style>{`
        @keyframes tag-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .tag-marquee-track {
          animation: tag-marquee var(--speed) linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .tag-marquee-track { animation: none; }
        }
      `}</style>
      <div
        className="tag-marquee-track flex whitespace-nowrap"
        style={{ ['--speed' as string]: `${speedSeconds}s` }}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 mx-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-gray-400"
          >
            <span className="h-[3px] w-[3px] rounded-full bg-[#f5a623]" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
