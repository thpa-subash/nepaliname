import { LoginComponent } from './Admin/login/login.component';
import { AddNamesComponent } from './Admin/add-names/add-names.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { LayoutComponent } from './Admin/layout/layout.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', component: AddNamesComponent },
  { path: '', component: DashboardComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'addname', component: AddNamesComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
