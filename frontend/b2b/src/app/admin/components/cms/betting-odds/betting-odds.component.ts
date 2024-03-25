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
import { ObservableService } from '../../../../service/observable.service';
import { PayloadService } from '../../../../service/payload.service';

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
  totalSize = 0;
  contentSize = 0;
  constructor(
    private _bettingOddsService: BettingOddsService,
    private _momentService: MomentService,
    private _cdr: ChangeDetectorRef,
    private _observableService: ObservableService,
    private _payloadService: PayloadService,
  ) {}

  ngOnInit(): void {
    this.initRefresh();
  }

  ngAfterViewInit(): void {
    this.getGames();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refresh() {
    this._payloadService.refreshPayload();
    this.getGames();
  }

  getGames(): void {
    const createGameSub = this._bettingOddsService
      .getGames()
      .pipe()
      .subscribe(
        (bettingOdds: IBettingOdds) => {
          this.initDataGrid(bettingOdds);
          this.totalSize = bettingOdds.totalSize;
          this.contentSize = bettingOdds.content.length;
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
        'Ngày bắt đầu': this._momentService.displayDate(bettingOdd.planStartTime),
        'Tổng bet': bettingOdd.totalBet,
        'Lợi nhuận': bettingOdd.profit,
        'Ngày tạo': this._momentService.displayDate(bettingOdd.createdAt),
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

  private initRefresh() {
    const refresh = this._observableService.refresh$.subscribe(() => {
      this.getGames();
    });
    this.subscription.add(refresh);
  }
}
