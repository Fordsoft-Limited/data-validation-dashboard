import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestDataTableComponent } from './test-data-table.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

export const dataRoutes: Routes = [
  {
    path: '',
    component: TestDataTableComponent
  },

];

@NgModule({
  declarations: [
    TestDataTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(dataRoutes)
  ]
})
export class TestDataTableModule { }
