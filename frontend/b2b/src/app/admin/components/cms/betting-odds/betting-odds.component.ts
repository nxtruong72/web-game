import { Component, OnInit } from '@angular/core';
import { BettingOddsService } from '../../../service/betting-odds.service';
import { Subscription } from 'rxjs';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-betting-odds',
  templateUrl: './betting-odds.component.html',
  styleUrls: ['./betting-odds.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent],
})
export class BettingOddsComponent implements OnInit {
  subscription = new Subscription();
  pages = [
    {
      name: 'Kèo cá cược',
      link: null,
    },
  ];
  constructor(private _bettingOddsService: BettingOddsService) {}

  ngOnInit() {
    this.createGame();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refresh() {
    this.createGame();
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
