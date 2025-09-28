import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, RouterLink } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, Header, Footer, MatSidenavModule, MatListModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  showLayoutFlag = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Atualiza a flag com base na URL final, após qualquer redirecionamento
      this.showLayoutFlag = !event.urlAfterRedirects.startsWith('/login');
      // Força o Angular a verificar as mudanças no componente
      this.cdr.detectChanges();
    });
  }

  // A função no template agora usa a flag, que é mais confiável
  showLayout(): boolean {
    return this.showLayoutFlag;
  }
}
