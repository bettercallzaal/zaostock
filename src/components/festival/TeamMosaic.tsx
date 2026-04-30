'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { PublicMember } from '@/lib/members';

const ROLE_LABEL: Record<string, string> = {
  lead: 'Lead',
  '2nd': '2nd',
  member: 'Member',
};

const SCOPE_LABEL: Record<string, string> = {
  ops: 'Ops',
  finance: 'Finance',
  design: 'Design',
  music: 'Music',
};

export function TeamMosaic({ members }: { members: PublicMember[] }) {
  const sorted = [...members].sort((a, b) => {
    const rank = (r: string) => (r === 'lead' ? 0 : r === '2nd' ? 1 : 2);
    return rank(a.role) - rank(b.role);
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[160px]">
      {sorted.map((m, i) => {
        const isLead = m.role === 'lead';
        const isFeatured = i === 0 || isLead;
        const span = isFeatured ? 'col-span-2 row-span-2' : '';
        return <MemberTile key={m.id} member={m} span={span} featured={isFeatured} />;
      })}
    </div>
  );
}

function MemberTile({ member, span, featured }: { member: PublicMember; span: string; featured: boolean }) {
  const [photoBroken, setPhotoBroken] = useState(false);
  const showPhoto = member.photo_url && !photoBroken;
  const initials = member.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={`/team/m/${member.slug}`}
      className={`relative overflow-hidden border border-white/[0.12] bg-[#0d1b2a] hover:border-[#f5a623]/40 transition-colors group ${span}`}
    >
      {showPhoto ? (
        <img
          src={member.photo_url}
          alt={member.name}
          onError={() => setPhotoBroken(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0d1b2a] to-[#0a1628]">
          <span
            className="font-[family-name:var(--font-display)] font-bold text-white/30 tracking-tight"
            style={{ fontSize: featured ? 'clamp(3rem, 8vw, 6rem)' : 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            {initials}
          </span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/80 to-transparent p-3">
        <p className={`font-[family-name:var(--font-display)] font-semibold text-white truncate ${featured ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'}`}>
          {member.name}
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase text-[#f5a623] tracking-[0.18em] mt-0.5 truncate">
          {SCOPE_LABEL[member.scope] || member.scope} / {ROLE_LABEL[member.role] || member.role}
        </p>
      </div>
    </Link>
  );
}
