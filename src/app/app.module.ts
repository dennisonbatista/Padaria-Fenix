import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importando os módulos necessários
import { HttpClientModule } from '@angular/common/http'; // Para requisições HTTP
import { FormsModule } from '@angular/forms'; // Para usar ngModel

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

// Importando as páginas
import { LoginPageModule } from './login/login.module';  // Corrigido
import { CadastroPageModule } from './cadastro/cadastro.module';  // Corrigido
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, 
    AppRoutingModule,
    LoginPageModule,  
    CadastroPageModule,
    HttpClientModule, // Adicionado para requisições HTTP
    FormsModule // Adicionado para usar ngModel nos formulários
  ],
  providers: [AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
