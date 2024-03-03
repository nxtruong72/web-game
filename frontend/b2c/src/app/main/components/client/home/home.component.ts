import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigatorComponent } from '../../navigator/navigator.component';
import { FooterComponent } from '../../footer/footer.component';
import { UserService } from '../../../../service/user.service';
import { TimerService } from '../../../../service/timer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigatorComponent, FooterComponent],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _timerService: TimerService,
    private _userService: UserService,
  ) {}

  ngOnInit(): void {
    this._timerService.start();
    this._userService.startAutoSyncBalance();
  }

  ngOnDestroy(): void {
    this._timerService.stop();
    this._userService.stopAutoSyncBalance();
  }
}
