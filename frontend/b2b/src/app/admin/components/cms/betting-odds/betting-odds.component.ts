import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
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
import { BettingOddsAddComponent } from './betting-odds-add/betting-odds-add.component';

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
  imports: [BreadcrumbComponent, TableActionComponent, NgIf, PaginationComponent, BettingOddsAddComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class BettingOddsComponent implements AfterViewInit {
  subscription = new Subscription();
  gridElement: DataGrid | null = null;
  isExistDataGrid = false;
  pages = [
    {
      name: 'Kèo cá cược',
      link: null,
    },
  ];
  constructor(
    private _bettingOddsService: BettingOddsService,
    private _momentService: MomentService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    this.getGames();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refresh() {
    this.getGames();
  }

  getGames(): void {
    const createGameSub = this._bettingOddsService
      .getGames()
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

    this.setState(bettingOdds, rowsData);
  }

  private setState(bettingOdds: IBettingOdds, rowsData: Array<any>) {
    if (bettingOdds.content.length === 0) {
      this.isExistDataGrid = false;
      return;
    }
    this.isExistDataGrid = true;
    this._cdr.detectChanges();
    this.gridElement = document.getElementById('defaultGrid') as DataGrid;
    this.gridElement.rowsData = rowsData;
    return;
  }
}
