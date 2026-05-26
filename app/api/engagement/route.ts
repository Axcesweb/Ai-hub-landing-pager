import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { likeContent, unlikeContent, followUser, unfollowUser, createComment } from '@/lib/services/engagement'

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

    const { action, contentType, contentId, targetUserId, text } = await request.json()

    switch (action) {
      case 'like':
        if (!contentType || !contentId) {
          return NextResponse.json(
            { success: false, error: 'Missing contentType or contentId' },
            { status: 400 }
          )
        }
        const like = await likeContent(user.id, contentType, contentId)
        return NextResponse.json({ success: true, data: like })

      case 'unlike':
        if (!contentType || !contentId) {
          return NextResponse.json(
            { success: false, error: 'Missing contentType or contentId' },
            { status: 400 }
          )
        }
        await unlikeContent(user.id, contentType, contentId)
        return NextResponse.json({ success: true })

      case 'follow':
        if (!targetUserId) {
          return NextResponse.json(
            { success: false, error: 'Missing targetUserId' },
            { status: 400 }
          )
        }
        if (user.id === targetUserId) {
          return NextResponse.json(
            { success: false, error: 'Cannot follow yourself' },
            { status: 400 }
          )
        }
        const follow = await followUser(user.id, targetUserId)
        return NextResponse.json({ success: true, data: follow })

      case 'unfollow':
        if (!targetUserId) {
          return NextResponse.json(
            { success: false, error: 'Missing targetUserId' },
            { status: 400 }
          )
        }
        await unfollowUser(user.id, targetUserId)
        return NextResponse.json({ success: true })

      case 'comment':
        if (!contentType || !contentId || !text) {
          return NextResponse.json(
            { success: false, error: 'Missing required fields' },
            { status: 400 }
          )
        }
        const comment = await createComment(user.id, contentType, contentId, text)
        return NextResponse.json({ success: true, data: comment })

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Engagement error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process engagement' },
      { status: 500 }
    )
  }
}
