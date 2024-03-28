import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStatus } from '../../../../api/games/game.enum';

@Component({
  selector: 'app-game-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-status.component.html',
})
export class GameStatusComponent {
  private _status!: GameStatus;
  value = '';
  classStr = '';
  @Input() set status(status: GameStatus) {
    this._status = status;
    const { value, classStr } = this.getValue(status);
    this.value = value;
    this.classStr = classStr;
  }

  get status() {
    return this._status;
  }

  getValue(status: GameStatus) {
    let value: string;
    let classStr: string;
    switch (status) {
      case GameStatus.PENDING: {
        value = 'Sắp tới';
        classStr = 'text-bg-warning';
        break;
      }
      case GameStatus.START: {
        value = 'Đang diễn ra';
        classStr = 'text-bg-success';
        break;
      }

      case GameStatus.COMPLETED: {
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
