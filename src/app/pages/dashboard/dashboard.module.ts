import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'primeng/api';
import { RouterModule, Routes } from '@angular/router';


export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },

];


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
