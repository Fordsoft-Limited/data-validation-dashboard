import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';


export const filterRoutes: Routes = [
  {
    path: '',
    component: FilterComponent
  },

];

@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    ButtonModule,
    CalendarModule, 
  ],
  exports: [FilterComponent],
  providers: [
    DatePipe, // Add DatePipe here
  ],

})
export class FilterModule { }
