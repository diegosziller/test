import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LOGIN_ROUTE } from './login.route';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild([LOGIN_ROUTE])],
  declarations: [LoginComponent],
})
export class LoginModule {}
