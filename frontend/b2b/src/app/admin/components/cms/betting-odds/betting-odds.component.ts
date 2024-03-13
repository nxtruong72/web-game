import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ViewEncapsulation } from '@angular/core';
import { BettingOddsService } from '../../../service/betting-odds.service';
import { Subscription } from 'rxjs';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import {
  DataGrid,
  fluentDataGrid,
  fluentDataGridCell,
  fluentDataGridRow,
  fluentDivider,
  fluentTextField,
  provideFluentDesignSystem,
} from '@fluentui/web-components';
import { IBettingOdds } from '../../../../../api/betting-odds/betting-odds.interface';
import { NgIf } from '@angular/common';
import { TableActionComponent } from '../../shared/table-action/table-action.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { MomentService } from '../../../../service/moment.service';

provideFluentDesignSystem().register(
  fluentTextField(),
  fluentDivider(),
  fluentDataGrid(),
  fluentDataGridCell(),
  fluentDataGridRow(),
);

@Component({
  selector: 'app-betting-odds',
  templateUrl: './betting-odds.component.html',
  styleUrls: ['./betting-odds.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, TableActionComponent, NgIf, PaginationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class BettingOddsComponent implements AfterViewInit {
  subscription = new Subscription();
  defaultGridElement: DataGrid | null = null;
  pages = [
    {
      name: 'Kèo cá cược',
      link: null,
    },
  ];
  constructor(
    private _bettingOddsService: BettingOddsService,
    private _momentService: MomentService,
  ) {}

  ngAfterViewInit(): void {
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
        (bettingOdds: IBettingOdds) => {
          this.initDataGrid(bettingOdds);
        },
        (error) => {},
      );
    this.subscription.add(createGameSub);
  }

  private initDataGrid(bettingOdds: IBettingOdds) {
    const rowsData: Array<any> = [];
    this.defaultGridElement = document.getElementById('defaultGrid') as DataGrid;
    bettingOdds.content.forEach((bettingOdd) => {
      rowsData.push({
        Mã: bettingOdd.id,
        Tên: bettingOdd.name,
        Team: `${bettingOdd.teamOne} - ${bettingOdd.teamOne}`,
        'Hình Thức': bettingOdd.gameTypes,
        'Trạng Thái': bettingOdd.gameStatus,
        'Ngày bắt đầu': this._momentService.getStandardDate(bettingOdd.planStartTime),
        'Tổng bet': bettingOdd.totalBet,
        'Lợi nhuận': bettingOdd.profit,
      });
    });
    this.defaultGridElement.rowsData = rowsData;
  }
}
