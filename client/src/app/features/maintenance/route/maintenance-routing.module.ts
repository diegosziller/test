import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'src/app/core/auth/user-route-access.service';

import { MaintenanceComponent } from '../list/maintenance.component';
import { MaintenanceUpdateComponent } from '../update/maintenance-update.component';

const maintenanceRoute: Routes = [
  {
    path: '',
    component: MaintenanceComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: 'new',
    component: MaintenanceUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(maintenanceRoute)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
