import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';

@Component({
  // O construtor não é mais necessário aqui, a menos que você o use para outra coisa.
  // constructor() {}
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTabsModule ],
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


