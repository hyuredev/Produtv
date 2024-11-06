import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EsquecisenhaPageRoutingModule } from './esquecisenha-routing.module';

import { EsquecisenhaPage } from './esquecisenha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EsquecisenhaPageRoutingModule
  ],
  declarations: [EsquecisenhaPage]
})
export class EsquecisenhaPageModule {}
