import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { ListaSociosResponse } from '../types/requests';
import { AdminService } from './services/admin.service';


export const adminDataResolver: ResolveFn<ListaSociosResponse> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<ListaSociosResponse> => {

  const adminService = inject(AdminService)

  return adminService.getUserList()
}

