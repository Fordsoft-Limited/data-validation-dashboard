import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerValidationComponent } from './customer-validation.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const customerValidationRoutes: Routes = [
  {
    path: '',
    component: CustomerValidationComponent
  },

];

@NgModule({
  declarations: [
    CustomerValidationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(customerValidationRoutes),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CustomerValidationModule { }
