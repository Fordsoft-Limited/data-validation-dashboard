// import { CanActivateFn } from '@angular/router';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from './auth.service';

// export const roleGuard: CanActivateFn = (route, state) => {
//     const authService = inject(AuthService);
//     const router = inject(Router);
  
//     // Check if the required role is set in the route's data
//     const requiredRole = route.data?.['role'] as string;
//     if (!requiredRole) {
//       console.error('Required role is not defined in the route data.');
//       router.navigate(['/']);
//       return false;
//     }
  
//     // Get the user's role from AuthService
//     const userRole = authService.getUserRole();
//     if (!userRole) {
//       console.error('User role is undefined. User might not be authenticated.');
//       router.navigate(['/']);
//       return false;
//     }
  
//     // Check if the user's role matches the required role
//     if (userRole === requiredRole) {
//       return true;
//     } else {
//       console.warn(`Access denied: Required role: ${requiredRole}, User role: ${userRole}`);
//       router.navigate(['/']);
//       return false;
//     }
//   };


import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
  
    const requiredRoles = route.data?.['roles'];
    if (!requiredRoles || !Array.isArray(requiredRoles)) {
      console.error('Roles metadata is missing or invalid in route configuration.');
      router.navigate(['/unauthorized']); // Redirect to an unauthorized page
      return false;
    }
  
    const userRole = authService.getUserRole();
    if (requiredRoles.includes(userRole)) {
      return true;
    }
  
    console.warn(`Access denied. Required roles: ${requiredRoles}, User role: ${userRole}`);
    router.navigate(['/unauthorized']);
    return false;
  };
  