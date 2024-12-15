import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/service/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'app',
    loadChildren: () => import('./layout/app.layout.module').then(m => m.AppLayoutModule),canActivate:[authGuard]
  },
  {
    path: 'customer-details',
    data:{breadcrumb: 'Customer Details'},
    loadChildren: () =>
      import('../app/pages/customer-details-qrcode/customer-details-qrcode.module').then(
        (m) => m.CustomerDetailsQrcodeModule
      ),canActivate:[authGuard]
  },

  {
    path: 'customer-verification',
    loadChildren: () =>
      import('../app/pages/customer-verification/customer-verification.module').then(
        (m) => m.CustomerVerificationModule
      ),canActivate:[authGuard]
  },





  // { path: 'not-found', component: PageNotFoundComponent },
  // {
  //   path: '**',
  //   redirectTo: 'not-found'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
