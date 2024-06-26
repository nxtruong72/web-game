import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { AUTH_LOGIN_PATH } from '../../api/common.const';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService {
  constructor(private _cookie: JwtService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith(AUTH_LOGIN_PATH)) {
      return next.handle(request);
    } else {
      request = this.setHeader(request, this._cookie.getJwToken);
    }
    return next.handle(request);
  }

  setHeader(request: HttpRequest<any>, token: string) {
    if (token) {
      token = `Bearer ${token}`;
    }
    return request.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  }
}
