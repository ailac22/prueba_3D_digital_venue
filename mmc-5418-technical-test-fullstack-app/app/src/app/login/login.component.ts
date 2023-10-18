import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm = this.fb.group({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  public asyncError: boolean = false;
  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}
  public onSubmit() {
    console.log(this.loginForm.value);
    // Submit post login to the API
    // Check asyncError on bad credentials
    // Redirect to the admin or user vew depending on role type
    let isadmin = false;
    if (isadmin) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user']);
    }
  }
}
