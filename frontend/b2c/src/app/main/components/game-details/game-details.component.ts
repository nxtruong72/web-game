import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { GameService } from '../../service/games.service';
import { Subscription, finalize, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameCardComponent } from '../game-item/game-card.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { RoundCardComponent } from '../round-card/round-card.component';
import { GameTypesComponent } from '../game-types/game-types.component';
import { GameStatusComponent } from '../game-status/game-status.component';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  imports: [CommonModule, RouterLink, NgIf, GameCardComponent, RoundCardComponent, GameTypesComponent, GameStatusComponent],
  standalone: true,
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  game: any;
  gameId: any;
  incomming_games: Array<any> = [];

  safeSrc!: SafeResourceUrl;
  isLoading = false;

  _errMsg = '';
  _paramSub!: Subscription;
  constructor(
    private _gameService: GameService,
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this._paramSub = this._route.paramMap.subscribe((parmaMap) => {
      this.gameId = parmaMap.get('id');
      if (this.gameId) {
        this._getGameDetails(this.gameId);
        this._getGames();
      }
    });
  }
  ngOnDestroy(): void {
    this._paramSub?.unsubscribe();
  }
  private _getGameDetails(_id: string) {
    this.isLoading = true;
    this._gameService
      .getGameDetails(_id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(
        (game) => {
          if (game) {
            this.game = game;
            this.safeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(game.streamURL);
          }
        },
        (errorRes: HttpErrorResponse) => {
          this._errMsg = errorRes.error.message;
        },
      );
  }

  private _getGames() {
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
