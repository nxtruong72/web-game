import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { GameService } from '../../../service/games.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../authentication/service/auth.service';
import { JwtService } from '../../../../service/jwt.service';
import { NavigatorComponent } from '../../navigator/navigator.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigatorComponent, FooterComponent],
})
export class HomeComponent {
}
