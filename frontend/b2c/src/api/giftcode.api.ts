import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GiftCodeApiService {
  constructor(private _http: HttpClient) {}

  getActivatedHistory(): Observable<any> {
    return this.ok(this.fake_data);
  }

  ok(body?: any) {
    return of(new HttpResponse({ status: 200, body })).pipe(delay(500)); // delay observable to simulate server api call
  }

  private fake_data = [
    {
      id: '1',
      date: '22/10/2023',
      content: 'Quà tân thủ',
      time: '12:04:05',
      amount: '100,0000',
      unit: '₫',
      code: 'GIFT-25122023',
    },
    {
      id: '2',
      date: '22/10/2023',
      content: 'Quà tân thủ',
      time: '12:04:05',
      amount: '100,0000',
      unit: '₫',
      code: 'GIFT-25122023',
    },
    {
      id: '3',
      date: '22/10/2023',
      content: 'Quà tân thủ',
      time: '12:04:05',
      amount: '100,0000',
      unit: '₫',
      code: 'GIFT-25122023',
    },
    {
      id: '4',
      date: '22/10/2023',
      content: 'Quà tân thủ',
      time: '12:04:05',
      amount: '100,0000',
      unit: '₫',
      code: 'GIFT-25122023',
    },
    {
      id: '5',
      date: '22/10/2023',
      content: 'Quà tân thủ',
      time: '12:04:05',
      amount: '100,0000',
      unit: '₫',
      code: 'GIFT-25122023',
    },
    {
      id: '6',
      date: '22/10/2023',
      content: 'Quà tân thủ',
      time: '12:04:05',
      amount: '100,0000',
      unit: '₫',
      code: 'GIFT-25122023',
    },
    {
      id: '7',
      date: '22/10/2023',
      content: 'Quà tân thủ',
      time: '12:04:05',
      amount: '100,0000',
      unit: '₫',
      code: 'GIFT-25122023',
    },
    {
      id: '8',
      date: '22/10/2023',
      content: 'Quà tân thủ',
      time: '12:04:05',
      amount: '100,0000',
      unit: '₫',
      code: 'GIFT-25122023',
    },
    {
      id: '9',
      date: '22/10/2023',
      content: 'Quà tân thủ',
      time: '12:04:05',
      amount: '100,0000',
      unit: '₫',
      code: 'GIFT-25122023',
    },
    {
      id: '10',
      date: '22/10/2023',
      content: 'Quà tân thủ',
      time: '12:04:05',
      amount: '100,0000',
      unit: '₫',
      code: 'GIFT-25122023',
    },
    {
      id: '11',
      date: '22/10/2023',
      content: 'Quà tân thủ',
      time: '12:04:05',
      amount: '100,0000',
      unit: '₫',
      code: 'GIFT-25122023',
    },
    {
      id: '12',
      date: '22/10/2023',
      content: 'Quà tân thủ',
      time: '12:04:05',
      amount: '100,0000',
      unit: '₫',
      code: 'GIFT-25122023',
    },
  ];
}
