import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACTIVE_PATH, BASE_PATH, LOGOUT_PATH, ME_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from '../common.const';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private _http: HttpClient) {}

  signIn(userName: string, password: string): Observable<any> {
    return this._http.post<any>(`${BASE_PATH}${SIGN_IN_PATH}`, {
      username: userName,
      password,
    });
  }

  signUp(userName: string, password: string, email: string, phone: string): Observable<any> {
    return this._http.post<any>(`${BASE_PATH}${SIGN_UP_PATH}`, {
      username: userName,
      password,
      email,
      phone,
    });
  }

  active(activeCode: string) {
    return this._http.post<any>(`${BASE_PATH}${ACTIVE_PATH}`, { code: activeCode });
  }

  getMe() {
    return this._http.get<string>(`${BASE_PATH}${ME_PATH}`, { responseType: 'text' as 'json' });
  }

  logout() {
    return this._http.post<any>(`${BASE_PATH}${LOGOUT_PATH}`, {});
  }
}
