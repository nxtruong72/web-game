import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BetHistoryApiService {

  constructor(private _http: HttpClient) { }

  getBetHistory(): Observable<any> {
    return this.ok(this.fake_data)
  }

  ok(body?: any) {
    return of(new HttpResponse({ status: 200, body }))
      .pipe(delay(500)); // delay observable to simulate server api call
  }

  private fake_data = [
    {
      id: "1",
      date: "22/10/2023",
      time: "12:04:05",
      content: "Cược đội Xanh thắng",
      id_game: "AOE-25122023-001",
      status: "Đã tất toán",
      result: "WIN",
      amount: "1,000,0000",
      unit: "₫",
      teamA: {
        logo: "../assets/team/houston.svg",
        name: "Houstion",
        point: 95,

      },
      teamB: {
        logo: "../assets/team/texas.svg",
        name: "Texas",
        point: 80,
      }
    },
    {
      id: "2",
      date: "22/10/2023",
      time: "12:04:05",
      content: "Cược đội Xanh thắng",
      id_game: "AOE-25122023-001",
      status: "Đã tất toán",
      result: "WIN",
      amount: "1,000,0000",
      unit: "₫",
      teamA: {
        logo: "../assets/team/houston.svg",
        name: "Houstion",
        point: 95,

      },
      teamB: {
        logo: "../assets/team/texas.svg",
        name: "Texas",
        point: 80,
      }
    },
    {
      id: "3",
      date: "22/10/2023",
      time: "12:04:05",
      content: "Cược đội Xanh thắng",
      id_game: "AOE-25122023-001",
      status: "Đã tất toán",
      result: "WIN",
      amount: "1,000,0000",
      unit: "₫",
      teamA: {
        logo: "../assets/team/houston.svg",
        name: "Houstion",
        point: 95,

      },
      teamB: {
        logo: "../assets/team/texas.svg",
        name: "Texas",
        point: 80,
      }
    },
    {
      id: "4",
      date: "22/10/2023",
      time: "12:04:05",
      content: "Cược đội Xanh thắng",
      id_game: "AOE-25122023-001",
      status: "Đã tất toán",
      result: "WIN",
      amount: "1,000,0000",
      unit: "₫",
      teamA: {
        logo: "../assets/team/houston.svg",
        name: "Houstion",
        point: 95,

      },
      teamB: {
        logo: "../assets/team/texas.svg",
        name: "Texas",
        point: 80,
      }
    },
    {
      id: "5",
      date: "22/10/2023",
      time: "12:04:05",
      content: "Cược đội Xanh thắng",
      id_game: "AOE-25122023-001",
      status: "Đã tất toán",
      result: "WIN",
      amount: "1,000,0000",
      unit: "₫",
      teamA: {
        logo: "../assets/team/houston.svg",
        name: "Houstion",
        point: 95,

      },
      teamB: {
        logo: "../assets/team/texas.svg",
        name: "Texas",
        point: 80,
      }
    },
    {
      id: "6",
      date: "22/10/2023",
      time: "12:04:05",
      content: "Cược đội Xanh thắng",
      id_game: "AOE-25122023-001",
      status: "Đã tất toán",
      result: "WIN",
      amount: "1,000,0000",
      unit: "₫",
      teamA: {
        logo: "../assets/team/houston.svg",
        name: "Houstion",
        point: 95,

      },
      teamB: {
        logo: "../assets/team/texas.svg",
        name: "Texas",
        point: 80,
      }
    },
    {
      id: "7",
      date: "22/10/2023",
      time: "12:04:05",
      content: "Cược đội Xanh thắng",
      id_game: "AOE-25122023-001",
      status: "Đã tất toán",
      result: "WIN",
      amount: "1,000,0000",
      unit: "₫",
      teamA: {
        logo: "../assets/team/houston.svg",
        name: "Houstion",
        point: 95,

      },
      teamB: {
        logo: "../assets/team/texas.svg",
        name: "Texas",
        point: 80,
      }
    },
    {
      id: "8",
      date: "22/10/2023",
      time: "12:04:05",
      content: "Cược đội Xanh thắng",
      id_game: "AOE-25122023-001",
      status: "Đã tất toán",
      result: "WIN",
      amount: "1,000,0000",
      unit: "₫",
      teamA: {
        logo: "../assets/team/houston.svg",
        name: "Houstion",
        point: 95,

      },
      teamB: {
        logo: "../assets/team/texas.svg",
        name: "Texas",
        point: 80,
      }
    },
    {
      id: "9",
      date: "22/10/2023",
      time: "12:04:05",
      content: "Cược đội Xanh thắng",
      id_game: "AOE-25122023-001",
      status: "Đã tất toán",
      result: "WIN",
      amount: "1,000,0000",
      unit: "₫",
      teamA: {
        logo: "../assets/team/houston.svg",
        name: "Houstion",
        point: 95,

      },
      teamB: {
        logo: "../assets/team/texas.svg",
        name: "Texas",
        point: 80,
      }
    },
    {
      id: "10",
      date: "22/10/2023",
      time: "12:04:05",
      content: "Cược đội Xanh thắng",
      id_game: "AOE-25122023-001",
      status: "Đã tất toán",
      result: "WIN",
      amount: "1,000,0000",
      unit: "₫",
      teamA: {
        logo: "../assets/team/houston.svg",
        name: "Houstion",
        point: 95,

      },
      teamB: {
        logo: "../assets/team/texas.svg",
        name: "Texas",
        point: 80,
      }
    },
  ]
}
