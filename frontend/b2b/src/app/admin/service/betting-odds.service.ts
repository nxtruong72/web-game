import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BettingOddsApiService } from '../../../api/betting-odds/betting-odds.api';
import { IBettingOdds } from '../../../api/betting-odds/betting-odds.interface';

@Injectable({
  providedIn: 'root',
})
export class BettingOddsService {
  constructor(private _bettingOddsApiService: BettingOddsApiService) {}

  createGame(): Observable<IBettingOdds> {
    return this._bettingOddsApiService.getGames();
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
