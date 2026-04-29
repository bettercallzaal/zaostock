import { Metadata } from 'next';
import { getStockTeamMember } from '@/lib/auth/session';
import { getSupabaseAdmin } from '@/lib/db/supabase';
import { LoginForm } from './LoginForm';
import { Dashboard } from './Dashboard';

export const metadata: Metadata = {
  title: 'ZAOstock Team Dashboard',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function StockTeamPage() {
  const member = await getStockTeamMember();

  if (!member) {
    return <LoginForm />;
  }

  const supabase = getSupabaseAdmin();

  const [
    goalsRes,
    todosRes,
    membersRes,
    sponsorsRes,
    artistsRes,
    timelineRes,
    volunteersRes,
    budgetRes,
    notesRes,
    rsvpsRes,
    myCirclesRes,
    myActivityRes,
    feedRes,
  ] = await Promise.allSettled([
    supabase.from('goals').select('*').order('sort_order'),
    supabase
      .from('todos')
      .select('*, owner:team_members!owner_id(id, name), creator:team_members!created_by(id, name)')
      .order('status')
      .order('created_at', { ascending: false }),
    supabase.from('team_members').select('id, name, role, scope, secondary_scope, bio, links, photo_url, status_text, skills').neq('active', false).order('created_at'),
    supabase
      .from('sponsors')
      .select('*, owner:team_members!owner_id(id, name)')
      .order('track')
      .order('status')
      .order('created_at', { ascending: false }),
    supabase
      .from('artists')
      .select('*, outreach:team_members!outreach_by(id, name)')
      .order('status')
      .order('set_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false }),
    supabase
      .from('timeline')
      .select('*, owner:team_members!owner_id(id, name)')
      .order('due_date', { ascending: true }),
    supabase
      .from('volunteers')
      .select('*, recruited_by_member:team_members!recruited_by(id, name)')
      .order('confirmed', { ascending: false })
      .order('created_at', { ascending: false }),
    supabase
      .from('budget_entries')
      .select('*, related_sponsor:sponsors!related_sponsor_id(id, name)')
      .order('type')
      .order('category')
      .order('created_at', { ascending: false }),
    supabase
      .from('meeting_notes')
      .select('*, creator:team_members!created_by(id, name)')
      .order('meeting_date', { ascending: false }),
    supabase
      .from('event_rsvps')
      .select('id, name, email, created_at')
      .eq('event_slug', 'zao-stock-2026')
      .order('created_at', { ascending: false }),
    supabase
      .from('circle_members')
      .select('circle_id', { count: 'exact', head: true })
      .eq('member_id', member.memberId),
    supabase
      .from('activity_log')
      .select('id', { count: 'exact', head: true })
      .eq('actor_id', member.memberId),
    supabase
      .from('activity_log')
      .select('id, actor_id, entity_type, action, field_changed, new_value, created_at, actor:team_members!actor_id(id, name)')
      .order('created_at', { ascending: false })
      .limit(15),
  ]);

  const goals = goalsRes.status === 'fulfilled' ? goalsRes.value.data || [] : [];
  const todos = todosRes.status === 'fulfilled' ? todosRes.value.data || [] : [];
  const members = membersRes.status === 'fulfilled' ? membersRes.value.data || [] : [];
  const sponsors = sponsorsRes.status === 'fulfilled' ? sponsorsRes.value.data || [] : [];
  const artists = artistsRes.status === 'fulfilled' ? artistsRes.value.data || [] : [];
  const milestones = timelineRes.status === 'fulfilled' ? timelineRes.value.data || [] : [];
  const volunteers = volunteersRes.status === 'fulfilled' ? volunteersRes.value.data || [] : [];
  const budget = budgetRes.status === 'fulfilled' ? budgetRes.value.data || [] : [];
  const meetingNotes = notesRes.status === 'fulfilled' ? notesRes.value.data || [] : [];
  const rsvps = rsvpsRes.status === 'fulfilled' ? rsvpsRes.value.data || [] : [];
  const myCirclesCount = myCirclesRes.status === 'fulfilled' ? myCirclesRes.value.count ?? 0 : 0;
  const myActivityCount = myActivityRes.status === 'fulfilled' ? myActivityRes.value.count ?? 0 : 0;

  type FeedRow = {
    id: string;
    actor_id: string | null;
    entity_type: string;
    action: string;
    field_changed: string | null;
    new_value: string | null;
    created_at: string;
    actor: { id: string; name: string } | { id: string; name: string }[] | null;
  };
  const feedRows = (feedRes.status === 'fulfilled' ? feedRes.value.data || [] : []) as unknown as FeedRow[];
  const feed = feedRows.map((row) => {
    const actor = Array.isArray(row.actor) ? row.actor[0] : row.actor;
    return {
      id: row.id,
      actorName: actor?.name ?? null,
      actorId: row.actor_id,
      entityType: row.entity_type,
      action: row.action,
      fieldChanged: row.field_changed,
      newValue: row.new_value,
      createdAt: row.created_at,
    };
  });

  return (
    <Dashboard
      memberName={member.memberName}
      memberId={member.memberId}
      goals={goals}
      todos={todos}
      members={members}
      sponsors={sponsors}
      artists={artists}
      milestones={milestones}
      volunteers={volunteers}
      rsvps={rsvps}
      budget={budget}
      meetingNotes={meetingNotes}
      myCirclesCount={myCirclesCount}
      myActivityCount={myActivityCount}
      feed={feed}
    />
  );
}
