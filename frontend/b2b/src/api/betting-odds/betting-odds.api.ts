import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_PATH } from '../common.const';
import { IBettingOdds, INewGame } from './betting-odds.interface';
import { PayloadService } from '../../app/service/payload.service';
@Injectable({
  providedIn: 'root',
})
export class BettingOddsApiService {
  private readonly CREATE_GAME_PATH = 'b2b/games';
  private readonly CREATE_ROUND_PATH = (gameId: number) => `b2b/games/${gameId}/rounds`;
  private readonly START_GAME_PATH = (gameId: number) => `b2b/games/${gameId}/start`;
  private readonly END_GAME_PATH = (gameId: number, roundId: number) => `/b2b/games/${gameId}/rounds/${roundId}/end`;

  constructor(
    private _http: HttpClient,
    private _payloadService: PayloadService,
  ) {}

  getGames(): Observable<IBettingOdds> {
    const pagination = this._payloadService.getPaginationParam();
    const params = new HttpParams().set('size', pagination.size).set('number', pagination.number);
    return this._http.get<IBettingOdds>(`${BASE_PATH}${this.CREATE_GAME_PATH}`, { params });
  }

  newGame(body: INewGame): Observable<any> {
    return this._http.post<INewGame>(`${BASE_PATH}${this.CREATE_GAME_PATH}`, body);
  }

  createRoundGame(gameId: number): Observable<any> {
    return this._http.get<any>(`${BASE_PATH}${this.CREATE_ROUND_PATH(gameId)}`);
  }

  startGame(gameId: number): Observable<any> {
    return this._http.post(`${BASE_PATH}${this.START_GAME_PATH(gameId)}`, {});
  }

  endGame(gameId: number, roundId: number): Observable<any> {
    return this._http.get<any>(`${BASE_PATH}${this.END_GAME_PATH(gameId, roundId)}`);
  }
}
