import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';  // Import SharedModule, which exports DataTableComponent

export const ReportsRoutes: Routes = [
  {
    path: '',
    component: ReportsComponent
  },
];

@NgModule({
  declarations: [
    ReportsComponent,  // Only declare ReportsComponent here
  ],
  imports: [
    CommonModule,
    SharedModule,  // Import SharedModule to use DataTableComponent
    RouterModule.forChild(ReportsRoutes)
  ]
})
export class ReportsModule { }
