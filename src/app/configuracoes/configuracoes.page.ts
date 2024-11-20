// configuracoes.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage {
  constructor(private router: Router, private alertController: AlertController) {}

  voltarParaProdutos() {
    this.router.navigate(['/products']); // ou o caminho correto para a página de produtos
  }

  // Função para deslogar o usuário
  logout() {
    // Lógica para realizar o logout (por exemplo, limpar o token de autenticação)
    this.router.navigate(['/login']);
  }

}
