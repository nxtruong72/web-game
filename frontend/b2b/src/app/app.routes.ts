import { Routes } from '@angular/router';
import { permissionGuard } from './guard/permission.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin/cms/cms.component').then((m) => m.CmsComponent),
    canActivate: [permissionGuard],
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./authentication/components/sign-in/sign-in.component').then((m) => m.SignInComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
