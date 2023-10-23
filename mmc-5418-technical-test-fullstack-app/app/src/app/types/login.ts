import { User } from "./user"

export type LoginResponse = {
  success: boolean,
  token: string,
  user: User,
  isAdmin: boolean,
  expiresIn: number
}

export type LoginInfo = Partial<{
  username: string,
  password: string
}>

