import { Component } from '@angular/core';

@Component({
  selector: 'app-ajuda',
  templateUrl: './ajuda.page.html',
  styleUrls: ['./ajuda.page.scss'],
})
export class AjudaPage {
  showComoUsar: boolean = false;
  showContatoSuporte: boolean = false;

  toggleAjudaList(section: string) {
    if (section === 'comoUsar') {
      this.showComoUsar = !this.showComoUsar;
    } else if (section === 'contatoSuporte') {
      this.showContatoSuporte = !this.showContatoSuporte;
    }
  }
}
