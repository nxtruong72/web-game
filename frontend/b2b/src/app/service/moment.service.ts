import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  constructor() {}

  displayDate(date: string | null, format: string = 'DD-MM-YYYY HH:mm:ss') {
    if (!date) {
      return 'N/A';
    }
    return moment(date).format(format);
  }

  getRequestDate(date: string, time: string) {
    const dateString = `${date} ${time}`;
    const parsedDate = moment(dateString, 'DD/MM/YYYY HH:mm');
    return parsedDate.utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
  }
}
