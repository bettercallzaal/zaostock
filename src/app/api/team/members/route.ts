import { NextResponse } from 'next/server';
import { getStockTeamMember } from '@/lib/auth/session';
import { getSupabaseAdmin } from '@/lib/db/supabase';

export async function GET() {
  const member = await getStockTeamMember();
  if (!member) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('team_members')
    .select('id, name, role, scope')
    .order('created_at');

  if (error) return NextResponse.json({ error: 'Failed to load team' }, { status: 500 });
  return NextResponse.json({ members: data });
}
