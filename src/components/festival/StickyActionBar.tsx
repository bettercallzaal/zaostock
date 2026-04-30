'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function StickyActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-50 border-t border-white/[0.12] bg-[#0a1628]/95 backdrop-blur-md transition-transform duration-300 sm:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="grid grid-cols-2 gap-px bg-white/[0.08]">
        <Link
          href="#rsvp"
          className="bg-[#f5a623] py-3 text-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-black font-bold hover:bg-[#ffd700] transition-colors"
        >
          RSVP
        </Link>
        <Link
          href="/apply"
          className="bg-[#0a1628] py-3 text-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-white hover:text-[#f5a623] transition-colors"
        >
          Volunteer
        </Link>
      </div>
    </div>
  );
}
