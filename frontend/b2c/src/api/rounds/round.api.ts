import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_CLIENT_PATH, GAMES_PATH, ROUNDS_PATH } from '../common.const';
import { Round } from './round.interface';

@Injectable({
  providedIn: 'root',
})
export class RoundApiService {
  constructor(private _http: HttpClient) {}

  findRoundsByGameId(gameId: number): Observable<any> {
    return this._http.get<any>(`${BASE_CLIENT_PATH}${GAMES_PATH}/${gameId}/${ROUNDS_PATH}`);
  }

  getRoundDetailsByRoundId(roundID: number): Observable<Round> {
    return this._http.get<any>(`${BASE_CLIENT_PATH}${GAMES_PATH}/${ROUNDS_PATH}/${roundID}`);
  }
}
