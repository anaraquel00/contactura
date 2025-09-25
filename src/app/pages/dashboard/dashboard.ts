import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // CommonModule já inclui o CurrencyPipe
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// 1. As "plantas" dos dados (interfaces) e o serviço são importados.
import { LancamentosService, Despesa, Receita } from '../../services/lancamentos';
import { RouterModule } from '@angular/router'; // Adicionado para o routerLink
import { Observable } from 'rxjs/internal/Observable';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements AfterViewInit, OnDestroy{
  // Data sources para cada tabela
  dataSourceDespesas = new MatTableDataSource<Despesa>();
  dataSourceReceitas = new MatTableDataSource<Receita>();

  colunasExibidasDespesas: string[] = ['id', 'data', 'valor', 'tipo', 'fixo', 'descricao', 'acoes'];
  colunasExibidasReceitas: string[] = ['id', 'data', 'valor', 'cliente', 'descricao', 'acoes'];

  private despesasSub!: Subscription;
  private receitasSub!: Subscription;

  // Referências para cada paginator
  @ViewChild('despesasPaginator') despesasPaginator!: MatPaginator;
  @ViewChild('receitasPaginator') receitasPaginator!: MatPaginator;
  dataSourceDespesas$!: Observable<Despesa[]>;
  dataSourceReceitas$!: Observable<Receita[]>;
  dataSource: any;
  paginator: any;
  Paginator: any;

  constructor(private lancamentosService: LancamentosService)  {
    this.despesasSub = this.lancamentosService.despesas$.subscribe(despesas => {
      this.dataSourceDespesas.data = despesas;
    });

    this.receitasSub = this.lancamentosService.receitas$.subscribe(receitas => {
      this.dataSourceReceitas.data = receitas;
    });
  }

  ngAfterViewInit(): void {
    this.dataSourceDespesas.paginator = this.despesasPaginator;
    this.dataSourceReceitas.paginator = this.receitasPaginator;

  }

   deleteDespesa(id: number | undefined): void {
    if (id !== undefined) {
      this.lancamentosService.deleteDespesa(id);
    }
  }

  deleteReceita(id: number | undefined): void {
    if (id !== undefined) {
      this.lancamentosService.deleteReceita(id);
    }
  }

  ngOnDestroy(): void {
    this.despesasSub.unsubscribe();
    this.receitasSub.unsubscribe();
  }
}
