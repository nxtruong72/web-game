import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { MenuI } from '../../interface/admin.interface';
import { provideFluentDesignSystem, fluentDivider } from '@fluentui/web-components';

provideFluentDesignSystem().register(fluentDivider());

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SideBarComponent implements OnInit {
  menu: Array<MenuI> = [
    {
      name: 'Bảng điều khiển',
      icon: '',
    },
    {
      name: 'Người chơi',
      icon: '',
    },
    {
      name: 'IP máy khách',
      icon: '',
    },
    {
      name: 'Giao dịch',
      icon: '',
    },
    {
      name: 'Kèo cá cược',
      icon: '',
    },
    {
      name: 'Bảng điều khiển',
      icon: '',
    },
    {
      name: 'Bots',
      icon: '',
    },
    {
      name: 'Campaigns',
      icon: '',
    },
    {
      name: 'Gift code',
      icon: '',
    },
    {
      name: 'Gamebank',
      icon: '',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
