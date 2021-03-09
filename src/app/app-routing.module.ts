import { FrontComponent } from './front/front.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './Guard/auth.guard';
import { LoginComponent } from './Admin/login/login.component';
import { AddNamesComponent } from './Admin/add-names/add-names.component';

import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
  },
  { path: '', component: FrontComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
