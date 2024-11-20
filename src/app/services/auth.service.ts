import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Importando Firestore

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuario: any = null;
  private auth = getAuth(); // Instância do Firebase Auth
  private db = getFirestore(); // Instância do Firestore

  constructor() {
    // Verificar se há um usuário autenticado ao iniciar
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // Usuário autenticado, armazenar informações
        this.usuario = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Visitante',
          photoURL: user.photoURL,
        };
      } else {
        // Usuário não autenticado
        this.usuario = null;
      }
    });
  }

  // Método para login no Firebase
  loginNoFirebase(email: string, senha: string) {
    return signInWithEmailAndPassword(this.auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        this.usuario = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Visitante',
          photoURL: user.photoURL,
        };
        return this.usuario; // Retorna o usuário autenticado
      })
      .catch((error: any) => { // Agora o tipo do erro é tratado
        throw new Error('Erro no login: ' + (error.message || 'Erro desconhecido'));
      });
  }

  // Método para cadastro no Firebase
  async cadastroNoFirebase(email: string, senha: string, nome: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, senha);
      const user = userCredential.user;

      // Atualiza o displayName do usuário no Firebase Auth
      await updateProfile(user, { displayName: nome });

      // Salva as informações no Firestore
      const userRef = doc(this.db, "usuarios", user.uid); // Usando o UID como referência
      await setDoc(userRef, {
        nome: nome,
        email: user.email,
      });

      // Atualiza o objeto de usuário na aplicação
      this.usuario = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Visitante',
        photoURL: user.photoURL,
      };

      return this.usuario; // Retorna o usuário autenticado com o nome atualizado
    } catch (error: any) { // Definição do tipo de erro
      throw new Error("Erro ao criar usuário: " + (error.message || 'Erro desconhecido'));
    }
  }

  // Método para logout
  logout() {
    return signOut(this.auth)
      .then(() => {
        this.usuario = null;
      })
      .catch((error: any) => { // Tratamento adequado do tipo de erro
        throw new Error('Erro ao desconectar: ' + (error.message || 'Erro desconhecido'));
      });
  }

  // Retorna o nome do usuário ou "Visitante" caso não esteja logado
  getUsuarioNome() {
    return this.usuario ? this.usuario.displayName : 'Visitante';
  }

  // Verifica se o usuário está autenticado
  isLoggedIn() {
    return this.usuario !== null;
  }

  // Retorna o usuário autenticado
  getUsuario() {
    return this.usuario;
  }
}
