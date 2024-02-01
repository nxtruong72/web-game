import { Injectable } from '@angular/core';
import { AuthApiService } from '../../../api/auth/auth.api';
import { Observable, concatMap, finalize, map } from 'rxjs';
import { JwtService } from '../../service/jwt.service';
import { AuthI } from '../../../api/auth/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: AuthI | null = null;

  constructor(
    private _authApiService: AuthApiService,
    private _jwtService: JwtService,
  ) {}

  signIn(userName: string, password: string): Observable<any> {
    return this._authApiService.signIn(userName, password).pipe(
      map((data) => {
        this.user = data;
        this._jwtService.setJwToken(data.access_token, data.expires_in);
        return data;
      }),
      concatMap(() => this.getMe()),
    );
  }

  signUp(userName: string, password: string, email: string, phone: string): Observable<any> {
    return this._authApiService.signUp(userName, password, email, phone);
  }

  active(activeCode: string): Observable<any> {
    return this._authApiService.active(activeCode);
  }

  logout(): Observable<any> {
    return this._authApiService.logout().pipe(
      finalize(() => {
        this.user = null;
      }),
    );
  }

  private getMe() {
    return this._authApiService.getMe().pipe(
      map((user) => {
        this.user = user;
        return user;
      }),
    );
  }
}
