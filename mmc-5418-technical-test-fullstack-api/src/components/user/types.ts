import { Timestamp } from "typeorm";

export interface UserCounts {
  id: number;
  username: string;
  created: Timestamp;
  totalAmount: number;
  totalTransactions: number;
  lastTransaction: Timestamp;
}
export interface UsersTotal {
  amount: number;
}
export interface UsersIndexResponse {
  data: UserCounts[];
  totals?: UsersTotal;
}
