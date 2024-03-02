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
  @Input() roundState: any
}
