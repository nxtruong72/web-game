import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-action',
  templateUrl: './table-action.component.html',
  styleUrls: ['./table-action.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableActionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
