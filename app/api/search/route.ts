import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'all' // all, videos, courses, users, posts

    // Mock search results
    return NextResponse.json({
      success: true,
      data: {
        results: [],
        query: q,
        type: type,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    )
  }
}
