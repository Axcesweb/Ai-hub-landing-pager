import { NextRequest, NextResponse } from 'next/server'
import { getPosts, createPost } from '@/lib/services/posts'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const posts = await getPosts(limit, offset)

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts?.length || 0,
    })
  } catch (error) {
    console.error('Posts fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
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
    const newPost = await createPost({
      user_id: user.id,
      ...body,
    })

    return NextResponse.json(
      { success: true, data: newPost },
      { status: 201 }
    )
  } catch (error) {
    console.error('Post creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
