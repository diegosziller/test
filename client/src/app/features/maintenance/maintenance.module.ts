import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaintenanceComponent } from './list/maintenance.component';
import { MaintenanceRoutingModule } from './route/maintenance-routing.module';
import { MaintenanceUpdateComponent } from './update/maintenance-update.component';

@NgModule({
  imports: [ReactiveFormsModule, MaintenanceRoutingModule, FontAwesomeModule, NgbModule, CommonModule, SharedModule],
  declarations: [MaintenanceComponent, MaintenanceUpdateComponent],
})
export class MaintenanceModule {}
