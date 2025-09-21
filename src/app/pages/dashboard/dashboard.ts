// Em src/app/pages/dashboard/dashboard.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // CommonModule já inclui o CurrencyPipe
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// 1. As "plantas" dos dados (interfaces) e o serviço são importados.
import { LancamentosService, Despesa, Receita } from '../../services/lancamentos';
import { RouterModule } from '@angular/router'; // Adicionado para o routerLink

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule // Adicionado
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  // Propriedades para a tabela de Despesas
  colunasExibidasDespesas: string[] = ['data', 'valor', 'tipo', 'fixo', 'descricao', 'acoes'];
  dataSourceDespesas: Despesa[] = [];

  // Propriedades para a tabela de Receitas
  colunasExibidasReceitas: string[] = ['data', 'valor', 'cliente', 'descricao', 'acoes'];
  dataSourceReceitas: Receita[] = [];

  constructor(private lancamentosService: LancamentosService) {
    // Pedimos os "pratos" para a "cozinha"
    this.dataSourceDespesas = this.lancamentosService.getDespesas();
    this.dataSourceReceitas = this.lancamentosService.getReceitas();
  }
}
