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

    // Check if the query parameter `uid` exists
    const urlTree = router.parseUrl(state.url);
    const uid = urlTree.queryParams['uid'];
    if (uid) {
      console.log('Redirecting to customer detail page for UID:', uid);

      // Prevent redirection if already on the customer-details page
      if (state.url.startsWith('/customer-details')) {
        return true;
      }

      // Redirect to the customer-details page with the UID
      router.navigate(['/customer-details'],   uid  );
      return false; // Prevent navigation to the original route
    }
    return true; 
  } else {
    console.log('User is not authenticated, redirecting to login.');
    router.navigate(['/'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
};