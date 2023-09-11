import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAsisPageRoutingModule } from './registro-asis-routing.module';

import { RegistroAsisPage } from './registro-asis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroAsisPageRoutingModule
  ],
  declarations: [RegistroAsisPage]
})
export class RegistroAsisPageModule {}
