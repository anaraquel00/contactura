import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token'); // 🔹 remove o token
    this.router.navigate(['/login']); // 🔹 redireciona para login
  }

}
