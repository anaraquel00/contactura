import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos do Material que vamos usar
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";

// Podemos reutilizar a mesma interface e dados do Dashboard
export interface Despesa {
  data: string;
  valor: number;
  tipo: string;
  fixo: boolean;
  descricao: string;
}

const DADOS_DESPESAS: Despesa[] = [
  { data: '19/09/2025', valor: 150.75, tipo: 'Alimentação', fixo: false, descricao: 'Supermercado' },
  { data: '18/09/2025', valor: 85.00, tipo: 'Transporte', fixo: true, descricao: 'Gasolina' },
  { data: '17/09/2025', valor: 1200.00, tipo: 'Moradia', fixo: true, descricao: 'Aluguel' },
];

// 1. Crie uma nova interface para Receita
export interface Receita {
  data: string;
  valor: number;
  cliente: string;
  descricao: string;
}

// 2. Crie os dados de mentira para as receitas
const DADOS_RECEITAS: Receita[] = [
  { data: '20/09/2025', valor: 3500.00, cliente: 'Tech Solutions', descricao: 'Desenvolvimento de App' },
  { data: '15/09/2025', valor: 1200.00, cliente: 'Marketing Criativo', descricao: 'Consultoria' },
];

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule, // O módulo para o "interruptor"
    MatToolbarModule,
    RouterModule
],
  templateUrl: './relatorio.html',
  styleUrls: ['./relatorio.scss']
})

export class RelatoriosComponent {
abas = [
    { label: 'Relatório de Receitas', rota: 'receitas' },
    { label: 'Relatório de Despesas', rota: 'despesas' }
  ];


}


