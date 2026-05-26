import * as React from 'react'
import { cn } from '@/lib/utils'

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { src?: string; alt?: string }
>(({ className, src, alt, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-secondary',
      className
    )}
    {...props}
  >
    {src ? (
      <img src={src} alt={alt || 'avatar'} className="h-full w-full object-cover" />
    ) : null}
  </div>
))
Avatar.displayName = 'Avatar'

export { Avatar }
