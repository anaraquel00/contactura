import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterModule, MatTabsModule ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro {
constructor(private router: Router) {}

  // Define índice inicial baseado na rota
  getSelectedIndex(): number {
    if (this.router.url.includes('/cadastro/clientes')) return 0;
    if (this.router.url.includes('/cadastro/receitas')) return 1;
    if (this.router.url.includes('/cadastro/despesas')) return 2;

    // 👇 fallback: garante que clientes seja a aba padrão
    this.router.navigate(['/cadastro/clientes']);
    return 0;  // padrão clientes
}

 // Troca rota ao mudar aba
  navigateToTab(index: number) {
    if (index === 0) this.router.navigate(['/cadastro/clientes']);
    if (index === 1) this.router.navigate(['/cadastro/receitas']);
    if (index === 2) this.router.navigate(['/cadastro/despesas']);
  }
}


