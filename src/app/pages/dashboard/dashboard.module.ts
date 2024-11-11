import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'primeng/api';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TabViewModule } from 'primeng/tabview';
//import { SharedModules } from '../../shared/shared.module';  
//import { DashboardComponent } from './pages/dashboard/dashboard.component';


export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    ChartModule,
    TableModule,
    InputTextModule,
    OverlayPanelModule,
    TabViewModule,
    RouterModule.forChild(dashboardRoutes),
  ],
})
export class DashboardModule {}
