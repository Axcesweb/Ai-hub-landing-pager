'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/hooks/use-auth'
import { useTheme } from '@/lib/hooks/use-theme'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-primary" />
          <span className="text-lg font-bold">AI Hub Network</span>
        </Link>

        {/* Center Navigation */}
        <div className="hidden gap-1 md:flex">
          <Link href="/feed" className="rounded px-3 py-2 text-sm hover:bg-accent">
            Feed
          </Link>
          <Link href="/courses" className="rounded px-3 py-2 text-sm hover:bg-accent">
            Courses
          </Link>
          <Link href="/news" className="rounded px-3 py-2 text-sm hover:bg-accent">
            News
          </Link>
          <Link href="/explore" className="rounded px-3 py-2 text-sm hover:bg-accent">
            Explore
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleTheme()}
            className="hidden sm:flex"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link href={`/profile/${user.username}`}>
                <Avatar src={user.avatarUrl || ''} alt={user.displayName} />
              </Link>
              <Button
                variant="ghost"
                onClick={logout}
                className="hidden sm:inline-flex"
              >
                Logout
              </Button>
              {user.role === 'admin' && (
                <Badge variant="destructive" className="hidden sm:inline-flex">
                  Admin
                </Badge>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
