import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-betting-odds-detail',
  templateUrl: './betting-odds-detail.component.html',
  styleUrls: ['./betting-odds-detail.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BettingOddsDetailComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}

  getGames() {
    // TODO
  }
}
