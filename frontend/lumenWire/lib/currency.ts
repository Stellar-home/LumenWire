import type { CurrencyType } from './types'

// Format a number as currency string
export function formatCurrency(amount: number, currency: CurrencyType): string {
  if (currency === 'NGN') {
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  if (currency === 'USDC') {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  // XLM
  return `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} XLM`
}
