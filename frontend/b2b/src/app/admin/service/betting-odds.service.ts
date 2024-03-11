import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BettingOddsApiService } from '../../../api/betting-odds/betting-odds.api';
import { IBettingOdds } from '../../../api/betting-odds/betting-odds.interface';
import { getStandardValue } from '../../../shared/until.helper';

@Injectable({
  providedIn: 'root',
})
export class BettingOddsService {
  constructor(private _bettingOddsApiService: BettingOddsApiService) {}

  createGame(): Observable<IBettingOdds> {
    return this._bettingOddsApiService.getGames().pipe(
      map((games: IBettingOdds) => {
        games.content = [
          {
            id: getStandardValue('02122023'),
            name: getStandardValue('AOE IAC: TA1 - SHS P5'),
            form: getStandardValue('Cung - Chém'),
            status: getStandardValue('Sắp diễn ra'),
            startDate: getStandardValue('30/12/2023 09:00:00'),
            total: getStandardValue(null),
            profit: getStandardValue(null),
          },
          {
            id: getStandardValue('02122023'),
            name: getStandardValue('AOE IAC: TA1 - SHS P5'),
            form: getStandardValue('Cung - Chém'),
            status: getStandardValue('Sắp diễn ra'),
            startDate: getStandardValue('30/12/2023 09:00:00'),
            total: getStandardValue(null),
            profit: getStandardValue(null),
          },
        ];
        return games;
      }),
    );
  }

  createRoundGame(gameId: number): Observable<any> {
    return this._bettingOddsApiService.createRoundGame(gameId);
  }

  startGame(gameId: number): Observable<any> {
    return this._bettingOddsApiService.startGame(gameId);
  }

  endGame(gameId: number, roundId: number): Observable<any> {
    return this._bettingOddsApiService.endGame(gameId, roundId);
  }
}
