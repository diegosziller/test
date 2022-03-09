import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from './core/auth/user-route-access.service';
import { navbarRoute } from './layouts/navbar/navbar.route';

const LAYOUT_ROUTES = [navbarRoute];

const ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    loadChildren: () => import(`./features/feature-routing.module`).then(m => m.FeatureRoutingModule),
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot([...ROUTES, ...LAYOUT_ROUTES]),
    CommonModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
