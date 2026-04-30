interface TierPanelProps {
  category: string;
  number: string;
  items: string[];
}

export function TierPanel({ category, number, items }: TierPanelProps) {
  return (
    <div className="border border-white/[0.12] bg-[#0d1b2a] flex flex-col h-full">
      <div className="border-b border-white/[0.12] px-5 py-4 flex items-baseline justify-between gap-3">
        <h3
          className="font-[family-name:var(--font-display)] font-bold text-[#f5a623] tracking-tight"
          style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', lineHeight: 1.1 }}
        >
          {category}
        </h3>
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-500 tracking-[0.18em]">
          {number}
        </span>
      </div>
      <ol className="px-5 py-5 space-y-3 flex-1">
        {items.map((item, i) => (
          <li key={item} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[#f5a623] tracking-[0.1em] mt-1 flex-shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
