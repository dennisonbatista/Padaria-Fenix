import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http'; 
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  rua: string = '';
  bairro: string = '';

  // Variáveis e FormGroup para o formulário
  private mensagem: string = "";
  public formGroup: FormGroup = new FormGroup({
    nome: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required], // Validação para nome
    }),
    email: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required, Validators.email], // Validação de email
    }),
    senha: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)], // Senha com no mínimo 6 caracteres
    }),
    cep: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{8}$/)], // Validação para o CEP
    }),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private http: HttpClient
  ) { }

  // Método para buscar endereço pelo CEP
  getAddress(cep: string) {
    const cleanedCep = cep?.replace(/\D/g, ''); // Remove caracteres não numéricos
    console.log('CEP limpo:', cleanedCep);

    if (cleanedCep?.length === 8) {
      console.log('Buscando endereço para o CEP:', cleanedCep);
      this.http.get<any>(`https://viacep.com.br/ws/${cleanedCep}/json/`).subscribe(
        (data) => {
          console.log('Dados retornados da API:', data);
          if (!data.erro) {
            this.rua = data.logradouro;
            this.bairro = data.bairro;
            console.log('Campos preenchidos automaticamente.');
          } else {
            this.rua = '';
            this.bairro = '';
            this.showToast('CEP inválido. Por favor, tente novamente.');
          }
        },
        (error) => {
          console.error('Erro ao buscar o endereço:', error);
          this.showToast('Erro ao buscar o endereço. Verifique sua conexão.');
        }
      );
    } else {
      console.log('CEP inválido:', cleanedCep);
      this.rua = '';
      this.bairro = '';
      this.showToast('O CEP deve conter exatamente 8 dígitos.');
    }
  }

  // Função de cadastro do usuário
  cadastro() {
    const { nome, email, senha, cep } = this.formGroup.value;
    this.authService.cadastroNoFirebase(email, senha, nome)
      .then((res: any) => {
        this.router.navigate(['/login']);
      })
      .catch((error: any) => {
        this.mensagem = "Erro ao incluir usuário.";
        this.exibeMensagem();
      });
  }

  // Método para exibir mensagens de toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  // Exibe mensagem em caso de erro ou sucesso
  async exibeMensagem() {
    const toast = await this.toastController.create({
      message: this.mensagem,
      duration: 2000
    });
    toast.present();
  }

  // Verifica se o usuário está logado
  isLoggedIn: boolean = false;
  usuarioNome: string = "Visitante";

  ngOnInit() {
    const user = localStorage.getItem('user'); 
    if (user) {
      this.isLoggedIn = true;
      this.usuarioNome = JSON.parse(user).nome;
    }
  }
}
