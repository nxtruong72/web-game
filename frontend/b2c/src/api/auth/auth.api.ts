import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  USER_ACTIVE_PATH,
  BASE_CLIENT_PATH,
  USER_FOGOT_PASS_PATH,
  AUTH_LOGOUT_PATH,
  AUTH_ME_PATH,
  AUTH_LOGIN_PATH,
  USER_SIGNUP_PATH,
  USER_BALANCE_PATH,
} from '../common.const';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private _http: HttpClient) {}

  signIn(userName: string, password: string): Observable<any> {
    return this._http.post<any>(`${BASE_CLIENT_PATH}${AUTH_LOGIN_PATH}`, {
      username: userName,
      password,
    });
  }

  signUp(userName: string, password: string, email: string, phone: string): Observable<any> {
    return this._http.post<any>(`${BASE_CLIENT_PATH}${USER_SIGNUP_PATH}`, {
      username: userName,
      password,
      email,
      phone,
    });
  }

  active(activeCode: string) {
    return this._http.post<any>(`${BASE_CLIENT_PATH}${USER_ACTIVE_PATH}`, { code: activeCode });
  }

  getMe() {
    return this._http.get<string>(`${BASE_CLIENT_PATH}${AUTH_ME_PATH}`, { responseType: 'text' as 'json' });
  }

  forgotPassword(email: string): Observable<any> {
    return this._http.post(`${BASE_CLIENT_PATH}${USER_FOGOT_PASS_PATH}`, { email });
  }

  getBalance() {
    return this._http.get<any>(`${BASE_CLIENT_PATH}${USER_BALANCE_PATH}`);
  }
  
  logout() {
    return this._http.post<any>(`${BASE_CLIENT_PATH}${AUTH_LOGOUT_PATH}`, {});
  }
}
