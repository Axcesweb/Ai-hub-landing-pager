import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check admin status
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (!profile?.is_admin) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') || 'pending'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const { data: reports, error } = await supabase
      .from('reports')
      .select(`
        id,
        content_type,
        content_id,
        reason,
        status,
        created_at,
        profiles:reporter_id (username, display_name)
      `)
      .eq('status', status)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: reports,
      count: reports?.length || 0,
    })
  } catch (error) {
    console.error('Reports fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
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

    // Check admin status
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (!profile?.is_admin) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      )
    }

    const { reportId, action, notes } = await request.json()

    if (!reportId || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing reportId or action' },
        { status: 400 }
      )
    }

    const updates: any = {
      status: action === 'resolve' ? 'resolved' : 'rejected',
      admin_notes: notes,
      resolved_at: new Date().toISOString(),
    }

    const { data: report, error } = await supabase
      .from('reports')
      .update(updates)
      .eq('id', reportId)
      .select()

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: report[0],
    })
  } catch (error) {
    console.error('Report update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update report' },
      { status: 500 }
    )
  }
}
