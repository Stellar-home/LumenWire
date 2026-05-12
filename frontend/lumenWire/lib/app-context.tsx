'use client'

import React, { createContext, useContext, useState } from 'react'
import type { CurrencyType, Transaction, Balances, ExchangeRates } from '@/lib/types'

interface AppContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (v: boolean) => void
  userEmail: string
  setUserEmail: (v: string) => void
  displayCurrency: CurrencyType
  setDisplayCurrency: (v: CurrencyType) => void
  balances: Balances
  exchangeRates: ExchangeRates
  selectedTransaction: Transaction | null
  setSelectedTransaction: (tx: Transaction | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [displayCurrency, setDisplayCurrency] = useState<CurrencyType>('NGN')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  // Static mock data — replace with real API calls later
  const balances: Balances = { xlm: 15.5, usdc: 250.75, ngn: 450000 }
  const exchangeRates: ExchangeRates = { xlmToNgn: 28000, usdcToNgn: 1550 }

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userEmail,
        setUserEmail,
        displayCurrency,
        setDisplayCurrency,
        balances,
        exchangeRates,
        selectedTransaction,
        setSelectedTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
