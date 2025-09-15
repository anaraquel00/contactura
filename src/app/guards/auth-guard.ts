import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token'); // verifica se existe um "token" no navegador

  if (!isLoggedIn) {
    router.navigate(['/login']); // se não estiver logado, manda para login
    return false;
  }

  return true; // se estiver logado, deixa acessar
};

