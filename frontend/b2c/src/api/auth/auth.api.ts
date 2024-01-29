import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from '../common.const';

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
}
