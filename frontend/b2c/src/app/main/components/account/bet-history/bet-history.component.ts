import { NgFor, NgForOf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { BetHistoryService } from '../../../service/bets.service';

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.scss'],
  standalone: true,
  imports: [NgFor, NgForOf],
})
export class BetHistoryComponent implements OnInit {
  isLoading = false;
  errMsg = null;
  betHistory: Array<any> = [];
  constructor(private _service: BetHistoryService) {}

  ngOnInit() {
    this.getBets();
  }

  trackByFn(index: any, item: { id: any }) {
    return item.id;
  }

  private getBets() {
    this.isLoading = true;
    this._service
      .getBetHistory()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(
        (data) => {
          this.betHistory = data;
        },
        (errorRes: HttpErrorResponse) => {
          this.errMsg = errorRes.error.message;
        },
      );
  }
}
