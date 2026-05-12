'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Send, Download, ArrowRightLeft, MoreHorizontal, Eye, EyeOff, TrendingUp, TrendingDown, Zap, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useApp } from '@/lib/app-context'
import { formatCurrency } from '@/lib/currency'
import { transactions } from '@/lib/transactions'

export default function DashboardPage() {
  const { displayCurrency, balances } = useApp()
  const [showBalance, setShowBalance] = useState(true)
  const [showMore, setShowMore] = useState(false)

  function getDisplayBalance() {
    if (displayCurrency === 'NGN') return balances.ngn
    if (displayCurrency === 'XLM') return balances.xlm
    return balances.usdc
  }

  return (
    <div className="space-y-6 pb-4">
      {/* Balance header */}
      <div className="bg-gradient-to-b from-accent to-orange-400 text-white px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm opacity-90 mb-1">Account Balance ({displayCurrency})</p>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold">
                {showBalance ? formatCurrency(getDisplayBalance(), displayCurrency) : '••••••••'}
              </h2>
              <button onClick={() => setShowBalance(!showBalance)} className="p-2 hover:bg-white/20 rounded-full transition">
                {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
        </div>
        <p className="text-xs opacity-80">Available for transfer</p>
      </div>

      {/* Quick actions */}
      <div className="px-4 grid grid-cols-4 gap-3">
        {[
          { href: '/dashboard/send', icon: Send, label: 'Transfer to Bank' },
          { href: '/dashboard/receive', icon: Download, label: 'Receive' },
          { href: '/dashboard/swap', icon: ArrowRightLeft, label: 'Swap' },
        ].map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border hover:border-accent hover:bg-accent/5 transition">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xs font-medium text-center leading-tight">{label}</span>
          </Link>
        ))}
        <button onClick={() => setShowMore(true)} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border hover:border-accent hover:bg-accent/5 transition">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5 text-accent" />
          </div>
          <span className="text-xs font-medium">More</span>
        </button>
      </div>

      {/* Holdings */}
      <div className="mx-4 space-y-2">
        <h3 className="text-sm font-semibold px-1">Your Holdings</h3>
        <div className="bg-gradient-to-r from-accent/10 to-orange-200/10 border border-accent/20 rounded-xl p-4 space-y-4">
          <p className="text-sm font-semibold">Total Portfolio Value</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">XLM</p>
                <p className="font-bold text-lg">{balances.xlm} XLM</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-green-500 font-medium">
                <TrendingUp className="w-3 h-3" /> +4.2%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">USDC</p>
                <p className="font-bold text-lg">${balances.usdc}</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                <TrendingDown className="w-3 h-3" /> -1.8%
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-2 border-t border-accent/20">24h change • Last updated 00:00 CMT</p>
        </div>
      </div>

      {/* Promo */}
      <div className="mx-4 bg-gradient-to-r from-accent/10 to-orange-200/10 border border-accent/20 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Get 5% Cashback</p>
          <p className="text-xs text-muted-foreground">on your next 5 transfers</p>
        </div>
        <button className="text-xs font-medium text-accent hover:underline">Claim</button>
      </div>

      {/* Recent activity */}
      <div className="px-4 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Recent Activity</h3>
          <Link href="/dashboard/transactions" className="text-xs text-accent font-medium hover:underline">See all</Link>
        </div>
        <div className="space-y-2">
          {transactions.slice(0, 4).map((tx) => (
            <Link key={tx.id} href={`/dashboard/transactions/${tx.id}`} className="flex items-center justify-between bg-card border border-border hover:border-accent rounded-lg p-3 transition group">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition">
                  {tx.type === 'receive' ? <Download className="w-4 h-4 text-green-500" /> : <Send className="w-4 h-4 text-accent" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <p className={`text-sm font-semibold flex-shrink-0 ml-2 ${tx.type === 'receive' ? 'text-green-500' : 'text-red-500'}`}>
                {tx.amount} {tx.currency}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* More modal */}
      {showMore && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <Card className="w-full max-w-2xl mx-auto rounded-t-3xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">More Services</h2>
              <button onClick={() => setShowMore(false)} className="p-2 hover:bg-secondary rounded-full transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-secondary rounded-lg p-4 text-center space-y-2">
              <p className="text-lg font-semibold">Coming Soon</p>
              <p className="text-sm text-muted-foreground">More services like insurance, investment, and savings will be available shortly.</p>
            </div>
            <Button onClick={() => setShowMore(false)} className="w-full h-11">Close</Button>
          </Card>
        </div>
      )}
    </div>
  )
}
