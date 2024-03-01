import { Injectable } from '@angular/core';
import { AbstractService } from '../../state-management/abstract/abstract-service';
import { map } from 'rxjs';
import { GameApiService } from '../../../api/games/games.api';

@Injectable({
  providedIn: 'root',
})
export class GameService extends AbstractService<any> {
  games: Array<any> = [];
  constructor(private _gameAPIService: GameApiService) {
    super();
  }

  override ngOnInit(): void {
    this.view$.asObservable();
  }

  getGames() {
    return this._gameAPIService.getGames().pipe(
      map((data) => {
        this.games = data.body;
        return this.games;
      }),
    );
  }

  getGameDetails(id: string) {
    return this._gameAPIService.getGameDetails(id)
  }
}
