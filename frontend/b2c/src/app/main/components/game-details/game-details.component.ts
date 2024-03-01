import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { GameService } from '../../service/games.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  imports: [CommonModule, RouterLink, NgIf],
  standalone: true,
})
export class GameDetailsComponent {
  _game: any;
  _isLoading = false;
  _errMsg = '';
  incomming_games: Array<any> = [];
  constructor(private _gameService: GameService) {}
  ngOnInit() {
    this._getGameDetails('1');
    this._getGames();
  }
  private _getGameDetails(_id: string) {
    this._isLoading = true;
    this._gameService
      .getGameDetails(_id)
      .pipe(
        finalize(() => {
          this._isLoading = false;
        }),
      )
      .subscribe(
        (data) => {
          console.log(data);
          this._game = data;
        },
        (errorRes: HttpErrorResponse) => {
          this._errMsg = errorRes.error.message;
        },
      );
  }

  private _getGames() {
    this._isLoading = true;
    this._gameService
      .getGames()
      .pipe(
        finalize(() => {
          this._isLoading = false;
        }),
      )
      .subscribe(
        (data) => {
          this.incomming_games = data;
        },
        (errorRes: HttpErrorResponse) => {
          this._errMsg = errorRes.error.message;
        },
      );
  }

  trackByFn(index: any, item: { id: any }) {
    return item.id;
  }
}
