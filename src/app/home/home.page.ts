import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SessaoService } from "../services/sessao.service" ;
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private menu: MenuController, private sessaoService : SessaoService, private router: Router ) {}

  closeMenuAndNavigate() {
    this.menu.close().then(() => {
      this.router.navigate(['/products']);
    });
  }

  logout() {
    this.sessaoService .limparSessao ();
    this.router.navigate (["/login" ]);
    }
    intro() {
    this.router.navigate (["/intro" ]);
    }
    
}
