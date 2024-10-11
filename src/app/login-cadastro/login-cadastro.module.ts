import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginCadastroPageRoutingModule } from './login-cadastro-routing.module';

import { LoginCadastroPage } from './login-cadastro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginCadastroPageRoutingModule
  ],
  declarations: [LoginCadastroPage]
})
export class LoginCadastroPageModule {}
