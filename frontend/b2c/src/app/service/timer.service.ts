import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, delay, of, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private _globalTimer$ = timer(0, 1000);
  private _subscription!: Subscription;
  private _tick$ = new BehaviorSubject(0);

  start() {
    this._subscription = this._globalTimer$.subscribe((durations) => {
      this._tick$.next(durations);
    });
  }

  stop() {
    this._subscription.unsubscribe();
  }

  get tick$() {
    return this._tick$;
  }
}
