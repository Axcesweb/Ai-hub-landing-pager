import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get('q')
    const type = searchParams.get('type') || 'all' // all, videos, courses, users, posts

    if (!q || q.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Query must be at least 2 characters' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const searchQuery = `%${q}%`

    let results: any = {}

    // Search videos
    if (type === 'all' || type === 'videos') {
      const { data: videos } = await supabase
        .from('videos')
        .select(`
          id,
          title,
          description,
          thumbnail_url,
          views_count,
          likes_count,
          created_at,
          profiles:user_id (username, display_name, avatar_url)
        `)
        .ilike('title', searchQuery)
        .eq('is_public', true)
        .limit(10)

      results.videos = videos || []
    }

    // Search courses
    if (type === 'all' || type === 'courses') {
      const { data: courses } = await supabase
        .from('courses')
        .select(`
          id,
          title,
          description,
          thumbnail_url,
          level,
          price,
          rating,
          created_at,
          profiles:user_id (username, display_name, avatar_url)
        `)
        .ilike('title', searchQuery)
        .eq('is_public', true)
        .limit(10)

      results.courses = courses || []
    }

    // Search users
    if (type === 'all' || type === 'users') {
      const { data: users } = await supabase
        .from('profiles')
        .select('id, username, display_name, avatar_url, is_verified, followers_count')
        .or(`username.ilike.${searchQuery},display_name.ilike.${searchQuery}`)
        .limit(10)

      results.users = users || []
    }

    // Search posts
    if (type === 'all' || type === 'posts') {
      const { data: posts } = await supabase
        .from('posts')
        .select(`
          id,
          content,
          created_at,
          likes_count,
          comments_count,
          profiles:user_id (username, display_name, avatar_url)
        `)
        .ilike('content', searchQuery)
        .eq('is_public', true)
        .limit(10)

      results.posts = posts || []
    }

    return NextResponse.json({
      success: true,
      data: results,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    )
  }
}
