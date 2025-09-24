import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // CommonModule já inclui o CurrencyPipe
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// 1. As "plantas" dos dados (interfaces) e o serviço são importados.
import { LancamentosService, Despesa, Receita } from '../../services/lancamentos';
import { RouterModule } from '@angular/router'; // Adicionado para o routerLink
import { Observable } from 'rxjs/internal/Observable';
import { CdkTableDataSourceInput } from '@angular/cdk/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  // Nomes únicos para cada "canal de TV"
  dataSourceDespesas$: Observable<Despesa[]>;
  dataSourceReceitas$: Observable<Receita[]>;
  // Propriedades para a tabela de Despesas
  colunasExibidasDespesas: string[] = ['data', 'valor', 'tipo', 'fixo', 'descricao', 'acoes'];

  // Propriedades para a tabela de Receitas
  colunasExibidasReceitas: string[] = ['data', 'valor', 'cliente', 'descricao', 'acoes'];
  dataSourceDespesas!: CdkTableDataSourceInput<any>;
  dataSourceReceitas!: CdkTableDataSourceInput<any>;

  constructor(private lancamentosService: LancamentosService) {
// Sintonizamos cada "TV" no seu respectivo canal do serviço
    this.dataSourceDespesas$ = this.lancamentosService.despesas$;
    this.dataSourceReceitas$ = this.lancamentosService.receitas$;
  }
}
