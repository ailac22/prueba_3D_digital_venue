import { User } from "./user"

export type PurchaseInfo = Partial<{
    amount: number,
    detail: string
}>

export type PurchaseResponse =
{
  amount: number,
  detail: string,
  user: User,
  id: number,
  created: string,
  updated: string
}

export type Transaction = {
  id: number,
  detail: string,
  amount: number,
  created: string,
  updated: string
}
