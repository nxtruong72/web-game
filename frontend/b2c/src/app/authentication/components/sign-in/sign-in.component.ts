import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEmptyString } from '../../../../shared/until.helper';
import { requiredMsg } from '../../../../shared/msg.const';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  providers: [MessageService],
  standalone: true,
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  errMsg = '';
  isLoading = false;
  private userName = '';
  private password = '';

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _messageService: MessageService,
  ) {
    this.getState();
  }

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
          (data) => {
            console.log(data);
            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Đăng nhập thành công' });
            this._router.navigate(['']);
          },
          (errorRes: HttpErrorResponse) => {
            this.errMsg = errorRes.error.message || errorRes.error.errors[0];
          },
        );
    }
  }

  private initForm() {
    this.form = this._formBuilder.group({
      userName: [this.userName, Validators.compose([Validators.required])],
      password: [this.password, Validators.compose([Validators.required])],
    });
  }

  private validateForm() {
    const isEmptyUserName = isEmptyString(this.f['userName'].value);
    const isEmptyPassword = isEmptyString(this.f['password'].value);
    const requiredErr = { required: requiredMsg };
    if (isEmptyUserName) {
      this.f['userName'].setErrors(requiredErr);
    }
    if (isEmptyPassword) {
      this.f['password'].setErrors(requiredErr);
    }
  }

  private getState() {
    const state = this._router.getCurrentNavigation()?.extras?.state;
    if (state) {
      this.userName = state['userName'] || '';
      this.password = state['password'] || '';
    }
  }

  get f() {
    return this.form.controls;
  }
}
