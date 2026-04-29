import { NextResponse } from 'next/server';
import { clearStockTeamSession } from '@/lib/auth/session';

export async function POST() {
  await clearStockTeamSession();
  return NextResponse.json({ success: true });
}
