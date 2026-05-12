'use client'

import { use } from 'react'
import Link from 'next/link'
import { Copy, Download, ExternalLink, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { transactions } from '@/lib/transactions'

const steps = [
  { name: 'Submitted', status: 'completed' },
  { name: 'Confirmed', status: 'completed' },
  { name: 'Processing', status: 'completed' },
  { name: 'Bridging', status: 'active' },
  { name: 'Delivered', status: 'pending' },
]

export default function TransactionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const tx = transactions.find((t) => t.id === id)
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(tx?.transactionHash ?? '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!tx) {
    return (
      <div className="px-4 py-8 text-center space-y-4">
        <p className="text-muted-foreground">Transaction not found.</p>
        <Link href="/dashboard/transactions" className="text-accent hover:underline text-sm">← Back</Link>
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title="Transaction Detail" backHref="/dashboard/transactions" />

      <div className="px-4 space-y-4">
        {/* Status card */}
        <Card className="bg-gradient-to-br from-accent/20 via-card to-card border-accent/30 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{tx.amount} {tx.currency}</h1>
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse inline-block" />
              In Progress
            </div>
          </div>
          <p className="text-muted-foreground">{tx.description}</p>
          <div className="flex gap-3 pt-2">
            <Button onClick={copy} variant="outline" className="gap-2 h-10 px-4 text-sm">
              <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy TX ID'}
            </Button>
            <Button variant="outline" className="gap-2 h-10 px-4 text-sm flex-1">
              <Download className="w-4 h-4" /> Download Receipt
            </Button>
          </div>
        </Card>

        {/* Timeline */}
        <Card className="p-6 space-y-6">
          <h3 className="font-semibold text-lg">Transaction Progress</h3>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={s.name} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${s.status === 'completed' ? 'bg-green-500/20 text-green-500' : s.status === 'active' ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}>
                    {s.status === 'completed' ? '✓' : i + 1}
                  </div>
                  {i < steps.length - 1 && <div className={`w-0.5 h-12 ${s.status === 'completed' ? 'bg-green-500/30' : 'bg-muted'}`} />}
                </div>
                <div className="pt-1">
                  <p className={`font-medium ${s.status === 'completed' ? 'text-green-500' : s.status === 'active' ? 'text-accent' : 'text-muted-foreground'}`}>{s.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.status === 'completed' ? '2 minutes ago' : s.status === 'active' ? 'Currently processing...' : 'Pending'}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-600">Your transaction is being bridged. This typically takes 2–5 minutes.</p>
          </div>
        </Card>

        {/* Details */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Transaction Details</h3>
          <div className="space-y-3 text-sm">
            {[
              ['From', 'GABC...XYZ123'],
              ['To', 'GBDE...ABC456'],
              ['Network Fee', '$0.50'],
              ['Bridge Fee', '$1.25'],
              ['Exchange Rate', '1 USDC = $1.00'],
              ['Total Paid', '$251.75'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-border last:border-b-0">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* More info */}
        {tx.transactionHash && (
          <Card className="p-6 space-y-3 text-sm">
            <h3 className="font-semibold">More Information</h3>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Transaction Hash</span>
              <a href={`https://stellar.expert/explorer/public/tx/${tx.transactionHash}`} target="_blank" rel="noreferrer" className="font-mono text-accent hover:underline flex items-center gap-1 text-xs">
                {tx.transactionHash.slice(0, 16)}... <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span>{tx.date}</span>
            </div>
          </Card>
        )}

        <Link href="/dashboard">
          <Button className="w-full h-12">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
