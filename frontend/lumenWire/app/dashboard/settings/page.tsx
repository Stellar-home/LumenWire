'use client'

import Link from 'next/link'
import { useApp } from '@/lib/app-context'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import type { CurrencyType } from '@/lib/types'

export default function SettingsPage() {
  const { userEmail, displayCurrency, setDisplayCurrency } = useApp()

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title="Settings" />

      <div className="px-4 space-y-4">
        {/* Account */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase px-1">Account</p>
          <Card className="p-4 space-y-3">
            <Link href="/dashboard/profile" className="flex items-center justify-between py-2 hover:opacity-80 transition">
              <span className="font-medium">My Profile</span>
              <span className="text-muted-foreground text-sm">→</span>
            </Link>
            <div className="border-t border-border" />
            <div className="flex items-center justify-between py-2">
              <span>Email Address</span>
              <span className="text-sm text-muted-foreground">{userEmail || 'Not set'}</span>
            </div>
          </Card>
        </div>

        {/* Security */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase px-1">Security &amp; Login</p>
          <Card className="p-4 space-y-3">
            <button className="w-full flex items-center justify-between py-2 hover:opacity-80 transition">
              <span className="font-medium">Login Settings</span>
              <span className="text-muted-foreground text-sm">→</span>
            </button>
            <div className="border-t border-border" />
            <button className="w-full flex items-center justify-between py-2 hover:opacity-80 transition">
              <span className="font-medium">Payment PIN</span>
              <span className="text-muted-foreground text-sm">→</span>
            </button>
          </Card>
        </div>

        {/* Notifications */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase px-1">Notifications</p>
          <Card className="p-4 space-y-3">
            {[
              { name: 'Transaction Alerts', enabled: true },
              { name: 'Security Alerts', enabled: true },
              { name: 'Marketing Emails', enabled: false },
            ].map((n) => (
              <div key={n.name} className="flex items-center justify-between py-2">
                <span className="text-sm">{n.name}</span>
                <div className={`w-10 h-6 rounded-full flex items-center ${n.enabled ? 'bg-accent' : 'bg-muted'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition ${n.enabled ? 'ml-auto mr-0.5' : 'ml-0.5'}`} />
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Preferences */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase px-1">Preferences</p>
          <Card className="p-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">Display Currency</label>
              <select value={displayCurrency} onChange={(e) => setDisplayCurrency(e.target.value as CurrencyType)} className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm">
                <option value="NGN">₦ NGN - Nigerian Naira</option>
                <option value="XLM">XLM - Stellar Lumens</option>
                <option value="USDC">$ USDC - USD Coin</option>
              </select>
            </div>
            <select className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm">
              <option>English</option>
              <option>Yoruba</option>
              <option>Igbo</option>
            </select>
          </Card>
        </div>

        {/* Support */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase px-1">Support</p>
          <Card className="p-4 space-y-2">
            {['Contact Support', 'FAQ', 'Send Feedback'].map((item) => (
              <div key={item}>
                <button className="w-full flex items-center justify-between py-2 hover:opacity-80 transition text-sm">
                  <span className="font-medium">{item}</span>
                  <span className="text-muted-foreground">→</span>
                </button>
                <div className="border-t border-border last:hidden" />
              </div>
            ))}
          </Card>
        </div>

        {/* About */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase px-1">About</p>
          <Card className="p-4 space-y-2">
            {['About LumenWire', 'Terms of Service', 'Privacy Policy'].map((item) => (
              <div key={item}>
                <button className="w-full flex items-center justify-between py-2 hover:opacity-80 transition text-sm">
                  <span className="font-medium">{item}</span>
                  <span className="text-muted-foreground">→</span>
                </button>
                <div className="border-t border-border last:hidden" />
              </div>
            ))}
            <p className="text-xs text-muted-foreground py-2">App Version: 1.0.0</p>
          </Card>
        </div>

        {/* Referral link */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase px-1">Referral</p>
          <Card className="p-4">
            <Link href="/dashboard/referral" className="flex items-center justify-between py-2 hover:opacity-80 transition">
              <span className="font-medium text-sm">Referral Program</span>
              <span className="text-muted-foreground">→</span>
            </Link>
          </Card>
        </div>

        {/* Danger zone */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-red-500 uppercase px-1">Danger Zone</p>
          <Card className="bg-red-50 border-red-200 p-4 space-y-2">
            <button className="w-full flex items-center justify-between py-2 hover:opacity-80 transition text-sm">
              <span className="text-red-600 font-medium">Deactivate Account</span>
              <span className="text-red-400">→</span>
            </button>
            <div className="border-t border-red-200" />
            <button className="w-full flex items-center justify-between py-2 hover:opacity-80 transition text-sm">
              <span className="text-red-600 font-medium">Delete Account</span>
              <span className="text-red-400">→</span>
            </button>
            <p className="text-xs text-red-500 py-1">Irreversible action. This will permanently delete your account and all data.</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
