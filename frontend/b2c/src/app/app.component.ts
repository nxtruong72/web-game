import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { JwtService } from './service/jwt.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from './authentication/service/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {
  constructor(
    @Inject('TODO') private TODO: any,
    private _jwtService: JwtService,
    private _authService: AuthService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._authService.getMe().subscribe();
    this._authService.getBalance().subscribe();
    if (this._jwtService.getJwToken) {
      this._router.navigate(['']);
    }
  }
}
