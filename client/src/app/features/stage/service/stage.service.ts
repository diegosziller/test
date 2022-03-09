import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { createRequestOption } from 'src/app/core/request/request-util';
import { StageType } from '../enum/stage-type.model';
import { IStage } from '../stage.model';


export type EntityResponseType = HttpResponse<IStage>;
export type EntityArrayResponseType = HttpResponse<IStage[]>;

@Injectable({ providedIn: 'root' })
export class StageService {
  protected resourceUrl = SERVER_API_URL + 'stages';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStage[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getStageType(maintenceId: number): Observable<HttpResponse<StageType>> {
    return this.http
      .get<StageType>(`${SERVER_API_URL}maintenance/${maintenceId}/stages/type`, { observe: 'response' });
  }

  find(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IStage[]>(`${SERVER_API_URL}maintenance/${id}/stages`, { observe: 'response' });
  }

  create(stage: IStage): Observable<EntityResponseType> {
    return this.http
      .post<IStage>(`${SERVER_API_URL}maintenance/${stage.maintenanceId}/stages`, stage, { observe: 'response' });
  }
}
