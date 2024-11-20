import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'products', loadChildren: () => import('./home/products/products.module').then(m => m.ProductsPageModule) },
  { path: 'cadastro', loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroPageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'alterar-senha', loadChildren: () => import('./alterar-senha/alterar-senha.module').then(m => m.AlterarSenhaPageModule) },
  { path: 'receitas/:produto', loadChildren: () => import('./receitas/receitas.module').then(m => m.ReceitasPageModule) },   {
    path: 'configuracoes',
    loadChildren: () => import('./configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule)
  },
  {
    path: 'ajuda',
    loadChildren: () => import('./ajuda/ajuda.module').then( m => m.AjudaPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./sobre/sobre.module').then( m => m.SobrePageModule)
  },

// Rota com parâmetro
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
