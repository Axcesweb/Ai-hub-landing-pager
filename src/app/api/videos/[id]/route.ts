import { NextResponse } from 'next/server';
import { videos } from '@/lib/mock-data';
export async function GET(_:Request,{params}:{params:{id:string}}){ return NextResponse.json({ video: videos.find(v=>v.id===params.id) }); }
