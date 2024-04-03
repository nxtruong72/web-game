import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, Subscription } from 'rxjs';
import { BettingOddsService } from '../../../../service/betting-odds.service';
import { IBettingOdds, IRound } from '../../../../../../api/betting-odds/betting-odds.interface';
import { CurrencyPipe, DatePipe, JsonPipe, NgIf, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { BETTING_ODDS_DETAIL_ITEM } from '../../../../const/admin.const';
import { fluentButton, fluentTooltip, provideFluentDesignSystem } from '@fluentui/web-components';

provideFluentDesignSystem().register(fluentTooltip(), fluentButton());

@Component({
  selector: 'app-betting-odds-detail',
  templateUrl: './betting-odds-detail.component.html',
  styleUrls: ['./betting-odds-detail.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, JsonPipe, NgIf, NgSwitchCase, NgSwitchDefault, DatePipe, CurrencyPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BettingOddsDetailComponent implements OnInit {
  itemDetail = BETTING_ODDS_DETAIL_ITEM;
  bettingOdds!: IBettingOdds | any;
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

  ngOnChanges(): void {
    this.getRound();
  }

  ngOnInit() {
    this.getGameId();
  }

  refresh() {}

  createRound() {
    if (this.bettingOdds.id) {
      const createRoundSub = this._bettingOddsService
        .createRound(this.bettingOdds.id)
        .pipe(
          concatMap((round: IRound) => {
            console.log(round);
            return this._bettingOddsService.getGameById(this.bettingOdds.id);
          }),
        )
        .subscribe(
          (bettingOdds: IBettingOdds) => {
            this.bettingOdds = bettingOdds;
          },
          (error) => {},
        );
      this.subscription.add(createRoundSub);
    }
  }

  private getGameId() {
    const gameId = this._activatedRoute.snapshot.paramMap.get('id');

    if (gameId) {
      this.getGames(Number(gameId));
    } else {
      this._router.navigate(['keo-ca-cuoc']);
    }
  }

  private getGames(gameId: number) {
    const gameDetailSub = this._bettingOddsService.getGameById(gameId).subscribe(
      (bettingOdds: IBettingOdds) => {
        this.bettingOdds = bettingOdds;
        console.log(bettingOdds);
      },
      (error) => {},
    );
    this.subscription.add(gameDetailSub);
  }

  private getRound() {
    if (this.bettingOdds.id) {
      const roundSub = this._bettingOddsService.getRounds(this.bettingOdds.id).subscribe(
        (rounds: Array<IRound>) => {
          console.warn(rounds);
        },
        (error) => {},
      );
      this.subscription.add(roundSub);
    }
  }
}
