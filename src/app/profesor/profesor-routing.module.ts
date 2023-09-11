import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorPage } from './profesor.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorPageRoutingModule {}
