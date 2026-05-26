'use client'

import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function NotificationsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">
          Stay updated on activity from creators you follow
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">
          You&apos;re all caught up! No new notifications.
        </p>
      </div>
    </div>
  )
}
