import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaSociosResponse } from '../types/requests';
import { TransactionSummary } from '../types/transaction';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  usersInfo: ListaSociosResponse;

  constructor(private adminService: AdminService, private route: ActivatedRoute) {

    this.usersInfo = this.route.snapshot.data['userInfo']

  }

  ngOnInit(): void {}
}
