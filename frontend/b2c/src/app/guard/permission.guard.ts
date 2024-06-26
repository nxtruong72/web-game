import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../service/jwt.service';

export const permissionGuard: CanActivateFn = () => {
  const router = inject(Router);
  const jwtService = inject(JwtService);

  // need condition expire && exist the user
  if (jwtService.getJwToken) {
    return true;
  }
  router.navigate(['dang-nhap']);
  return false;
};
