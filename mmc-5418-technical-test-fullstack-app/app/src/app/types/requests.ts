import { Transaction } from "./transaction"
import { User } from "./user"

export type PurchaseInfo = Partial<{
    amount: number,
    detail: string
}>

export interface PurchaseResponse extends Transaction {
  user: User
}
