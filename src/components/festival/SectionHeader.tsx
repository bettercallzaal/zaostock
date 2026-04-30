interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ eyebrow, title, align = 'left' }: SectionHeaderProps) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col ${alignCls} mb-6`}>
      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-[#f5a623] tracking-[0.2em] mb-3">
        {eyebrow}
      </span>
      <h2
        className="font-[family-name:var(--font-display)] font-bold text-white tracking-tight"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', lineHeight: 1.05 }}
      >
        {title}
      </h2>
      <div className="h-[3px] w-16 bg-[#f5a623] mt-4" />
    </div>
  );
}
