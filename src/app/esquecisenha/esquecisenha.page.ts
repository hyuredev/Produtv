import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esquecisenha',
  templateUrl: './esquecisenha.page.html',
  styleUrls: ['./esquecisenha.page.scss'],
})

export class EsquecisenhaPage implements AfterViewInit {

  // Referência ao botão e ao menu usando ViewChild
 @ViewChild('menuButton', { static: false }) menuButton!: ElementRef;
 @ViewChild('menuNav', { static: false }) menuNav!: ElementRef;

  constructor(private router: Router) { }

  ngAfterViewInit() {
    // Verifica se os elementos foram carregados corretamente
    if (this.menuButton && this.menuNav) {
    } else {
      console.error('Erro ao carregar os elementos');
    }
  }

  // Função para redirecionar para a página da Login
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  // Função para redirecionar para a página da EsqueciSenha
  navigateToEsqueciSenha() {
    this.router.navigate(['/esquecisenha']);
  }

  // Função para redirecionar para a página da Cadastro
  navigateToCadastro() {
    this.router.navigate(['/cadastro']);
  }

  // Função para redirecionar para a página da home
  navigateToHome() {
    this.router.navigate(['/home']);
  } 
}