import { Component } from '@angular/core';
import { AbstractComponent } from '../../../state-management/abstract/abstract-component';
import { AdminService } from '../../service/admin.service';
import { ViewContainerComponent } from '../../../state-management/view-container/view-container.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss'],
  standalone: true,
  imports: [CommonModule, ViewContainerComponent, LoadingComponent],
})
export class CmsComponent extends AbstractComponent<any> {
  constructor(private _adminService: AdminService) {
    super(_adminService);
  }
}
