// All shared TypeScript types for LumenWire

export type CurrencyType = 'NGN' | 'XLM' | 'USDC'

export type TransactionType = 'send' | 'receive' | 'withdraw' | 'airtime' | 'bill'

export interface Transaction {
  id: string
  type: TransactionType
  description: string
  recipient: string
  amount: string
  currency: string
  date: string
  timestamp: number
  status: 'completed' | 'pending' | 'failed'
  transactionHash?: string
  bankReference?: string
}

export interface Balances {
  xlm: number
  usdc: number
  ngn: number
}

export interface ExchangeRates {
  xlmToNgn: number
  usdcToNgn: number
}
