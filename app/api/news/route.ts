import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured') === 'true'

    const supabase = await createClient()

    let query = supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    if (featured) {
      query = query.eq('is_featured', true)
    }

    const { data: news, error } = await query.range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: news,
      count: news?.length || 0,
    })
  } catch (error) {
    console.error('News fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
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

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (!profile?.is_admin) {
      return NextResponse.json(
        { success: false, error: 'Only admins can create news' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { data: news, error } = await supabase
      .from('news')
      .insert([body])
      .select()

    if (error) throw error

    return NextResponse.json(
      { success: true, data: news[0] },
      { status: 201 }
    )
  } catch (error) {
    console.error('News creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create news' },
      { status: 500 }
    )
  }
}
