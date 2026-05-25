import { NextRequest, NextResponse } from 'next/server';
export async function POST(req:NextRequest,{params}:{params:{id:string;commentId:string}}){ const body=await req.json(); return NextResponse.json({ id:`cm${Date.now()}`, videoId:params.id, parentId:params.commentId, ...body }, {status:201}); }
