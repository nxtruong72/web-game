import { NgFor, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../service/transactions.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
  standalone: true,
  imports: [NgFor, NgForOf],
})
export class TransactionHistoryComponent implements OnInit {
  isLoading = false;
  errMsg = null;
  transactions: Array<any> = [];
  constructor(private _service: TransactionService) {}

  ngOnInit() {
    this.getTransactions();
  }

  trackByFn(index: any, item: { id: any }) {
    return item.id;
  }

  private getTransactions() {
    this.isLoading = true;
    this._service
      .getGames()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(
        (data) => {
          this.transactions = data;
        },
        (errorRes: HttpErrorResponse) => {
          this.errMsg = errorRes.error.message;
        },
      );
  }
}
