import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Type1Page } from './type1.page';

const routes: Routes = [
  {
    path: '',
    component: Type1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Type1PageRoutingModule {}
