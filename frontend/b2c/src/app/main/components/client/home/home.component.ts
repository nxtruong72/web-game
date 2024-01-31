import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { GameService } from '../../../service/games.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../authentication/service/auth.service';
import { JwtService } from '../../../../service/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, NgFor, NgForOf, RouterLink, NgIf],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  isLogged = false;
  errMsg = null;
  today_games: Array<any> = [];
  incomming_games: Array<any> = [];
  historical_games: Array<any> = [];
  constructor(
    private _gameService: GameService,
    private _authService: AuthService,
    private _jwtService: JwtService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.getGames();
    this.isLogged = this.checkLogged();
  }

  trackByFn(index: any, item: { id: any }) {
    return item.id;
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

  private checkLogged(): boolean {
    return this._jwtService.getJwToken ? true : false;
  }

  private getGames() {
    this.isLoading = true;
    this._gameService
      .getGames()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(
        (data) => {
          this.today_games = data;
          this.incomming_games = data;
          this.historical_games = data;
        },
        (errorRes: HttpErrorResponse) => {
          this.errMsg = errorRes.error.message;
        },
      );
  }
}
