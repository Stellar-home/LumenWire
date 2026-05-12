import { cn } from '@/lib/utils'

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-card rounded-xl border border-border', className)}
      {...props}
    />
  )
}
