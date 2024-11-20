import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Receita } from '../receitas/receita.model'; 
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.page.html',
  styleUrls: ['./receitas.page.scss'],
})
export class ReceitasPage implements OnInit {
  produto: string = ''; // Inicializa como string vazia
  receita: Receita | undefined; // Define como Receita ou undefined

  constructor(private http: HttpClient, private route: ActivatedRoute, private navCtrl: NavController) {}

  voltarParaProdutos() {
    this.navCtrl.navigateBack('/products');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.produto = params.get('produto') || ''; // Captura o parâmetro 'produto'
      this.carregarReceitas();
    });
  }

  carregarReceitas() {
    this.http.get<{ receitas: Receita[] }>('assets/receitas.json').subscribe(data => {
      const receitas = data.receitas; // Agora TypeScript sabe que isso é um array de Receita
      this.receita = receitas.find(r => r.produto === this.produto); // Filtra pela receita selecionada
    });
  }



}

