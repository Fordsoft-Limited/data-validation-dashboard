import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUserComponent } from './manage-user.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
export const ManageUserRoutes: Routes = [
  {
    path: '',
    component: ManageUserComponent
  },

];

@NgModule({
  declarations: [
    ManageUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommonModule,
		FormsModule,
		ButtonModule,
		RippleModule,
		InputTextModule,
		DropdownModule,
		FileUploadModule,
		InputTextareaModule,
    ReactiveFormsModule,
    RadioButtonModule,
    CheckboxModule,
    RouterModule.forChild(ManageUserRoutes)
  ]
})
export class ManageUserModule { }
