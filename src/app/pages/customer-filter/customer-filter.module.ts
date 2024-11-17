import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFilterComponent } from './customer-filter.component';
import { AppRoutingModule } from '../../app-routing.module';
import { AppLayoutModule } from '../../layout/app.layout.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';




export const customerFilterRoutes: Routes = [
  {
    path: '',
    component: CustomerFilterComponent
  },

];


@NgModule({
  
  declarations: [
    CustomerFilterComponent
  ],


  imports: [
    CommonModule,
    // AppLayoutModule,
    HttpClientModule,
    BrowserModule,
    ProgressSpinnerModule,
    BrowserAnimationsModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    RouterModule.forChild(customerFilterRoutes)

  ]



})
export class CustomerFilterModule { }
