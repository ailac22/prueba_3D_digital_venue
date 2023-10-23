import { Component, OnInit } from '@angular/core';
import { ListaSociosResponse } from '../types/requests';
import { TransactionSummary } from '../types/transaction';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  usersInfo: ListaSociosResponse;

  ngOnInit(): void {

    this.adminService.getUserList().subscribe((usersInfo) => {


      this.usersInfo = usersInfo
    })
  }
}
