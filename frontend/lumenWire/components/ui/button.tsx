import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'default' && 'bg-accent text-accent-foreground hover:bg-orange-600',
        variant === 'outline' && 'border border-border bg-transparent text-foreground hover:border-accent',
        variant === 'ghost' && 'bg-transparent text-foreground hover:bg-secondary',
        className
      )}
      {...props}
    />
  )
}
