import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contacts } from './pages/contacts/contacts';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './guards/auth-guard'; // import do guard
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { Cadastro } from './pages/cadastro/cadastro';
import { Dashboard } from './pages/dashboard/dashboard';
import { Relatorios } from './pages/relatorios/relatorio';
import { ReceitaRelatorio } from './pages/relatorios/receitas/receita';
import { DespesaRelatorio } from './pages/relatorios/despesas/despesa';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: Cadastro },


  // rotas protegidas
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path:'home', component: Home, canActivate: [authGuard]},
  { path: 'relatorios', component: Relatorios, canActivate: [authGuard] },
  { path: 'contacts', component: Contacts, canActivate: [authGuard] },

   {
    path: 'relatorios',
    component: Relatorios,
    canActivate: [authGuard],
    children: [
      { path: 'receitas', component: ReceitaRelatorio },
      { path: 'despesas', component: DespesaRelatorio }
    ]
  },

    { path: '**', component: PageNotFound }
];
