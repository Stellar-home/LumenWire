'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useApp } from '@/lib/app-context'

type Step = 'form' | 'kyc' | 'done'

export default function SignupPage() {
  const router = useRouter()
  const { setUserEmail } = useApp()

  const [step, setStep] = useState<Step>('form')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nin, setNin] = useState('')
  const [bvn, setBvn] = useState('')

  function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    if (email && password && password === confirmPassword) {
      setUserEmail(email)
      setStep('kyc')
    }
  }

  function handleKYC(e: React.FormEvent) {
    e.preventDefault()
    if (nin.length === 11 && bvn.length === 11) setStep('done')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Link href="/" className="p-4 text-accent self-start">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="flex-1 flex flex-col justify-between px-4 py-6">
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-muted-foreground text-sm">Get started in just a few minutes</p>
          </div>

          {step === 'form' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <Input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <label className="flex items-start gap-3 text-sm cursor-pointer">
                <input type="checkbox" className="w-4 h-4 mt-1" defaultChecked />
                <span className="text-muted-foreground">I agree to the Terms of Service and Privacy Policy</span>
              </label>
              <Button type="submit" disabled={!email || !password || !confirmPassword} className="w-full h-12">
                Create Account
              </Button>
            </form>
          )}

          {step === 'kyc' && (
            <form onSubmit={handleKYC} className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">Verify Your Identity</h2>
                <p className="text-sm text-muted-foreground">Required for KYC compliance</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">National ID (NIN)</label>
                <Input
                  type="text"
                  placeholder="11-digit NIN"
                  value={nin}
                  onChange={(e) => setNin(e.target.value.replace(/\D/g, '').slice(0, 11))}
                  maxLength={11}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bank Verification Number (BVN)</label>
                <Input
                  type="text"
                  placeholder="11-digit BVN"
                  value={bvn}
                  onChange={(e) => setBvn(e.target.value.replace(/\D/g, '').slice(0, 11))}
                  maxLength={11}
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                Your NIN and BVN are required for KYC compliance and to unlock higher transaction limits.
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep('form')} className="flex-1 h-12">
                  Back
                </Button>
                <Button type="submit" disabled={nin.length !== 11 || bvn.length !== 11} className="flex-1 h-12">
                  Continue
                </Button>
              </div>
            </form>
          )}

          {step === 'done' && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Account Created</h2>
                  <p className="text-muted-foreground text-sm">Welcome to LumenWire!</p>
                </div>
              </div>
              {['Account created successfully', 'Email verified', 'Ready to use'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
              <Button onClick={() => router.push('/dashboard')} className="w-full h-12">
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>

        {step !== 'done' && (
          <p className="text-center text-sm text-muted-foreground pb-6">
            Already have an account?{' '}
            <Link href="/login" className="text-accent hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
