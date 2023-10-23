import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private routeService: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  public logout() {

    this.loginService.logout()

    this.routeService.navigate(['/']);
  }
}
