import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { MenuI } from '../../interface/admin.interface';
import { provideFluentDesignSystem, fluentDivider } from '@fluentui/web-components';
import { RouterModule } from '@angular/router';

provideFluentDesignSystem().register(fluentDivider());

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule],
})
export class SideBarComponent implements OnInit {
  menu: Array<MenuI> = [
    {
      name: 'Bảng điều khiển',
      icon: 'chart_multiple.svg',
      route: 'bang-dieu-khien',
    },
    {
      name: 'Người chơi',
      icon: 'user.svg',
      route: 'nguoi-choi',
    },
    {
      name: 'IP máy khách',
      icon: 'computer.svg',
      route: 'ip-may-khach',
    },
    {
      name: 'Giao dịch',
      icon: 'pay.svg',
      route: 'giao-dich',
    },
    {
      name: 'Kèo cá cược',
      icon: 'ball.svg',
      route: 'keo-ca-cuoc',
    },
    {
      name: 'Bots',
      icon: 'bot.svg',
      route: 'bots',
    },
    {
      name: 'Campaigns',
      icon: 'campaigns.svg',
      route: 'campaigns',
    },
    {
      name: 'Gift code',
      icon: 'gift.svg',
      route: 'gift-code',
    },
    {
      name: 'Gamebank',
      icon: 'bank.svg',
      route: 'game-bank',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
