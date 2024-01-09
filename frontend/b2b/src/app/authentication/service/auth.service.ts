import { Injectable } from '@angular/core';
import { AuthApiService } from '../../../api/auth.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdmin = false;

  constructor(private _authApiService: AuthApiService) {}

  signIn(userName: string, password: string): Observable<any> {
    return this._authApiService.signIn(userName, password);
  }
}
