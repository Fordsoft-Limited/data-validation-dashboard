import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router);           // Inject Router

  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    console.log('User is authenticated, allowing access.');
    return true;
  } else {
    console.log('User is not authenticated, redirecting to login.');
    router.navigate(['/'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
};
