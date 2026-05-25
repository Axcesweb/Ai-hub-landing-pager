import { NextResponse } from 'next/server';
export async function POST(_:Request,{params}:{params:{id:string;commentId:string}}){ return NextResponse.json({ videoId:params.id, commentId:params.commentId, liked:true }); }
