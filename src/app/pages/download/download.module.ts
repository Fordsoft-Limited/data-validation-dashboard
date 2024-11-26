import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadComponent } from './download.component';
import { RouterModule, Routes } from '@angular/router';
import { TreeTableModule } from 'primeng/treetable';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

export const downloadRoutes: Routes = [
  {
    path: '',
    component: DownloadComponent
  },

];

@NgModule({
  declarations: [
    DownloadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(downloadRoutes),
    TreeTableModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
})
export class DownloadModule { }
