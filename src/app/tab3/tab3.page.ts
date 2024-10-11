import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importando NavController

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private navCtrl: NavController) {}

  openProfile() {
    this.navCtrl.navigateForward('/login-cadastro'); // Navega para a página de login
  }
}
