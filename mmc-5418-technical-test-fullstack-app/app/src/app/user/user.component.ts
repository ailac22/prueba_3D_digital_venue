import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.setTransactions(this.route.snapshot.data['userInfo'].transactions)
  }

  ngOnInit(): void {}

  ngOnDestroy(): void { }


  public setTransactions(transactions: Transaction[]) {

    this.transactions = transactions;
    this.totalAmount = this.transactions.reduce((total, transaction) => total + transaction.amount, 0);
  }

  public onSubmit() {

    const purchaseInfo: PurchaseInfo = {
      //Se que en caso de que no sea un int no esta muy bien controlado...
      amount: parseInt(this.transactionForm.value.amount),
      detail: this.transactionForm.value.detail
    }

    this.userService.buy(purchaseInfo).subscribe((response) => {
      delete response.user
      this.setTransactions([...this.transactions, response])
    })
  }
}
