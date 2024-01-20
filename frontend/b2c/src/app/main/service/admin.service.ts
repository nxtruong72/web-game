import { Injectable } from '@angular/core';
import { AbstractService } from '../../state-management/abstract/abstract-service';
import { delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends AbstractService<any> {
  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.view$.asObservable();
    this.getDashboardInfo();
  }

  /**
   * simulate the state management
   * @returns data of Dashboard information
   */
  private getDashboardInfo() {
    return of([])
      .pipe(
        tap(() => {
          this.generateLoading();
        }),
        delay(1500),
      )
      .subscribe(
        (data) => {
          this.model = data;
          this.generateData(data);
        },
        (error) => {
          this.generateError(error);
        },
      );
  }
}
