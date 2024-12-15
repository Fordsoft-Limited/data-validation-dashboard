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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginVerificationComponent } from './login-verification/login-verification.component'; // Import ProgressSpinnerModule

export const securityRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login-validate',
    component: LoginVerificationComponent
  },
  {
    path: 'auth/forget-password',
    component: ForgetPasswordComponent
  },

];

@NgModule({
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    LoginVerificationComponent
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
    ReactiveFormsModule,
    ProgressSpinnerModule

  ]
})
export class AuthModule { }
