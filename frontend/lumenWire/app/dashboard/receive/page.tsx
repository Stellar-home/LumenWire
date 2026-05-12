'use client'

import { useState } from 'react'
import { Copy, Share2, Download } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const XLM_WALLET = 'GBBD47UZM2HXF5C3B5HCHXKORMEVJDJHTX5LQTLFM7FDXYJX2MTVJPG'
const USDC_WALLET = 'GABC1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234'
const ACCOUNT_NUMBER = '0123456789'

export default function ReceivePage() {
  const [tab, setTab] = useState<'fiat' | 'crypto'>('fiat')
  const [copied, setCopied] = useState(false)

  function copy(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title="Receive Money" />

      {/* Toggle */}
      <div className="px-4 flex gap-2">
        {(['fiat', 'crypto'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${tab === t ? 'bg-accent text-white' : 'bg-card border border-border text-foreground hover:border-accent'}`}>
            {t === 'fiat' ? 'Fiat (Bank)' : 'Crypto (Wallet)'}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-4">
        {tab === 'fiat' ? (
          <Card className="p-5 space-y-4">
            <h3 className="font-semibold">Your Account Number</h3>
            <div className="bg-secondary rounded-lg p-4 text-center font-bold text-lg tracking-widest">{ACCOUNT_NUMBER}</div>
            <Button onClick={() => copy(ACCOUNT_NUMBER)} className="w-full h-11 gap-2">
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Account Number'}
            </Button>
            <Button variant="outline" className="w-full h-11 gap-2">
              <Share2 className="w-4 h-4" /> Share
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {[{ label: 'XLM Wallet Address', address: XLM_WALLET }, { label: 'USDC Wallet Address', address: USDC_WALLET }].map(({ label, address }) => (
              <Card key={label} className="p-5 space-y-3">
                <h3 className="font-semibold text-sm">{label}</h3>
                <div className="bg-secondary rounded-lg p-3 break-all text-xs font-mono">{address}</div>
                <Button onClick={() => copy(address)} className="w-full h-10 gap-2 text-sm">
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : `Copy ${label.split(' ')[0]} Address`}
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* QR Code placeholder */}
        <Card className="p-5 space-y-4 flex flex-col items-center">
          <h3 className="font-semibold w-full">Scan to Receive</h3>
          <div className="w-48 h-48 bg-white p-3 rounded-lg border border-border flex items-center justify-center">
            <div className="w-full h-full border-4 border-black relative flex items-center justify-center">
              <div className="absolute top-2 left-2 w-6 h-6 border-2 border-black border-r-0 border-b-0" />
              <div className="absolute top-2 right-2 w-6 h-6 border-2 border-black border-l-0 border-b-0" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-2 border-black border-r-0 border-t-0" />
              <span className="text-xs font-bold text-black">QR Code</span>
            </div>
          </div>
          <Button variant="outline" className="w-full h-11 gap-2">
            <Download className="w-4 h-4" /> Download QR Code
          </Button>
        </Card>

        {/* Payment link */}
        <Card className="p-5 space-y-4">
          <h3 className="font-semibold">Create Payment Link</h3>
          <input type="number" placeholder="Amount (optional)" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground" />
          <input type="text" placeholder="Description" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground" />
          <Button className="w-full h-11">Generate Link</Button>
        </Card>

        {/* Recent deposits */}
        <div className="space-y-3">
          <h3 className="font-semibold">Recent Deposits</h3>
          {[
            { amount: '₦5,000', from: 'Alice M.', time: '2 hours ago' },
            { amount: '₦10,000', from: 'John D.', time: 'Yesterday' },
            { amount: '₦3,500', from: 'Sarah K.', time: '2 days ago' },
          ].map((d) => (
            <div key={d.from} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{d.from}</p>
                <p className="text-xs text-muted-foreground">{d.time}</p>
              </div>
              <p className="font-bold text-green-500">{d.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
