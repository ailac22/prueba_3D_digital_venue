import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaSociosResponse } from 'src/app/types/requests';
import { TransactionSummary } from 'src/app/types/transaction';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders({ 'Content-type': 'application/json' });

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) {}

  getUserList(){

    return this.http.get<ListaSociosResponse>(`${environment.api.url}/private/users?related=transactions`, { headers: headers })

  }
}
