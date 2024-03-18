import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObservableService {
  private refresh = new Subject<boolean>();
  refresh$ = this.refresh.asObservable();

  constructor() {}

  refreshData() {
    this.refresh.next(true);
  }
}
