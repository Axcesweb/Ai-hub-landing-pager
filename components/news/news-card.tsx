'use client'

import React from 'react'
import Link from 'next/link'
import { News } from '@/lib/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatRelativeTime } from '@/lib/utils'

interface NewsCardProps {
  news: News
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Link href={news.sourceUrl} target="_blank" rel="noopener noreferrer">
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors hover:bg-black/20" />
        </div>

        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 font-semibold">{news.title}</h3>
            <Badge variant="secondary" className="shrink-0">
              {news.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">{news.content}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{news.sourceName}</span>
            <span>{formatRelativeTime(news.createdAt)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
