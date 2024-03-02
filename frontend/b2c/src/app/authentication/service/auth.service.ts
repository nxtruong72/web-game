import { Injectable } from '@angular/core';
import { AuthApiService } from '../../../api/auth/auth.api';
import { BehaviorSubject, Observable, concatMap, finalize, map, mergeMap } from 'rxjs';
import { JwtService } from '../../service/jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$;
  wallet$;

  constructor(
    private _authApiService: AuthApiService,
    private _jwtService: JwtService,
    private _router: Router,
  ) {
    this.wallet$ = new BehaviorSubject(null);
    this.user$ = new BehaviorSubject(null);
  }

  signIn(userName: string, password: string): Observable<any> {
    return this._authApiService.signIn(userName, password).pipe(
      map((data) => {
        this._jwtService.setJwToken(data.access_token, data.expires_in);
        return data;
      }),
      concatMap(() => this.getMe()),
      concatMap(() => this.getBalance()),
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
        this.user$.next(null);
        this._jwtService.deleteJwToken();
        this._router.navigate(['/']);
      }),
    );
  }

  forgotPassword(email: string) {
    return this._authApiService.forgotPassword(email);
  }

  getMe() {
    return this._authApiService.getMe().pipe(
      map((user: any) => {
        this.user$.next(user);
        return user;
      }),
    );
  }

  getBalance() {
    return this._authApiService.getBalance().pipe(
      map((wallet) => {
        this.wallet$.next(wallet);
        return wallet;
      }),
    );
  }

  getUser$() {
    return this.user$;
  }

  getUserWallet$() {
    return this.wallet$;
  }
}
