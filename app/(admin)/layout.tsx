import { Navbar } from '@/components/common/navbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
