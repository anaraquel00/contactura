import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
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
export class ReceitasCadastro implements OnInit {
  form: FormGroup;
  private idParaEditar: number | null = null;

  constructor(private fb: FormBuilder,
     private snackBar: MatSnackBar,
     private lancamentosService: LancamentosService,
     private router: Router,
     private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      tipo: ['', Validators.required],
      data: ['', Validators.required],
      valor: ['', Validators.required],
      cliente: ['', Validators.required],
      descricao: ['']
    });
  }
  ngOnInit(): void {
    // 4. Lógica para carregar dados para edição
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idParaEditar = +id; // Converte string para número
        const receita = this.lancamentosService.getReceitaById(this.idParaEditar);
        if (receita) {
          this.form.patchValue(receita); // Preenche o formulário com os dados
        }
      }
    });
  }


  salvar() {
    if (this.form.invalid) return;

    // 5. Lógica para decidir entre editar ou adicionar
    if (this.idParaEditar) {
      // MODO EDIÇÃO
      const receitaAtualizada = { id: this.idParaEditar, ...this.form.value };
      this.lancamentosService.editReceita(receitaAtualizada);
      this.snackBar.open('✅ Receita atualizada com sucesso!', 'Fechar', { duration: 3000 });
    } else {
      // MODO CRIAÇÃO
      this.lancamentosService.addReceita(this.form.value);
      this.snackBar.open('✅ Receita cadastrada com sucesso!', 'Fechar', { duration: 3000 });
    }

    this.router.navigate(['/dashboard']); // 6. Navega de volta após salvar
  }
}

