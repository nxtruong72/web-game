import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { fluentOption, fluentSelect, provideFluentDesignSystem } from '@fluentui/web-components';

provideFluentDesignSystem().register(fluentSelect(), fluentOption());

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [],
})
export class PaginationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
