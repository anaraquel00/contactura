import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginRedirectGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token');

  if (isLoggedIn) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
