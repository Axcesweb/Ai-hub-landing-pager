'use client'

import React, { useState, useEffect } from 'react'
import { VideoCard } from '@/components/video/video-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Video } from '@/lib/types'

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setVideos([])
      setIsLoading(false)
    }, 500)
  }, [])

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
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}
