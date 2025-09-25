import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';

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
export class DespesasCadastro implements OnInit {
  form: FormGroup;
  tipos = ['Saúde', 'Transporte', 'Educação', 'Lazer', 'Trabalho', 'Alimento', 'Domicílio', 'Empréstimo', 'Outros'];

private idParaEditar: number | null = null; // 2. Variável para controlar o modo (criar vs. editar)

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar, //barra de notificação
    private lancamentosService: LancamentosService,
    private router: Router,
    private route: ActivatedRoute // 3. Injetar ActivatedRoute
  )   {
    this.form = this.fb.group({
      tipo: ['', Validators.required],
      fixa: [false],
      data: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['']
    });
  }
  ngOnInit(): void {
    // 4. Lógica para carregar dados para edição
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idParaEditar = +id; // Converte string para número
        const despesa = this.lancamentosService.getDespesaById(this.idParaEditar);
        if (despesa) {
          this.form.patchValue(despesa); // Preenche o formulário com os dados
        }
      }
    });
  }


  salvar() {
    if (this.form.invalid) return;

    // 5. Lógica para decidir entre editar ou adicionar
    if (this.idParaEditar) {
      // MODO EDIÇÃO
      const despesaAtualizada = { id: this.idParaEditar, ...this.form.value };
      this.lancamentosService.editDespesa(despesaAtualizada);
      this.snackBar.open('✅ Despesa atualizada com sucesso!', 'Fechar', { duration: 3000 });
    } else {
      // MODO CRIAÇÃO
      this.lancamentosService.addDespesa(this.form.value);
      this.snackBar.open('✅ Despesa cadastrada com sucesso!', 'Fechar', { duration: 3000 });
    }

    this.router.navigate(['/dashboard']); // 6. Navega de volta após salvar
  }
}
