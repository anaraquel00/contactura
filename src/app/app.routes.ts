import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contacts } from './pages/contacts/contacts';
import { Despesas } from './pages/despesas/despesas';
import { Receitas } from './pages/receitas/receitas';
import { Relatorios } from './pages/relatorios/relatorios';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './guards/auth-guard'; // import do guard
import { loginRedirectGuard } from './guards/login-redirect.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // rotas protegidas
  { path:'home', component: Home, canActivate: [authGuard]},
  { path: 'despesas', component: Despesas,  canActivate: [authGuard] },
  { path: 'receitas', component: Receitas, canActivate: [authGuard] },
  { path: 'relatorios', component: Relatorios, canActivate: [authGuard] },
  { path: 'contacts', component: Contacts, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];
