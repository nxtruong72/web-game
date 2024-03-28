import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { Round } from '../../../api/rounds/round.interface';
import { TimerService } from '../../service/timer.service';
import { Nullable } from 'primeng/ts-helpers';
import { RoundStatus } from '../../../api/rounds/round-status.enum';
import { RoundApiService } from '../../../api/rounds/round.api';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  private _round$: BehaviorSubject<Round | Nullable>;
  private _rounds$: BehaviorSubject<Array<Round>>;
  private _tickSub!: Subscription;
  private _counterForRoundUpdate = 0;
  private _counterForRoundsUpdate = 0;
  private _currentGameID!: number;

  constructor(
    private _roundApi: RoundApiService,
    private _timerservice: TimerService,
  ) {
    this._round$ = new BehaviorSubject<Round | Nullable>(null);
    this._rounds$ = new BehaviorSubject<Array<Round>>([]);
  }

  findRoundsByGameId(gameId: number): Observable<any> {
    return this._roundApi.findRoundsByGameId(gameId);
  }

  autoFindRoundsAndActiveRound(): Observable<any> {
    return this.findRoundsByGameId(this._currentGameID).pipe(
      map((res) => {
        const rounds: Array<Round> = res.content;
        this._rounds$.next(rounds);
        this._round$.next(this.findCurrentRound(rounds));
        return rounds;
      }),
    );
  }

  getRoundDetailsByRoundId(roundId: number): Observable<Round> {
    return this._roundApi.getRoundDetailsByRoundId(roundId).pipe(
      map((round) => {
        this._round$.next(round);
        return round;
      }),
    );
  }

  startAutoSyncRound() {
    if (this._tickSub) {
      this._tickSub.unsubscribe();
    } else {
      this._tickSub = this._timerservice.tick$.subscribe(() => {
        this._syncRound();
        this._syncRounds();
      });
    }
  }

  private _syncRound() {
    this._counterForRoundUpdate++;
    // Sync every 5 secs
    if (this._counterForRoundUpdate >= 5) {
      this._counterForRoundUpdate = 0;
      const currentRound = this._round$.getValue();
      if (currentRound) {
        this.getRoundDetailsByRoundId(currentRound.id).subscribe();
      }
    }
  }

  private _syncRounds() {
    this._counterForRoundsUpdate++;
    // Sync every 15 secs
    if (this._counterForRoundsUpdate >= 15) {
      this._counterForRoundsUpdate = 0;
      if (this._currentGameID) {
        this.autoFindRoundsAndActiveRound().subscribe();
      }
    }
  }

  stopAutoSyncRound() {
    if (this._tickSub) {
      this._tickSub.unsubscribe();
    }
  }

  findCurrentRound(rounds: Array<Round>): Round | Nullable {
    const lenght = rounds.length;
    if (lenght <= 0) {
      return null;
    }

    const lastIndex = lenght - 1;
    let currentRound = rounds[lastIndex];
    if (lastIndex === 0) {
      return currentRound;
    }

    for (let i = lastIndex - 1; i >= 0; i--) {
      if (RoundStatus.START === rounds[i].roundStatus) {
        currentRound = rounds[i];
        break;
      }
    }
    return currentRound;
  }

  get round$(): Observable<Round | Nullable> {
    return this._round$;
  }

  get rounds$(): Observable<Array<Round>> {
    return this._rounds$;
  }

  set currentGameID(gameId: number) {
    this._currentGameID = gameId;
  }
}
