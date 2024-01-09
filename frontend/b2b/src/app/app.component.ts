import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'game-online';

  constructor(@Inject('TODO') private TODO: any) {}

  ngOnInit(): void {
    console.log(this.TODO);
  }
}
