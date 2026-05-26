import { NextRequest, NextResponse } from 'next/server'
import { getProfile, getProfileByUsername, searchUsers, updateProfile } from '@/lib/services/users'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const username = searchParams.get('username')
    const userId = searchParams.get('id')
    const search = searchParams.get('search')

    if (search) {
      const results = await searchUsers(search)
      return NextResponse.json({
        success: true,
        data: results,
      })
    }

    if (username) {
      const user = await getProfileByUsername(username)
      return NextResponse.json({
        success: true,
        data: user,
      })
    }

    if (userId) {
      const user = await getProfile(userId)
      return NextResponse.json({
        success: true,
        data: user,
      })
    }

    return NextResponse.json(
      { success: false, error: 'Username or ID required' },
      { status: 400 }
    )
  } catch (error) {
    console.error('User fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
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
    const updated = await updateProfile(user.id, body)

    return NextResponse.json({
      success: true,
      data: updated,
    })
  } catch (error) {
    console.error('User update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
