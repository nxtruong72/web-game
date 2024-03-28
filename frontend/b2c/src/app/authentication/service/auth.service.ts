import { Injectable } from '@angular/core';
import { AuthApiService } from '../../../api/auth/auth.api';
import { Observable, finalize, map } from 'rxjs';
import { JwtService } from '../../service/jwt.service';
import { Router } from '@angular/router';
import { UserService } from '../../main/service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _authApiService: AuthApiService,
    private _jwtService: JwtService,
    private _userService: UserService,
    private _router: Router,
  ) {}

  isAuthenticated() {
    return this._jwtService.getJwToken;
  }

  login(userName: string, password: string): Observable<any> {
    return this._authApiService.signIn(userName, password).pipe(
      map((data) => {
        this._jwtService.setJwToken(data.access_token, data.expires_in);
        return data;
      }),
    );
  }

  logout(): Observable<any> {
    return this._authApiService.logout().pipe(
      finalize(() => {
        this._userService.onLoggedOut();
        this._jwtService.deleteJwToken();
        this._router.navigate(['/']);
      }),
    );
  }

}
