'use client'

import { useState, useEffect } from 'react'
import { CourseCard } from '@/components/course/course-card'
import { Skeleton } from '@/components/ui/skeleton'

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/courses?limit=20&offset=0')
      const result = await response.json()

      if (result.success) {
        setCourses(result.data || [])
      }
    } catch (error) {
      console.error('[v0] Failed to fetch courses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Courses</h1>
        <p className="text-muted-foreground">
          Structured learning paths taught by expert creators
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="aspect-video" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">No courses yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course: any) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}
