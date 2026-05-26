'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/hooks/use-auth'
import { cn } from '@/lib/utils'

interface SidebarItem {
  label: string
  href: string
  icon: string
  adminOnly?: boolean
}

const sidebarItems: SidebarItem[] = [
  { label: 'Feed', href: '/feed', icon: '📰' },
  { label: 'Videos', href: '/videos', icon: '🎬' },
  { label: 'Courses', href: '/courses', icon: '📚' },
  { label: 'My Learning', href: '/my-learning', icon: '✅' },
  { label: 'Notifications', href: '/notifications', icon: '🔔' },
  { label: 'My Uploads', href: '/my-uploads', icon: '⬆️' },
  { label: 'Saved', href: '/saved', icon: '💾' },
  { label: 'Admin', href: '/admin', icon: '⚙️', adminOnly: true },
]

export function Sidebar({ className }: { className?: string }) {
  const { user } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const visibleItems = sidebarItems.filter(
    (item) => !item.adminOnly || user?.role === 'admin'
  )

  return (
    <aside
      className={cn(
        'hidden border-r border-border bg-card transition-all duration-300 md:block',
        collapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      <div className="flex h-screen flex-col">
        <div className="flex items-center justify-between border-b border-border p-4">
          {!collapsed && <span className="font-semibold">Menu</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded p-1 hover:bg-accent"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {visibleItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                title={collapsed ? item.label : undefined}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </nav>

        {user && !collapsed && (
          <div className="border-t border-border p-4">
            <p className="text-xs text-muted-foreground">
              Logged in as <strong>{user.displayName}</strong>
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}
