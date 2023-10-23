import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { expiresAtIdent, tokenIdent } from 'src/app/types/constants';
import { LoginInfo } from 'src/app/types/login';
@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(loginInfo: LoginInfo) {

    console.log("login llamado");

    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    this.http.post('http://localhost:3000/login', loginInfo, { headers: headers })
      .subscribe(
       {
         next: (response) => {

           this.setLocalStorage(response);
         },

        error: (error) => {
          console.log(error);
        },

        complete: () => {
          console.log('done!');
          this.router.navigate(['protected']);
        }
       }
     );
  }

  setLocalStorage(responseObj) {

    const expiresAt = moment().add(Number.parseInt(responseObj.expiresIn), 'days');

    localStorage.setItem(tokenIdent, responseObj.token);
    localStorage.setItem(expiresAtIdent, JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem(tokenIdent);
    localStorage.removeItem(expiresAtIdent);
  }

  public isLoggedIn() {

    return moment().isBefore(this.getExpiration(), "second");
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
