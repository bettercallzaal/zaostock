import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/lib/db/supabase';

const rsvpSchema = z.object({
  name: z.string().trim().min(1, 'Name required').max(200),
  email: z.string().trim().email('Valid email required').max(200),
  eventSlug: z.string().trim().min(1).max(100),
  hp: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = rsvpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 },
      );
    }

    if (parsed.data.hp && parsed.data.hp.trim().length > 0) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const supabase = getSupabaseAdmin();

    const { data: existing } = await supabase
      .from('event_rsvps')
      .select('id')
      .eq('email', parsed.data.email)
      .eq('event_slug', parsed.data.eventSlug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'Already on the list' }, { status: 409 });
    }

    const { error } = await supabase.from('event_rsvps').insert({
      name: parsed.data.name,
      email: parsed.data.email,
      event_slug: parsed.data.eventSlug,
    });

    if (error) {
      return NextResponse.json({ error: 'Could not submit right now' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
