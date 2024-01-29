import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionApiService {
  constructor(private _http: HttpClient) {}

  getTransaction(): Observable<any> {
    return this.ok(this.fake_data);
  }

  ok(body?: any) {
    return of(new HttpResponse({ status: 200, body })).pipe(delay(500)); // delay observable to simulate server api call
  }

  private fake_data = [
    {
      id: '1',
      date: '12:04:05 - 22/10/2023',
      content: 'Nộp tiền vào tài khoản #123456780123456',
      time: '08:30',
      status: 'Thành công',
      type: 'Income',
      amount: '1,000,0000',
      unit: '₫',
    },

    {
      id: '2',
      date: '12:04:05 - 22/10/2023',
      content: 'Nộp tiền vào tài khoản #123456780123456',
      time: '08:30',
      status: 'Thành công',
      type: 'Income',
      amount: '1,000,0000',
      unit: '₫',
    },
    {
      id: '3',
      date: '12:04:05 - 22/10/2023',
      content: 'Nộp tiền vào tài khoản #123456780123456',
      time: '08:30',
      status: 'Thành công',
      type: 'Income',
      amount: '1,000,0000',
      unit: '₫',
    },
    {
      id: '4',
      date: '12:04:05 - 22/10/2023',
      content: 'Nộp tiền vào tài khoản #123456780123456',
      time: '08:30',
      status: 'Thành công',
      type: 'Income',
      amount: '1,000,0000',
      unit: '₫',
    },
    {
      id: '5',
      date: '12:04:05 - 22/10/2023',
      content: 'Nộp tiền vào tài khoản #123456780123456',
      time: '08:30',
      status: 'Thành công',
      type: 'Income',
      amount: '1,000,0000',
      unit: '₫',
    },
    {
      id: '6',
      date: '12:04:05 - 22/10/2023',
      content: 'Nộp tiền vào tài khoản #123456780123456',
      time: '08:30',
      status: 'Thành công',
      type: 'Income',
      amount: '1,000,0000',
      unit: '₫',
    },
    {
      id: '7',
      date: '12:04:05 - 22/10/2023',
      content: 'Nộp tiền vào tài khoản #123456780123456',
      time: '08:30',
      status: 'Thành công',
      type: 'Income',
      amount: '1,000,0000',
      unit: '₫',
    },
    {
      id: '8',
      date: '12:04:05 - 22/10/2023',
      content: 'Nộp tiền vào tài khoản #123456780123456',
      time: '08:30',
      status: 'Thành công',
      type: 'Income',
      amount: '1,000,0000',
      unit: '₫',
    },
    {
      id: '9',
      date: '12:04:05 - 22/10/2023',
      content: 'Nộp tiền vào tài khoản #123456780123456',
      time: '08:30',
      status: 'Thành công',
      type: 'Income',
      amount: '1,000,0000',
      unit: '₫',
    },
    {
      id: '10',
      date: '12:04:05 - 22/10/2023',
      content: 'Nộp tiền vào tài khoản #123456780123456',
      time: '08:30',
      status: 'Thành công',
      type: 'Income',
      amount: '1,000,0000',
      unit: '₫',
    },
  ];
}
