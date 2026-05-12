'use client'

import { useState } from 'react'
import { Copy, Share2, Users, TrendingUp } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const REFERRAL_CODE = 'LW-JOHN2024'

const downlines = [
  { id: 1, name: 'Alice M.', joinDate: '2024-02-15', status: 'active', commission: 25000 },
  { id: 2, name: 'John D.', joinDate: '2024-02-20', status: 'active', commission: 35000 },
  { id: 3, name: 'Sarah K.', joinDate: '2024-03-10', status: 'inactive', commission: 15000 },
  { id: 4, name: 'Mike T.', joinDate: '2024-03-15', status: 'active', commission: 50000 },
]

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)
  const [withdrawMode, setWithdrawMode] = useState<'fiat' | 'crypto' | null>(null)

  function copy() {
    navigator.clipboard.writeText(REFERRAL_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title="Referral Program" backHref="/dashboard/settings" />

      <div className="px-4 space-y-4">
        {/* Referral code */}
        <Card className="bg-gradient-to-r from-accent/20 to-orange-300/10 border-accent/30 p-6 space-y-4">
          <h3 className="font-semibold">Your Referral Code</h3>
          <div className="bg-white rounded-lg p-4 font-bold text-center text-lg tracking-widest text-accent border border-accent/20">
            {REFERRAL_CODE}
          </div>
          <Button onClick={copy} className="w-full h-11 gap-2">
            <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy Code'}
          </Button>
          <Button variant="outline" className="w-full h-11 gap-2">
            <Share2 className="w-4 h-4" /> Share
          </Button>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <p className="text-xs text-muted-foreground">Total Referrals</p>
            </div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-green-500">8 active</p>
          </Card>
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <p className="text-xs text-muted-foreground">Total Commission</p>
            </div>
            <p className="text-2xl font-bold">₦125K</p>
            <p className="text-xs text-accent">+₦45K pending</p>
          </Card>
        </div>

        {/* Commission breakdown */}
        <Card className="p-4 space-y-3">
          <h3 className="font-semibold">Commission Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pending Commission</span>
              <span className="font-semibold">₦45K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Withdrawn</span>
              <span className="font-semibold text-green-500">₦80K</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-semibold">Available to Withdraw</span>
              <span className="font-bold text-accent">₦45K</span>
            </div>
          </div>
        </Card>

        <Button onClick={() => setWithdrawMode('fiat')} className="w-full h-12">Withdraw Commission</Button>

        {/* Withdrawal method */}
        {withdrawMode && (
          <Card className="p-4 space-y-4 border-accent">
            <h3 className="font-semibold">Withdrawal Method</h3>
            <div className="grid grid-cols-2 gap-3">
              {(['fiat', 'crypto'] as const).map((m) => (
                <button key={m} onClick={() => setWithdrawMode(m)} className={`p-4 rounded-lg border-2 transition ${withdrawMode === m ? 'border-accent bg-accent/5' : 'border-border hover:border-accent'}`}>
                  <p className="font-semibold capitalize">{m}</p>
                  <p className="text-xs text-muted-foreground">{m === 'fiat' ? 'To Bank Account' : 'To Wallet'}</p>
                </button>
              ))}
            </div>
            <Button className="w-full h-11">Withdraw ₦45K</Button>
          </Card>
        )}

        {/* Downlines */}
        <div className="space-y-3">
          <h3 className="font-semibold">Your Downlines</h3>
          {downlines.map((d) => (
            <Card key={d.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{d.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">Joined {d.joinDate}</p>
                  <span className={`inline-block text-xs font-medium mt-2 px-2 py-1 rounded ${d.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-accent">₦{(d.commission / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">Commission</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
