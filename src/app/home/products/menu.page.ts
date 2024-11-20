import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public usuarioNome: string = 'Visitante';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Ao inicializar, busca o nome do usuário logado
    this.usuarioNome = this.authService.getUsuarioNome();
  }

  logout() {
    // Realiza logout e atualiza o nome do usuário
    this.authService.logout();
    this.usuarioNome = 'Visitante'; // Reseta o nome após logout
  }
}
