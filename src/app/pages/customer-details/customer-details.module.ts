import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDetailsComponent } from './customer-details.component';
import { CustomerDetailFieldComponent } from './customer-detail-field/customer-detail-field.component';
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
import { TimelineModule } from 'primeng/timeline';
//import { QRCodeModule } from 'qrcode';
import { CardModule } from 'primeng/card';

export const customerDetailsRoutes: Routes = [
  {
    path: ':id',
    component: CustomerDetailsComponent,
  },
  // {
  //   path: 'data-verification',
  //   data:{breadcrum: 'Data Verification'},
  //   component: DataVerificationComponent, 
  // }

];

@NgModule({
  declarations: [
    CustomerDetailsComponent,
    CustomerDetailFieldComponent,

  ],
  imports: [
    CommonModule,
    TableModule,
    ConfirmDialogModule,
    ButtonModule,
    CardModule,
    ConfirmPopupModule,
    InputTextModule,
    SharedModule,
    TimelineModule,
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
    RouterModule.forChild(customerDetailsRoutes),

   ReactiveFormsModule,
   FormsModule,
  ]
})
export class CustomerDetailsModule { }
