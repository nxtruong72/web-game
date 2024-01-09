import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../authentication/service/auth.service';

export const permissionGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (authService.isAdmin) {
    return true;
  }
  router.navigate(['sign-in']);
  return false;
};
