import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BettingOddsApiService } from '../../../api/betting-odds/betting-odds.api';
import { IBettingOdds, INewGame } from '../../../api/betting-odds/betting-odds.interface';

@Injectable({
  providedIn: 'root',
})
export class BettingOddsService {
  constructor(private _bettingOddsApiService: BettingOddsApiService) {}

  getGames(): Observable<IBettingOdds> {
    return this._bettingOddsApiService.getGames();
  }

  newGame(body: INewGame): Observable<any> {
    return this._bettingOddsApiService.newGame(body);
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
