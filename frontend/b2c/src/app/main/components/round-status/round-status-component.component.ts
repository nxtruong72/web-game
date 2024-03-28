import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundStatus } from '../../../../api/rounds/round-status.enum';

@Component({
  selector: 'app-round-status-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './round-status-component.component.html',
})
export class RoundStatusComponent {
  private _status!: RoundStatus;
  value = '';
  classStr = '';
  @Input() set status(status: RoundStatus) {
    this._status = status;
    const { value, classStr } = this.getValue(status);
    this.value = value;
    this.classStr = classStr;
  }

  get status() {
    return this._status;
  }

  getValue(status: RoundStatus) {
    let value: string;
    let classStr: string;
    switch (status) {
      case RoundStatus.PENDING: {
        value = 'Đang chờ';
        classStr = 'text-bg-warning';
        break;
      }
      case RoundStatus.START: {
        value = 'Đang mở cược';
        classStr = 'text-bg-success';
        break;
      }
      case RoundStatus.CLOSE: {
        value = 'Đã đóng cược';
        classStr = 'text-bg-secondary';
        break;
      }
      case RoundStatus.CALCULATE: {
        value = 'Đang tính toán';
        classStr = 'text-bg-info';
        break;
      }
      case RoundStatus.COMPLETED: {
        value = 'Đã kết thúc';
        classStr = 'text-bg-danger';
        break;
      }

      default: {
        value = '--';
        classStr = 'text-bg-light';
        break;
      }
    }
    return { value, classStr };
  }
}
