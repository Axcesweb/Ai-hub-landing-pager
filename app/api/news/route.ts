import { NextRequest, NextResponse } from 'next/server'
import { News } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '20'
    const category = searchParams.get('category')

    // Mock data
    const news: News[] = []

    return NextResponse.json({
      success: true,
      data: {
        news,
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
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}
