'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Check, Loader, AlertCircle, Download, Share2, ExternalLink } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useApp } from '@/lib/app-context'
import { formatCurrency } from '@/lib/currency'

const BANKS = [
  { id: 1, name: 'GTBank' },
  { id: 2, name: 'Access Bank' },
  { id: 3, name: 'First Bank' },
  { id: 4, name: 'Zenith Bank' },
  { id: 5, name: 'FCMB' },
  { id: 6, name: 'UBA' },
  { id: 7, name: 'Stanbic IBTC' },
  { id: 8, name: 'Sterling Bank' },
]

type Step = 'details' | 'confirm' | 'processing' | 'success' | 'failed'

export default function SendPage() {
  const router = useRouter()
  const { exchangeRates } = useApp()

  const [step, setStep] = useState<Step>('details')
  const [nairaAmount, setNairaAmount] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [selectedBank, setSelectedBank] = useState<number | null>(null)
  const [bankVerified, setBankVerified] = useState(false)
  const [crypto, setCrypto] = useState('USDC')
  const [showBankDropdown, setShowBankDropdown] = useState(false)
  const [progress, setProgress] = useState(0)
  const [bankReference] = useState('BNK-' + Date.now())
  const [txHash] = useState('0x123abc456def789ghi...')

  const selectedBankData = BANKS.find((b) => b.id === selectedBank)
  const ngnAmount = parseFloat(nairaAmount) || 0
  const cryptoAmount = ngnAmount / (crypto === 'XLM' ? exchangeRates.xlmToNgn : exchangeRates.usdcToNgn)

  function verifyAccount() {
    if (!selectedBank || accountNumber.length !== 10) return
    setTimeout(() => { setAccountName('Chioma Adebayo'); setBankVerified(true) }, 500)
  }

  function handleConfirm() {
    setStep('processing')
    setTimeout(() => setProgress(50), 2000)
    setTimeout(() => { setProgress(100); setStep('success') }, 4000)
  }

  function reset() {
    setNairaAmount(''); setAccountNumber(''); setAccountName('')
    setSelectedBank(null); setBankVerified(false); setProgress(0)
    setStep('details')
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Processing Transaction</h2>
          <p className="text-muted-foreground text-sm">Please don&apos;t close this window</p>
        </div>
        <Loader className="w-12 h-12 text-accent animate-spin" />
        <div className="w-full max-w-sm space-y-3">
          {[{ label: 'Crypto Transaction', done: progress >= 50 }, { label: 'Bank Transfer', done: progress >= 100 }].map(({ label, done }) => (
            <div key={label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{label}</span>
                <span className="text-muted-foreground">{done ? 'Complete' : 'Processing'}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div className={`h-full transition-all duration-500 ${done ? 'bg-green-500 w-full' : 'bg-accent w-1/2'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (step === 'failed') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-6">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Transaction Failed</h2>
          <p className="text-muted-foreground">Unable to process your withdrawal</p>
        </div>
        <Card className="w-full max-w-sm bg-red-50 border-red-200 p-4">
          <p className="text-sm font-semibold text-red-700 mb-1">Reason</p>
          <p className="text-sm text-red-600">Insufficient balance in liquidity pool. Please try again later.</p>
        </Card>
        <div className="flex gap-3 w-full max-w-sm">
          <Button onClick={reset} className="flex-1 h-12">Try Again</Button>
          <Button onClick={() => router.push('/dashboard')} variant="outline" className="flex-1 h-12">Dashboard</Button>
        </div>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-6 pb-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
          <Check className="w-12 h-12 text-green-500" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Transfer Successful!</h2>
          <p className="text-muted-foreground text-sm">Your money is being transferred to your bank account</p>
        </div>
        <Card className="w-full max-w-sm p-6 space-y-3">
          {[
            ['Amount Sent', `${cryptoAmount.toFixed(6)} ${crypto}`],
            ['Received in Account', `₦${ngnAmount.toFixed(2)}`],
            ['Bank', selectedBankData?.name ?? ''],
            ['Account Name', accountName],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="text-muted-foreground text-sm">Status</span>
            <span className="text-green-500 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block" /> Completed
            </span>
          </div>
        </Card>
        <div className="w-full max-w-sm bg-secondary rounded-lg p-4 space-y-2 text-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Transaction References</p>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Bank Reference</span>
            <span className="font-mono text-xs font-semibold">{bankReference}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">Transaction Hash</span>
            <a href={`https://stellar.expert/explorer/public/tx/${txHash}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-accent font-mono text-xs font-semibold hover:underline">
              {txHash.slice(0, 16)}... <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        <div className="flex gap-3 w-full max-w-sm">
          <Button onClick={() => { reset(); router.push('/dashboard') }} className="flex-1 h-12">Back to Dashboard</Button>
          <Button variant="outline" className="h-12 px-4"><Download className="w-4 h-4" /></Button>
          <Button variant="outline" className="h-12 px-4"><Share2 className="w-4 h-4" /></Button>
        </div>
      </div>
    )
  }

  if (step === 'confirm') {
    return (
      <div className="space-y-4 pb-24">
        <PageHeader title="Confirm Withdrawal" backHref="/dashboard/send" />
        <div className="px-4">
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">From</p>
                <p className="font-medium">My Wallet</p>
              </div>
              <ArrowRight className="w-5 h-5 text-accent" />
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">To</p>
                <p className="font-medium">{selectedBankData?.name}</p>
              </div>
            </div>
            <div className="bg-secondary rounded-lg p-4 space-y-3">
              {[
                ['Amount in NGN', `₦${ngnAmount.toFixed(2)}`],
                ['Crypto amount', `${cryptoAmount.toFixed(6)} ${crypto}`],
                ['Processing fee', '₦50'],
                ['Account', accountNumber],
                ['Name', accountName],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer text-sm">
                <input type="checkbox" className="w-5 h-5 mt-0.5" defaultChecked />
                <span>I confirm all details are correct</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer text-sm">
                <input type="checkbox" className="w-5 h-5 mt-0.5" defaultChecked />
                <span>I understand crypto will be converted to NGN</span>
              </label>
            </div>
          </Card>
        </div>
        <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4 flex gap-3 max-w-2xl mx-auto">
          <Button onClick={() => setStep('details')} variant="outline" className="flex-1 h-12">Back</Button>
          <Button onClick={handleConfirm} className="flex-1 h-12">Transfer Now</Button>
        </div>
      </div>
    )
  }

  // details step
  return (
    <div className="space-y-4 pb-24">
      <PageHeader title="Transfer to Bank" />
      <div className="px-4 space-y-4">
        {/* Select crypto */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Crypto to Sell</label>
          <select value={crypto} onChange={(e) => setCrypto(e.target.value)} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground h-12">
            <option value="XLM">XLM - Stellar Lumens</option>
            <option value="USDC">USDC - USD Coin</option>
          </select>
        </div>

        {/* Bank selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Bank</label>
          <div className="relative">
            <button onClick={() => setShowBankDropdown(!showBankDropdown)} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-left font-medium text-foreground h-12 flex items-center justify-between">
              <span>{selectedBankData?.name || 'Choose bank'}</span>
              <span className="text-muted-foreground text-xs">▼</span>
            </button>
            {showBankDropdown && (
              <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-lg mt-1 max-h-48 overflow-y-auto z-50 shadow-lg">
                {BANKS.map((bank) => (
                  <button key={bank.id} onClick={() => { setSelectedBank(bank.id); setShowBankDropdown(false); setAccountName(''); setBankVerified(false) }} className="w-full text-left px-4 py-3 hover:bg-secondary border-b border-border last:border-b-0 text-sm">
                    {bank.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Account number */}
        {selectedBank && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Account Number</label>
            <div className="flex gap-2">
              <Input type="text" placeholder="0123456789" value={accountNumber} onChange={(e) => { setAccountNumber(e.target.value.slice(0, 10)); setBankVerified(false) }} maxLength={10} className="flex-1 h-12" />
              <Button onClick={verifyAccount} disabled={accountNumber.length !== 10 || bankVerified} className="h-12 px-4">
                {bankVerified ? 'Verified' : 'Verify'}
              </Button>
            </div>
            {bankVerified && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-600 font-medium mb-1">Account Name</p>
                <p className="text-sm font-semibold text-green-700">{accountName}</p>
              </div>
            )}
          </div>
        )}

        {/* Amount */}
        {bankVerified && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount to Sell (₦)</label>
            <Input type="number" placeholder="0" value={nairaAmount} onChange={(e) => setNairaAmount(e.target.value)} className="h-12 text-lg font-semibold" />
            {nairaAmount && (
              <Card className="bg-secondary p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">You&apos;ll receive</span>
                  <span className="font-bold">{cryptoAmount.toFixed(6)} {crypto}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Exchange rate</span>
                  <span>1 {crypto} = {formatCurrency(crypto === 'XLM' ? exchangeRates.xlmToNgn : exchangeRates.usdcToNgn, 'NGN')}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between text-sm">
                  <span className="font-medium">Processing fee</span>
                  <span>₦50</span>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4 max-w-2xl mx-auto">
        <Button onClick={() => setStep('confirm')} disabled={!nairaAmount || !accountName || !selectedBank} className="w-full h-12">
          Continue
        </Button>
      </div>
    </div>
  )
}
