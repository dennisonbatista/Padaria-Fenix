import { NgModule } from '@angular/core' ;
import { CommonModule } from '@angular/common' ;
import { IonicModule } from '@ionic/angular' ;
import { CadastroPageRoutingModule } from
'./cadastro-routing.module' ;
import { CadastroPage } from './cadastro.page' ;
// Para usar no Formulário de cadastro e etc
import { FormsModule , ReactiveFormsModule } from '@angular/forms' ;


@NgModule({
imports: [
CommonModule , FormsModule , IonicModule ,
CadastroPageRoutingModule ,
ReactiveFormsModule
],
declarations: [CadastroPage ]
})
export class CadastroPageModule {}