'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatRelativeTime } from '@/lib/utils'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false)

  return (
    <Card className="p-4">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {post.creator && (
            <>
              <Link href={`/profile/${post.creator.username}`}>
                <Avatar src={post.creator.avatarUrl || ''} alt={post.creator.displayName} />
              </Link>
              <div className="text-sm">
                <Link href={`/profile/${post.creator.username}`}>
                  <p className="font-medium hover:underline">{post.creator.displayName}</p>
                </Link>
                <p className="text-xs text-muted-foreground">{formatRelativeTime(post.createdAt)}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <p className="mb-3 text-sm">{post.content}</p>

      {/* Media */}
      {post.mediaUrls.length > 0 && (
        <div className="mb-3 grid gap-2">
          {post.mediaUrls.map((url) => (
            <img
              key={url}
              src={url}
              alt="Post media"
              className="h-64 w-full rounded-lg object-cover"
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLiked(!liked)}
          className="gap-2"
        >
          <span>{liked ? '❤️' : '🤍'}</span>
          <span>{post.likeCount + (liked ? 1 : 0)}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <span>💬</span>
          <span>{post.commentCount}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <span>↗️</span>
          <span>Share</span>
        </Button>
      </div>
    </Card>
  )
}
