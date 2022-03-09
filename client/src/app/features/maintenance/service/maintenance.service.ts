import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { createRequestOption } from 'src/app/core/request/request-util';
import { IMaintenance } from '../maintenance.model';


export type EntityResponseType = HttpResponse<IMaintenance>;
export type EntityArrayResponseType = HttpResponse<IMaintenance[]>;

@Injectable({ providedIn: 'root' })
export class MaintenanceService {
  protected resourceUrl = SERVER_API_URL + 'maintenances/';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMaintenance[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  create(maintenance: IMaintenance): Observable<EntityResponseType> {
    return this.http.post<IMaintenance>(this.resourceUrl, maintenance, { observe: 'response' });
  }
}
