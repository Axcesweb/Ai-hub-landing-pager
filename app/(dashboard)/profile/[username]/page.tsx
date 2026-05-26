'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { User } from '@/lib/types'

export default function ProfilePage() {
  const params = useParams()
  const username = params.username as string
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setUser({
        id: 'user1',
        email: 'creator@example.com',
        username: username,
        displayName: 'AI Creator',
        bio: 'Passionate about teaching AI and machine learning',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        bannerUrl: 'https://images.unsplash.com/photo-1677442d019cecf74bbc2f2f521c8adb6ea696249?w=1200&h=300&fit=crop',
        role: 'creator',
        isVerified: true,
        followerCount: 12500,
        followingCount: 450,
        createdAt: '2024-01-01',
        updatedAt: '2024-05-26',
      })
      setIsLoading(false)
    }, 500)
  }, [username])

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-20 w-20 rounded-full" />
        <Skeleton className="h-10 w-48" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">User not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Banner */}
      {user.bannerUrl && (
        <div className="relative h-64 w-full overflow-hidden rounded-lg bg-muted">
          <img
            src={user.bannerUrl}
            alt="Banner"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Profile Header */}
      <div className="relative -mt-20 ml-6 flex gap-4">
        <Avatar src={user.avatarUrl || ''} alt={user.displayName} />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{user.displayName}</h1>
          <p className="text-muted-foreground">@{user.username}</p>
          {user.isVerified && <Badge className="mt-2">Verified</Badge>}
        </div>
        <div>
          <Button
            variant={isFollowing ? 'outline' : 'default'}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-muted-foreground">{user.bio}</p>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{user.followerCount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{user.followingCount}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Videos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Content Coming Soon</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This profile page will soon display videos, courses, and posts from this creator.
        </p>
      </div>
    </div>
  )
}
