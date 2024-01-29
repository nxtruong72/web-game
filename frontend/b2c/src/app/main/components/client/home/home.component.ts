import { Component, OnInit } from '@angular/core';
import { NgFor, NgForOf } from "@angular/common";
import { GameService } from '../../../service/games.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [NgFor, NgForOf],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  errMsg = null;
  today_games: Array<any> = [];
  incomming_games: Array<any> = [];
  historical_games: Array<any> = [];
  constructor(
    private _gameService: GameService
  ) { }

  ngOnInit() {
    this.getGames()
  }

  trackByFn(index: any, item: { id: any; }) {
    return item.id;
  }

  private getGames() {
    this.isLoading = true
    this._gameService
        .getGames()
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
        )
        .subscribe(
          (data) => {
            this.today_games = data
            this.incomming_games = data
            this.historical_games = data
          },
          (errorRes: HttpErrorResponse) => {
            this.errMsg = errorRes.error.message;
          },
        );
  }

}
