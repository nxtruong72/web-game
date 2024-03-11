import { JsonPipe, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink, NgIf, JsonPipe],
})
export class BreadcrumbComponent implements OnInit {
  @Input() pages: Array<any> = [];
  @Output() refreshEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  refresh() {
    this.refreshEvent.emit(true);
  }
}
