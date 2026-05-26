import { NextRequest, NextResponse } from 'next/server'
import { Video } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '20'
    const category = searchParams.get('category')

    // Mock data
    const videos: Video[] = []

    return NextResponse.json({
      success: true,
      data: {
        videos,
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
      { success: false, error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Mock create video
    return NextResponse.json(
      {
        success: true,
        data: {
          id: 'video-' + Date.now(),
          ...body,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create video' },
      { status: 400 }
    )
  }
}
