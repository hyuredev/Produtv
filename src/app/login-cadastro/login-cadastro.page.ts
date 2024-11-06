import { Component, ViewChild, OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login-cadastro',
  templateUrl: './login-cadastro.page.html',
  styleUrls: ['./login-cadastro.page.scss'],
})
export class LoginCadastroPage{
  @ViewChild(IonModal) modal: IonModal | undefined;

  // Propriedades para login
  email: string = '';
  password: string = '';
  name: string = '';
  cpf: any = '';
  showPassword: boolean = false;

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.authService.registrarUsuario(this.email, this.password, this.name, this.cpf)
    .then(() => {
      console.log("Usuário registrado com sucesso!");
    })
    .catch(error => {
      console.error("Erro no registro:", error);
    });
    }

  submitLogin() {
    this.authService.loginUsuario(this.email, this.password)
    .then(userData => {
      if (userData) {
        console.log("Usuário logado com sucesso!", userData);
        this.router.navigate(['/tabs']);
      } else {
        console.log("Dados do usuário não encontrados.");
      }
    })
  .catch(error => {
    console.error("Erro no login:", error);
  });
  }

  googleLogin() {
    this.authService.googleLogin();
  }
    
  goToTab1() {
    this.navController.navigateForward('/tabs'); // Navega para a aba desejada
  }

  cancel() {
    this.modal?.dismiss(null, 'cancel'); // Fecha o modal
    this.limparCampos(); // Limpa o formulário de cadastro
  }

  limparCampos() {
    this.email = '';
    this.password = '';
    this.name = '';
    this.cpf = '';
  }

  openSignupModal() {
    this.modal?.present(); // Abre o modal de cadastro
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(`Olá, ${ev.detail.data}! Cadastro confirmado.`);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  recoverPassword() {
    if (!this.isValidEmail(this.email)) {
      alert("Por favor, insira um endereço de e-mail válido.");
      return;
    }

    firebase.auth().sendPasswordResetEmail(this.email).then(() => {
      alert("Um e-mail de redefinição de senha foi enviado para você!");
    }).catch(error => {
      let errorMessage = "";
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = "E-mail inválido.";
          break;
        case 'auth/user-not-found':
          errorMessage = "Nenhum usuário encontrado com esse e-mail.";
          break;
        default:
          errorMessage = "Ocorreu um erro. Tente novamente.";
      }
      alert(errorMessage);
    });
  }

  // Método para validar o formato do e-mail
  isValidEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return re.test(email);
  }
}
