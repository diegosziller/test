import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { StageComponent } from './list/stage.component';
import { StageRoutingModule } from './route/stage-routing.module';
import { StageUpdateComponent } from './update/stage-update.component';

@NgModule({
  imports: [ReactiveFormsModule, StageRoutingModule, FontAwesomeModule, NgbModule, CommonModule, SharedModule],
  declarations: [StageComponent, StageUpdateComponent],
})
export class StageModule {}
