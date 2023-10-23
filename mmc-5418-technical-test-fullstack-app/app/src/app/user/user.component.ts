import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PurchaseInfo } from '../types/requests';
import { Transaction } from '../types/transaction';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {

  transactions: Transaction[]
  totalAmount: number

  public transactionForm = this.fb.group({
    amount: new FormControl(''),
    detail: new FormControl(''),
  });
  constructor(
    private userService: UserService,
    private fb: FormBuilder) {}

  ngOnInit(): void {

    this.userService.getPurchases().subscribe(() => {


    })
  }
  ngOnDestroy(): void {}

  public onSubmit() {
    console.log(this.transactionForm.value);

    const purchaseInfo: PurchaseInfo = {
      //Se que en caso de que no sea un int no esta muy bien controlado...
      amount: parseInt(this.transactionForm.value.amount),
      detail: this.transactionForm.value.detail
    }

    console.log("pur info", purchaseInfo)


  }
}
