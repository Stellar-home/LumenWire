'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Send, Download, TrendingUp, Smartphone, ShoppingCart } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { transactions } from '@/lib/transactions'
import type { TransactionType } from '@/lib/types'

function getIcon(type: TransactionType) {
  switch (type) {
    case 'receive': return <Download className="w-4 h-4 text-green-500" />
    case 'withdraw': return <TrendingUp className="w-4 h-4 text-orange-500" />
    case 'airtime': return <Smartphone className="w-4 h-4 text-accent" />
    case 'bill': return <ShoppingCart className="w-4 h-4 text-purple-500" />
    default: return <Send className="w-4 h-4 text-red-500" />
  }
}

function getLabel(type: TransactionType) {
  const map: Record<TransactionType, string> = { send: 'Transfer', receive: 'Received', withdraw: 'Withdrawal', airtime: 'Airtime', bill: 'Bill' }
  return map[type]
}

function monthKey(date: string) {
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function formatMonth(key: string) {
  const [y, m] = key.split('-')
  return new Date(+y, +m - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function TransactionsPage() {
  const [search, setSearch] = useState('')
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  const months = useMemo(() => {
    const keys = [...new Set(transactions.map((t) => monthKey(t.date)))]
    return keys.sort().reverse()
  }, [])

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchMonth = !selectedMonth || monthKey(tx.date) === selectedMonth
      const q = search.toLowerCase()
      const matchSearch = !q || tx.description.toLowerCase().includes(q) || tx.recipient.toLowerCase().includes(q)
      return matchMonth && matchSearch
    })
  }, [search, selectedMonth])

  const grouped = useMemo(() => {
    const g: Record<string, typeof transactions> = {}
    filtered.forEach((tx) => {
      const k = monthKey(tx.date)
      if (!g[k]) g[k] = []
      g[k].push(tx)
    })
    return Object.entries(g).sort(([a], [b]) => b.localeCompare(a))
  }, [filtered])

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title="All Transactions" />

      <div className="px-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
          <input type="text" placeholder="Search by name, amount..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground" />
        </div>

        {/* Month filter */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button onClick={() => setSelectedMonth(null)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${!selectedMonth ? 'bg-accent text-white' : 'bg-card border border-border hover:border-accent'}`}>
            All
          </button>
          {months.map((m) => (
            <button key={m} onClick={() => setSelectedMonth(m)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${selectedMonth === m ? 'bg-accent text-white' : 'bg-card border border-border hover:border-accent'}`}>
              {new Date(+m.split('-')[0], +m.split('-')[1] - 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped list */}
      <div className="px-4 space-y-6">
        {grouped.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No transactions found</div>
        ) : (
          grouped.map(([key, txs]) => (
            <div key={key} className="space-y-2">
              <h3 className="text-sm font-semibold sticky top-0 bg-background py-2 z-10">{formatMonth(key)}</h3>
              {txs.map((tx) => {
                const isDebit = tx.type !== 'receive'
                return (
                  <Link key={tx.id} href={`/dashboard/transactions/${tx.id}`} className="flex items-center justify-between bg-card border border-border hover:border-accent rounded-lg p-4 transition group">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition">
                        {getIcon(tx.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">{tx.description}</p>
                          <span className="text-xs font-semibold bg-accent/10 text-accent px-2 py-0.5 rounded flex-shrink-0">{getLabel(tx.type)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{tx.recipient}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className={`text-sm font-bold ${isDebit ? 'text-red-500' : 'text-green-500'}`}>{tx.amount} {tx.currency}</p>
                      <p className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
