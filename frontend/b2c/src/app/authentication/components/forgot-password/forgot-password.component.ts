import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEmptyString } from '../../../../shared/until.helper';
import { requiredMsg } from '../../../../shared/msg.const';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../main/service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  errMsg = '';
  isLoading = false;

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  getPassword() {
    this.validateForm();
    if (this.form.valid) {
      this.isLoading = true;
      this._userService
        .forgotPassword(this.f['email'].value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
        )
        .subscribe(
          () => {
            this._router.navigate(['dang-nhap']);
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Vui lòng kiểm tra email của bạn',
            });
          },
          (errorRes: HttpErrorResponse) => {
            this.errMsg = errorRes.error.message || errorRes.error.errors[0];
          },
        );
    }
  }

  private initForm() {
    this.form = this._formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]),
      ],
    });
  }

  private validateForm() {
    const requiredErr = { required: requiredMsg };
    const isEmptyEmail = isEmptyString(this.f['email'].value);
    if (isEmptyEmail) {
      this.f['email'].setErrors(requiredErr);
    }
  }

  get f() {
    return this.form.controls;
  }
}
