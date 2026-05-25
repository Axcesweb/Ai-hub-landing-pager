import { NextRequest, NextResponse } from 'next/server';
import { courses } from '@/lib/mock-data';
export async function GET(){ return NextResponse.json({ courses }); }
export async function POST(req:NextRequest){ const body=await req.json(); return NextResponse.json({ id:`co${Date.now()}`, ...body }, {status:201}); }
