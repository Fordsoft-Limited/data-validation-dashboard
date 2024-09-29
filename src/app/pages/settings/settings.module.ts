import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SharedModule } from 'primeng/api';
import { RouterModule, Routes } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload'; 
import { ButtonModule } from 'primeng/button'; 
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';



export const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent
  },

]; 
@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TabViewModule,
    FileUploadModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    RouterModule.forChild(settingsRoutes)
  ]
})
export class SettingsModule { }
