import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateCustomerComponent } from './validate-customer.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from './../../shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ValidateCustomerReviewComponent } from './validate-customer-review/validate-customer-review.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

export const validateRoutes: Routes = [
  {
    path: '',
    component: ValidateCustomerComponent
  },
  {
    path: 'review',
    data:{breadcrum: 'Checker Review'},
    component: ValidateCustomerReviewComponent, 
  }

]; 


@NgModule({
  declarations: [
    ValidateCustomerComponent,
    ValidateCustomerReviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(validateRoutes),
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ConfirmDialogModule,
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    BadgeModule,
    InputTextareaModule,
    DropdownModule,
    TagModule,
    DividerModule,
    ProgressBarModule,
    ToastModule,
    SliderModule,
    RatingModule,
    DialogModule,
    ConfirmPopupModule
  ]
})
export class ValidateCustomerModule { }
