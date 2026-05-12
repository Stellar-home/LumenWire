import type { Transaction } from './types'

export const transactions: Transaction[] = [
  { id: '1', type: 'send', description: 'Transfer to John', recipient: 'John D.', amount: '-5,000', currency: 'NGN', date: '2026-04-15', timestamp: 1713181200000, status: 'completed', transactionHash: '0xabc123def456...', bankReference: 'BNK-1713181200000' },
  { id: '2', type: 'receive', description: 'Payment from Alice', recipient: 'Alice M.', amount: '+10,000', currency: 'NGN', date: '2026-04-14', timestamp: 1713094800000, status: 'completed' },
  { id: '3', type: 'airtime', description: 'Airtime purchase', recipient: 'MTN', amount: '-2,500', currency: 'NGN', date: '2026-04-13', timestamp: 1713008400000, status: 'completed' },
  { id: '4', type: 'bill', description: 'Electricity bill', recipient: 'DISCO', amount: '-8,000', currency: 'NGN', date: '2026-04-12', timestamp: 1712922000000, status: 'completed' },
  { id: '5', type: 'send', description: 'Transfer to Sarah', recipient: 'Sarah K.', amount: '-3,500', currency: 'NGN', date: '2026-04-10', timestamp: 1712749200000, status: 'completed' },
  { id: '6', type: 'receive', description: 'Salary deposit', recipient: 'Employer', amount: '+150,000', currency: 'NGN', date: '2026-04-01', timestamp: 1711922400000, status: 'completed' },
  { id: '7', type: 'send', description: 'Transfer to Mike', recipient: 'Mike T.', amount: '-7,000', currency: 'NGN', date: '2026-03-28', timestamp: 1711576800000, status: 'completed' },
  { id: '8', type: 'bill', description: 'Internet bill', recipient: 'ISP', amount: '-5,000', currency: 'NGN', date: '2026-03-25', timestamp: 1711317600000, status: 'completed' },
  { id: '9', type: 'receive', description: 'Freelance payment', recipient: 'Client', amount: '+25,000', currency: 'NGN', date: '2026-03-20', timestamp: 1710885600000, status: 'completed' },
  { id: '10', type: 'receive', description: 'Bonus payment', recipient: 'Company', amount: '+75,000', currency: 'NGN', date: '2026-01-31', timestamp: 1706659200000, status: 'completed' },
]
