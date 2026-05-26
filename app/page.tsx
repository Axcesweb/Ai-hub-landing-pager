import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-background px-4 py-24">
        <div className="max-w-2xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight">
            Welcome to AI Hub Network
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Learn cutting-edge AI, discover incredible courses, watch expert videos, and connect with a thriving creator community.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/feed">
              <Button size="lg">Explore Feed</Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Everything You Need to Learn & Create
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <div className="mb-2 text-3xl">🎬</div>
                <CardTitle>Video Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Discover amazing videos from creators worldwide with YouTube-style recommendations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 text-3xl">📚</div>
                <CardTitle>Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn from structured courses with lessons, materials, and progress tracking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 text-3xl">📰</div>
                <CardTitle>AI News</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Stay updated with latest AI news, trends, and breakthroughs in one place.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 text-3xl">👥</div>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with creators, follow your favorites, and engage with posts and comments.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-accent/5 px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-muted-foreground">
            Join thousands of learners and creators on AI Hub Network.
          </p>
          <Link href="/signup">
            <Button size="lg">Create Your Account</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-12">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>&copy; 2024 AI Hub Network. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
