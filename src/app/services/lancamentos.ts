import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// As interfaces com o ID único (isso está perfeito)
export interface Receita {
  id?: number;
  data: string | Date;
  valor: number;
  cliente: string;
  descricao: string;
}

export interface Despesa {
  id?: number;
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

  private dadosIniciaisDespesas: Despesa[] = [
    { id: 1, data: '2025-09-19', valor: 150.75, tipo: 'Alimentação', fixo: false, descricao: 'Supermercado' },
    { id: 2, data: '2025-09-18', valor: 85.00, tipo: 'Transporte', fixo: true, descricao: 'Gasolina' },
  ];

  private dadosIniciaisReceitas: Receita[] = [
    { id: 1, data: '2025-09-20', valor: 3500.00, cliente: 'Tech Solutions', descricao: 'Desenvolvimento de App' },
    { id: 2, data: '2025-09-15', valor: 1200.00, cliente: 'Marketing Criativo', descricao: 'Consultoria' },
  ];

  private despesasSubject = new BehaviorSubject<Despesa[]>([]);
  private receitasSubject = new BehaviorSubject<Receita[]>([]);

  despesas$ = this.despesasSubject.asObservable();
  receitas$ = this.receitasSubject.asObservable();

  constructor() {
    // A lógica de migração está ótima, vamos mantê-la
    const despesasSalvasJSON = localStorage.getItem('despesas');
    if (despesasSalvasJSON) {
      let despesasSalvas: Despesa[] = JSON.parse(despesasSalvasJSON);
      if (despesasSalvas.length > 0 && despesasSalvas[0].id === undefined) {
        console.log('Migrando dados de despesas antigas. Adicionando IDs...');
        despesasSalvas = despesasSalvas.map((despesa, index) => ({
          ...despesa,
          id: this.gerarId() + index,
        }));
        localStorage.setItem('despesas', JSON.stringify(despesasSalvas));
      }
      this.despesasSubject.next(despesasSalvas);
    } else {
      this.despesasSubject.next(this.dadosIniciaisDespesas);
    }

    const receitasSalvasJSON = localStorage.getItem('receitas');
    if (receitasSalvasJSON) {
      let receitasSalvas: Receita[] = JSON.parse(receitasSalvasJSON);
      if (receitasSalvas.length > 0 && receitasSalvas[0].id === undefined) {
        console.log('Migrando dados de receitas antigas. Adicionando IDs...');
        receitasSalvas = receitasSalvas.map((receita, index) => ({
          ...receita,
          id: this.gerarId() + index,
        }));
        localStorage.setItem('receitas', JSON.stringify(receitasSalvas));
      }
      this.receitasSubject.next(receitasSalvas);
    } else {
      this.receitasSubject.next(this.dadosIniciaisReceitas);
    }
  }

  // Retornamos à geração de ID por timestamp, é mais segura.
  private gerarId(): number {
    return new Date().getTime();
  }

  // Busca uma despesa específica pelo seu ID
  getDespesaById(id: number): Despesa | undefined {
    // .find() procura na lista o primeiro item que satisfaz a condição
    return this.despesasSubject.getValue().find(d => d.id === id);
  }

  getReceitaById(id: number): Receita | undefined {
    return this.receitasSubject.getValue().find(r => r.id === id);
  }

  addDespesa(novaDespesa: Despesa) {
    const listaAtual = this.despesasSubject.getValue();
    const despesaComId = { ...novaDespesa, id: this.gerarId() };
    const novaLista = [...listaAtual, despesaComId];
    this.despesasSubject.next(novaLista);
    this.salvarDespesasNoLocalStorage();
  }

  addReceita(novaReceita: Receita) {
    const listaAtual = this.receitasSubject.getValue();
    const receitaComId = { ...novaReceita, id: this.gerarId() };
    const novaLista = [...listaAtual, receitaComId];
    this.receitasSubject.next(novaLista);
    this.salvarReceitasNoLocalStorage();
  }

   deleteDespesa(id: number): void {
    const listaAtual = this.despesasSubject.getValue();
    const novaLista = listaAtual.filter(d => d.id !== id);
    this.despesasSubject.next(novaLista);
    this.salvarDespesasNoLocalStorage();
  }

  deleteReceita(id: number): void {
    const listaAtual = this.receitasSubject.getValue();
    const novaLista = listaAtual.filter(r => r.id !== id);
    this.receitasSubject.next(novaLista);
    this.salvarReceitasNoLocalStorage();
  }

  editDespesa(despesaAtualizada: Despesa): void {
    const listaAtual = this.despesasSubject.getValue();
    const novaLista = listaAtual.map(despesa => {
      // Se o ID da despesa na lista for igual ao da despesa que estamos atualizando...
   if (despesa.id === despesaAtualizada.id) {
    // ...retorna o objeto atualizado para substituí-lo na nova lista.
        return  despesaAtualizada };
      // Senão, apenas retorna a despesa original.
      return despesa;
  });
      this.despesasSubject.next(novaLista); // Transmite a lista com o item atualizado
      this.salvarDespesasNoLocalStorage(); // Salva a mudança
  }

  editReceita(receitaAtualizada: Receita): void {
    const listaAtual = this.receitasSubject.getValue();
    const novaLista = listaAtual.map(receita => {
      // Se o ID da despesa na lista for igual ao da despesa que estamos atualizando...
    if (receita.id === receitaAtualizada.id) {
    // ...retorna o objeto atualizado para substituí-lo na nova lista.
        return  receitaAtualizada };
      // Senão, apenas retorna a despesa original.
      return receita;
  });
      this.receitasSubject.next(novaLista); // Transmite a lista com o item atualizado
      this.salvarReceitasNoLocalStorage(); // Salva a mudança
  }



  private salvarDespesasNoLocalStorage() {
    localStorage.setItem('despesas', JSON.stringify(this.despesasSubject.getValue()));
    console.log('Lista de despesas salva no LocalStorage!');
  }

  private salvarReceitasNoLocalStorage() {
    localStorage.setItem('receitas', JSON.stringify(this.receitasSubject.getValue()));
    console.log('Lista de receitas salva no LocalStorage!');
  }
}



