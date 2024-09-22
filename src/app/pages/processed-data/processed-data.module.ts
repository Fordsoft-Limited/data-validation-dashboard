import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessedDataComponent } from './processed-data.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';

export const processDataRoutes: Routes = [
  {
    path: '',
    component: ProcessedDataComponent
  },

];

@NgModule({
  declarations: [
    ProcessedDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(processDataRoutes)
  ]
})
export class ProcessedDataModule { }
