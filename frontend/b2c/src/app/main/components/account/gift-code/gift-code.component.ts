import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftCodeService } from '../../../service/giftcode.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gift-code',
  templateUrl: './gift-code.component.html',
  styleUrls: ['./gift-code.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class GiftCodeComponent implements OnInit {
  isLoading = false;
  errMsg = null;
  activatedHistory: Array<any> = [];
  constructor(private _service: GiftCodeService) {}
  ngOnInit() {
    this.getTransactions();
  }

  trackByFn(index: any, item: { id: any }) {
    return item.id;
  }

  private getTransactions() {
    this.isLoading = true;
    this._service
      .getActivatedHistory()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(
        (data) => {
          this.activatedHistory = data;
        },
        (errorRes: HttpErrorResponse) => {
          this.errMsg = errorRes.error.message;
        },
      );
  }
}
