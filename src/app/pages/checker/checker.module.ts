import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckerComponent } from './checker.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const checkRoutes: Routes = [
  {
    path: '',
    component: CheckerComponent
  },

];

@NgModule({
  declarations: [
    CheckerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(checkRoutes),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CheckerModule { }
