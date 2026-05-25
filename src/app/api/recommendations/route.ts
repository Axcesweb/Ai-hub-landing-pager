import { NextResponse } from 'next/server';
export async function GET(){ return NextResponse.json({ strategy:'placeholder', factors:['tags','watchHistory','creatorAffinity'] }); }
