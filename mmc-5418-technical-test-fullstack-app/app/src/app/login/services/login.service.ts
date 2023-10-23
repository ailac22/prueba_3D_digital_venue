import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { expiresAtIdent, isAdminIdent, tokenIdent } from 'src/app/types/constants';
import { LoginInfo, LoginResponse } from 'src/app/types/login';
import { environment } from 'src/environments/environment';
@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(loginInfo: LoginInfo) {

    console.log("login llamado");

    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    this.http.post<LoginResponse>(`${environment.api.url}/login` , loginInfo, { headers: headers })
      .subscribe(
        {
          next: (response) => {
            this.setLocalStorage(response);
          },

          error: (error) => {
            console.log(error);
          },

          complete: () => {

            if (this.isAdmin())
              this.router.navigate(['/admin']);
            else
              this.router.navigate(['/user']);
          }
        }
      );
  }

  setLocalStorage(responseObj: LoginResponse) {

    const expiresAt = moment().add(responseObj.expiresIn, 'seconds');

    localStorage.setItem(tokenIdent, responseObj.token);
    localStorage.setItem(expiresAtIdent, JSON.stringify(expiresAt.valueOf()));

    localStorage.setItem(isAdminIdent, responseObj.isAdmin.toString());

  }

  logout() {
    localStorage.removeItem(tokenIdent);
    localStorage.removeItem(expiresAtIdent);
    localStorage.removeItem(isAdminIdent);
  }

  public isLoggedIn() {

    return moment().isBefore(this.getExpiration(), "second");
  }

  isAdmin() {
    return localStorage.getItem(isAdminIdent) === 'true'
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem(expiresAtIdent);
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    } else {
      return moment();
    }
  }
}
