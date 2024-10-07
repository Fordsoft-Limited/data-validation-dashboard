import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataValidationComponent } from './data-validation.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { DataVerificationComponent } from './data-verification/data-verification.component';  
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

export const dataValidationRoutes: Routes = [
  {
    path: '',
    component: DataValidationComponent
  },
  
   { path: 'data-verification',
    data:{breadcrumb: 'Data Verification'},
    component: DataVerificationComponent },
  


];


@NgModule({
  declarations: [
    DataValidationComponent,
    DataVerificationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TableModule,
    ConfirmDialogModule,
    ButtonModule,
    ConfirmPopupModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    InputTextareaModule,
    DropdownModule,
    DividerModule,
    ProgressBarModule,
    ToastModule,
    SliderModule,
    RatingModule,
    DialogModule,
    SelectButtonModule,
    ReactiveFormsModule,
    FormsModule,
    TagModule,
    BadgeModule,
    RouterModule.forChild(dataValidationRoutes)
  ]
  //exports: [RouterModule]
})
export class DataValidationModule { }
