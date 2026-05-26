import { put } from '@vercel/blob'

export async function uploadFile(file: File, folder: string = 'uploads') {
  try {
    const timestamp = Date.now()
    const filename = `${folder}/${timestamp}-${file.name}`
    
    const blob = await put(filename, file, {
      access: 'public',
    })

    return {
      url: blob.url,
      filename: blob.pathname,
    }
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}

export async function uploadImage(file: File) {
  return uploadFile(file, 'images')
}

export async function uploadVideo(file: File) {
  return uploadFile(file, 'videos')
}

export async function deleteFile(pathname: string) {
  try {
    await put(pathname, new Blob(), {
      access: 'public',
    })
  } catch (error) {
    console.error('Delete error:', error)
  }
}
