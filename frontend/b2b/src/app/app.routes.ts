import { Routes } from '@angular/router';
import { permissionGuard } from './guard/permission.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'bang-dieu-khien',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('./admin/components/cms/cms.component').then((m) => m.CmsComponent),
    canActivate: [permissionGuard],
    children: [
      {
        path: 'bang-dieu-khien',
        loadComponent: () =>
          import('./admin/components/cms/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        canActivate: [permissionGuard],
      },
      {
        path: 'nguoi-choi',
        loadComponent: () => import('./admin/components/cms/user/user.component').then((m) => m.UserComponent),
        canActivate: [permissionGuard],
      },
      {
        path: 'ip-may-khach',
        loadComponent: () =>
          import('./admin/components/cms/client-ip/client-ip.component').then((m) => m.ClientIpComponent),
        canActivate: [permissionGuard],
      },
      {
        path: 'giao-dich',
        loadComponent: () =>
          import('./admin/components/cms/transaction/transaction.component').then((m) => m.TransactionComponent),
        canActivate: [permissionGuard],
      },
      {
        path: 'keo-ca-cuoc',
        loadComponent: () =>
          import('./admin/components/cms/betting-odds/betting-odds.component').then((m) => m.BettingOddsComponent),
        canActivate: [permissionGuard],
      },
      {
        path: 'keo-ca-cuoc/:id',
        loadComponent: () =>
          import('./admin/components/cms/betting-odds/betting-odds-detail/betting-odds-detail.component').then(
            (m) => m.BettingOddsDetailComponent,
          ),
        canActivate: [permissionGuard],
      },
      {
        path: 'bots',
        loadComponent: () => import('./admin/components/cms/bots/bots.component').then((m) => m.BotsComponent),
        canActivate: [permissionGuard],
      },
      {
        path: 'campaigns',
        loadComponent: () =>
          import('./admin/components/cms/campaigns/campaigns.component').then((m) => m.CampaignsComponent),
        canActivate: [permissionGuard],
      },
      {
        path: 'gift-code',
        loadComponent: () =>
          import('./admin/components/cms/gift-code/gift-code.component').then((m) => m.GiftCodeComponent),
        canActivate: [permissionGuard],
      },
      {
        path: 'game-bank',
        loadComponent: () =>
          import('./admin/components/cms/game-bank/game-bank.component').then((m) => m.GameBankComponent),
        canActivate: [permissionGuard],
      },
    ],
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
