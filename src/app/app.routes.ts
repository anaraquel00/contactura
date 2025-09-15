import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contacts } from './pages/contacts/contacts';
import { Despesas } from './pages/despesas/despesas';
import { Receitas } from './pages/receitas/receitas';
import { Relatorios } from './pages/relatorios/relatorios';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard'; // import do guard

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'contacts', component: Contacts },

  // rotas protegidas
  { path: 'despesas', component: Despesas,  canActivate: [authGuard] },
  { path: 'receitas', component: Receitas, canActivate: [authGuard] },
  { path: 'relatorios', component: Relatorios, canActivate: [authGuard] },

  { path: 'login', component: Login },
  { path: '**', redirectTo: '' }
];
