import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { DataUtils } from 'src/app/core/util/data-util.service';
import { IMaintenance } from '../../maintenance/maintenance.model';
import { MaintenanceService } from '../../maintenance/service/maintenance.service';
import { StageType } from '../enum/stage-type.model';
import { StageService } from '../service/stage.service';
import { IStage, Stage } from '../stage.model';



@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
})
export class StageComponent implements OnInit {
  stages?: IStage[];
  isLoading = false;
  maintenanceId!: number;

  constructor(
    private stageService: StageService,
    private maintenanceService: MaintenanceService,
    private dataUtils: DataUtils,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.handleNavigation();
  }

  loadPage(dontNavigate?: boolean): void {
    this.isLoading = true;

    this.stageService.find(this.maintenanceId)
      .subscribe({
        next: (res: HttpResponse<IStage[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, !dontNavigate);
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  isImage(stage: any): boolean {
    return stage.type === 'PHOTO'
  }

  finalizeMaintenance(): void {
    this.maintenanceService.finalize(this.maintenanceId)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/maintenance']);
        },
      });
  }

  canFinalizeMaintenance(): boolean {
    return this.isphotoStageCreated() && !this.isMaintenanceInExecution();
  }

  canExecuteStage(): boolean {
    return !this.isphotoStageCreated() && !this.isMaintenanceInExecution();
  }

  isMaintenanceInExecution(): boolean {
    const stage = this.stages?.find(s => s);

    return stage?.maintenance?.status ?? false;
  }

  isphotoStageCreated(): boolean {
    const stagePhoto = this.stages?.find(stage => {
      const type: any = stage.type ?? StageType.TEXT;
      return type === 'PHOTO';
    })

    return stagePhoto !== undefined;
  }

  trackId(index: number, item: IStage): number {
    return item.id!;
  }

  openFile(stage: IStage): void {
    this.dataUtils.openFile(stage.value!, null);
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.params]).subscribe(([params]) => {
      this.maintenanceId = params['id'];
      this.loadPage(true);
    });
  }

  protected onSuccess(data: IStage[] | null, navigate: boolean): void {
    if (navigate) {
      this.router.navigate(['/maintenance']);
    }
    this.stages = data ?? [];
  }
}
