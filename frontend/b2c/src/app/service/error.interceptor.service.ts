import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { InterceptorService } from './interceptor.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService {
  excludes = ['login', 'logout'];

  constructor(
    private _interceptorService: InterceptorService,
    private _jwtService: JwtService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          if (this.isExclude(this.excludes, request.url)) {
            return throwError(error);
          } else {
            return this.handleCode401(request, next);
          }
        } else {
          return throwError(error);
        }
      }),
    );
  }

  private handleCode401(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _request = this._interceptorService.setHeader(request, this._jwtService.getJwToken);
    return next.handle(_request);
  }

  private isExclude(excludes: string[], url: string) {
    let isExclude = false;
    excludes.forEach((exclude) => {
      if (url.endsWith(exclude)) {
        isExclude = true;
        return;
      }
    });
    return isExclude;
  }
}
