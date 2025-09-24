import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { LancamentosService, Despesa } from '../../../services/lancamentos';

@Component({
  selector: 'app-despesas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './despesas.html',
  styleUrls: ['./despesas.scss']
})
export class DespesasComponent {
  dataSource$: Observable<Despesa[]>;
  colunasExibidas: string[] = ['data', 'valor', 'tipo', 'fixo', 'descricao', 'acoes'];

  constructor(private lancamentosService: LancamentosService) {
    this.dataSource$ = this.lancamentosService.despesas$;
  }
}
