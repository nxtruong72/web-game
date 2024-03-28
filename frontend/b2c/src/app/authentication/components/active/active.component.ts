import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { requiredMsg } from '../../../../shared/msg.const';
import { isEmptyString } from '../../../../shared/until.helper';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../main/service/user.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  providers: [MessageService],
})
export class ActiveComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  errMsg = '';
  private userName = '';
  private password = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _messageService: MessageService,
  ) {
    this.getState();
  }

  ngOnInit() {
    this.initForm();
  }

  active() {
    this.validateForm();
    if (this.form.valid) {
      this.errMsg = '';
      this.isLoading = true;
      const { activeCode } = this.form.value;
      this._userService
        .activate(activeCode.trim())
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
        )
        .subscribe(
          () => {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Active tài khoản thành công',
            });
            this._router.navigate(['dang-nhap'], { state: { userName: this.userName, password: this.password } });
          },
          (errorRes: HttpErrorResponse) => {
            this.errMsg = errorRes.error.message || errorRes.error.errors[0];
          },
        );
    }
  }

  private getState() {
    const state = this._router.getCurrentNavigation()?.extras?.state;
    if (state) {
      this.userName = state['userName'] || '';
      this.password = state['password'] || '';
    }
  }

  private initForm() {
    this.form = this._formBuilder.group({
      activeCode: ['', Validators.compose([Validators.required])],
    });
  }

  private validateForm() {
    const isEmptyActiveCode = isEmptyString(this.f['activeCode'].value);
    const requiredErr = { required: requiredMsg };
    if (isEmptyActiveCode) {
      this.f['activeCode'].setErrors(requiredErr);
    }
  }

  get f() {
    return this.form.controls;
  }
}
