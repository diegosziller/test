import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'maintenance',
                loadChildren: () => import('./maintenance/maintenance.module').then(m => m.MaintenanceModule),
            },
            {
                path: 'stage',
                loadChildren: () => import('./stage/stage.module').then(m => m.StageModule),
            },
        ]),
    ],
})
export class FeatureRoutingModule { }
