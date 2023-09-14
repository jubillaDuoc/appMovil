import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Page404Page } from './page404.page';

const routes: Routes = [
  {
    path: '',
    component: Page404Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Page404PageRoutingModule {}
