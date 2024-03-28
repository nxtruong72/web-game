import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-types',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-types.component.html',
})
export class GameTypesComponent {
  @Input() types!: Array<string>;
}
