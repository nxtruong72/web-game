import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { isEmptyString } from '../../../../shared/until.helper';
import { requiredMsg } from '../../../../shared/msg.const';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../main/service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  providers: [MessageService],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  errMsg = '';
  isLoading = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _messageService: MessageService,
    private _userService: UserService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  signUp() {
    this.validateForm();
    if (this.form.valid) {
      this.isLoading = true;
      this.errMsg = '';
      const { userName, password, email, phone } = this.form.value;
      this._userService
        .register(userName.trim(), password.trim(), email.trim(), phone.trim())
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
        )
        .subscribe(
          (data) => {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Đăng kí thành công' });
            this._router.navigate(['active'], { state: { userName, password } });
          },
          (errorRes: HttpErrorResponse) => {
            this.errMsg = errorRes.error.message || errorRes.error.errors[0];
          },
        );
    }
  }

  private initForm() {
    this.form = this._formBuilder.group({
      userName: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required])],
    });
  }

  private validateForm() {
    const isEmptyUserName = isEmptyString(this.f['userName'].value);
    const isEmptyPassword = isEmptyString(this.f['password'].value);
    const isEmptyEmail = isEmptyString(this.f['email'].value);
    const isEmptyPhone = isEmptyString(this.f['phone'].value);
    const requiredErr = { required: requiredMsg };
    if (isEmptyUserName) {
      this.f['userName'].setErrors(requiredErr);
    }
    if (isEmptyPassword) {
      this.f['password'].setErrors(requiredErr);
    }
    if (isEmptyEmail) {
      this.f['email'].setErrors(requiredErr);
    }
    if (isEmptyPhone) {
      this.f['phone'].setErrors(requiredErr);
    }
  }

  get f() {
    return this.form.controls;
  }
}
