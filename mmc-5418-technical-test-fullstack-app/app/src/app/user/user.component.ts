import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  public transactionForm = this.fb.group({
    amount: new FormControl(''),
    detail: new FormControl(''),
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  public onSubmit() {
    console.log(this.transactionForm.value);
    // Send form to the API
    // Refresh user data
  }
}
