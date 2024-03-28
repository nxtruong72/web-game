import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, forkJoin, map, mergeAll } from 'rxjs';
import { UserApiService } from '../../../api/users/user.api';
import { TimerService } from '../../service/timer.service';
import { User } from '../../../api/users/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user$: BehaviorSubject<User | null>;
  private _balance$: BehaviorSubject<number>;

  private _tickSub!: Subscription;
  private _counterForBalanceUpdate = 0;

  constructor(
    private _userApiService: UserApiService,
    private _timerService: TimerService,
  ) {
    this._user$ = new BehaviorSubject<User | null>(null);
    this._balance$ = new BehaviorSubject(0);
  }

  register(userName: string, password: string, email: string, phone: string): Observable<any> {
    return this._userApiService.register(userName, password, email, phone);
  }

  activate(activeCode: string): Observable<any> {
    return this._userApiService.activate(activeCode);
  }

  resendActivationEmail(email: string): Observable<any> {
    return this._userApiService.resendActivationEmail(email);
  }

  forgotPassword(email: string): Observable<any> {
    return this._userApiService.forgotPassword(email);
  }

  newPassword(activeCode: string, newPassword: string): Observable<any> {
    return this._userApiService.newPassword(activeCode, newPassword);
  }

  withdraw(amount: number): Observable<any> {
    return this._userApiService.withdraw(amount);
  }

  private _getBalance(): Observable<number> {
    return this._userApiService.balance().pipe(
      map((wallet) => {
        const balance = wallet.balance;
        this._balance$.next(balance);
        return balance;
      }),
    );
  }

  startAutoSyncBalance() {
    if (this._tickSub) {
      this._tickSub.unsubscribe();
    } else {
      this._tickSub = this._timerService.tick$.subscribe(() => {
        this.syncBalance();
      });
    }
  }

  stopAutoSyncBalance() {
    if (this._tickSub) {
      this._tickSub.unsubscribe();
    }
  }

  private syncBalance() {
    this._counterForBalanceUpdate++;
    // Sync every 5 secs
    if (this._counterForBalanceUpdate >= 5) {
      this._counterForBalanceUpdate = 0;
      this._getBalance().subscribe();
    }
  }

  private _profile(): Observable<User> {
    return this._userApiService.profile().pipe(
      map((user: User) => {
        this.user$.next(user);
        return user;
      }),
    );
  }

  loadUserProfile(): Observable<any> {
    return forkJoin({
      me: this._profile(),
      balance: this._getBalance(),
    });
  }

  onLoggedOut() {
    this._balance$.next(0);
    this._user$.next(null);
  }

  get balance$() {
    return this._balance$;
  }

  get user$() {
    return this._user$;
  }
}
