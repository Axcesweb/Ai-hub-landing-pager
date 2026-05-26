import { NextRequest, NextResponse } from 'next/server'
import { Post } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '20'

    // Mock data
    const posts: Post[] = []

    return NextResponse.json({
      success: true,
      data: {
        posts,
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
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Mock create post
    return NextResponse.json(
      {
        success: true,
        data: {
          id: 'post-' + Date.now(),
          ...body,
          likeCount: 0,
          commentCount: 0,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 400 }
    )
  }
}
