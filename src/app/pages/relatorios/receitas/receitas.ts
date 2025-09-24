// Em src/app/pages/relatorios/receitas/receitas.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { LancamentosService, Receita } from '../../../services/lancamentos';

@Component({
  selector: 'app-receitas',
  standalone: true,
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
  // 2. Corrigimos o tipo para ser um Observable da interface Receita que importamos.
  dataSource$: Observable<Receita[]>;
  colunasExibidas: string[] = ['data', 'valor', 'cliente', 'descricao', 'acoes'];

  constructor(private lancamentosService: LancamentosService) {
    // 3. O construtor agora funciona, pois os tipos são compatíveis.
    this.dataSource$ = this.lancamentosService.receitas$;
  }
}

