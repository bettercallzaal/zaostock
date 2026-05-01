export function ScrollEyebrow({ label = 'Scroll to explore' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 mt-12 opacity-70 motion-reduce:animate-none">
      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-400 tracking-[0.25em]">
        {label}
      </span>
      <div className="relative h-[1px] w-12 bg-white/20 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-4 bg-[#f5a623] animate-[scroll-cue_1.8s_ease-in-out_infinite]" />
      </div>
      <style>{`
        @keyframes scroll-cue {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
          100% { transform: translateX(200%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[scroll-cue_1\\.8s_ease-in-out_infinite\\] { animation: none; }
        }
      `}</style>
    </div>
  );
}
