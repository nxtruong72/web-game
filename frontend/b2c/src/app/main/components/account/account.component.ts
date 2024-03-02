import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../authentication/service/auth.service';
import { JwtService } from '../../../service/jwt.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
})
export class AccountComponent implements OnInit, OnDestroy {
  balance = 0;
  _userSub: Subscription | undefined;
  _walletSub: Subscription | undefined;
  me = '';
  constructor(
    private _authService: AuthService,
    private _jwtService: JwtService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this._userSub = this._authService.getUser$().subscribe((user: any) => {
      if (null != user) {
        this.me = user;
      }
    });
    this._walletSub = this._authService.getUserWallet$().subscribe((wallet: any) => {
      if (null != wallet) {
        this.balance = wallet.balance;
      }
    });
  }

  navigateTo(link: string) {
    this._router.navigate([link]);
  }

  logout() {
    this._authService.logout().subscribe(
      () => {
        this._jwtService.deleteJwToken();
        this._router.navigate(['/']);
      },
      (error) => {},
    );
  }

  ngOnDestroy(): void {
    this._userSub?.unsubscribe();
    this._walletSub?.unsubscribe();
  }
}
