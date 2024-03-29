import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  fluentButton,
  fluentDialog,
  provideFluentDesignSystem,
  fluentSelect,
  fluentOption,
} from '@fluentui/web-components';
import { requiredMsg } from '../../../../../../shared/msg.const';
import { isEmptyString } from '../../../../../../shared/until.helper';
import { HttpErrorResponse } from '@angular/common/http';
import { BettingOddsService } from '../../../../service/betting-odds.service';
import { finalize } from 'rxjs';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentService } from '../../../../../service/moment.service';

provideFluentDesignSystem().register(fluentDialog(), fluentButton(), fluentSelect(), fluentOption());

@Component({
  selector: 'app-betting-odds-add',
  templateUrl: './betting-odds-add.component.html',
  styleUrls: ['./betting-odds-add.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class BettingOddsAddComponent implements OnInit {
  form!: FormGroup;
  errMsg = '';
  isLoading = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _bettingOddsService: BettingOddsService,
    private _momentService: MomentService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  createNewBettingOdds() {
    this.validateForm();
    if (this.form.valid) {
      this.isLoading = true;
      this.form.value.gameTypes = [this.form.value.gameTypes];
      this.form.value.planStartTime = this._momentService.getRequestDate(
        this.form.value['startDate'],
        this.form.value['startTime'],
      );
      delete this.form.value.startDate;
      delete this.form.value.startTime;
      this._bettingOddsService
        .newGame(this.form.value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
        )
        .subscribe(
          (data) => {
            const dialogCloser = document.getElementById('dialogCloser');
            this.form.reset({ gameTypes: 'CUNG' });
            dialogCloser?.click();
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
      gameTypes: ['CUNG', Validators.compose([Validators.required])],
      streamURL: ['', Validators.compose([Validators.required])],
      startDate: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/)])],
      startTime: ['', Validators.compose([Validators.required])],
    });
  }

  private validateForm() {
    const fieldsToValidate = ['name', 'teamOne', 'teamTwo', 'gameTypes', 'streamURL', 'startDate', 'startTime'];
    const requiredErr = { required: requiredMsg };

    fieldsToValidate.forEach((fieldName) => {
      const control = this.form.controls[fieldName];
      const isEmpty = isEmptyString(control.value);
      if (isEmpty) {
        control.setErrors(requiredErr);
      }
    });
  }
}
