import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-cadastro',
  templateUrl: './login-cadastro.page.html',
  styleUrls: ['./login-cadastro.page.scss'],
})
export class LoginCadastroPage {
  @ViewChild(IonModal) modal: IonModal | undefined;

  // Propriedades para login
  email: string = '';
  password: string = '';

  // Propriedades para cadastro
  signupFullName: string = '';
  signupCpf: string = '';
  signupEmail: string = '';
  signupPhone: string = '';
  signupPassword: string = '';
  rememberMe: boolean = false;

  constructor(private navController: NavController) {}

  goToTab1() {
    this.navController.navigateForward('/tabs'); // Navega para a aba desejada
  }

  cancel() {
    this.modal?.dismiss(null, 'cancel'); // Fecha o modal
    this.resetSignupForm(); // Limpa o formulário de cadastro
  }

  confirm() {
    console.log('Cadastro enviado:', {
      fullName: this.signupFullName,
      cpf: this.signupCpf,
      email: this.signupEmail,
      phone: this.signupPhone,
      password: this.signupPassword,
    });
    this.modal?.dismiss(this.signupFullName, 'confirm'); // Fecha o modal e passa o nome completo
  }

  submitLogin() {
    // Lógica para processar o login
    console.log('Login enviado com sucesso!', {
      email: this.email,
      password: this.password,
    });
    // Aqui você pode implementar a lógica de autenticação
  }

  submitSignup() {
    // Lógica para processar o cadastro
    console.log('Cadastro enviado com sucesso!', {
      fullName: this.signupFullName,
      cpf: this.signupCpf,
      email: this.signupEmail,
      phone: this.signupPhone,
      password: this.signupPassword,
    });

    // Aqui você pode implementar a lógica para enviar os dados para um servidor
    // Por exemplo, uma chamada para um serviço de autenticação

    // Depois de processar o cadastro, você pode limpar o formulário e fechar o modal
    this.resetSignupForm();
    this.modal?.dismiss(this.signupFullName, 'confirm');
  }

  openSignupModal() {
    this.modal?.present(); // Abre o modal de cadastro
  }

  resetSignupForm() {
    // Limpa os campos do formulário de cadastro
    this.signupFullName = '';
    this.signupCpf = '';
    this.signupEmail = '';
    this.signupPhone = '';
    this.signupPassword = '';
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(`Olá, ${ev.detail.data}! Cadastro confirmado.`);
    }
  }

  toggleCheckbox() {
    this.rememberMe = !this.rememberMe;
  }
}
