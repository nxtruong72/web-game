import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Game } from '../../../../api/games/game.interface';
import { GameStatusComponent } from '../game-status/game-status.component';
import { GameTypesComponent } from '../game-types/game-types.component';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, GameStatusComponent, GameTypesComponent, RouterLink],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent {
  @Input() game!: Game;
}
