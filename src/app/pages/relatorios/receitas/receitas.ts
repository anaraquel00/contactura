import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTab } from "@angular/material/tabs";
import { CdkTableDataSourceInput } from '@angular/cdk/table';

// Interface e Dados de exemplo que vivem aqui agora
export interface Receita {
  data: string;
  valor: number;
  cliente: string;
  descricao: string;
}

const DADOS_RECEITAS: Receita[] = [
  { data: '20/09/2025', valor: 3500.00, cliente: 'Tech Solutions', descricao: 'Desenvolvimento de App' },
  { data: '15/09/2025', valor: 1200.00, cliente: 'Marketing Criativo', descricao: 'Consultoria' },
];

@Component({
  selector: 'app-receitas',
  standalone: true, // Garanta que este componente é standalone
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTab
],
  templateUrl: './receitas.html',
  styleUrls: ['./receitas.scss']
})
export class ReceitasComponent {
  colunasExibidas: string[] = ['data', 'valor', 'cliente', 'descricao', 'acoes'];
  dataSource = DADOS_RECEITAS;
  dataSourceReceitas!: CdkTableDataSourceInput<any>;
colunasExibidasReceitas: any;
}
