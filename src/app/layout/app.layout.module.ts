import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { AppConfigModule } from './config/app.config.module';
import { AppLayoutComponent } from './app.layout.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppMenuProfileComponent } from './app.menuprofile.component';
import { AppTopbarComponent } from './app.topbar.component';
import { AppRightMenuComponent } from './app.rightmenu.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule, Routes } from '@angular/router';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppFooterComponent } from './app.footer.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';


export const layoutRoutes: Routes = [
  {
      path: '',
      component: AppLayoutComponent,
      children: [
        {
            path: '',
            data:{breadcrumb: 'Dashboard'},
            loadChildren: () =>
              import('../pages/dashboard/dashboard.module').then(
                (m) => m.DashboardModule
              ),
          },
          {
            path: 'reports',
            data:{breadcrumb: 'Reports'},
            loadChildren: () =>
              import('../pages/reports/reports.module').then(
                (m) => m.ReportsModule
              ),
          },
          {
            path: 'processed-data',
            data:{breadcrumb: 'Processed Data'},
            loadChildren: () =>
              import('../pages/processed-data/processed-data.module').then(
                (m) => m.ProcessedDataModule
              ),
          },
          {
            path: 'checkers',
            data:{breadcrumb: 'Checkers'},
            loadChildren: () =>
              import('../pages/checker/checker.module').then(
                (m) => m.CheckerModule
              ),
          },
          {
            path: 'user-management',
            data:{breadcrumb: 'User Management'},
            loadChildren: () =>
              import('../pages/user/user.module').then(
                (m) => m.UserModule
              ),
          },
          {
            path: 'data-validation',
            data:{breadcrumb: 'Maker/Checker'},
            loadChildren: () =>
              import('../pages/data-validation/data-validation.module').then(
                (m) => m.DataValidationModule
              ),
          },
          {
            path: 'data-table',
            data:{breadcrumb: 'Data Table'},
            loadChildren: () =>
              import('../pages/test-data-table/test-data-table.module').then(
                (m) => m.TestDataTableModule
              ),
          },

          {
            path:'settings',
            data:{breadcrumb: 'Settings'},
            loadChildren: () =>
              import('../pages/settings/settings.module').then(
                (m) => m.SettingsModule
              ),
          },
    ]
    },

];


@NgModule({
    declarations: [
        AppLayoutComponent,
        AppBreadcrumbComponent,
        AppMenuProfileComponent,
        AppTopbarComponent,
        AppRightMenuComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppMenuitemComponent,
        AppFooterComponent
    ],
    imports: [
      CommonModule,
        FormsModule,
        HttpClientModule,
        StyleClassModule,
       SharedModule,
        SidebarModule,

        AppConfigModule,
        RouterModule.forChild(layoutRoutes),
    ]
})
export class AppLayoutModule { }
