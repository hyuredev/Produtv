import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EsquecisenhaPage } from './esquecisenha.page';

const routes: Routes = [
  {
    path: '',
    component: EsquecisenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsquecisenhaPageRoutingModule {}
