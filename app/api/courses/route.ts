import { NextRequest, NextResponse } from 'next/server'
import { Course } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '20'
    const category = searchParams.get('category')
    const level = searchParams.get('level')

    // Mock data
    const courses: Course[] = []

    return NextResponse.json({
      success: true,
      data: {
        courses,
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
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Mock create course
    return NextResponse.json(
      {
        success: true,
        data: {
          id: 'course-' + Date.now(),
          ...body,
          lessonCount: 0,
          studentCount: 0,
          rating: 0,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 400 }
    )
  }
}
