// 1. Imports corretos no topo do arquivo
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para o CurrencyPipe e outras diretivas
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTab } from "@angular/material/tabs"; // Para os botões de ação
import { CdkTableDataSourceInput } from '@angular/cdk/table';

// 2. Nossa interface e dados de mentira (como já tínhamos)
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
  selector: 'app-receitas', // Geralmente o seletor é no plural para combinar com o componente
  standalone: true,
  // 3. Lista de imports correta (apenas MÓDULOS)
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
export class ReceitasComponent { // 4. Nome da classe corrigido para a convenção
  // 5. Colunas a serem exibidas
  colunasExibidas: string[] = ['data', 'valor', 'cliente', 'descricao', 'acoes'];

  // 6. O DataSource é simplesmente o nosso array de dados!
  dataSource = DADOS_RECEITAS;
  dataSourceReceitas: CdkTableDataSourceInput<any> = [];
colunasExibidasReceitas: any;

  // O construtor pode ficar vazio por enquanto
  constructor() { }
}
