import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-receitas-cadastro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './receitas.html',
  styleUrl: './receitas.scss'
})
export class ReceitasCadastro {
  form: FormGroup;
  snackBar: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tipo: ['', Validators.required],
      data: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['']
    });
  }

   salvar() {
    if (this.form.valid) {
      console.log('Receita cadastrada:', this.form.value);

      this.snackBar.open('✅ Receita cadastrada com sucesso!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      this.form.reset();
    }
  }
}

