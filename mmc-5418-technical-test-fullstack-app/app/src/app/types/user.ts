import { Transaction } from "./transaction"

export type User = {
    id: number,
    username: "janedoe",
    created: string
    updated: string
}

export interface UserWithTransactions extends User {
  transactions: Transaction[]
}
