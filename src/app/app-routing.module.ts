import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'app',
    loadChildren: () => import('./layout/app.layout.module').then(m => m.AppLayoutModule)
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
