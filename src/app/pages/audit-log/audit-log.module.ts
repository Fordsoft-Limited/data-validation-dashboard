import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuditLogComponent } from './audit-log.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
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
import { BadgeModule } from 'primeng/badge';  // For p-badge
import { UserService } from './service/user.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';


export const userRoutes: Routes = [
  {
    path: '',
    component: AuditLogComponent
  },
];

@NgModule({
  declarations: [
    AuditLogComponent
  ],
  imports: [
    InputSwitchModule,
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
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
    RadioButtonModule,
    RouterModule.forChild(userRoutes)
  ],
  providers: [UserService]  // Register the service here
})
export class AuditLogModule { }
