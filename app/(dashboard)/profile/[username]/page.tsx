'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProfilePage() {
  const params = useParams()
  const username = params.username as string
  const [profile, setProfile] = useState<any>(null)
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [username])

  const fetchProfile = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/users?username=${username}`)
      const result = await response.json()

      if (result.success) {
        setProfile(result.data)
      }
    } catch (error) {
      console.error('[v0] Failed to fetch profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFollow = async () => {
    try {
      const response = await fetch('/api/engagement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isFollowing ? 'unfollow' : 'follow',
          targetUserId: profile?.id,
        }),
      })

      if (response.ok) {
        setIsFollowing(!isFollowing)
      }
    } catch (error) {
      console.error('[v0] Follow action failed:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-20 w-20 rounded-full" />
        <Skeleton className="h-10 w-48" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">User not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Banner */}
      {profile.cover_image_url && (
        <div className="relative h-64 w-full overflow-hidden rounded-lg bg-muted">
          <img
            src={profile.cover_image_url}
            alt="Banner"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Profile Header */}
      <div className="relative -mt-20 ml-6 flex gap-4">
        <Avatar src={profile.avatar_url || ''} alt={profile.display_name} />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{profile.display_name}</h1>
          <p className="text-muted-foreground">@{profile.username}</p>
          {profile.is_verified && <Badge className="mt-2">Verified</Badge>}
        </div>
        <div>
          <Button
            variant={isFollowing ? 'outline' : 'default'}
            onClick={handleFollow}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>
      </div>

      {/* Bio */}
      {profile.bio && <p className="text-sm text-muted-foreground">{profile.bio}</p>}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{(profile.followers_count || 0).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{profile.following_count || 0}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{videos.length}</p>
              <p className="text-sm text-muted-foreground">Videos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Creator Content</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Videos and courses from this creator will appear here
        </p>
      </div>
    </div>
  )
}
