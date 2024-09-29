import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataValidationComponent } from './data-validation.component';
import { RouterModule, Routes } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from './../../shared/shared.module';
export const dataValidationRoutes: Routes = [
  {
    path: '',
    component: DataValidationComponent,
  },
  {
    path: 'review',
    component: ReviewComponent, // Ensure this is properly set up
  }

];


@NgModule({
  declarations: [
    DataValidationComponent,
    ReviewComponent
  ],
  imports: [

  CommonModule,
   SharedModule,
    RouterModule.forChild(dataValidationRoutes),

   ReactiveFormsModule,
   FormsModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DataValidationModule { }
