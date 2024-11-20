import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string = "";
  public senha: string = "";
  public mensagem: string = "";
  constructor(private authService: AuthService,
    private router: Router,
    private toastController: ToastController) { }
    loginUsuario() {
      this.authService.loginNoFirebase(this.email, this.senha)
        .then((res) => {
          console.log("res = ", res);
          this.router.navigate(["/home"]);
        })
        .catch((error) => {
          console.log("error = ", error);
          this.mensagem = "Erro ao fazer login do usuário.";
          this.exibeMensagem();
        });
    }
  async exibeMensagem() {
    const toast = await this.toastController.create({
      message: this.mensagem,
      duration: 2000
    });
    toast.present();
  }
  cadastroPage() {
    this.router.navigate(["/cadastro"]);
  }
  ngOnInit() {
  }
}