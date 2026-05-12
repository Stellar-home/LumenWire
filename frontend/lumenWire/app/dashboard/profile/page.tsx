'use client'

import { useState } from 'react'
import { Edit2, Copy, Star, X } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useApp } from '@/lib/app-context'

const XLM_WALLET = 'GBBD47UZM2HXF5C3B5HCHXKORMEVJDJHTX5LQTLFM7FDXYJX2MTVJPG'
const USDC_WALLET = 'GABC1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234'

const tiers = [
  { name: 'Silver', limit: '₦5,000,000', features: ['Basic transfers', 'Limited withdrawals'], current: false },
  { name: 'Gold', limit: '₦10,000,000', features: ['Unlimited transfers', 'Priority support'], current: true },
  { name: 'Platinum', limit: '₦50,000,000', features: ['VIP transfers', 'Dedicated support'], current: false },
]

type KycStep = 'nin-bvn' | 'selfie' | null

export default function ProfilePage() {
  const { userEmail } = useApp()
  const [copied, setCopied] = useState(false)
  const [kycStep, setKycStep] = useState<KycStep>(null)

  function copy(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title="My Profile" backHref="/dashboard/settings" />

      <div className="px-4 space-y-4">
        {/* Profile header */}
        <Card className="bg-gradient-to-br from-accent/20 to-card border-accent/30 p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4 flex-1">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                J
              </div>
              <div>
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-sm text-muted-foreground">+234 (903) 555-0123</p>
                <p className="text-sm text-muted-foreground">{userEmail || 'john.doe@example.com'}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-accent/10 rounded-lg transition">
              <Edit2 className="w-5 h-5 text-accent" />
            </button>
          </div>
        </Card>

        {/* Tier */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Current Tier</h3>
            <div className="flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-bold text-accent">Gold</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monthly Limit</span>
              <span className="font-bold">₦10,000,000</span>
            </div>
            <div className="bg-secondary rounded-full h-2 overflow-hidden">
              <div className="bg-accent h-full w-1/4 transition-all" />
            </div>
            <p className="text-xs text-muted-foreground">₦2,450,000 / ₦10,000,000 used</p>
          </div>
          <Button onClick={() => setKycStep('selfie')} className="w-full h-11">Upgrade to Platinum</Button>
        </Card>

        {/* Wallets */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase px-1">Wallet Addresses</p>
          <Card className="p-4 space-y-3">
            {[{ label: 'XLM Wallet', addr: XLM_WALLET }, { label: 'USDC Wallet', addr: USDC_WALLET }].map(({ label, addr }) => (
              <div key={label}>
                <p className="text-xs font-medium text-muted-foreground mb-2">{label}</p>
                <div className="flex items-center gap-2 bg-secondary rounded-lg p-3">
                  <span className="font-mono text-xs truncate flex-1">{addr}</span>
                  <button onClick={() => copy(addr)} className="p-1 hover:bg-muted rounded transition flex-shrink-0">
                    <Copy className="w-4 h-4 text-accent" />
                  </button>
                </div>
              </div>
            ))}
            {copied && <p className="text-xs text-green-500 font-medium text-center">Copied to clipboard!</p>}
          </Card>
        </div>

        {/* Account details */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase px-1">Account Details</p>
          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground text-sm">Status</span>
              <span className="text-xs text-green-500 font-medium bg-green-100 px-2 py-1 rounded">Verified</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-border">
              <span className="text-muted-foreground text-sm">Member Since</span>
              <span className="text-sm">January 15, 2024</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-border">
              <span className="text-muted-foreground text-sm">Total Transactions</span>
              <span className="font-bold">142</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-border">
              <span className="text-muted-foreground text-sm">Total Transferred</span>
              <span className="font-bold">₦2,450,000</span>
            </div>
          </Card>
        </div>

        {/* All tiers */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase px-1">All Tiers</p>
          <div className="space-y-2">
            {tiers.map((tier) => (
              <Card key={tier.name} className={`p-4 ${tier.current ? 'bg-accent/5 border-accent' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold">{tier.name}</h4>
                    {tier.current && <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full font-semibold">Current</span>}
                  </div>
                  <span className="text-sm text-muted-foreground">{tier.limit}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tier.features.map((f) => (
                    <span key={f} className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded">{f}</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* KYC modal */}
      {kycStep && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <Card className="w-full max-w-2xl mx-auto rounded-t-3xl p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Verify Your Identity</h2>
              <button onClick={() => setKycStep(null)} className="p-2 hover:bg-secondary rounded-full transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            {kycStep === 'nin-bvn' && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Provide your NIN and BVN to upgrade to Gold tier</p>
                <input type="text" placeholder="11-digit NIN" maxLength={11} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground" />
                <input type="text" placeholder="11-digit BVN" maxLength={11} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground" />
                <Button className="w-full h-11">Continue</Button>
              </div>
            )}
            {kycStep === 'selfie' && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Upload a selfie and confirm wallet addresses for Platinum tier</p>
                <button className="w-full border-2 border-dashed border-border rounded-lg py-8 flex flex-col items-center justify-center hover:border-accent transition">
                  <span className="text-accent font-medium">+ Upload Photo</span>
                </button>
                <Button className="w-full h-11">Complete Upgrade</Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
