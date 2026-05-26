import { NextRequest, NextResponse } from 'next/server'
import { getVideos, createVideo } from '@/lib/services/videos'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const videos = await getVideos(limit, offset)

    return NextResponse.json({
      success: true,
      data: videos,
      count: videos?.length || 0,
    })
  } catch (error) {
    console.error('Videos fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const newVideo = await createVideo({
      user_id: user.id,
      ...body,
    })

    return NextResponse.json(
      { success: true, data: newVideo },
      { status: 201 }
    )
  } catch (error) {
    console.error('Video creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create video' },
      { status: 500 }
    )
  }
}
