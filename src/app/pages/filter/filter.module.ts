import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Button, ButtonModule } from 'primeng/button';
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
    SharedModule,
    RouterModule.forChild(filterRoutes),
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    CalendarModule, 
  ],

  providers: [
    DatePipe, // Add DatePipe here
  ],

})
export class FilterModule { }
