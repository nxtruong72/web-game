import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../authentication/service/auth.service';
import { Observable } from 'rxjs';
import { UserService } from '../../service/user.service';
import { User } from '../../../../api/users/user.interface';
import { UserProfileComponent } from './user-profile/user-profile.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, UserProfileComponent],
})
export class AccountComponent {
  balance$: Observable<number>;
  user$: Observable<User | null>;
  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router,
  ) {
    this.balance$ = this._userService.balance$;
    this.user$ = this._userService.user$;
  }

  navigateTo(link: string) {
    this._router.navigate([link]);
  }

  logout() {
    this._authService.logout();
  }
}
