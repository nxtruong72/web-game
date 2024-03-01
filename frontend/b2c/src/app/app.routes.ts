import { Routes } from '@angular/router';
import { permissionGuard } from './guard/permission.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
  {
    path: 'trang-chu',
    loadComponent: () => import('./main/components/client/client.component').then((m) => m.ClientComponent),
    canActivate: [permissionGuard],
    children: [
      { path: '', redirectTo: 'cac-tran-dau', pathMatch: 'full' },
      {
        path: 'cac-tran-dau',
        loadComponent: () => import('./main/components/games/game.component').then((m) => m.GameComponent),
      },
      {
        path: 'cac-tran-dau/chi-tiet-tran-dau',
        pathMatch: 'full',
        loadComponent: () =>
          import('./main/components/game-details/game-details.component').then((m) => m.GameDetailsComponent),
      },
      {
        path: 'tai-khoan',
        loadComponent: () => import('./main/components/account/account.component').then((m) => m.AccountComponent),
        children: [
          { path: '', redirectTo: 'lich-su-giao-dich', pathMatch: 'full' },
          {
            path: 'lich-su-giao-dich',
            loadComponent: () =>
              import('./main/components/account/transaction-history/transaction-history.component').then(
                (m) => m.TransactionHistoryComponent,
              ),
            canActivate: [permissionGuard],
          },
          {
            path: 'lich-su-dat-cuoc',
            loadComponent: () =>
              import('./main/components/account/bet-history/bet-history.component').then((m) => m.BetHistoryComponent),
            canActivate: [permissionGuard],
          },
          {
            path: 'uu-dai',
            loadComponent: () =>
              import('./main/components/account/gift-code/gift-code.component').then((m) => m.GiftCodeComponent),
            canActivate: [permissionGuard],
          },
        ],
      },
      {
        path: 'huong-dan',
        loadComponent: () =>
          import('./main/components/guideline/guideline.component').then((m) => m.GuidelineComponent),
        canActivate: [permissionGuard],
      },
    ],
  },
  {
    path: 'dang-nhap',
    loadComponent: () => import('./authentication/components/sign-in/sign-in.component').then((m) => m.SignInComponent),
  },
  {
    path: 'dang-ki',
    loadComponent: () => import('./authentication/components/sign-up/sign-up.component').then((m) => m.SignUpComponent),
  },
  {
    path: 'quen-mat-khau',
    loadComponent: () =>
      import('./authentication/components/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent,
      ),
  },
  {
    path: 'active',
    loadComponent: () => import('./authentication/components/active/active.component').then((m) => m.ActiveComponent),
  },
  {
    path: '**',
    redirectTo: 'dang-nhap',
  },
];
