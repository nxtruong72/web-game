import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { GameService } from '../../service/games.service';
import { Subject, Subscription, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { GameCardComponent } from '../game-item/game-card.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../authentication/service/auth.service';
import { isEmptyString } from '../../../../shared/until.helper';
import { requiredMsg } from '../../../../shared/msg.const';
import { RoundAlertComponent } from '../round-alert/round-alert.component';
declare var window: any;

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  imports: [CommonModule, RouterLink, NgIf, GameCardComponent, FormsModule, ReactiveFormsModule, RoundAlertComponent],
  standalone: true,
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  MIN = 100000;
  STEP = 50000;
  STEPX10 = 500000;
  STEPX20 = 1000000;
  game: any;
  gameId: any;
  incomming_games: Array<any> = [];
  rounds: Array<any> = [];
  currentRound: any;
  currentRoundsIndex = 0;
  roundsCount = 0;
  bets: Array<any> = [];
  safeSrc!: SafeResourceUrl;

  form!: FormGroup;

  _isLoading = false;
  _isSubmited = false;
  _errMsg = '';
  _paramSub!: Subscription;

  betAmountTeamBlue = 0;
  betAmountTeamRed = 0;
  myBetAmountTeamBlue = 0;
  myBetAmountTeamRed = 0;

  balance = 0;
  _balanceSub!: Subscription;

  betModal: any;
  constructor(
    private _gameService: GameService,
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _authService: AuthService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.currentRoundsIndex = 0;
    this.roundsCount = 0;
    this._paramSub = this._route.paramMap.subscribe((parmaMap) => {
      this.gameId = parmaMap.get('id');
      if (this.gameId) {
        this.clean();
        this._getGameDetails(this.gameId);
        this._getRoundsByGameId(this.gameId);
        this._getGames();
      }
    });
    this._balanceSub = this._authService.getUserWallet$().subscribe((wallet: any) => {
      if (null != wallet) {
        this.balance = wallet.balance;
      }
    });
    this.betModal = new window.bootstrap.Modal(document.getElementById('betModal'));
  }
  ngOnDestroy(): void {
    this._paramSub?.unsubscribe();
    this._balanceSub?.unsubscribe();
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

  private _getRoundsByGameId(id: string) {
    this._isLoading = true;
    this._gameService
      .getRoundsByGameId(id)
      .pipe(
        finalize(() => {
          this._isLoading = false;
        }),
      )
      .subscribe(
        (data) => {
          this.currentRoundsIndex = 0;
          this.currentRound = null;
          this.rounds = data.content;
          this.roundsCount = this.rounds.length;

          if (this.roundsCount > 0) {
            this.currentRound = this.rounds[this.currentRoundsIndex];
            this._getBetsByRoundID(this.currentRound.id);
          }
        },
        (errorRes: HttpErrorResponse) => {
          this._errMsg = errorRes.error.message;
        },
      );
  }

  private _getBetsByRoundID(id: string) {
    this._isLoading = true;
    this._gameService
      .getBetsByRoundId(id)
      .pipe(
        finalize(() => {
          this._isLoading = false;
        }),
      )
      .subscribe(
        (bets) => {
          this.bets = bets;
          this._calculateBets();
        },
        (errorRes: HttpErrorResponse) => {
          this._errMsg = errorRes.error.message;
        },
      );
  }

  private _calculateBets() {
    this.bets.forEach((bet) => {
      if (1 === bet.teamBet) {
        this.betAmountTeamBlue += bet.amount;
        this.myBetAmountTeamBlue += bet.amount;
      } else {
        this.betAmountTeamRed += bet.amount;
        this.myBetAmountTeamRed += bet.amount;
      }
    });
  }
  placeAbet() {
    this._isSubmited = true;
    if (!this.form.valid) return;

    this._isLoading = true;
    this._errMsg = '';
    this._gameService
      .placeAbet(this.currentRound.id, this.teamBet, this.betAmount)
      .pipe(
        finalize(() => {
          this._isLoading = false;
        }),
      )
      .subscribe(
        (data) => {
          this.betModal.hide();
          this.cleanForm();
          this.clean();
          this._getBetsByRoundID(this.currentRound.id);
          this.cleanForm();
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Đặt cược thành công' });
          this._authService.getBalance().subscribe();
        },
        (errorRes: HttpErrorResponse) => {
          this._errMsg = errorRes.error.message || errorRes.error.errors[0];
        },
      );
  }

  trackByFn(index: any, item: { id: any }) {
    return item.id;
  }

  private initForm() {
    this.form = this._formBuilder.group({
      teamBet: [1, Validators.compose([Validators.required])],
      betAmount: [0, Validators.compose([Validators.required])],
    });
  }

  canGoPreviousRound() {
    return this.currentRoundsIndex > 0;
  }
  canGoNextRound() {
    return this.currentRoundsIndex < this.roundsCount - 1;
  }
  previousRound() {
    if (this.canGoPreviousRound()) {
      this.currentRoundsIndex--;
      this.oncurrentRoundIndexChange();
    }
  }

  nextRound() {
    if (this.canGoNextRound()) {
      this.currentRoundsIndex++;
      this.oncurrentRoundIndexChange();
    }
  }

  oncurrentRoundIndexChange() {
    this.currentRound = this.rounds[this.currentRoundsIndex];
    this.clean();
    this._getBetsByRoundID(this.currentRound.id);
  }

  getDisplayRoundIndex() {
    return this.roundsCount > 0 ? this.currentRoundsIndex + 1 : 0;
  }
  getDisplayGameId() {
    return 'AOE-03022024-' + this.gameId;
  }

  changeBetAmount(amount: number) {
    if (this.canChangeBetAmount(amount)) {
      this.betAmount += amount;
    }
  }
  canChangeBetAmount(amount: number) {
    const test = this.betAmount + amount;
    return this.MIN <= test && test <= this.balance;
  }

  cleanForm() {
    this.teamBet = 1;
    this.betAmount = 0;
    this._isSubmited = false;
    this._errMsg = '';
  }

  clean() {
    this.betAmountTeamBlue = 0;
    this.myBetAmountTeamBlue = 0;
    this.betAmountTeamRed = 0;
    this.myBetAmountTeamRed = 0;
  }

  get f() {
    return this.form.controls;
  }

  get betAmountField() {
    return this.f['betAmount'];
  }
  get betAmount() {
    return this.betAmountField?.value;
  }
  set betAmount(value: number) {
    this.betAmountField?.setValue(value);
  }

  showError(controlName: string) {
    const control = this.f[controlName];
    return control.invalid && (control.touched || control.dirty || this._isSubmited);
  }

  get teamBet() {
    return this.f['teamBet']?.value;
  }

  set teamBet(value: number) {
    this.f['teamBet']?.setValue(value);
  }
}
