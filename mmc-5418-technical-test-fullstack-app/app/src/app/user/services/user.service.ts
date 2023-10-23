import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseInfo, PurchaseResponse } from 'src/app/types/requests';
import { UserWithTransactions } from 'src/app/types/user';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders({ 'Content-type': 'application/json' });

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}


  buy(purchaseInfo: PurchaseInfo) {

     this.http.post<PurchaseResponse>(`${environment.api.url}/user/transaction`,purchaseInfo , { headers: headers })
       .subscribe({

          next: (response) => {


          },
       })

  }

  getPurchases(){

     return this.http.get<UserWithTransactions>(`${environment.api.url}/user?related=transactions`, { headers: headers })

  }

}
