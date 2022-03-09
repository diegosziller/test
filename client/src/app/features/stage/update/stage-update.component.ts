import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DataUtils } from 'src/app/core/util/data-util.service';
import { StageType } from '../enum/stage-type.model';
import { StageService } from '../service/stage.service';
import { IStage } from '../stage.model';


@Component({
  selector: 'app-stage-update',
  templateUrl: './stage-update.component.html',
})
export class StageUpdateComponent implements OnInit {
  isSaving = false;
  maintenanceId!: number;
  stageType?: StageType | null;
  errorMessage?: string;

  editForm = this.fb.group({
    value: [null, [Validators.required]],
  });

  constructor(
    private stageService: StageService,
    private dataUtils: DataUtils,
    private elementRef: ElementRef,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    combineLatest([this.activatedRoute.params]).subscribe(([params]) => {
      this.maintenanceId = params['id'];
      this.stageService.getStageType(this.maintenanceId)
        .subscribe({next: (data) => {
          this.stageType = data.body;
        }});
    });
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.errorMessage = ''
    const file:File = event.target.files[0];
    if (file.size > 2001546) {
      this.errorMessage = 'Tamanho máx permitido é de 2MB'
      return;
    }
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      next: () => {
        this.sanitizer.bypassSecurityTrustHtml(this.editForm.get(['value'])!.value)
        this.sanitizer.bypassSecurityTrustResourceUrl(this.editForm.get(['value'])!.value)
      },
    });
  }

  clearInputImage(field: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stage = this.createFromForm();
    this.subscribeToSaveResponse(this.stageService.create(stage));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStage>>): void {
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

  protected createFromForm(): IStage {
    return {
      maintenanceId: this.maintenanceId,
      value: this.editForm.get(['value'])!.value,
    };
  }
}
