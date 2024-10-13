import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkCustomerValidationComponent } from './bulk-customer-validation.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

export const bulkCustomerValidationRoutes: Routes = [
  {
    path: '',
    component: BulkCustomerValidationComponent
  },

];

@NgModule({
  declarations: [
    BulkCustomerValidationComponent
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
		MessagesModule,
		ButtonModule,
		ToastModule,
		InputTextModule,
    MessageModule,
    RouterModule.forChild(bulkCustomerValidationRoutes)
  ]
})
export class BulkCustomerValidationModule { }
