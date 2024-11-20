import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessaoService {

  constructor() {}

  // Método para limpar a sessão (exemplo com localStorage)
  limparSessao() {
    // Aqui você pode limpar o localStorage, sessionStorage ou variáveis
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    // Ou qualquer outra variável que armazene dados da sessão
  }
}
