import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundService } from '../../service/round.service';
import { Observable, finalize } from 'rxjs';
import { Round } from '../../../../api/rounds/round.interface';
import { Nullable } from 'primeng/ts-helpers';
import { HttpErrorResponse } from '@angular/common/http';
import { RoundAlertComponent } from '../round-alert/round-alert.component';
import { RoundsHistoryModalComponent } from '../rounds-history-modal/rounds-history-modal.component';
import { BetModalComponent } from '../bet-modal/bet-modal.component';
import { Game } from '../../../../api/games/game.interface';

@Component({
  selector: 'app-round-card',
  standalone: true,
  imports: [CommonModule, RoundAlertComponent, RoundsHistoryModalComponent, BetModalComponent],
  templateUrl: './round-card.component.html',
  styleUrls: ['./round-card.component.scss'],
})
export class RoundCardComponent implements OnInit, OnDestroy {
  private _gameId!: number;
  @Input() game!: Game;
  @Input() set gameId(game: number) {
    this._gameId = game;
    this.load();
  }
  get gameId(): number {
    return this._gameId;
  }
  selectedTeam!: number;
  round$!: Observable<Round | Nullable>;
  isLoading = false;
  errMsg = '';

  constructor(private _roundService: RoundService) {
    this.round$ = this._roundService.round$;
  }

  ngOnInit(): void {
    this._roundService.startAutoSyncRound();
  }

  load() {
    this.isLoading = true;
    this.errMsg = '';
    this._roundService.currentGameID = this.gameId;
    this._roundService
      .autoFindRoundsAndActiveRound()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(
        (res) => {},
        (errorRes: HttpErrorResponse) => {
          this.errMsg = errorRes.error.message || errorRes.error.errors[0];
        },
      );
  }

  changeTeam(team: number) {
    this.selectedTeam = team;
  }
  
  ngOnDestroy(): void {
    this._roundService.stopAutoSyncRound();
  }
}
