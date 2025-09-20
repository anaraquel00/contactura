import { CommonModule } from '@angular/common';
import { Component,  ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss'],
})

// 1. Diga à classe para usar o AfterViewInit
export class ContactForm implements AfterViewInit {
  form: FormGroup;

  // 2. Peça o ChangeDetectorRef (cdr) no construtor
  constructor(private fb: FormBuilder,
     private snackBar: MatSnackBar,
     private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngAfterViewInit(): void {
  // Usamos o truque do setTimeout para garantir que a detecção
  // rode depois do ciclo de renderização atual do navegador.
  setTimeout(() => this.cdr.detectChanges());
}


  onSubmit() {
  console.log('Função onSubmit FOI CHAMADA!'); // Isso está funcionando!

  if (this.form.valid) { // <--- A CONDIÇÃO IMPORTANTE
    // O SnackBar só é chamado se o formulário for válido
    this.snackBar.open('Contato salvo com sucesso!', 'Fechar', {
      duration: 3000,
    });
  } else {
    console.log('Formulário inválido!'); // Se o formulário estiver vazio, esta mensagem deve aparecer.
  }
 }

  onCancel(): void {
    console.log('Função onCancel FOI CHAMADA!');
    this.form.reset();
    console.log('Contato cancelado');
  }
}
