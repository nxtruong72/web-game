import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_CLIENT_PATH, GAMES_PATH, ROUNDS_PATH } from '../common.const';
import { Bet } from './bet.interface';

@Injectable({
  providedIn: 'root',
})
export class BetApiService {
  constructor(private _http: HttpClient) {}

  findBetsByRoundId(id: number): Observable<any> {
    return this._http.get<any>(`${BASE_CLIENT_PATH}${GAMES_PATH}/${ROUNDS_PATH}/${id}/${ROUNDS_PATH}`);
  }

  placeAbet(_roundId: number, _teamBet: number, _amount: number): Observable<any> {
    return this._http.post<any>(`${BASE_CLIENT_PATH}${GAMES_PATH}/bet`, {
      roundInd: _roundId,
      teamBet: _teamBet,
      amount: _amount,
    });
  }
}
