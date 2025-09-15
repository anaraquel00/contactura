import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  constructor(private router: Router) {}

  // Mostra layout completo em qualquer rota que NÃO seja /login
  showLayout(): boolean {
  return !this.router.url.startsWith('/login');
}
}
