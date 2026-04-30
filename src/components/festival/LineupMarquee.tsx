interface LineupMarqueeProps {
  slots: string[];
  speedSeconds?: number;
}

export function LineupMarquee({ slots, speedSeconds = 40 }: LineupMarqueeProps) {
  const doubled = [...slots, ...slots];
  return (
    <div
      className="relative overflow-hidden border-y border-[#f5a623]/30 py-6"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(245,166,35,0.04), transparent)' }}
    >
      <style>{`
        @keyframes zaostock-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .zaostock-marquee-track {
          animation: zaostock-marquee var(--speed) linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .zaostock-marquee-track { animation: none; }
        }
      `}</style>
      <div
        className="zaostock-marquee-track flex whitespace-nowrap"
        style={{ ['--speed' as string]: `${speedSeconds}s` }}
      >
        {doubled.map((slot, i) => (
          <span
            key={i}
            className="px-8 font-[family-name:var(--font-display)] font-bold text-[#f5a623] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: 1 }}
          >
            {slot}
            <span className="px-6 text-white/20">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
