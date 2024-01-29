import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameApiService {
  constructor(private _http: HttpClient) {}

  getGames(): Observable<any> {
    return this.ok(this.fake_games);
  }

  ok(body?: any) {
    return of(new HttpResponse({ status: 200, body })).pipe(delay(500)); // delay observable to simulate server api call
  }

  private fake_games = [
    {
      id: '1',
      date: '22/12/2023',
      time: '08:30',
      status: 'Đã kết thúc',
      tag: 'Cung - Chém',
      teamA: {
        logo: '../assets/team/houston.svg',
        name: 'Houstion',
        point: 95,
      },
      teamB: {
        logo: '../assets/team/texas.svg',
        name: 'Texas',
        point: 80,
      },
    },
    {
      id: '2',
      date: '22/12/2023',
      time: '08:30',
      status: 'Đã kết thúc',
      tag: 'Cung - Chém',
      teamA: {
        logo: '../assets/team/houston.svg',
        name: 'Houstion',
        point: 95,
      },
      teamB: {
        logo: '../assets/team/texas.svg',
        name: 'Texas',
        point: 80,
      },
    },
    {
      id: '3',
      date: '22/12/2023',
      time: '08:30',
      status: 'Đã kết thúc',
      tag: 'Cung - Chém',
      teamA: {
        logo: '../assets/team/houston.svg',
        name: 'Houstion',
        point: 95,
      },
      teamB: {
        logo: '../assets/team/texas.svg',
        name: 'Texas',
        point: 80,
      },
    },
    {
      id: '4',
      date: '22/12/2023',
      time: '08:30',
      status: 'Đã kết thúc',
      tag: 'Cung - Chém',
      teamA: {
        logo: '../assets/team/houston.svg',
        name: 'Houstion',
        point: 95,
      },
      teamB: {
        logo: '../assets/team/texas.svg',
        name: 'Texas',
        point: 80,
      },
    },
    {
      id: '5',
      date: '22/12/2023',
      time: '08:30',
      status: 'Đã kết thúc',
      tag: 'Cung - Chém',
      teamA: {
        logo: '../assets/team/houston.svg',
        name: 'Houstion',
        point: 95,
      },
      teamB: {
        logo: '../assets/team/texas.svg',
        name: 'Texas',
        point: 80,
      },
    },
    {
      id: '6',
      date: '22/12/2023',
      time: '08:30',
      status: 'Đã kết thúc',
      tag: 'Cung - Chém',
      teamA: {
        logo: '../assets/team/houston.svg',
        name: 'Houstion',
        point: 95,
      },
      teamB: {
        logo: '../assets/team/texas.svg',
        name: 'Texas',
        point: 80,
      },
    },
  ];
}
