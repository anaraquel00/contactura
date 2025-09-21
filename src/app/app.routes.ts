import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './guards/auth-guard'; // import do guard
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { Cadastro } from './pages/cadastro/cadastro';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { RelatoriosComponent } from './pages/relatorios/relatorios';
import { ReceitasComponent } from './pages/relatorios/receitas/receitas';
import { DespesasComponent } from './pages/relatorios/despesas/despesas';
import { ReceitasCadastro } from './pages/cadastro/receitas/receitas';
import { DespesasCadastro } from './pages/cadastro/despesas/despesas';
import { Clientes } from './pages/cadastro/clientes/clientes';
import { ContactForm } from './pages/contact-form/contact-form';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // rotas protegidas
  { path:'home', component: Home, canActivate: [authGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], },
  { path :'contact-form', component: ContactForm,canActivate: [authGuard]},

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
    component: RelatoriosComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'receitas', pathMatch: 'full' },
      { path: 'receitas', component: ReceitasComponent },
      { path: 'despesas', component: DespesasComponent }
    ]
  },

    { path: '**', component: PageNotFound }
  ];
