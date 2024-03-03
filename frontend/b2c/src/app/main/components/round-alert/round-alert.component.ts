import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-round-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './round-alert.component.html',
  styleUrls: ['./round-alert.component.scss'],
})
export class RoundAlertComponent {
  @Input() roundState: any;
  @Input() teamWin: any;

  getTeamWin() {
    if (1 === this.teamWin) {
      return '#1 XANH';
    } else if (2 === this.teamWin) {
      return '#2 ĐỎ';
    }
    return '--';
  }

  getClassForTeamWin() {
    if (1 === this.teamWin) {
      return 'text-info';
    } else if (2 === this.teamWin) {
      return 'text-danger';
    }
    return 'text-secondary';
  }
}
