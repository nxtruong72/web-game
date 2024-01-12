import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { fluentProgress, provideFluentDesignSystem } from '@fluentui/web-components';
import { ReplaySubject, takeUntil, timer } from 'rxjs';

provideFluentDesignSystem().register(fluentProgress());

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoadingComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  percent = 0;

  constructor() {}

  ngOnInit() {
    this.simulatePercent();
  }

  simulatePercent() {
    timer(0, 25)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.percent += 1.667;
        if (this.percent >= 100) {
          this.destroyed$.next(true);
          this.destroyed$.complete();
        }
      });
  }
}
