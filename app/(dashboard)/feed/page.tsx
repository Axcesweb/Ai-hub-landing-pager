'use client'

import { useState, useEffect } from 'react'
import { VideoCard } from '@/components/video/video-card'
import { PostCard } from '@/components/post/post-card'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CATEGORIES } from '@/lib/constants'

export default function FeedPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [videos, setVideos] = useState([])
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFeedData()
  }, [])

  const fetchFeedData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/feed')
      const result = await response.json()

      if (result.success) {
        setVideos(result.data.videos || [])
        setPosts(result.data.posts || [])
      }
    } catch (error) {
      console.error('[v0] Failed to fetch feed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="aspect-video" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="mb-2 text-3xl font-bold">Your Feed</h1>
        <p className="text-muted-foreground">
          Check out the latest posts and videos from creators you follow
        </p>
      </div>

      {/* Content Sections */}
      {videos.length === 0 && posts.length === 0 ? (
        <Card>
          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              No content in your feed yet. Follow some creators to get started!
            </p>
          </div>
        </Card>
      ) : (
        <>
          {/* Videos Section */}
          {videos.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Videos</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video: any) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          )}

          {/* Posts Section */}
          {posts.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Community Posts</h2>
              <div className="space-y-4">
                {posts.map((post: any) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
