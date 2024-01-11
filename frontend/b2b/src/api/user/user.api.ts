import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_PATH } from '../common.api';
@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly INFO_PATH = 'b2c/auth/me';

  constructor(private _http: HttpClient) {}

  getUserInfo(): Observable<any> {
    return this._http.get<any>(`${BASE_PATH}${this.INFO_PATH}`);
  }
}
