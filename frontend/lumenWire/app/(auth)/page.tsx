import Link from 'next/link'
import { Zap, Lock, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  { icon: Zap, title: 'Instant Transfers', desc: 'Send money in seconds' },
  { icon: Lock, title: 'Bank-Grade Security', desc: 'Your money is safe' },
  { icon: TrendingUp, title: 'No Hidden Fees', desc: 'See exactly what you pay' },
]

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col px-4">
      {/* Top bar */}
      <div className="flex justify-between items-center py-4">
        <h1 className="text-xl font-bold text-accent">LumenWire</h1>
        <Link href="/login">
          <Button variant="ghost" className="text-accent hover:bg-accent/10 px-4 py-2">
            Login
          </Button>
        </Link>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col justify-between py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              Send &amp; Receive Money Instantly
            </h2>
            <p className="text-base text-muted-foreground">
              Fast, secure payments with zero hidden fees. Available 24/7.
            </p>
          </div>

          <div className="space-y-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3 items-start">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3 pb-6">
          <Link href="/signup" className="block">
            <Button className="w-full h-12">Create Account</Button>
          </Link>
          <Link href="/login" className="block">
            <Button variant="outline" className="w-full h-12">
              I Already Have an Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
