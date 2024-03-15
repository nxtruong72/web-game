import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { fluentButton, fluentDialog, provideFluentDesignSystem } from '@fluentui/web-components';
import { requiredMsg } from '../../../../../../shared/msg.const';
import { isEmptyString } from '../../../../../../shared/until.helper';
import { HttpErrorResponse } from '@angular/common/http';
import { BettingOddsService } from '../../../../service/betting-odds.service';
import { finalize } from 'rxjs';

provideFluentDesignSystem().register(fluentDialog(), fluentButton());

@Component({
  selector: 'app-betting-odds-add',
  templateUrl: './betting-odds-add.component.html',
  styleUrls: ['./betting-odds-add.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule, ReactiveFormsModule],
})
export class BettingOddsAddComponent implements OnInit {
  form!: FormGroup;
  errMsg = '';
  isLoading = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _bettingOddsService: BettingOddsService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  createNewBettingOdds() {
    this.validateForm();
    if (this.form.valid) {
      this.isLoading = true;
      this._bettingOddsService
        .newGame(this.form.value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
        )
        .subscribe(
          (data) => {
            console.log(data);
          },
          (errorRes: HttpErrorResponse) => {
            this.errMsg = errorRes.error.message;
          },
        );
    }
  }

  private initForm() {
    this.form = this._formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      teamOne: ['', Validators.compose([Validators.required])],
      teamTwo: ['', Validators.compose([Validators.required])],
      gameTypes: [['xxx'], Validators.compose([Validators.required])],
      streamURL: ['', Validators.compose([Validators.required])],
      planStartTime: ['', Validators.compose([Validators.required])],
    });
  }

  private validateForm() {
    const isEmptyName = isEmptyString(this.form.controls['name'].value);
    const isEmptyTeamOne = isEmptyString(this.form.controls['teamOne'].value);
    const isEmptyTeamTwo = isEmptyString(this.form.controls['teamTwo'].value);
    const isEmptyGameTypes = isEmptyString(this.form.controls['gameTypes'].value);
    const isEmptyStreamURL = isEmptyString(this.form.controls['streamURL'].value);
    const isEmptyPlanStartTime = isEmptyString(this.form.controls['planStartTime'].value);

    const requiredErr = { required: requiredMsg };
    if (isEmptyName) {
      this.form.controls['name'].setErrors(requiredErr);
    }
    if (isEmptyTeamOne) {
      this.form.controls['teamOne'].setErrors(requiredErr);
    }
    if (isEmptyTeamTwo) {
      this.form.controls['teamTwo'].setErrors(requiredErr);
    }
    if (isEmptyGameTypes) {
      this.form.controls['gameTypes'].setErrors(requiredErr);
    }
    if (isEmptyStreamURL) {
      this.form.controls['streamURL'].setErrors(requiredErr);
    }
    if (isEmptyPlanStartTime) {
      this.form.controls['planStartTime'].setErrors(requiredErr);
    }
  }
}
