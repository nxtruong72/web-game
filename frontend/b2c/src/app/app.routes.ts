import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/components/client/client.component').then((m) => m.ClientComponent),
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
    path: 'tai-khoan',
    loadComponent: () => import('./main/components/account/account.component').then((m) => m.AccountComponent),
    children: [
      { path: '',   redirectTo: 'lich-su-giao-dich', pathMatch: 'full' },
      {
        path: 'lich-su-giao-dich',
        loadComponent: () =>
          import('./main/components/account/transaction-history/transaction-history.component').then(
            (m) => m.TransactionHistoryComponent,
          ),
      },
      {
        path: 'lich-su-dat-cuoc',
        loadComponent: () =>
          import('./main/components/account/bet-history/bet-history.component').then((m) => m.BetHistoryComponent),
      },
      {
        path: 'uu-dai',
        loadComponent: () =>
          import('./main/components/account/gift-code/gift-code.component').then((m) => m.GiftCodeComponent),
      },
    ],
  },
  {
    path: 'huong-dan',
    loadComponent: () => import('./main/components/guideline/guideline.component').then((m) => m.GuidelineComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
