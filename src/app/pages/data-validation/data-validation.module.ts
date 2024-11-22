import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataValidationComponent } from './data-validation.component';
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
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DataVerificationComponent } from './data-verification/data-verification.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TimelineModule } from 'primeng/timeline';
import { FilterComponent } from '../filter/filter.component';

export const dataValidationRoutes: Routes = [
  {
    path: '',
    component: DataValidationComponent,
  },
  {
    path: 'data-verification/:uid',
    data:{breadcrum: 'Data Verification'},
    component: DataVerificationComponent, 
  }

];


@NgModule({
  
  declarations: [
    DataValidationComponent,
    DataVerificationComponent
  ],
  imports: [

  CommonModule,
   SharedModule,
   CommonModule,
    SharedModule,
    TableModule,
    ConfirmDialogModule,
    TimelineModule,
    ProgressSpinnerModule,
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
    RouterModule.forChild(dataValidationRoutes),

   ReactiveFormsModule,
   FormsModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DataValidationModule { }
