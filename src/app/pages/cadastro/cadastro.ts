import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MatToolbar, MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from '@angular/material/button';


@Component({
  // O construtor não é mais necessário aqui, a menos que você o use para outra coisa.
  // constructor() {}
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatToolbar, MatButtonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro {
// Toda a lógica agora está neste array. Simples e direto.
  abas = [
    { label: 'Clientes', rota: 'clientes' },
    { label: 'Receitas', rota: 'receitas' },
    { label: 'Despesas', rota: 'despesas' }
  ];
}


