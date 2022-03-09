import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { AccountService } from '../auth/account.service';
import { SERVER_API_URL } from 'src/app/app.constants';


@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private accountService: AccountService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401 && err.url && !err.url.includes(SERVER_API_URL + 'signin') && this.accountService.isAuthenticated()) {
            this.loginService.logout();
            this.router.navigate(['/login']);
          }
        },
      })
    );
  }
}
