import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IMaintenance } from '../maintenance.model';
import { MaintenanceService } from '../service/maintenance.service';


@Component({
  selector: 'app-maintenance-update',
  templateUrl: './maintenance-update.component.html',
})
export class MaintenanceUpdateComponent {
  isSaving = false;

  editForm = this.fb.group({
    description: [null, [Validators.required]],
  });

  constructor(private maintenanceService: MaintenanceService, private fb: FormBuilder) {}

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const maintenance = this.createFromForm();
    this.subscribeToSaveResponse(this.maintenanceService.create(maintenance));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaintenance>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected createFromForm(): any {
    return { description: this.editForm.get(['description'])!.value };
  }
}
