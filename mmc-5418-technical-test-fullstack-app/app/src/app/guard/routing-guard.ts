import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../login/services/login.service";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const loginService = inject(LoginService)
  const router = inject(Router);

  console.log("a")
  if (loginService.isLoggedIn()) {
    if (loginService.isAdmin()) {

      console.log("b")
      return router.createUrlTree(['/admin']);

    }
    else {

      console.log("c")
      return router.createUrlTree(['/user']);
    }
  }


  console.log("d")
  return true
}

