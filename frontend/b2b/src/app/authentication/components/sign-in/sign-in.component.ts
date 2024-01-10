import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import {
  fluentButton,
  provideFluentDesignSystem,
  fluentCard,
  fluentTextField,
  fluentCheckbox,
  fluentSkeleton,
  fluentProgressRing,
} from '@fluentui/web-components';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEmptyString } from '../../../../shared/until.helper';
import { requiredMsg } from '../../../../shared/msg.const';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

provideFluentDesignSystem().register(
  fluentButton(),
  fluentCard(),
  fluentTextField(),
  fluentCheckbox(),
  fluentSkeleton(),
  fluentProgressRing(),
);

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  errMsg = '';
  isLoading = false;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  signIn() {
    this.validateForm();
    if (this.form.valid) {
      this.isLoading = true;
      const { userName, password } = this.form.value;
      this._authService
        .signIn(userName, password)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
        )
        .subscribe(
          () => {},
          (errorRes: HttpErrorResponse) => {
            this.errMsg = errorRes.error.message;
          },
        );
    }
  }

  private initForm() {
    this.form = this._formBuilder.group({
      userName: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  private validateForm() {
    const isEmptyUserName = isEmptyString(this.form.controls['userName'].value);
    const isEmptyPassword = isEmptyString(this.form.controls['password'].value);
    const requiredErr = { required: requiredMsg };
    if (isEmptyUserName) {
      this.form.controls['userName'].setErrors(requiredErr);
    }
    if (isEmptyPassword) {
      this.form.controls['password'].setErrors(requiredErr);
    }
  }
}
