import { Injectable } from '@angular/core';
import { AbstractService } from '../../state-management/abstract/abstract-service';
import { map } from 'rxjs';
import { TransactionApiService } from '../../../api/transactions/transactions.api';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends AbstractService<any> {
  transactions: Array<any> = [];
  constructor(private _service: TransactionApiService) {
    super();
  }

  override ngOnInit(): void {
    this.view$.asObservable();
  }

  getGames() {
    return this._service.getTransaction().pipe(
      map((data) => {
        this.transactions = data.body;
        return this.transactions;
      }),
      // get user info
      // concatMap(() => this._userApiService.getUserInfo())
    );
  }
}
