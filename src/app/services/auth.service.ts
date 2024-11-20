import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuario: any = null;
  private auth = getAuth(); // Instância do Firebase Auth

  constructor() {
    // Verificar se há um usuário autenticado ao iniciar
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // Usuário autenticado, armazenar informações
        const nome = localStorage.getItem('usuarioNome') || 'Visitante';
        this.usuario = {
          uid: user.uid,
          email: user.email,
          displayName: nome,
          photoURL: user.photoURL,
        };
      } else {
        // Usuário não autenticado
        this.usuario = null;
      }
    });
  }

  // Método para login no Firebase
  async loginNoFirebase(email: string, senha: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, senha);
      const user = userCredential.user;

      // Recuperar o nome do localStorage ou definir como 'Visitante'
      const nome = localStorage.getItem('usuarioNome') || 'Visitante';
      console.log('Nome recuperado no localStorage:', nome); // Log para verificar o armazenamento

      // Atualizar o objeto do usuário local
      this.usuario = {
        uid: user.uid,
        email: user.email,
        displayName: nome,
        photoURL: user.photoURL,
      };
    } catch (error: any) {
      console.error('Erro no login:', error.message);
      throw new Error('Erro no login: ' + (error.message || 'Erro desconhecido'));
    }
  }

  // Método para cadastro no Firebase
  async cadastroNoFirebase(email: string, senha: string, nome: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, senha);
      const user = userCredential.user;

      // Atualiza o displayName do usuário no Firebase Auth
      await updateProfile(user, { displayName: nome });

      // Salvar o nome no localStorage
      localStorage.setItem('usuarioNome', nome);
      console.log('Nome salvo no localStorage:', nome); // Log para verificar o armazenamento

      // Atualizar o objeto do usuário local
      this.usuario = {
        uid: user.uid,
        email: user.email,
        displayName: nome,
        photoURL: user.photoURL,
      };
    } catch (error: any) {
      console.error('Erro ao cadastrar usuário:', error.message);
      throw new Error('Erro ao criar usuário: ' + (error.message || 'Erro desconhecido'));
    }
  }

  // Método para logout
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.usuario = null;

      // Remover o nome do localStorage
      localStorage.removeItem('usuarioNome');
    } catch (error: any) {
      console.error('Erro ao desconectar:', error.message);
      throw new Error('Erro ao desconectar: ' + (error.message || 'Erro desconhecido'));
    }
  }

  // Retorna o nome do usuário ou "Visitante" caso não esteja logado
  getUsuarioNome(): string {
    return this.usuario ? this.usuario.displayName : 'Visitante';
  }

  // Verifica se o usuário está autenticado
  isLoggedIn(): boolean {
    return this.usuario !== null;
  }

  // Retorna o usuário autenticado
  getUsuario(): any {
    return this.usuario;
  }
}
