import { Component } from '@angular/core';
// Importe os módulos que vamos precisar depois
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';

// Criamos uma interface para definir o formato de uma despesa
export interface Despesa {
  data: string;
  valor: number;
  tipo: string;
  fixo: boolean;
  descricao: string;
}

// Nossos dados de mentira
const DADOS_DESPESAS: Despesa[] = [
  { data: '19/09/2025', valor: 150.75, tipo: 'Alimentação', fixo: false, descricao: 'Supermercado' },
  { data: '18/09/2025', valor: 85.00, tipo: 'Transporte', fixo: true, descricao: 'Gasolina' },
  { data: '17/09/2025', valor: 1200.00, tipo: 'Moradia', fixo: true, descricao: 'Aluguel' },
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, // Módulo para a tabela
    MatCardModule, // Módulo para o card
    MatButtonModule, // Módulo para os botões
    MatIconModule,
    CurrencyPipe // Módulo para os ícones de editar/remover
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  // A lista de colunas que a tabela vai exibir. A ordem aqui importa!
  colunasExibidas: string[] = ['data', 'valor', 'tipo', 'fixo', 'descricao', 'acoes'];
  // Expomos nossos dados de mentira para o template
  dataSource = DADOS_DESPESAS;
}
