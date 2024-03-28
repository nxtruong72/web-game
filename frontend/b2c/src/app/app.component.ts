import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from './authentication/service/auth.service';
import { UserService } from './main/service/user.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this._userService.loadUserProfile().subscribe();
      this._router.navigate(['']);
    }
  }
}
