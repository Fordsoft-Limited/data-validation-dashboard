import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

export const securityRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'auth/forget-password',
    component: ForgetPasswordComponent
  },

];

@NgModule({
  declarations: [
    LoginComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(securityRoutes),
    SharedModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RippleModule,
    ReactiveFormsModule

  ]
})
export class AuthModule { }
