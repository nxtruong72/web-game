import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GameApiService } from '../../../api/games/games.api';
import { Game } from '../../../api/games/game.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private _gameAPIService: GameApiService) {}

  getGames() {
    return this._gameAPIService.getGames().pipe(
      map((data) => {
        return data.content;
      }),
    );
  }

  getGameDetails(id: string): Observable<Game> {
    return this._gameAPIService.getGameDetailsById(id);
  }
}
