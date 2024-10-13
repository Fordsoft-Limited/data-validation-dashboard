import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInformationComponent } from './customer-information.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';


export const customerInformationRoutes: Routes = [
  {
    path: '',
    component: CustomerInformationComponent
  },

];

@NgModule({
  declarations: [
    CustomerInformationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommonModule,
    SharedModule,
    TabViewModule,
    FileUploadModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    ProgressBarModule,
    ToastModule,
    MessagesModule,
    CommonModule,
   SharedModule,
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
    RouterModule.forChild(customerInformationRoutes)
  ]
})
export class CustomerInformationModule { }
