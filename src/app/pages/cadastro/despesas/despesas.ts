import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LancamentosService } from '../../../services/lancamentos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-despesas-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDatepickerModule,
  ],
  templateUrl: './despesas.html',
  styleUrl: './despesas.scss'
})
export class DespesasCadastro {
  form: FormGroup;
  tipos = ['Saúde', 'Transporte', 'Educação', 'Lazer', 'Trabalho', 'Alimento', 'Domicílio', 'Empréstimo', 'Outros'];


  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar, //barra de notificação
    private lancamentosService: LancamentosService ) {
    this.form = this.fb.group({
      tipo: ['', Validators.required],
      fixa: [false],
      data: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['']
    });
  }

  salvar() {
    if (this.form.valid) {
      this.lancamentosService.addDespesa(this.form.value);

      this.snackBar.open('✅ Despesa cadastrada com sucesso!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
        this.form.reset();

    } else {
      console.log('Formulário inválido');
    }
  }
}
