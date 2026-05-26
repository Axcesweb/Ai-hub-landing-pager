'use client'

import { useState, useEffect } from 'react'
import { VideoCard } from '@/components/video/video-card'
import { CourseCard } from '@/components/course/course-card'
import { PostCard } from '@/components/post/post-card'
import { NewsCard } from '@/components/news/news-card'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { CATEGORIES } from '@/lib/constants'
import { Video, Course, Post, News } from '@/lib/types'

export default function FeedPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [videos, setVideos] = useState<Video[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [news, setNews] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading feed data
    setTimeout(() => {
      // Mock data for demo
      setVideos([
        {
          id: '1',
          creatorId: 'creator1',
          title: 'Getting Started with AI: A Complete Guide',
          description: 'Learn the fundamentals of artificial intelligence',
          thumbnailUrl: 'https://images.unsplash.com/photo-1677442d019cecf74bbc2f2f521c8adb6ea696249?w=400&h=225&fit=crop',
          videoUrl: 'https://example.com/video.mp4',
          duration: 3600,
          category: 'AI & Machine Learning',
          tags: ['AI', 'Tutorial', 'Beginner'],
          viewCount: 15420,
          likeCount: 342,
          commentCount: 89,
          isPublished: true,
          visibility: 'public',
          creator: {
            id: 'creator1',
            email: 'creator@example.com',
            username: 'aicreator',
            displayName: 'AI Creator Pro',
            bio: 'Teaching AI to everyone',
            role: 'creator',
            isVerified: true,
            followerCount: 12500,
            followingCount: 250,
            createdAt: '2024-01-01',
            updatedAt: '2024-05-26',
          },
          createdAt: '2024-05-20',
          updatedAt: '2024-05-20',
        },
      ])
      setCourses([
        {
          id: 'course1',
          creatorId: 'creator1',
          title: 'Advanced Machine Learning Masterclass',
          description: 'Master ML algorithms and implementations',
          thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=225&fit=crop',
          category: 'AI & Machine Learning',
          level: 'advanced',
          price: 49.99,
          durationMinutes: 600,
          studentCount: 2340,
          rating: 4.8,
          lessonCount: 24,
          isPublished: true,
          creator: {
            id: 'creator1',
            email: 'creator@example.com',
            username: 'aicreator',
            displayName: 'AI Creator Pro',
            bio: 'Teaching AI to everyone',
            role: 'creator',
            isVerified: true,
            followerCount: 12500,
            followingCount: 250,
            createdAt: '2024-01-01',
            updatedAt: '2024-05-26',
          },
          createdAt: '2024-05-20',
          updatedAt: '2024-05-20',
        },
      ])
      setPosts([
        {
          id: 'post1',
          creatorId: 'creator1',
          content: 'Just launched our new AI course! Check it out and let me know what you think. The response has been amazing! 🚀',
          mediaUrls: ['https://images.unsplash.com/photo-1667372335032-757ca0fcf5db?w=400&h=300&fit=crop'],
          category: 'Announcement',
          likeCount: 1240,
          commentCount: 340,
          isPublished: true,
          creator: {
            id: 'creator1',
            email: 'creator@example.com',
            username: 'aicreator',
            displayName: 'AI Creator Pro',
            bio: 'Teaching AI to everyone',
            role: 'creator',
            isVerified: true,
            followerCount: 12500,
            followingCount: 250,
            createdAt: '2024-01-01',
            updatedAt: '2024-05-26',
          },
          createdAt: '2024-05-25',
          updatedAt: '2024-05-25',
        },
      ])
      setNews([
        {
          id: 'news1',
          title: 'OpenAI Releases New GPT Model with Enhanced Reasoning',
          content: 'The latest model shows significant improvements in logical reasoning and code generation...',
          sourceUrl: 'https://openai.com',
          sourceName: 'OpenAI Blog',
          imageUrl: 'https://images.unsplash.com/photo-1677442d019cecf74bbc2f2f521c8adb6ea696249?w=400&h=225&fit=crop',
          category: 'AI News',
          createdAt: '2024-05-26',
        },
      ])
      setIsLoading(false)
    }, 800)
  }, [activeCategory])

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
        <h1 className="mb-2 text-3xl font-bold">Discover</h1>
        <p className="text-muted-foreground">
          Find the latest videos, courses, and content from creators you love
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('all')}
          size="sm"
        >
          All
        </Button>
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category)}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Videos Section */}
      {videos.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Featured Videos</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      )}

      {/* Courses Section */}
      {courses.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Top Courses</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}

      {/* Posts Section */}
      {posts.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Community Posts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* News Section */}
      {news.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Latest News</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((newsItem) => (
              <NewsCard key={newsItem.id} news={newsItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
