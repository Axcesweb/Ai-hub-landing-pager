import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold">404</h1>
        <p className="mb-8 text-xl text-slate-600 dark:text-slate-400">
          Page not found
        </p>
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  )
}
