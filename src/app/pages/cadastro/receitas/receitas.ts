import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LancamentosService } from '../../../services/lancamentos';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-receitas-cadastro',
  standalone: true,
  imports: [
    CommonModule,
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


  constructor(private fb: FormBuilder,
     private snackBar: MatSnackBar,
     private lancamentosService: LancamentosService
  ) {
    this.form = this.fb.group({
      tipo: ['', Validators.required],
      data: ['', Validators.required],
      valor: ['', Validators.required],
      cliente: ['', Validators.required],
      descricao: ['']
    });
  }

   salvar() {
    if (this.form.valid) {
       // 4. Use o serviço para adicionar a receita
      this.lancamentosService.addReceita(this.form.value);

      this.snackBar.open('✅ Receita cadastrada com sucesso!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      this.form.reset();
    }
  }
}

