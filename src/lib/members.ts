import { getSupabaseAdmin } from '@/lib/db/supabase';

export interface StockCounts {
  volunteers: number;
  rsvps: number;
  sponsorsCommitted: number;
  sponsorsCommittedAmount: number;
}

export async function getStockCounts(): Promise<StockCounts> {
  const supabase = getSupabaseAdmin();

  const [vRes, rRes, sRes] = await Promise.allSettled([
    supabase.from('volunteers').select('id', { count: 'exact', head: true }),
    supabase
      .from('event_rsvps')
      .select('id', { count: 'exact', head: true })
      .eq('event_slug', 'zao-stock-2026'),
    supabase
      .from('sponsors')
      .select('amount_committed, status')
      .in('status', ['committed', 'paid']),
  ]);

  const volunteers = vRes.status === 'fulfilled' ? vRes.value.count || 0 : 0;
  const rsvps = rRes.status === 'fulfilled' ? rRes.value.count || 0 : 0;

  let sponsorsCommitted = 0;
  let sponsorsCommittedAmount = 0;
  if (sRes.status === 'fulfilled' && sRes.value.data) {
    sponsorsCommitted = sRes.value.data.length;
    sponsorsCommittedAmount = sRes.value.data.reduce(
      (sum, s) => sum + Number(s.amount_committed || 0),
      0,
    );
  }

  return { volunteers, rsvps, sponsorsCommitted, sponsorsCommittedAmount };
}

export interface PublicMember {
  id: string;
  name: string;
  role: string;
  scope: string;
  secondary_scope: string;
  bio: string;
  links: string;
  photo_url: string;
  status_text: string;
  skills: string;
  slug: string;
  partner_brand: string;
  partner_role: string;
  partner_url: string;
  partner_logo_url: string;
  partner_active: boolean;
}

export interface MemberPartner {
  member_id: string;
  member_slug: string;
  brand: string;
  role: string;
  url: string;
  logo_url: string;
}

export interface CombinedPartner {
  name: string;
  role: string;
  url?: string;
  logo_url?: string;
  source: 'structural' | 'member';
  member_slug?: string;
}

export const STRUCTURAL_PARTNERS: ReadonlyArray<{ name: string; role: string; confirmed: boolean }> = [
  { name: 'Heart of Ellsworth', role: 'Venue + MCW statewide promotion', confirmed: true },
  { name: 'Town of Ellsworth', role: 'Parklet venue', confirmed: true },
  { name: 'New Media Commons', role: '501(c)(3) fiscal sponsor', confirmed: true },
  { name: 'ENTERACT', role: 'Technical build', confirmed: true },
];

export const PARTNER_UNLOCK_THRESHOLD = 70;

export function memberCompleteness(m: {
  bio?: string;
  photo_url?: string;
  scope?: string;
  links?: string;
  role?: string;
}): number {
  let pct = 0;
  if ((m.bio ?? '').trim().length >= 30) pct += 40;
  else if ((m.bio ?? '').trim().length > 0) pct += 20;
  if ((m.photo_url ?? '').trim().length > 0) pct += 30;
  if ((m.scope ?? '').trim().length > 0 || m.role === 'advisory') pct += 20;
  if ((m.links ?? '').trim().length > 0) pct += 10;
  return pct;
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export interface ParsedLink {
  href: string;
  display: string;
}

export function parseLinks(raw: string): ParsedLink[] {
  return raw
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((token) => {
      const hasProtocol = /^https?:\/\//i.test(token);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(token);
      const isHandle = token.startsWith('@');
      if (isEmail) {
        return { href: `mailto:${token}`, display: token };
      }
      if (isHandle) {
        return { href: `https://x.com/${token.slice(1)}`, display: token };
      }
      const href = hasProtocol ? token : `https://${token}`;
      return { href, display: token };
    });
}

export async function getPublicMembers(): Promise<PublicMember[]> {
  const supabase = getSupabaseAdmin();
  // Try with partner_* columns first; fall back to legacy select if migration hasn't run yet.
  let data: Record<string, unknown>[] | null = null;
  const fullSelect = await supabase
    .from('team_members')
    .select(
      'id, name, role, scope, secondary_scope, bio, links, photo_url, status_text, skills, active, partner_brand, partner_role, partner_url, partner_logo_url, partner_active',
    )
    .neq('active', false)
    .order('created_at');

  if (fullSelect.error) {
    const legacy = await supabase
      .from('team_members')
      .select('id, name, role, scope, secondary_scope, bio, links, photo_url, status_text, skills, active')
      .neq('active', false)
      .order('created_at');
    if (legacy.error || !legacy.data) return [];
    data = legacy.data as unknown as Record<string, unknown>[];
  } else {
    data = (fullSelect.data ?? null) as unknown as Record<string, unknown>[] | null;
  }

  if (!data) return [];

  return data.map((m) => ({
    id: String(m.id),
    name: String(m.name ?? ''),
    role: (m.role as string) || 'member',
    scope: (m.scope as string) || 'ops',
    secondary_scope: (m.secondary_scope as string) || '',
    bio: (m.bio as string) || '',
    links: (m.links as string) || '',
    photo_url: (m.photo_url as string) || '',
    status_text: (m.status_text as string) || '',
    skills: (m.skills as string) || '',
    slug: slugify(String(m.name ?? '')),
    partner_brand: (m.partner_brand as string) || '',
    partner_role: (m.partner_role as string) || '',
    partner_url: (m.partner_url as string) || '',
    partner_logo_url: (m.partner_logo_url as string) || '',
    partner_active: Boolean(m.partner_active),
  }));
}

export async function getActiveMemberPartners(): Promise<MemberPartner[]> {
  const members = await getPublicMembers();
  return members
    .filter((m) => m.partner_active && m.partner_brand.trim().length > 0)
    .map((m) => ({
      member_id: m.id,
      member_slug: m.slug,
      brand: m.partner_brand,
      role: m.partner_role || 'Partner',
      url: m.partner_url,
      logo_url: m.partner_logo_url,
    }));
}

/**
 * Merge structural partners with active member-published partners.
 * Member partners with the same brand (case-insensitive) replace the structural one
 * — e.g. once FailOften self-publishes ENTERACT, the hardcoded ENTERACT card drops out.
 */
export async function getCombinedPartners(): Promise<CombinedPartner[]> {
  const memberPartners = await getActiveMemberPartners().catch(() => []);
  const memberBrands = new Set(memberPartners.map((p) => p.brand.trim().toLowerCase()));

  const structural: CombinedPartner[] = STRUCTURAL_PARTNERS
    .filter((p) => p.confirmed)
    .filter((p) => !memberBrands.has(p.name.trim().toLowerCase()))
    .map((p) => ({ name: p.name, role: p.role, source: 'structural' as const }));

  const memberCards: CombinedPartner[] = memberPartners.map((p) => ({
    name: p.brand,
    role: p.role,
    url: p.url || undefined,
    logo_url: p.logo_url || undefined,
    source: 'member' as const,
    member_slug: p.member_slug,
  }));

  return [...structural, ...memberCards];
}

export async function getMemberBySlug(slug: string): Promise<PublicMember | null> {
  const all = await getPublicMembers();
  return all.find((m) => m.slug === slug) || null;
}
