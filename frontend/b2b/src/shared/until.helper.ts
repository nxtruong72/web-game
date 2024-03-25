import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from '../app/service/jwt.service';

export function isEmptyString(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  return value.trim() === '';
}

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const jwtService = inject(JwtService);
  const token = jwtService.getJwToken;
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  } else {
    return next(req);
  }
};

export function getStandardValue(value: any): string {
  if (!value) {
    return 'N/A';
  }
  return value;
}

export function dateFormatValidator(control: any) {
  // Regex pattern for dd/mm/yyyy format
  const DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;

  if (control.value && !DATE_REGEX.test(control.value)) {
    return { invalidDateFormat: true };
  }
  return null;
}
