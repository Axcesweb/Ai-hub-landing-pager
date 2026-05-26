'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface Report {
  id: string
  content_type: string
  content_id: string
  reason: string
  status: string
  created_at: string
  profiles: {
    username: string
    display_name: string
  }
}

export default function AdminDashboard() {
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('pending')

  useEffect(() => {
    fetchReports()
  }, [filter])

  const fetchReports = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/reports?status=${filter}&limit=20`)
      const result = await response.json()

      if (result.success) {
        setReports(result.data || [])
      }
    } catch (error) {
      console.error('[v0] Failed to fetch reports:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResolve = async (reportId: string) => {
    try {
      const response = await fetch('/api/admin/reports', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId,
          action: 'resolve',
          notes: 'Content removed',
        }),
      })

      if (response.ok) {
        fetchReports()
      }
    } catch (error) {
      console.error('[v0] Failed to resolve report:', error)
    }
  }

  const handleReject = async (reportId: string) => {
    try {
      const response = await fetch('/api/admin/reports', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId,
          action: 'reject',
          notes: 'Report not substantiated',
        }),
      })

      if (response.ok) {
        fetchReports()
      }
    } catch (error) {
      console.error('[v0] Failed to reject report:', error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-gray-600" />
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge variant="secondary">Resolved</Badge>
      case 'rejected':
        return <Badge variant="outline">Rejected</Badge>
      default:
        return <Badge>Pending</Badge>
    }
  }

  const pendingCount = reports.filter(r => r.status === 'pending').length
  const resolvedCount = reports.filter(r => r.status === 'resolved').length
  const rejectedCount = reports.filter(r => r.status === 'rejected').length

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Platform management and moderation tools
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{pendingCount}</p>
            <p className="mt-2 text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Resolved Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{resolvedCount}</p>
            <p className="mt-2 text-xs text-muted-foreground">Successfully actioned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Rejected Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{rejectedCount}</p>
            <p className="mt-2 text-xs text-muted-foreground">Not substantiated</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Moderation Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Content Reports</h2>
          <div className="flex gap-2">
            {['pending', 'resolved', 'rejected'].map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : reports.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No {filter} reports at this time
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(report.status)}
                          <span className="font-medium">
                            {report.content_type.charAt(0).toUpperCase() + report.content_type.slice(1)} Report
                          </span>
                          {getStatusBadge(report.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Reported by @{report.profiles?.username}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(report.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="rounded bg-muted p-3">
                      <p className="text-sm">
                        <span className="font-medium">Reason:</span> {report.reason}
                      </p>
                    </div>

                    {report.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleResolve(report.id)}
                        >
                          Resolve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(report.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
