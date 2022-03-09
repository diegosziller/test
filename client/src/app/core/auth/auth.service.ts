import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from 'src/app/app.constants';

type Login = {
  login: string;
  password: string;
};
@Injectable({ providedIn: 'root' })
export class AuthService {
  public resourceUrl = SERVER_API_URL + 'auth/';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getToken(): string {
    const tokenInLocalStorage: string | null = this.localStorageService.retrieve('authenticationToken');
    return tokenInLocalStorage ?? '';
  }

  login(credentials: Login): Observable<any> {
    return this.http
      .post(this.resourceUrl + 'signin', credentials, { observe: 'response' })
      .pipe(map(response => this.authenticateSuccess(response)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.localStorageService.clear('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(res: any): void {
    const jwt = res.headers.get('Authorization');
    this.localStorageService.store('authenticationToken', jwt);
  }
}