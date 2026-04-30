interface Fact {
  label: string;
  value: string;
}

export function FactStrip({ facts }: { facts: Fact[] }) {
  return (
    <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-4 border-y border-white/[0.12] py-5">
      {facts.map((f) => (
        <div key={f.label} className="flex flex-col">
          <dt className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-500 tracking-[0.18em] mb-1">
            {f.label}
          </dt>
          <dd className="font-[family-name:var(--font-display)] text-sm sm:text-base text-white font-medium">
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
