import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-round-winer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './round-winner.component.html',
})
export class RoundWinnerComponent implements OnChanges {
  displayName!: string;
  classStr!: string;

  @Input() winner!: number;

  ngOnChanges(): void {
    const { displayName, classStr } = this._convert();
    this.displayName = displayName;
    this.classStr = classStr;
  }

  private _convert() {
    let displayName = '';
    let classStr = '';
    switch (this.winner) {
      case 0: {
        displayName = 'Chưa xác định';
        classStr = 'text-bg-secondary';
        break;
      }
      case 1: {
        displayName = 'Đội Xanh';
        classStr = 'text-bg-info';
        break;
      }
      case 2: {
        displayName = 'Đội Đỏ';
        classStr = 'text-bg-danger';
        break;
      }
      default: {
        displayName = '--';
        classStr = 'text-bg-secondary';
        break;
      }
    }
    return {
      displayName,
      classStr,
    };
  }
}
