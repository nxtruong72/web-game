import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BettingOddsService } from '../../../../service/betting-odds.service';
import { BettingOdds } from '../../../../../../api/betting-odds/betting-odds.interface';
import { DatePipe, JsonPipe, NgIf, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { BETTING_ODDS_DETAIL_ITEM } from '../../../../const/admin.const';

@Component({
  selector: 'app-betting-odds-detail',
  templateUrl: './betting-odds-detail.component.html',
  styleUrls: ['./betting-odds-detail.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, JsonPipe, NgIf, NgSwitchCase, NgSwitchDefault, DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BettingOddsDetailComponent implements OnInit {
  itemDetail = BETTING_ODDS_DETAIL_ITEM;
  bettingOdds!: BettingOdds | any;
  pages = [
    {
      name: 'Kèo cá cược',
      link: '/keo-ca-cuoc',
    },
    {
      name: 'Chi tiết',
      link: null,
    },
  ];

  private subscription = new Subscription();

  constructor(
    private _bettingOddsService: BettingOddsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.getGameId();
  }

  refresh() {}

  private getGameId() {
    const gameId = this._activatedRoute.snapshot.paramMap.get('id');

    if (gameId) {
      this.getGames(Number(gameId));
    } else {
      this._router.navigate(['keo-ca-cuoc']);
    }
  }

  private getGames(gameId: number) {
    const gameDetail = this._bettingOddsService.getGameById(gameId).subscribe(
      (bettingOdds: BettingOdds) => {
        this.bettingOdds = bettingOdds;
        console.log(bettingOdds);
      },
      (error) => {},
    );
    this.subscription.add(gameDetail);
  }
}
