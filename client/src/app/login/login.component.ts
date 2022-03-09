import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../core/auth/account.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  authenticationError = false;

  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });
  }

  login(): void {
    this.loginService
      .login({
        login: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
      })
      .subscribe({
        next: () => {
          this.authenticationError = false;
          this.router.navigate(['maintenance']);
        },
        error: () => (this.authenticationError = true),
      });
  }

}
