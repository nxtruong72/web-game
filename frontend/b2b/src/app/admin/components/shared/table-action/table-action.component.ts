import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { provideFluentDesignSystem, fluentDialog } from '@fluentui/web-components';

provideFluentDesignSystem().register(fluentDialog());

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

  ngAfterViewInit(): void {
    this.setUp();
  }

  private setUp(): void {
    const dialogElement = document.getElementById('defaultDialog');
    const dialogOpener = document.getElementById('dialogOpener');
    const dialogCloser = document.getElementById('dialogCloser');

    dialogOpener?.addEventListener('click', (e) => {
      if (dialogElement) {
        dialogElement.hidden = false;
      }
    });
    dialogCloser?.addEventListener('click', (e) => {
      this.closeDialog(dialogElement);
    });
  }

  private closeDialog(dialogElement: any): void {
    if (dialogElement) {
      dialogElement.hidden = true;
    }
  }
}
