import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../authentication/service/auth.service';
import { Observable, Subscription, timer } from 'rxjs';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent {
  balance$!: Observable<number>;
  constructor(private _userService: UserService) {
    this.balance$ = this._userService.balance$;
  }
}
