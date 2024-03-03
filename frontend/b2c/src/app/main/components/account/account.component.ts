import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../authentication/service/auth.service';
import { JwtService } from '../../../service/jwt.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
})
export class AccountComponent {
  balance$: Observable<number>;
  user$: Observable<any>;
  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router,
  ) {
    this.balance$ = _userService.balance$;
    this.user$ = _userService.user$;
  }

  navigateTo(link: string) {
    this._router.navigate([link]);
  }

  logout() {
    this._authService.logout();
  }
}
