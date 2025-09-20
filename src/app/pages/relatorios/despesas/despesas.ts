import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTab } from "@angular/material/tabs";
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Interface e Dados de exemplo que vivem aqui agora
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
];

@Component({
  selector: 'app-despesas',
  standalone: true, // Garanta que este componente é standalone
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTab,
    MatSlideToggleModule

],
  templateUrl: './despesas.html',
  styleUrls: ['./despesas.scss']
})
export class DespesasComponent {
  colunasExibidas: string[] = ['data', 'valor', 'tipo', 'fixo', 'descricao', 'acoes'];
  dataSource = DADOS_DESPESAS; // Usando os dados de exemplo
  dataSourceDespesas!: CdkTableDataSourceInput<any>;
}
