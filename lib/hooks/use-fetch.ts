'use client'

import { useState, useCallback, useEffect } from 'react'

interface UseFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: unknown
  skip?: boolean
}

interface UseFetchReturn<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  refetch: () => Promise<void>
}

export function useFetch<T = unknown>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { method = 'GET', headers, body, skip = false } = options

  const fetchData = useCallback(async () => {
    if (skip) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const fetchOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(headers || {}),
        },
      }

      if (body) {
        fetchOptions.body = JSON.stringify(body)
      }

      const response = await fetch(url, fetchOptions)

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`)
      }

      const result = await response.json()
      setData(result.data || result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }, [url, method, headers, body, skip])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    error,
    isLoading,
    refetch: fetchData,
  }
}
