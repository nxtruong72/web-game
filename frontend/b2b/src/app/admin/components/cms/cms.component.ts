import { Component } from '@angular/core';
import { AbstractComponent } from '../../../state-management/abstract/abstract-component';
import { AdminService } from '../../service/admin.service';
import { ViewContainerComponent } from '../../../state-management/view-container/view-container.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterOutlet } from '@angular/router';
import { NavHeaderComponent } from '../nav-header/nav-header.component';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, ViewContainerComponent, LoadingComponent, SideBarComponent, NavHeaderComponent],
})
export class CmsComponent extends AbstractComponent<any> {
  constructor(private _adminService: AdminService) {
    super(_adminService);
  }
}
