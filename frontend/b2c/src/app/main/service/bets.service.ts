import { Injectable } from '@angular/core';
import { AbstractService } from '../../state-management/abstract/abstract-service';
import { map, } from 'rxjs';
import { BetHistoryApiService } from '../../../api/auth/bets.api';

@Injectable({
  providedIn: 'root',
})
export class BetHistoryService extends AbstractService<any> {
  transactions: Array<any> = [];
  constructor(private _service: BetHistoryApiService) {
    super();
  }

  override ngOnInit(): void {
    this.view$.asObservable();
  }

  getBetHistory() {
    return this._service.getBetHistory().pipe(
      map((data) => {
        this.transactions = data.body;
        return this.transactions;
      }),
      // get user info
      // concatMap(() => this._userApiService.getUserInfo())
    );
  }
}
