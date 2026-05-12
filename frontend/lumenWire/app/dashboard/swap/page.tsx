'use client'

import { ArrowDownUp } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SwapPage() {
  return (
    <div className="space-y-4 pb-4">
      <PageHeader title="Swap Crypto" />
      <div className="px-4 space-y-4">
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">You Send</label>
            <div className="flex gap-2">
              <input type="number" placeholder="0.00" className="flex-1 bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground" />
              <select className="bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-medium">
                <option>XLM</option>
                <option>USDC</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="p-2 hover:bg-accent/10 rounded-full transition">
              <ArrowDownUp className="w-6 h-6 text-accent" />
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">You Receive</label>
            <div className="flex gap-2">
              <input type="number" placeholder="0.00" disabled className="flex-1 bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground opacity-60 cursor-not-allowed" />
              <select className="bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-medium">
                <option>USDC</option>
                <option>XLM</option>
              </select>
            </div>
          </div>

          <div className="bg-secondary rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Exchange Rate</span>
              <span className="font-medium">1 XLM = 0.055 USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fee</span>
              <span className="font-medium">0.5%</span>
            </div>
          </div>

          <Button className="w-full h-12">Swap Now</Button>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">Swaps are processed instantly on the Stellar blockchain with minimal fees.</p>
        </div>
      </div>
    </div>
  )
}
