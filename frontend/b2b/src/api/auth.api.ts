import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_PATH } from './const.api';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly LOGIN_PATH = 'b2b/auth/login';

  constructor(private _http: HttpClient) {}

  signIn(userName: string, password: string): Observable<any> {
    return this._http.post<any>(`${BASE_PATH}${this.LOGIN_PATH}`, {
      username: userName,
      password,
    });
  }
}
