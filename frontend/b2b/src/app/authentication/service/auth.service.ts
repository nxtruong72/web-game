import { Injectable } from '@angular/core';
import { AuthApiService } from '../../../api/auth/auth.api';
import { Observable, map } from 'rxjs';
import { JwtService } from '../../service/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdmin = false;

  constructor(
    private _authApiService: AuthApiService,
    private _jwtService: JwtService,
  ) {}

  signIn(userName: string, password: string): Observable<any> {
    return this._authApiService.signIn(userName, password).pipe(
      map((data) => {
        this._jwtService.setJwToken(data.access_token, data.expires_in);
        return data;
      }),
      // get user info
      // concatMap(() => this._userApiService.getUserInfo())
    );
  }
}
