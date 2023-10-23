import { inject } from "@angular/core"
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"
import { PurchaseInfo } from "../types/requests"
import { UserWithTransactions } from "../types/user"
import { UserService } from "./services/user.service"

export const UserDataResolver: ResolveFn<UserWithTransactions> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<UserWithTransactions> => {

  const adminService = inject(UserService)

  return adminService.getPurchases()
}

