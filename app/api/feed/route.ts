import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '15'
    const type = searchParams.get('type') || 'all' // all, videos, courses, posts, news

    // Mock personalized feed
    return NextResponse.json({
      success: true,
      data: {
        feed: [],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: 0,
          hasMore: false,
        },
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch feed' },
      { status: 500 }
    )
  }
}
