import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_CLIENT_PATH, GAMES_PATH } from '../common.const';
import { Game } from './game.interface';

@Injectable({
  providedIn: 'root',
})
export class GameApiService {
  constructor(private _http: HttpClient) {}

  getGames(): Observable<any> {
    return this._http.get<any>(`${BASE_CLIENT_PATH}${GAMES_PATH}`);
  }

  getGameDetailsById(id: string): Observable<Game> {
    return this._http.get<any>(`${BASE_CLIENT_PATH}${GAMES_PATH}/${id}`);
  }
}
