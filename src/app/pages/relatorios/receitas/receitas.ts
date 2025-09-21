import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Interface e Dados de exemplo que vivem aqui agora
export interface Receita {
  data: string;
  valor: number;
  cliente: string;
  descricao: string;
}

const DADOS_RECEITAS: Receita[] = [
  { data: '19/09/2025', valor: 150.75, cliente: 'Fuctura', descricao: 'Curso Java' },
  { data: '18/09/2025', valor: 85.00, cliente: 'Google', descricao: 'Google Play' },
];

@Component({
  selector: 'app-receitas',
  standalone: true, // Garanta que este componente é standalone
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule

],
  templateUrl: './receitas.html',
  styleUrls: ['./receitas.scss']
})
export class ReceitasComponent {
  colunasExibidasReceita: string[] = ['data', 'valor', 'cliente', 'descricao', 'acoes'];
  dataSource = DADOS_RECEITAS; // Usando os dados de exemplo
  colunasExibidas: any;
  dataSourceReceitas!: CdkTableDataSourceInput<any>;


}

