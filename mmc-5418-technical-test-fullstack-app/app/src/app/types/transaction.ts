
export type Transaction = {
  id: number,
  detail: string,
  amount: number,
  created: Date,
  updated: Date
}


export type TransactionSummary = {
  id: number,
  username: string,
  totalAmount: string,
  totalTransactions: string,
  mostRecentTransactionDate: Date
}
