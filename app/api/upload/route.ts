import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Mock file upload to Vercel Blob
    // In production, use @vercel/blob to upload
    const mockUrl = `https://storage.example.com/${file.name}`

    return NextResponse.json({
      success: true,
      data: {
        url: mockUrl,
        name: file.name,
        size: file.size,
        type: file.type,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    )
  }
}
