import { Timestamp } from "typeorm";
import { User as UserEntity } from "./entity"
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

declare global {
  namespace Express {
    interface User extends UserEntity {
      //Sólo con hacer el `extends UserEntity` ya tenemos disponibles en este tipo todos los campos 
      //que necesitamos de nuestra entidad user
    }
  }
}
