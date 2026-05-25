import { NextRequest, NextResponse } from 'next/server';
import { posts } from '@/lib/mock-data';
export async function GET() { return NextResponse.json({ posts }); }
export async function POST(req: NextRequest) { const body = await req.json(); return NextResponse.json({ ...body, id: `p${Date.now()}` }, { status: 201 }); }
