'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Video } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { formatViewCount, formatDuration, formatRelativeTime } from '@/lib/utils'

interface VideoCardProps {
  video: Video
  variant?: 'grid' | 'row'
}

export function VideoCard({ video, variant = 'grid' }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const cardContent = (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {/* Thumbnail */}
      <div
        className="relative aspect-video overflow-hidden bg-muted"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors hover:bg-black/20">
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
            <div className="rounded-full bg-primary p-4">
              <svg
                className="h-6 w-6 text-primary-foreground"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 0 0 4 4.11V15.89a1.5 1.5 0 0 0 2.3 1.269l9.344-5.89a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
          {formatDuration(video.duration)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="line-clamp-2 font-semibold">{video.title}</h3>

        {/* Creator Info */}
        {video.creator && (
          <Link href={`/profile/${video.creator.username}`}>
            <div className="mt-3 flex items-center gap-2">
              <Avatar src={video.creator.avatarUrl || ''} alt={video.creator.displayName} />
              <div className="text-sm">
                <p className="font-medium">{video.creator.displayName}</p>
                <p className="text-xs text-muted-foreground">
                  {video.creator.followerCount} followers
                </p>
              </div>
            </div>
          </Link>
        )}

        {/* Stats */}
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatViewCount(video.viewCount)} views</span>
          <span>•</span>
          <span>{formatRelativeTime(video.createdAt)}</span>
        </div>

        {/* Tags */}
        {video.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {video.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  )

  return (
    <Link href={`/videos/${video.id}`}>
      {cardContent}
    </Link>
  )
}
