import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Round } from '../../../../api/rounds/round.interface';
import { RoundService } from '../../service/round.service';
import { Observable } from 'rxjs';
import { RoundStatusComponent } from '../round-status/round-status-component.component';
import { RoundWinnerComponent } from '../round-winner/round-winner.component';

@Component({
  selector: 'app-rounds-history-modal',
  standalone: true,
  imports: [CommonModule, RoundStatusComponent, RoundWinnerComponent],
  templateUrl: './rounds-history-modal.component.html',
  styleUrls: ['./rounds-history-modal.component.scss'],
})
export class RoundsHistoryModalComponent implements OnInit, OnChanges, OnDestroy {
  rounds$!: Observable<Array<Round>>;
  constructor(private _roundService: RoundService) {
    this.rounds$ = this._roundService.rounds$;
  }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy() {}

  trackByFn(index: any, item: { id: any }) {
    return item.id;
  }
}
