import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JWT_TOKEN } from '../../api/common.api';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private cookie: CookieService) {}

  getJwToken() {
    return this.cookie.get(JWT_TOKEN);
  }

  setJwToken(token: string, expSeconds: number) {
    this.cookie.delete(JWT_TOKEN);
    this.cookie.set(JWT_TOKEN, token, this.expDate(expSeconds));
  }

  deleteJwToken() {
    this.cookie.delete(JWT_TOKEN, '/');
  }

  private expDate(seconds: number) {
    const exp = new Date();
    exp.setSeconds(exp.getSeconds() + seconds);
    return exp;
  }
}
