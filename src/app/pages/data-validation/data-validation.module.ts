import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataValidationComponent } from './data-validation.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';

export const dataValidationRoutes: Routes = [
  {
    path: '',
    component: DataValidationComponent
  },

];


@NgModule({
  declarations: [
    DataValidationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(dataValidationRoutes)
  ]
})
export class DataValidationModule { }
