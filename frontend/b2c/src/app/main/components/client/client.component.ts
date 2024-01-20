import { Component } from '@angular/core';
import { AbstractComponent } from '../../../state-management/abstract/abstract-component';
import { AdminService } from '../../service/admin.service';
import { ViewContainerComponent } from '../../../state-management/view-container/view-container.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, ViewContainerComponent, LoadingComponent],
})
export class ClientComponent extends AbstractComponent<any> {
  constructor(private _adminService: AdminService) {
    super(_adminService);
  }
}
