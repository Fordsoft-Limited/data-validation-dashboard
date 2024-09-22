import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';

export const ReportsRoutes: Routes = [
  {
    path: '',
    component: ReportsComponent
  },

];

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ReportsRoutes)
  ]
})
export class ReportsModule { }
