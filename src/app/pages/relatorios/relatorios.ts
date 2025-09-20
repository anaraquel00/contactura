// Em relatorio.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './relatorios.html',
  styleUrls: ['./relatorios.scss']
})
export class RelatoriosComponent {
  abas = [
    { label: 'Relatório de Receitas', rota: 'receitas' },
    { label: 'Relatório de Despesas', rota: 'despesas' }
  ];
}

