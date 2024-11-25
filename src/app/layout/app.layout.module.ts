import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'primeng/sidebar';
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
import { StyleClassModule } from 'primeng/styleclass';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


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
            path: 'customer-information',
            data:{breadcrumb: 'Customer Information'},
            loadChildren: () =>
              import('../pages/customer-information/customer-information.module').then(
                (m) => m.CustomerInformationModule
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
            data:{breadcrumb: 'Maker/checker'},
            loadChildren: () =>
              import('../pages/data-validation/data-validation.module').then(
                (m) => m.DataValidationModule
              ),
          },
          
          {
            path: 'customer-validation',
            data:{breadcrumb: 'Customer Validation'},
            loadChildren: () =>
              import('../pages/customer-validation/customer-validation.module').then(
                (m) => m.CustomerValidationModule
              ),
          },
           
          {
            path: 'reports',
            data:{breadcrumb: 'Reports'},
            loadChildren: () =>
              import('../pages/approved-asset/approved-asset.module').then(
                (m) => m.ApprovedAssetModule
              ),
          },
          {
            path: 'customer-details',
            data:{breadcrumb: 'Customer Details'},
            loadChildren: () =>
              import('../pages/customer-details/customer-details.module').then(
                (m) => m.CustomerDetailsModule
              ),
          },
          {
            path: 'bulk-customer-validation',
            data:{breadcrumb: 'Bulk Customer Validation'},
            loadChildren: () =>
              import('../pages/bulk-customer-validation/bulk-customer-validation.module').then(
                (m) => m.BulkCustomerValidationModule
              ),
          },
          {
            path: 'manage-user',
            data:{breadcrumb: 'Manage User'},
            loadChildren: () =>
              import('../pages/manage-user/manage-user.module').then(
                (m) => m.ManageUserModule
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

          {
            path:'new-customer',
            data:{breadcrumb: 'New  Customer'},

            loadChildren: () =>
              import('../pages/new-customer/new-customer.module').then(
                (m) => m.NewCustomerModule
              ),
          },

          {
            path:'audit-log',
            data:{breadcrumb: 'Audit  Log'},

            loadChildren: () =>
              import('../pages/audit-log/audit-log.module').then(
                (m) => m.AuditLogModule
              ),
          },

          {
            path:'validate',
            data:{breadcrumb: 'Validate Customer'},

            loadChildren: () =>
              import('../pages/validate-customer/validate-customer.module').then(
                (m) => m.ValidateCustomerModule
              ),
          },

          {
            path:'download',
            data:{breadcrumb: 'Download Reports'},

            loadChildren: () =>
              import('../pages/download/download.module').then(
                (m) => m.DownloadModule
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
        ProgressSpinnerModule,
        AppConfigModule,
        RouterModule.forChild(layoutRoutes),
    ]
})
export class AppLayoutModule { }
