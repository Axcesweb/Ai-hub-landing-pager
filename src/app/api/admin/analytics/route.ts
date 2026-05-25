import { NextRequest, NextResponse } from 'next/server';
import { analytics } from '@/lib/mock-data';
import { getRoleFromToken, hasPermission } from '@/lib/rbac';

export async function GET(req: NextRequest) {
  const role = getRoleFromToken(req.headers.get('authorization') || undefined);
  if (!hasPermission(role, 'analytics:view')) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  return NextResponse.json({ analytics, role });
}
