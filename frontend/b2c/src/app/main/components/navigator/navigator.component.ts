import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../authentication/service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent implements OnInit, OnDestroy {
  balance = 0;
  _sub!: Subscription;
  constructor(private _authService: AuthService) {}
  ngOnInit() {
    this._sub = this._authService.getUserWallet$().subscribe((wallet: any) => {
      if (null != wallet) {
        this.balance = wallet.balance;
      }
    });
  }
  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }
}
