'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Gift, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/referral', label: 'Referral', icon: Gift },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function Footer() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border">
      <div className="mx-auto max-w-2xl flex justify-around items-center h-16 px-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-1 py-2 px-4 transition',
                active ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
