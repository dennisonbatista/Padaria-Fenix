import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router'; // Para navegação
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  showPaoList: boolean = false;
  showBebidaList: boolean = false;
  showBoloList: boolean = false;
  showBiscoitoList: boolean = false;
  showFrioList: boolean = false;
  showOutroList: boolean = false;
  usuarioNome: string = 'Visitante';
  isLoggedIn: boolean = false;

  // Arrays de produtos
  paes = [
    { nome: "Pão Francês", imagem: "assets/icon/pao-frances.jpeg", preco: "0,50" },
    { nome: "Broa", imagem: "assets/icon/broa.jpg", preco: "2,00" },
    { nome: "Pão Suíço", imagem: "assets/icon/paosuico.jpeg", preco: "0,60" },
    { nome: "Pão de Calabresa", imagem: "assets/icon/calabresa.jpeg", preco: "1,50" },
    { nome: "Pão de Coco", imagem: "assets/icon/paodecoco.jpg", preco: "1,50" },
    { nome: "Pão de Cachorro quente", imagem: "assets/icon/paodecachorroquente.jpeg", preco: "1,50" },
    { nome: "Pão de Batata", imagem: "assets/icon/paodebatata.jpeg", preco: "2,00" },
  ];

  bebida = [
    { nome: "Coca Cola", imagem: 'assets/icon/coca.jpeg', preco: "8,00" },
    { nome: "Pepsi", imagem: "assets/icon/pepsi.jpeg", preco: "7,50" },
    { nome: "Sprite", imagem: "assets/icon/sprite.jpeg", preco: "7,50" },
    { nome: "Café", imagem: "assets/icon/cafe.jpeg", preco: "4,50" },
  ];

  bolos = [
    { nome: "Bolo de Chocolate", imagem: "assets/icon/chocolate.jpeg", preco: "4,00 Fatia" },
    { nome: "Bolo de Cenoura", imagem: "assets/icon/cenoura.jpeg", preco: "4,00 Fatia" },
    { nome: "Bolo de Fubá", imagem: "assets/icon/fuba.jpeg", preco: "4,00 Fatia" },
    { nome: "Bolo de Milho", imagem: "assets/icon/milho.jpeg", preco: "4,00 Fatia" },
  ];

  biscoitos = [
    { nome: "Biscoito de Maisena", imagem: "assets/icon/maizena.jpeg", preco: "5,00" },
    { nome: "Biscoito de Chocolate", imagem: "assets/icon/cookie.jpeg", preco: "5,00" },
  ];

  frios = [
    { nome: "Presunto", imagem: "assets/icon/presunto.jpeg", preco: "5,00 100g" },
    { nome: "Mortadela", imagem: "assets/icon/mortadela.jpeg", preco: "4,00 100g" },
    { nome: "Queijo Minas", imagem: "assets/icon/minas.jpeg", preco: "7,00 100g" },
    { nome: "Queijo Prato", imagem: "assets/icon/prato.jpeg", preco: "7,00 100g" },
    { nome: "Queijo Mussarela", imagem: "assets/icon/mussarela.jpeg", preco: "7,00 100g" },
  ];

  outros = [
    { nome: "Croassaint", imagem: "assets/icon/croassaint.jpeg", preco: "6,50" },
    { nome: "Pastel", imagem: "assets/icon/pastel.jpeg", preco: "8,00" },
    { nome: "Wrap", imagem: "assets/icon/wrap.jpeg", preco: "8,00" },
    { nome: "Tapioca", imagem: "assets/icon/tapioca.jpeg", preco: "7,50" },
  ];

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Verifica se o usuário está logado
    this.isLoggedIn = this.authService.isLoggedIn(); // Usando o método isLoggedIn do AuthService
  
    // Atribui o nome do usuário ao componente
    if (this.isLoggedIn) {
      this.usuarioNome = this.authService.getUsuarioNome(); // Pega o nome do usuário do AuthService
    }
  }

  // Função para logout
  logout() {
    this.authService.logout(); // Chama o serviço para deslogar
    this.router.navigate(['/login']); // Redireciona para a página de login
  }

  // Função para navegação quando o usuário clicar no "Cadastrar" ou "Bem-vindo"
  navigateToCadastroOuPerfil() {
    if (this.isLoggedIn) {
      this.router.navigate(['/perfil']); // Ou qualquer página de perfil
    } else {
      this.router.navigate(['/cadastro']); // Página de cadastro
    }
  }

  // Funções para alternar as listas de produtos
  togglePaoList() {
    this.showPaoList = !this.showPaoList;
  }

  toggleBebidaList() {
    this.showBebidaList = !this.showBebidaList;
  }

  toggleBoloList() {
    this.showBoloList = !this.showBoloList;
  }

  toggleBiscoitoList() {
    this.showBiscoitoList = !this.showBiscoitoList;
  }

  toggleFrioList() {
    this.showFrioList = !this.showFrioList;
  }

  toggleOutroList() {
    this.showOutroList = !this.showOutroList;
  }
}
