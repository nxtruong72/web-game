import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameService } from '../../service/games.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GameCardComponent } from '../game-item/game-card.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, NgFor, NgForOf, RouterLink, NgIf, GameCardComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  isLoading = false;
  isLogged = false;
  errMsg = null;
  today_games: Array<any> = [];
  incomming_games: Array<any> = [];
  historical_games: Array<any> = [];
  constructor(
    private _gameService: GameService,
  ) {}

  ngOnInit() {
    this.getGames();
  }

  private getGames() {
    this.isLoading = true;
    this._gameService
      .getGames()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(
        (data) => {
          this.today_games = data;
          this.incomming_games = data;
          this.historical_games = data;
        },
        (errorRes: HttpErrorResponse) => {
          this.errMsg = errorRes.error.message;
        },
      );
  }

  trackByFn(index: any, item: { id: any }) {
    return item.id;
  }
}
