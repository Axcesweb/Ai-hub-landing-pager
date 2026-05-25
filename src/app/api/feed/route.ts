import { NextResponse } from 'next/server';
import { videos, posts, news } from '@/lib/mock-data';
export async function GET() { return NextResponse.json({ videos, posts, news }); }
