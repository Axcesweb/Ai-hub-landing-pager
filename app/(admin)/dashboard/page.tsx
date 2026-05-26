'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboard() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Platform management and moderation tools
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12,450</p>
            <p className="mt-2 text-xs text-muted-foreground">+230 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3,842</p>
            <p className="mt-2 text-xs text-muted-foreground">+142 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Reports Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">24</p>
            <p className="mt-2 text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$24,580</p>
            <p className="mt-2 text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a href="/admin/moderation" className="block rounded p-3 hover:bg-accent">
            📋 Moderation Queue
          </a>
          <a href="/admin/users" className="block rounded p-3 hover:bg-accent">
            👥 User Management
          </a>
          <a href="/admin/analytics" className="block rounded p-3 hover:bg-accent">
            📊 Analytics
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
