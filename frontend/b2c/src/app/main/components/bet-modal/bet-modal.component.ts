import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, finalize } from 'rxjs';
import { UserService } from '../../service/user.service';
import { MessageService } from 'primeng/api';
import { RoundService } from '../../service/round.service';
import { BetService } from '../../service/bets.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Round } from '../../../../api/rounds/round.interface';
import { Nullable } from 'primeng/ts-helpers';
import { RoundAlertComponent } from '../round-alert/round-alert.component';
import { RoundStatus } from '../../../../api/rounds/round-status.enum';
import { GameTypesComponent } from '../game-types/game-types.component';
import { Game } from '../../../../api/games/game.interface';
declare var window: any;

@Component({
  selector: 'app-bet-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RoundAlertComponent, GameTypesComponent],
  templateUrl: './bet-modal.component.html',
})
export class BetModalComponent implements OnInit, OnDestroy {
  @Input() game: Game | undefined;
  @Input() defaultTeam!: number;

  betModal: any;
  MIN = 100000;
  STEP = 50000;
  STEPX10 = 500000;
  STEPX20 = 1000000;

  form!: FormGroup;

  balance = 0;
  private _balanceSub!: Subscription;

  currentRound!: Round | Nullable;
  private _currentRoundSub!: Subscription;
  isLoading = false;
  errMsg = '';
  private isSubmited = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _messageService: MessageService,
    private _roundService: RoundService,
    private _betService: BetService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this._balanceSub = this._userService.balance$.subscribe((balance) => {
      this.balance = balance;
    });
    this._currentRoundSub = this._roundService.round$.subscribe((round) => {
      this.currentRound = round;
    });
    this.betModal = new window.bootstrap.Modal(document.getElementById('betModal'));
  }



  ngOnDestroy(): void {
    this._balanceSub?.unsubscribe();
    this._currentRoundSub?.unsubscribe();
  }

  onSubmit() {
    if (!this.currentRound) return;

    this.isSubmited = true;
    if (!this.form.valid) return;

    this.isLoading = true;
    this.errMsg = '';
    this._betService
      .placeAbet(this.currentRound.id, this.defaultTeam, this.betAmount)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(
        (data) => {
          this.betModal.hide();
          if (this.currentRound) {
            this._roundService.getRoundDetailsByRoundId(this.currentRound.id).subscribe();
          }
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Đặt cược thành công' });
          this.cleanForm();
        },
        (errorRes: HttpErrorResponse) => {
          this.errMsg = errorRes.error.message || errorRes.error.errors[0];
        },
      );
  }
  private initForm() {
    this.form = this._formBuilder.group({
      betAmount: [0, Validators.compose([Validators.required])],
    });
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

  cleanForm() {
    this.betAmount = 0;
    this.isSubmited = false;
    this.errMsg = '';
  }

  showError(controlName: string) {
    const control = this.f[controlName];
    return control.invalid && (control.touched || control.dirty || this.isSubmited);
  }

  isBetSessionOpened() {
    return RoundStatus.START === this.currentRound?.roundStatus;
  }


}
