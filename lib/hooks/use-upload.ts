'use client'

import { useState, useCallback } from 'react'

interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

interface UseUploadReturn {
  upload: (file: File) => Promise<string>
  progress: UploadProgress | null
  isLoading: boolean
  error: Error | null
}

export function useUpload(): UseUploadReturn {
  const [progress, setProgress] = useState<UploadProgress | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const upload = useCallback(async (file: File): Promise<string> => {
    setIsLoading(true)
    setError(null)
    setProgress(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const xhr = new XMLHttpRequest()

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentage = (e.loaded / e.total) * 100
          setProgress({
            loaded: e.loaded,
            total: e.total,
            percentage,
          })
        }
      })

      return new Promise((resolve, reject) => {
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText)
            resolve(response.url)
          } else {
            reject(new Error('Upload failed'))
          }
        })

        xhr.addEventListener('error', () => {
          reject(new Error('Upload error'))
        })

        xhr.open('POST', '/api/upload')
        xhr.send(formData)
      })
    } catch (err) {
      const uploadError = err instanceof Error ? err : new Error('Upload failed')
      setError(uploadError)
      throw uploadError
    } finally {
      setIsLoading(false)
      setProgress(null)
    }
  }, [])

  return { upload, progress, isLoading, error }
}
