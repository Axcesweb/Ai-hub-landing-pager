import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getPosts } from '@/lib/services/posts'
import { getVideos } from '@/lib/services/videos'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      // Return public feed if not authenticated
      const posts = await getPosts(10, 0)
      const videos = await getVideos(10, 0)
      
      return NextResponse.json({
        success: true,
        data: {
          posts: posts || [],
          videos: videos || [],
        },
      })
    }

    // Get user's following list
    const { data: followings } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', user.id)

    const followingIds = followings?.map(f => f.following_id) || []

    // Get posts from followed users and own posts
    const { data: posts } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:user_id (
          username,
          display_name,
          avatar_url,
          is_verified
        )
      `)
      .in('user_id', [...followingIds, user.id])
      .order('created_at', { ascending: false })
      .limit(20)

    // Get videos from followed users
    const { data: videos } = await supabase
      .from('videos')
      .select(`
        *,
        profiles:user_id (
          username,
          display_name,
          avatar_url,
          is_verified
        )
      `)
      .in('user_id', [...followingIds, user.id])
      .order('created_at', { ascending: false })
      .limit(20)

    return NextResponse.json({
      success: true,
      data: {
        posts: posts || [],
        videos: videos || [],
      },
    })
  } catch (error) {
    console.error('Feed fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch feed' },
      { status: 500 }
    )
  }
}
