'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function StickyActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-3 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-50 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <div className="bg-[#0a1628]/85 backdrop-blur-xl border border-white/[0.16] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-1 p-1 sm:gap-2 sm:p-1.5">
        <Link
          href="#rsvp"
          className="bg-[#f5a623] hover:bg-[#ffd700] text-black font-bold rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.15em] transition-colors"
        >
          RSVP
        </Link>
        <Link
          href="/donate"
          className="text-white hover:text-[#f5a623] font-bold rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.15em] transition-colors"
        >
          Donate
        </Link>
        <Link
          href="/apply"
          className="text-white hover:text-[#f5a623] font-bold rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.15em] transition-colors"
        >
          Volunteer
        </Link>
      </div>
    </div>
  );
}
