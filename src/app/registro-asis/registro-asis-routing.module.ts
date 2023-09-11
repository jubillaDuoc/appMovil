import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroAsisPage } from './registro-asis.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroAsisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroAsisPageRoutingModule {}
