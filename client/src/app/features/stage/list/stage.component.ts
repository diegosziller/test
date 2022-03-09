import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { DataUtils } from 'src/app/core/util/data-util.service';
import { StageService } from '../service/stage.service';
import { IStage } from '../stage.model';



@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
})
export class StageComponent implements OnInit {
  stages?: IStage[];
  isLoading = false;
  maintenanceId!: number;

  constructor(
    protected stageService: StageService,
    protected dataUtils: DataUtils,
    protected activatedRoute: ActivatedRoute,
    protected router: Router
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

  finalizeMaintenance(): void {}

  canFinalizeMaintenance(): boolean | undefined{
    return this.stages?.some(stage => {
      const type: any = stage.type;
      return type === "PHOTO";
    });
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
