import { NextResponse } from 'next/server';
import { news } from '@/lib/mock-data';
export async function GET() { return NextResponse.json({ news }); }
