import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
})
export class AccountComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() { }
  navigateTo(link: string) {
    this._router.navigate([link])
  }
}
