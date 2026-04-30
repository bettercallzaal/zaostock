interface StatTileProps {
  value: string;
  label: string;
  accent?: boolean;
}

export function StatTile({ value, label, accent = false }: StatTileProps) {
  return (
    <div className={`p-6 border ${accent ? 'border-[#f5a623]/40 bg-[#f5a623]/[0.04]' : 'border-white/[0.12] bg-[#0d1b2a]'}`}>
      <p
        className={`font-[family-name:var(--font-display)] font-bold tracking-tight ${accent ? 'text-[#f5a623]' : 'text-white'}`}
        style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1 }}
      >
        {value}
      </p>
      <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-500 tracking-[0.18em] mt-3">
        {label}
      </p>
    </div>
  );
}
