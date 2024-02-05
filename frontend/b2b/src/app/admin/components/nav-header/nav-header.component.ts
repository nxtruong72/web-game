import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { fluentDivider, provideFluentDesignSystem } from '@fluentui/web-components';

provideFluentDesignSystem().register(fluentDivider());

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
