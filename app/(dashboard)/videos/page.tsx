'use client'

import React, { useState, useEffect } from 'react'
import { VideoCard } from '@/components/video/video-card'
import { Skeleton } from '@/components/ui/skeleton'

export default function VideosPage() {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)

  useEffect(() => {
    fetchVideos()
  }, [page])

  const fetchVideos = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/videos?limit=20&offset=${page * 20}`)
      const result = await response.json()

      if (result.success) {
        setVideos(result.data || [])
      }
    } catch (error) {
      console.error('[v0] Failed to fetch videos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Videos</h1>
        <p className="text-muted-foreground">
          Browse all videos from creators on the platform
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="aspect-video" />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">No videos yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video: any) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}
