import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Account } from '../core/auth/account.model';
import { AccountService } from '../core/auth/account.service';
import { AuthService } from '../core/auth/auth.service';

import { Login } from './login.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
      private authService: AuthService,
      private accountService: AccountService
    ) {}

  login(credentials: Login): Observable<Account | null> {
    return this.authService.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
  }

  logout(): void {
    this.authService.logout().subscribe({ complete: () => this.accountService.authenticate(null) });
  }
}
