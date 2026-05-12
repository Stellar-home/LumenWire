'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageHeaderProps {
  title: string
  backHref?: string
}

// Reusable orange top header used on inner pages
export function PageHeader({ title, backHref = '/dashboard' }: PageHeaderProps) {
  return (
    <div className="bg-accent text-white px-4 py-4 flex items-center gap-3">
      <Link href={backHref} className="text-white hover:opacity-80 transition">
        <ArrowLeft className="w-5 h-5" />
      </Link>
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  )
}
