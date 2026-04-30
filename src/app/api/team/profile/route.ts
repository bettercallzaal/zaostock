import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getStockTeamMember } from '@/lib/auth/session';
import { getSupabaseAdmin } from '@/lib/db/supabase';
import { logger } from '@/lib/logger';
import { memberCompleteness, PARTNER_UNLOCK_THRESHOLD } from '@/lib/members';

const httpsOptional = z
  .string()
  .max(500)
  .optional()
  .refine(
    (v) => !v || v === '' || /^https:\/\//i.test(v),
    { message: 'URL must start with https://' },
  );

const patchSchema = z.object({
  bio: z.string().max(2000).optional(),
  links: z.string().max(500).optional(),
  photo_url: httpsOptional,
  scope: z.enum(['', 'ops', 'music', 'design']).optional(),
  status_text: z.string().max(140).optional(),
  skills: z.string().max(500).optional(),
  partner_brand: z.string().max(60).optional(),
  partner_role: z.string().max(80).optional(),
  partner_url: httpsOptional,
  partner_logo_url: httpsOptional,
  partner_active: z.boolean().optional(),
});

type PartnerKey = 'partner_brand' | 'partner_role' | 'partner_url' | 'partner_logo_url' | 'partner_active';
const PARTNER_KEYS: ReadonlyArray<PartnerKey> = [
  'partner_brand',
  'partner_role',
  'partner_url',
  'partner_logo_url',
  'partner_active',
];

export async function PATCH(request: NextRequest) {
  try {
    const session = await getStockTeamMember();
    if (!session) {
      return NextResponse.json({ error: 'Not signed in. Log out and back in.' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      const firstMsg = parsed.error.issues[0]?.message || 'Invalid input';
      return NextResponse.json(
        { error: firstMsg, details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const updates: Record<string, string | boolean> = {};
    if (parsed.data.bio !== undefined) updates.bio = parsed.data.bio;
    if (parsed.data.links !== undefined) updates.links = parsed.data.links;
    if (parsed.data.photo_url !== undefined) updates.photo_url = parsed.data.photo_url;
    if (parsed.data.scope !== undefined) updates.scope = parsed.data.scope;
    if (parsed.data.status_text !== undefined) updates.status_text = parsed.data.status_text;
    if (parsed.data.skills !== undefined) updates.skills = parsed.data.skills;

    const partnerTouched = PARTNER_KEYS.some((k) => parsed.data[k] !== undefined);
    if (partnerTouched) {
      const supabase = getSupabaseAdmin();
      const { data: current } = await supabase
        .from('team_members')
        .select('bio, photo_url, scope, links, role')
        .eq('id', session.memberId)
        .single();

      const merged = {
        bio: parsed.data.bio ?? current?.bio ?? '',
        photo_url: parsed.data.photo_url ?? current?.photo_url ?? '',
        scope: parsed.data.scope ?? current?.scope ?? '',
        links: parsed.data.links ?? current?.links ?? '',
        role: current?.role ?? '',
      };

      if (parsed.data.partner_active === true && memberCompleteness(merged) < PARTNER_UNLOCK_THRESHOLD) {
        return NextResponse.json(
          {
            error: `Profile must be at least ${PARTNER_UNLOCK_THRESHOLD}% complete (bio, photo, scope) to publish a partner credit.`,
          },
          { status: 400 },
        );
      }

      if (parsed.data.partner_brand !== undefined) updates.partner_brand = parsed.data.partner_brand;
      if (parsed.data.partner_role !== undefined) updates.partner_role = parsed.data.partner_role;
      if (parsed.data.partner_url !== undefined) updates.partner_url = parsed.data.partner_url;
      if (parsed.data.partner_logo_url !== undefined) updates.partner_logo_url = parsed.data.partner_logo_url;
      if (parsed.data.partner_active !== undefined) updates.partner_active = parsed.data.partner_active;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('team_members')
      .update(updates)
      .eq('id', session.memberId)
      .select('id, name, bio, links, photo_url, status_text, skills, partner_brand, partner_role, partner_url, partner_logo_url, partner_active')
      .single();

    if (error) {
      logger.error({ error, memberId: session.memberId }, 'stock-team profile update failed');
      const dbMsg = error.message || 'Update failed';
      const isPartnerCol = /partner_/i.test(dbMsg) && /column/i.test(dbMsg);
      const hint = isPartnerCol
        ? ' Partner columns missing. Run scripts/team_members_partner_columns.sql in Supabase.'
        : /column .* does not exist/i.test(dbMsg)
          ? ' The bio/links/photo_url columns are missing. Run scripts/stock-schema.sql in Supabase.'
          : '';
      return NextResponse.json({ error: `Update failed: ${dbMsg}${hint}` }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Update applied but no row returned' }, { status: 500 });
    }

    return NextResponse.json({ member: data });
  } catch (err) {
    logger.error({ err }, 'stock-team profile update threw');
    const msg = err instanceof Error ? err.message : 'unknown error';
    return NextResponse.json({ error: `Profile update failed: ${msg}` }, { status: 500 });
  }
}
