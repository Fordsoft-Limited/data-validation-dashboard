import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCustomerComponent } from './new-customer.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
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
import { FilterModule } from '../filter/filter.module';
import { SharedModule } from 'primeng/api';

export const newCustomerRoute: Routes = [
  {
    path: '',
    component: NewCustomerComponent
  },

];

@NgModule({
  declarations: [
    NewCustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(newCustomerRoute),
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
    FilterModule
  ]
})
export class NewCustomerModule { }
