import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})

export class SobrePage {
  // Estados para controlar a visibilidade das seções
  showSobrePadaria = false;
  showMissao = false;
  showVisao = false;
  showValores = false;

  // Função para alternar a exibição das seções
  toggleList(section: string) {
    if (section === 'sobrePadaria') {
      this.showSobrePadaria = !this.showSobrePadaria;
    } else if (section === 'missao') {
      this.showMissao = !this.showMissao;
    } else if (section === 'visao') {
      this.showVisao = !this.showVisao;
    } else if (section === 'valores') {
      this.showValores = !this.showValores;
    }
  }
}