import { Injectable } from '@angular/core';
import { AbstractService } from '../../state-management/abstract/abstract-service';
import { map } from 'rxjs';
import { GiftCodeApiService } from '../../../api/auth/giftcode.api';

@Injectable({
  providedIn: 'root',
})
export class GiftCodeService extends AbstractService<any> {
  transactions: Array<any> = [];
  constructor(private _service: GiftCodeApiService) {
    super();
  }

  override ngOnInit(): void {
    this.view$.asObservable();
  }

  getActivatedHistory() {
    return this._service.getActivatedHistory().pipe(
      map((data) => {
        this.transactions = data.body;
        return this.transactions;
      }),
      // get user info
      // concatMap(() => this._userApiService.getUserInfo())
    );
  }
}
