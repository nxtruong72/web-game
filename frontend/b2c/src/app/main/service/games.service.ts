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
        this.games = data.content;

        return this.games;
      }),
    );
  }

  getGameDetails(id: string) {
    return this._gameAPIService.getGameDetails(id);
  }

  getRoundsByGameId(id: string) {
    return this._gameAPIService.getRoundsByGameId(id);
  }

  getBetsByRoundId(id: string) {
    return this._gameAPIService.getBetsByRoundId(id);
  }

  placeAbet(_roundInd: number, _teamBet: number, _amount: number) {
    return this._gameAPIService.placeAbet(_roundInd, _teamBet, _amount);
  }
}
