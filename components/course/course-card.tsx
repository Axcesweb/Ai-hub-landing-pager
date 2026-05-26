'use client'

import React from 'react'
import Link from 'next/link'
import { Course } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors hover:bg-black/20" />
          {course.price === 0 ? (
            <Badge className="absolute left-3 top-3 bg-green-500/90">Free</Badge>
          ) : (
            <Badge className="absolute left-3 top-3">${course.price}</Badge>
          )}
        </div>

        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
          </div>
          <Badge variant="outline" className="w-fit">
            {course.level}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Creator */}
          {course.creator && (
            <div className="flex items-center gap-2">
              <Avatar src={course.creator.avatarUrl || ''} alt={course.creator.displayName} />
              <div className="text-sm">
                <p className="font-medium">{course.creator.displayName}</p>
                <p className="text-xs text-muted-foreground">{course.category}</p>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>⭐ {course.rating.toFixed(1)}</span>
            <span>{course.studentCount} students</span>
            <span>{course.lessonCount} lessons</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
