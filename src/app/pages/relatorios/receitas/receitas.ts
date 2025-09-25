import { AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
// Em src/app/pages/relatorios/receitas/receitas.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Observable, Subscription } from 'rxjs';
import { LancamentosService, Receita } from '../../../services/lancamentos';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-receitas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatPaginatorModule,

  ],
  templateUrl: './receitas.html',
  styleUrls: ['./receitas.scss']
})
export class ReceitasComponent implements AfterViewInit, OnDestroy {
// 3. Mudar de Observable para MatTableDataSource
  dataSource = new MatTableDataSource<Receita>();
  colunasExibidas: string[] = ['id', 'data', 'valor', 'cliente', 'descricao', 'acoes'];
  private lancamentosSub!: Subscription;

  // 4. Pegar uma referência do paginator do HTML
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource$!: Observable<Receita[]>;
receita: any;

  constructor(private lancamentosService: LancamentosService) {
   // 5. Se inscrever para receber os dados do serviço
    this.lancamentosSub = this.lancamentosService.receitas$.subscribe(receitas => {
      this.dataSource.data = receitas;
    });
  }
  // 6. Conectar o paginator à fonte de dados depois que a tela for renderizada
  ngAfterViewInit(): void {
     this.dataSource.paginator = this.paginator;
  }

  // Adicionado: Método para deletar despesa
  deleteReceita(id: number | undefined): void {
    if (id !== undefined) {
      // Futuramente, chamaremos o serviço aqui.
      this.lancamentosService.deleteReceita(id);
      console.log(`Deletar receita com ID: ${id}`);
    }
  }
  // 7. Limpar a inscrição para evitar vazamento de memória
    ngOnDestroy(): void {
   this.lancamentosSub.unsubscribe();
  }

}
