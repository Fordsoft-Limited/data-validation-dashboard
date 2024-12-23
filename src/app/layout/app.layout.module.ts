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
import { authGuard } from '../auth/service/auth.guard';
import { roleGuard } from '../auth/service/role.guard';


export const layoutRoutes: Routes = [
  {
      path: '',
      component: AppLayoutComponent,
      children: [
        {
            path: '',
            canActivate: [roleGuard],
            data:{breadcrumb: 'Dashboard', roles: ['ADMIN', 'USER', 'APPROVAL','REVIEWER']},
            loadChildren: () =>
              import('../pages/dashboard/dashboard.module').then(
                (m) => m.DashboardModule
              ),
          },
          
          // {
          //   path: 'customer-information',
          //   data:{breadcrumb: 'Customer Information'},
          //   loadChildren: () =>
          //     import('../pages/customer-information/customer-information.module').then(
          //       (m) => m.CustomerInformationModule
          //     ),
          // },

          {
            path: 'user-management',
            canActivate: [roleGuard],
            data:{breadcrumb: 'User Management', roles: ['ADMIN'] },
            loadChildren: () =>
              import('../pages/user/user.module').then(
                (m) => m.UserModule
              ),
          },
          {
            path: 'data-validation',
            canActivate: [roleGuard],
            data:{breadcrumb: 'Maker/checker', roles: ['ADMIN','REVIEWER'] },

            loadChildren: () =>
              import('../pages/data-validation/data-validation.module').then(
                (m) => m.DataValidationModule
              ),
          },
          
          {
            path: 'customer-validation',
            canActivate: [roleGuard],
            data:{breadcrumb: 'Customer Validation', roles: ['ADMIN', 'APPROVAL','USER']},
            loadChildren: () =>
              import('../pages/customer-validation/customer-validation.module').then(
                (m) => m.CustomerValidationModule
              ),
          },
           
          {
            path: 'reports',
            canActivate: [roleGuard],
            data:{breadcrumb: 'Reports', roles: ['ADMIN', 'REVIEWER', 'APPROVAL']},
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
            canActivate: [roleGuard],
            data:{breadcrumb: 'Manage User', roles: ['ADMIN']},
            loadChildren: () =>
              import('../pages/manage-user/manage-user.module').then(
                (m) => m.ManageUserModule
              ),
          },
          // {
          //   path: 'data-table',
          //   data:{breadcrumb: 'Data Table'},
          //   loadChildren: () =>
          //     import('../pages/test-data-table/test-data-table.module').then(
          //       (m) => m.TestDataTableModule
          //     ),
          // },

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
            canActivate: [roleGuard],
            data:{breadcrumb: 'New  Customer', roles: ['ADMIN',"APPROVAL"]},

            loadChildren: () =>
              import('../pages/new-customer/new-customer.module').then(
                (m) => m.NewCustomerModule
              ),
          },

          {
            path:'audit-log',
            canActivate: [roleGuard],
            data:{breadcrumb: 'Audit  Log', roles: ['ADMIN'] },

            loadChildren: () =>
              import('../pages/audit-log/audit-log.module').then(
                (m) => m.AuditLogModule
              ),
          },

          {
            path:'validate',
            canActivate: [roleGuard],
            data:{breadcrumb: 'Validate Customer', roles: ['ADMIN', 'APPROVAL'] },

            loadChildren: () =>
              import('../pages/validate-customer/validate-customer.module').then(
                (m) => m.ValidateCustomerModule
              ),
          },

          {
            path:'download',
            canActivate: [roleGuard],
            data:{breadcrumb: 'Download Reports', roles: ['ADMIN', 'APPROVAL', 'REVIEWER']},

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
