import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Certifique-se de importar o serviço de autenticação do Firebase
import { SessaoService } from '../services/sessao.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  usuarioLogado: any;

  constructor(
    private navCtrl: NavController, 
    private afAuth: AngularFireAuth,
    private sessaoService: SessaoService) 
    {}

  ngOnInit(): void {
    // Inscreve-se no BehaviorSubject para obter os dados do usuário
    this.sessaoService.usuarioLogado$.subscribe(usuarioData => {
      this.usuarioLogado = usuarioData;
    });
  }


  logout() {
    this.afAuth.signOut().then(() => {
      // Após o logout, redireciona para a página inicial
      this.navCtrl.navigateRoot('/tabs');
    }).catch(error => {
      console.error('Erro ao fazer logout:', error);
    });
  }

  goToTab1() {
    this.navCtrl.navigateRoot('/tabs');
  }
}
