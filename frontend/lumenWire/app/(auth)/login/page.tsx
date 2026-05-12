'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useApp } from '@/lib/app-context'

export default function LoginPage() {
  const router = useRouter()
  const { setIsLoggedIn, setUserEmail } = useApp()

  const [step, setStep] = useState<'credentials' | 'otp'>('credentials')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (email && password) {
      setUserEmail(email)
      setStep('otp')
    }
  }

  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setIsLoggedIn(true)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Link href="/" className="p-4 text-accent self-start">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="flex-1 flex flex-col justify-between px-4 py-6">
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground text-sm">Sign in to your LumenWire account</p>
          </div>

          {step === 'credentials' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email or Phone</label>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button type="button" className="text-sm text-accent hover:underline font-medium">
                  Forgot password?
                </button>
              </div>
              <Button type="submit" disabled={!email || !password} className="w-full h-12">
                Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We&apos;ve sent a code to <span className="text-foreground font-medium">{email}</span>
              </p>
              <Input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="text-center text-3xl tracking-widest font-bold h-14"
              />
              <Button type="submit" disabled={otp.length !== 6} className="w-full h-12">
                Verify Code
              </Button>
              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="w-full text-sm text-accent hover:underline font-medium"
              >
                Back to sign in
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground pb-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-accent hover:underline font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
