import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BASE_CLIENT_PATH,
  USER_ACTIVE_PATH,
  USER_BALANCE_PATH,
  USER_FOGOT_PASS_PATH,
  USER_NEW_PASS_PATH,
  USER_PROFILE_PATH,
  USER_RESENT_ACTIVATION_PATH,
  USER_SIGNUP_PATH,
  USER_WITHDRAW_PATH,
} from '../common.const';
import { Observable } from 'rxjs';
import { Wallet } from './wallet.interface';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private _http: HttpClient) {}

  register(userName: string, password: string, email: string, phone: string): Observable<any> {
    return this._http.post<any>(`${BASE_CLIENT_PATH}${USER_SIGNUP_PATH}`, {
      username: userName,
      password,
      email,
      phone,
    });
  }

  activate(activeCode: string): Observable<any> {
    return this._http.post<any>(`${BASE_CLIENT_PATH}${USER_ACTIVE_PATH}`, { code: activeCode });
  }

  resendActivationEmail(_email: string): Observable<any> {
    return this._http.post<any>(`${BASE_CLIENT_PATH}${USER_RESENT_ACTIVATION_PATH}`, { email: _email });
  }

  forgotPassword(_email: string): Observable<any> {
    return this._http.post<any>(`${BASE_CLIENT_PATH}${USER_FOGOT_PASS_PATH}`, { email: _email });
  }

  newPassword(_activeCode: string, _newPassword: string): Observable<any> {
    return this._http.post<any>(`${BASE_CLIENT_PATH}${USER_NEW_PASS_PATH}`, {
      activeCode: _activeCode,
      newPassword: _newPassword,
    });
  }

  withdraw(_amount: number): Observable<any> {
    return this._http.post<any>(`${BASE_CLIENT_PATH}${USER_WITHDRAW_PATH}`, {
      amount: _amount,
    });
  }

  profile(): Observable<User> {
    return this._http.get<User>(`${BASE_CLIENT_PATH}${USER_PROFILE_PATH}`);
  }

  balance(): Observable<Wallet> {
    return this._http.get<any>(`${BASE_CLIENT_PATH}${USER_BALANCE_PATH}`);
  }
}
