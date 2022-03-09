import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'src/app/core/auth/user-route-access.service';
import { StageComponent } from '../list/stage.component';
import { StageUpdateComponent } from '../update/stage-update.component';


const stageRoute: Routes = [
  {
    path: 'maintenance/:id',
    component: StageComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: 'maintenance/:id/new',
    component: StageUpdateComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(stageRoute)],
  exports: [RouterModule],
})
export class StageRoutingModule {}
