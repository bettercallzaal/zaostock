'use client';

import { useState } from 'react';
import { memberCompleteness, PARTNER_UNLOCK_THRESHOLD } from '@/lib/members';

interface Props {
  // Profile fields used to compute completeness gate
  bio: string;
  photoUrl: string;
  scope: string;
  links: string;
  role: string;

  // Existing partner state
  initialPartnerBrand: string;
  initialPartnerRole: string;
  initialPartnerUrl: string;
  initialPartnerLogoUrl: string;
  initialPartnerActive: boolean;
}

export function PartnerEditor({
  bio,
  photoUrl,
  scope,
  links,
  role,
  initialPartnerBrand,
  initialPartnerRole,
  initialPartnerUrl,
  initialPartnerLogoUrl,
  initialPartnerActive,
}: Props) {
  const [brand, setBrand] = useState(initialPartnerBrand);
  const [partnerRole, setPartnerRole] = useState(initialPartnerRole);
  const [url, setUrl] = useState(initialPartnerUrl);
  const [logoUrl, setLogoUrl] = useState(initialPartnerLogoUrl);
  const [active, setActive] = useState(initialPartnerActive);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const pct = memberCompleteness({ bio, photo_url: photoUrl, scope, links, role });
  const unlocked = pct >= PARTNER_UNLOCK_THRESHOLD;

  async function save(nextActive: boolean = active) {
    setBusy(true);
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch('/api/team/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partner_brand: brand.trim(),
          partner_role: partnerRole.trim(),
          partner_url: url.trim(),
          partner_logo_url: logoUrl.trim(),
          partner_active: nextActive,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErr(data?.error || `Save failed (HTTP ${res.status})`);
      } else {
        setActive(nextActive);
        setMsg(nextActive ? 'Partner credit live' : 'Saved');
        setTimeout(() => setMsg(null), 2500);
      }
    } catch (e: unknown) {
      const m = e instanceof Error ? e.message : 'Network error';
      setErr(m);
    } finally {
      setBusy(false);
    }
  }

  if (!unlocked) {
    return (
      <div className="bg-[#0d1b2a] rounded-xl p-4 border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
            Your project as partner
          </p>
          <span className="text-[10px] text-gray-600 font-mono">LOCKED</span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">
          Add your bio + photo + scope to unlock a partner credit on the public site. Volunteers donating time count as
          partners. Plug your project, brand, or company.
        </p>
        <div className="h-1.5 bg-[#0a1628] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#f5a623] transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-[11px] text-gray-500">
          {pct}% complete &middot; need {PARTNER_UNLOCK_THRESHOLD}% to unlock
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0d1b2a] rounded-xl p-4 border border-[#f5a623]/30 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-wider text-[#f5a623] font-bold">
          Your project as partner
        </p>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
            active
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              : 'bg-gray-500/10 text-gray-400 border-gray-500/30'
          }`}
        >
          {active ? 'Live on /partners' : 'Draft'}
        </span>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed">
        You unlocked the partner credit. Add your project name + role and toggle live to show on the public Partners
        grid. Same dedupe logic across <code className="text-gray-300">/</code>, <code className="text-gray-300">/sponsor/deck</code>,{' '}
        <code className="text-gray-300">/onepagers/overview</code>.
      </p>

      <div className="space-y-3">
        <Field label="Project / brand name" hint="Shown as the partner card title. Max 60 chars.">
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value.slice(0, 60))}
            placeholder="e.g. ENTERACT"
            className="w-full bg-[#0a1628] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f5a623]/50"
          />
        </Field>
        <Field label="Role / tagline" hint="What you do. Max 80 chars.">
          <input
            type="text"
            value={partnerRole}
            onChange={(e) => setPartnerRole(e.target.value.slice(0, 80))}
            placeholder="e.g. Technical build"
            className="w-full bg-[#0a1628] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f5a623]/50"
          />
        </Field>
        <Field label="URL (optional)" hint="Click-through on the partner card. Must start with https://">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://"
            className="w-full bg-[#0a1628] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f5a623]/50"
          />
        </Field>
        <Field label="Logo URL (optional)" hint="https only. Display will be capped at ~120px.">
          <input
            type="url"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="https://"
            className="w-full bg-[#0a1628] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f5a623]/50"
          />
        </Field>
      </div>

      <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/[0.06]">
        <button
          type="button"
          onClick={() => save(active)}
          disabled={busy || brand.trim().length === 0}
          className="bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
        >
          {busy ? 'Saving...' : 'Save draft'}
        </button>
        <button
          type="button"
          onClick={() => save(!active)}
          disabled={busy || brand.trim().length === 0}
          className={`font-bold rounded-lg px-4 py-2 text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
            active
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-[#f5a623] hover:bg-[#ffd700] text-black'
          }`}
        >
          {active ? 'Take down' : 'Publish to partners page'}
        </button>
      </div>

      {msg && <p className="text-[11px] text-emerald-400">{msg}</p>}
      {err && <p className="text-[11px] text-red-400">{err}</p>}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{label}</label>
      {children}
      {hint && <p className="text-[10px] text-gray-600">{hint}</p>}
    </div>
  );
}
