import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  constructor() {}

  getStandardDate(date: string | null, format: string = 'DD-MM-YYYY HH:mm:ss') {
    if (!date) {
      return 'N/A';
    }
    return moment(date).format(format);
  }
}
