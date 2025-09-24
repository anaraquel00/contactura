import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// As interfaces continuam as mesmas
export interface Receita {
  data: string | Date;
  valor: number;
  cliente: string;
  descricao: string;
}

export interface Despesa {
  data: string | Date;
  valor: number;
  tipo: string;
  fixo: boolean;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  // 1. Nossos dados iniciais, caso o "bloco de notas" esteja vazio
  private dadosIniciaisDespesas: Despesa[] = [
    { data: '2025-09-19', valor: 150.75, tipo: 'Alimentação', fixo: false, descricao: 'Supermercado' },
    { data: '2025-09-18', valor: 85.00, tipo: 'Transporte', fixo: true, descricao: 'Gasolina' },
  ];

  private dadosIniciaisReceitas: Receita[] = [
    { data: '2025-09-20', valor: 3500.00, cliente: 'Tech Solutions', descricao: 'Desenvolvimento de App' },
    { data: '2025-09-15', valor: 1200.00, cliente: 'Marketing Criativo', descricao: 'Consultoria' },
  ];

  // 2. Nossas "câmeras de segurança" (BehaviorSubject). Note que não inicializamos com dados ainda.
  private despesasSubject = new BehaviorSubject<Despesa[]>([]);
  private receitasSubject = new BehaviorSubject<Receita[]>([]);

  // Nossos "canais de TV" públicos
  despesas$ = this.despesasSubject.asObservable();
  receitas$ = this.receitasSubject.asObservable();

  constructor() {
    // 3. LÓGICA DE CARREGAMENTO: Roda UMA VEZ quando o serviço é criado.
    // Tenta carregar as despesas salvas do "bloco de notas"
    const despesasSalvas = localStorage.getItem('despesas');
    if (despesasSalvas) {
      // Se encontrou, traduz de volta para uma lista e transmite
      this.despesasSubject.next(JSON.parse(despesasSalvas));
    } else {
      // Se não encontrou nada (primeira vez rodando), transmite os dados iniciais
      this.despesasSubject.next(this.dadosIniciaisDespesas);
    }

    // Faz a mesma coisa para as receitas
    const receitasSalvas = localStorage.getItem('receitas');
    if (receitasSalvas) {
      this.receitasSubject.next(JSON.parse(receitasSalvas));
    } else {
      this.receitasSubject.next(this.dadosIniciaisReceitas);
    }
  }

  // 4. LÓGICA PARA SALVAR: Roda TODA VEZ que adicionamos um item.
  addDespesa(novaDespesa: Despesa) {
    const listaAtual = this.despesasSubject.getValue();
    const novaLista = [...listaAtual, novaDespesa];
    this.despesasSubject.next(novaLista); // Transmite a nova lista
    this.salvarDespesasNoLocalStorage(); // Salva no "bloco de notas"
  }

  addReceita(novaReceita: Receita) {
    const listaAtual = this.receitasSubject.getValue();
    const novaLista = [...listaAtual, novaReceita];
    this.receitasSubject.next(novaLista);
    this.salvarReceitasNoLocalStorage();
  }

  // 5. Funções privadas para organizar o código
  private salvarDespesasNoLocalStorage() {
    // Pega a lista atual, traduz para texto, e salva no "bloco de notas"
    localStorage.setItem('despesas', JSON.stringify(this.despesasSubject.getValue()));
    console.log('Lista de despesas salva no LocalStorage!');
  }

  private salvarReceitasNoLocalStorage() {
    localStorage.setItem('receitas', JSON.stringify(this.receitasSubject.getValue()));
    console.log('Lista de receitas salva no LocalStorage!');
  }
}
