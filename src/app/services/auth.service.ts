import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Importa o AngularFireAuth
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';  // Importa o Router
import firebase from 'firebase/compat/app';
import { SessaoService } from './sessao.service'; // Importe o serviço de sessão


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean = false; // Estado inicial de loggedIn

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router,
    private firestore: AngularFirestore,
    private sessaoService: SessaoService
  ) { 
    // Verifica o estado de autenticação ao iniciar o serviço
    this.afAuth.authState.subscribe(user => {
      this.loggedIn = !!user; // Atualiza o estado baseado na presença do usuário
    });
  }

  async registrarUsuario(email: string, password: string, name: string, cpf: string): Promise<void> {
    try {
      // Cria o usuário com email e senha no Authentication
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);

      if (userCredential.user) {
        const uid = userCredential.user.uid;

        // Salva o usuário no Firestore usando o mesmo UID
        await this.firestore.collection('Usuários').doc(uid).set({
          name: name,
          cpf: cpf,
          email: email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

      this.router.navigate(['/login-cadastro']); // Navega para a página de tabs após o login
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      }
    }
  

  async loginUsuario(email: string, password: string): Promise<any> {
  try {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);

    if (userCredential.user) {
      const uid = userCredential.user.uid;
      const userDoc = await this.firestore.collection('Usuários').doc(uid).get().toPromise();

      if (userDoc && userDoc.exists) {
        const usuarioData = userDoc.data();
        this.sessaoService.setUsuarioLogado(usuarioData); // Define os dados do usuário no SessaoService
        return usuarioData;
      } else {
        console.error("Usuário não encontrado no Firestore.");
        return null;
      }
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return null;
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn; // Retorna o estado de login atual
  }
  

  async googleLogin() {
    try {
      await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      console.log('Login bem-sucedido');
      this.router.navigate(['/tabs']); // Navega para a página de tabs após o login
    } catch (error) {
      console.log('Falha no login:', error); // Log do erro
    }
  }

  async logout() {
    await this.afAuth.signOut(); // Realiza o logout
    this.loggedIn = false; // Atualiza o estado de login
    this.router.navigate(['/login']); // Navega para a página de login
  }
}
