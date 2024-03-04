import { Component, OnInit } from '@angular/core';
import { BettingOddsService } from '../../../service/betting-odds.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-betting-odds',
  templateUrl: './betting-odds.component.html',
  styleUrls: ['./betting-odds.component.scss'],
  standalone: true,
})
export class BettingOddsComponent implements OnInit {
  subscription = new Subscription();
  constructor(private _bettingOddsService: BettingOddsService) {}

  ngOnInit() {
    this.createGame();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createGame(): void {
    const createGameSub = this._bettingOddsService
      .createGame()
      .pipe()
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {},
      );
    this.subscription.add(createGameSub);
  }
}
