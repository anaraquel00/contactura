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
import { ReceitasCadastro } from './pages/cadastro/receitas/receitas';
import { DespesasCadastro } from './pages/cadastro/despesas/despesas';
import { Clientes } from './pages/cadastro/clientes/clientes';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },



  // rotas protegidas
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path:'home', component: Home, canActivate: [authGuard]},
  { path: 'relatorios', component: Relatorios, canActivate: [authGuard] },
  { path: 'contacts', component: Contacts, canActivate: [authGuard] },

   {
    path: 'cadastro',
    component: Cadastro,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' }, // ✅ redireciona
      { path: 'clientes', component: Clientes},
      { path: 'receitas', component: ReceitasCadastro },
      { path: 'despesas', component: DespesasCadastro }
    ]
  },

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
