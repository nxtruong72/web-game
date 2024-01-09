import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  fluentButton,
  provideFluentDesignSystem,
  fluentCard,
  fluentTextField,
  fluentCheckbox,
} from '@fluentui/web-components';
import { AuthService } from '../../service/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

provideFluentDesignSystem().register(fluentButton(), fluentCard(), fluentTextField(), fluentCheckbox());

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class SignInComponent implements OnInit {
  @ViewChild('userName') 'userName': ElementRef;
  @ViewChild('password') 'password': ElementRef;

  constructor(private _authService: AuthService) {}

  ngOnInit() {}

  signIn() {
    const userName = this.userName.nativeElement.control.value;
    const password = this.password.nativeElement.control.value;
    this._authService.signIn(userName, password).subscribe();
  }
}
