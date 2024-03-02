import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { BASE_PATH, GAMES_PATH } from '../common.const';

@Injectable({
  providedIn: 'root',
})
export class GameApiService {
  constructor(private _http: HttpClient) {}

  getGames(): Observable<any> {
    return this._http.get<any>(`${BASE_PATH}${GAMES_PATH}`);
  }

  getGameDetails(id: string): Observable<any> {
    return this._http.get<any>(`${BASE_PATH}${GAMES_PATH}/${id}`);
  }

  getRoundsByGameId(id: string): Observable<any> {
    return this._http.get<any>(`${BASE_PATH}${GAMES_PATH}/${id}/rounds`);
  }

  getBetsByRoundId(id: string): Observable<any> {
    return this._http.get<any>(`${BASE_PATH}${GAMES_PATH}/rounds/${id}/bets`);
  }

  placeAbet(_roundInd: number, _teamBet: number, _amount: number): Observable<any> {
    return this._http.post<any>(`${BASE_PATH}${GAMES_PATH}/bet`, {
      roundInd: _roundInd,
      teamBet: _teamBet,
      amount: _amount,
    });
  }
  
}
