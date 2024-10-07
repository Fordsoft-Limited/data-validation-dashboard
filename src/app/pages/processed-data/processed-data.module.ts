import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessedDataComponent } from './processed-data.component';
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
    RouterModule.forChild(processDataRoutes)
  ]
})
export class ProcessedDataModule { }
