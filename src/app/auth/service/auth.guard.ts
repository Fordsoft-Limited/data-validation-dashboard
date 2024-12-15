import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router);           // Inject Router

  // Debugging the full URL structure
  console.log('Full URL:', state.url);

  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    console.log('User is authenticated, allowing access.');

    // Check if 'validate' exists anywhere in the path or query parameters
    const urlTree = router.parseUrl(state.url);

    // Log the path and query parameters for debugging
    // console.log('Path:', urlTree.path);
    console.log('Query Parameters:', urlTree.queryParams);

    if (urlTree.queryParams['validate']) {
      console.log('URL contains "validate", redirecting to customer-verification page.');

      // Redirect to the customer-verification page
      router.navigate(['/customer-verification']);
      return false; // Prevent navigation to the original route
    }

    // Check for `uid` parameter in the query params
    const uid = urlTree.queryParams['uid'];
    if (uid) {
      console.log('Redirecting to customer detail page for UID:', uid);

      // Prevent redirection if already on the customer-details page
      if (state.url.startsWith('/customer-details')) {
        return true;
      }

      // Redirect to the customer-details page with the UID
      router.navigate(['/customer-details'], {
        queryParams: { uid }
      });
      return false; // Prevent navigation to the original route
    }

    return true; // Allow navigation if neither `uid` nor `validate` is present
  } else {
    console.log('User is not authenticated, redirecting to login.');
    router.navigate(['/'], {
      queryParams: { returnUrl: state.url }
    });
    return false; // Prevent navigation to the original route
  }
};
