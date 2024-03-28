import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BetHistoryApiService } from '../../../api/bets.api';
import { BetApiService } from '../../../api/bets/bet.api';

@Injectable({
  providedIn: 'root',
})
export class BetService {
  constructor(
    private _betHistoryApi: BetHistoryApiService,
    private _betApiService: BetApiService,
  ) {}

  getBetHistory() {
    return this._betHistoryApi.getBetHistory().pipe(
      map((data) => {
        return data.body;
      }),
    );
  }

  finBetsByRoundId(roundId: number) {
    return this._betApiService.findBetsByRoundId(roundId);
  }

  placeAbet(_roundId: number, _teamBet: number, _amount: number) {
    return this._betApiService.placeAbet(_roundId, _teamBet, _amount);
  }
}
