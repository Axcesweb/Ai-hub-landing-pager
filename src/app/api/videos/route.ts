import { NextRequest, NextResponse } from 'next/server';
import { videos } from '@/lib/mock-data';
export async function GET(){ return NextResponse.json({ videos }); }
export async function POST(req: NextRequest){ const body = await req.json(); return NextResponse.json({ message:'Upload placeholder', video: body }, { status:201 }); }
