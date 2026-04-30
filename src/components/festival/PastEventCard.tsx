interface PastEventCardProps {
  year: string;
  name: string;
  description: string;
  status?: 'past' | 'upcoming';
  hue?: 'rose' | 'indigo' | 'amber' | 'emerald';
}

const HUES: Record<string, string> = {
  rose: 'from-rose-500/30 via-rose-500/10 to-transparent',
  indigo: 'from-indigo-500/30 via-indigo-500/10 to-transparent',
  amber: 'from-[#f5a623]/30 via-[#f5a623]/10 to-transparent',
  emerald: 'from-emerald-500/30 via-emerald-500/10 to-transparent',
};

export function PastEventCard({ year, name, description, status = 'past', hue = 'indigo' }: PastEventCardProps) {
  return (
    <div className="relative overflow-hidden border border-white/[0.12] bg-[#0d1b2a] aspect-[4/3] sm:aspect-[3/2] group">
      <div className={`absolute inset-0 bg-gradient-to-br ${HUES[hue]}`} />
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-white/60 tracking-[0.2em]">
            {status === 'past' ? `Past Event / ${year}` : `Upcoming / ${year}`}
          </span>
          {status === 'upcoming' && (
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-[#f5a623] tracking-[0.2em] border border-[#f5a623]/40 px-2 py-0.5">
              Next
            </span>
          )}
        </div>
        <p
          className="font-[family-name:var(--font-display)] font-bold text-white tracking-tight"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1 }}
        >
          {name}
        </p>
        <p className="text-xs sm:text-sm text-white/70 mt-2 max-w-md">{description}</p>
      </div>
    </div>
  );
}
