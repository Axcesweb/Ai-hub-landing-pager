import { NextRequest, NextResponse } from 'next/server';
import { comments } from '@/lib/mock-data';
export async function GET(_:Request,{params}:{params:{id:string}}){ return NextResponse.json({ comments: comments.filter(c=>c.videoId===params.id) }); }
export async function POST(req:NextRequest,{params}:{params:{id:string}}){ const body=await req.json(); return NextResponse.json({ id:`cm${Date.now()}`, videoId:params.id, ...body }, {status:201}); }
