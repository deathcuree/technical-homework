import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

// the homepage will not appear even if you type it in the URL, for security
export const authGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('email')) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['login']);
  }
};
