import { NextRequest, NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();
  if (!email || !name) return NextResponse.json({ error: 'name and email required' }, { status: 400 });
  return NextResponse.json({ token: signToken({ sub: email, name, role: 'creator' }) }, { status: 201 });
}
