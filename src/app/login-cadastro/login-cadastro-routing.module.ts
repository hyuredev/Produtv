import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginCadastroPage } from './login-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: LoginCadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginCadastroPageRoutingModule {}
