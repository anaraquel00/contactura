import { Injectable } from '@angular/core';

// As "plantas" dos nossos dados (interfaces) agora vivem aqui.
export interface Receita {
  data: string;
  valor: number;
  cliente: string;
  descricao: string;
}

export interface Despesa {
  data: string;
  valor: number;
  tipo: string;
  fixo: boolean;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  // Nossas listas de dados agora vivem aqui, no "cérebro"
  private despesas: Despesa[] = [
    { data: '19/09/2025', valor: 150.75, tipo: 'Alimentação', fixo: false, descricao: 'Supermercado' },
    { data: '18/09/2025', valor: 85.00, tipo: 'Transporte', fixo: true, descricao: 'Gasolina' },
    { data: '17/09/2025', valor: 1200.00, tipo: 'Moradia', fixo: true, descricao: 'Aluguel' },
  ];

  private receitas: Receita[] = [
    { data: '20/09/2025', valor: 3500.00, cliente: 'Tech Solutions', descricao: 'Desenvolvimento de App' },
    { data: '15/09/2025', valor: 1200.00, cliente: 'Marketing Criativo', descricao: 'Consultoria' },
  ];

  constructor() { }

  // Função que os componentes chamarão para pegar a lista de despesas
  getDespesas(): Despesa[] {
    return this.despesas;
  }

  // Função para pegar a lista de receitas
  getReceitas(): Receita[] {
    return this.receitas;
  }

  // No futuro, teremos funções para adicionar, editar e remover
  // addDespesa(novaDespesa: Despesa) { ... }
}
