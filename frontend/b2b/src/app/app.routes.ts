import { Routes } from '@angular/router';
import { permissionGuard } from './guard/permission.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin/components/cms/cms.component').then((m) => m.CmsComponent),
    canActivate: [permissionGuard],
  },
  {
    path: 'dang-nhap',
    loadComponent: () => import('./authentication/components/sign-in/sign-in.component').then((m) => m.SignInComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
